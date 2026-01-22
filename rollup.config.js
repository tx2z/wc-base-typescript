import typescript from '@rollup/plugin-typescript';
import html from 'rollup-plugin-html';
import postcss from 'rollup-plugin-postcss';
import { string } from 'rollup-plugin-string';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import generatePackageJson from 'rollup-plugin-generate-package-json';
import clear from 'rollup-plugin-clear';
import copy from 'rollup-plugin-copy';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import filesize from 'rollup-plugin-filesize';

import { globSync } from 'glob';
import camelcase from 'camelcase';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Output dir
const outDir = 'dist';

let componentsToInsert = '';

// Plugins to execute only one time
const oneTimePlugins = [
  clear({
    targets: [outDir],
  }),
  copy({
    targets: [
      {
        src: 'public/index.html',
        dest: outDir,
        transform: contents =>
          contents
            .toString()
            .replace('<!--COMPONENTS-->', `<!--COMPONENTS-->\n${componentsToInsert}\n`),
      },
      {
        src: [
          'node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js',
          'node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js',
        ],
        dest: outDir + '/webcomponentsjs',
      },
    ],
  }),
];

// Serve and live reload in watch mode
if (process.env.ROLLUP_WATCH) {
  oneTimePlugins.push(
    serve({
      open: true,
      contentBase: outDir,
    })
  );
  oneTimePlugins.push(livereload({ watch: outDir }));
}

// Compile components separately
const components = globSync('src/components/**/index.ts').map((file, i, arr) => {
  // Extract component directory name (e.g., 'base-component' from 'src/components/base-component/index.ts')
  const pathParts = file.split('/');
  const componentDirName = pathParts[pathParts.length - 2]; // Get the directory containing index.ts
  const componentName = camelcase(componentDirName);
  const componentPath = file.replace('/index.ts', '');
  const outputJs = file.replace('src', outDir).replace('index.ts', componentName + '.js');
  const outputJsDist = file.replace('src', outDir).replace('index.ts', componentName + '.dist.js');

  // Create script tag with path relative to dist/ (since server serves from dist/)
  const scriptSrc = outputJs.replace(outDir + '/', '');
  componentsToInsert += `<script type="module" src="${scriptSrc}"></script>`;

  // Create package.json for the component
  const pkg = require(join(__dirname, componentPath, 'package.json'));
  pkg.main = componentName + '.js';
  pkg.module = componentName + '.js';
  pkg.type = 'module';

  // Insert one time plugins in last iteration
  let plugins = [];
  if (arr.length - 1 === i) {
    plugins = oneTimePlugins;
  }

  const COMPONENT = {
    input: file,
    output: [
      {
        file: outputJs,
        format: 'esm',
        name: componentName,
      },
      {
        file: outputJsDist,
        format: 'iife',
        name: componentName,
        plugins: [terser()],
      },
    ],
    plugins: [
      ...plugins,
      commonjs(),
      resolve(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: componentPath.replace('src', outDir),
        exclude: ['**/*.stories.ts', '**/*.spec.ts'],
      }),
      html({
        include: componentPath + '/*.html',
        htmlMinifierOptions: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeComments: true,
        },
      }),
      postcss({
        include: componentPath + '/*.css',
        exclude: 'node_modules/**',
        inject: false,
        extract: false,
      }),
      string({
        include: componentPath + '/*.css',
        exclude: 'node_modules/**',
      }),
      generatePackageJson({
        inputFolder: componentPath,
        outputFolder: componentPath.replace('src', outDir),
        baseContents: pkg,
      }),
      copy({
        targets: [
          {
            src: componentPath + '/README.md',
            dest: componentPath.replace('src', outDir),
          },
        ],
      }),
      filesize({
        showMinifiedSize: false,
      }),
    ],
    watch: {
      include: 'src/**',
    },
  };

  return COMPONENT;
});

export default components;
