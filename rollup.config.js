import typescript from '@rollup/plugin-typescript';
import { string } from 'rollup-plugin-string';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import generatePackageJson from 'rollup-plugin-generate-package-json';
import clear from 'rollup-plugin-clear';
import copy from 'rollup-plugin-copy';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import { globSync } from 'glob';
import camelcase from 'camelcase';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = 'dist';

let componentsToInsert = '';

// Plugins to execute only once (on last component)
const oneTimePlugins = [
  clear({ targets: [outDir] }),
  copy({
    targets: [
      {
        src: 'public/index.html',
        dest: outDir,
        transform: contents =>
          contents.toString().replace('<!--COMPONENTS-->', `<!--COMPONENTS-->\n${componentsToInsert}\n`),
      },
      {
        src: [
          'node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js',
          'node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js',
        ],
        dest: `${outDir}/webcomponentsjs`,
      },
    ],
  }),
];

// Add dev server in watch mode
if (process.env.ROLLUP_WATCH) {
  oneTimePlugins.push(serve({ open: true, contentBase: outDir }));
  oneTimePlugins.push(livereload({ watch: outDir }));
}

// Build each component separately
const components = globSync('src/components/**/index.ts').map((file, i, arr) => {
  const pathParts = file.split('/');
  const componentDirName = pathParts[pathParts.length - 2];
  const componentName = camelcase(componentDirName);
  const componentPath = file.replace('/index.ts', '');
  const outputJs = file.replace('src', outDir).replace('index.ts', `${componentName}.js`);
  const outputJsDist = file.replace('src', outDir).replace('index.ts', `${componentName}.dist.js`);

  componentsToInsert += `<script type="module" src="${outputJs.replace(`${outDir}/`, '')}"></script>`;

  const pkg = require(join(__dirname, componentPath, 'package.json'));
  pkg.main = `${componentName}.js`;
  pkg.module = `${componentName}.js`;
  pkg.types = `${componentPath.replace('src/', '')}/index.d.ts`;
  pkg.type = 'module';

  return {
    input: file,
    output: [
      { file: outputJs, format: 'esm', name: componentName },
      { file: outputJsDist, format: 'iife', name: componentName, plugins: [terser()] },
    ],
    plugins: [
      ...(arr.length - 1 === i ? oneTimePlugins : []),
      commonjs(),
      resolve(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: componentPath.replace('src', outDir),
        exclude: ['**/*.stories.ts', '**/*.spec.ts'],
      }),
      string({
        include: [`${componentPath}/*.html`, `${componentPath}/*.css`],
      }),
      generatePackageJson({
        inputFolder: componentPath,
        outputFolder: componentPath.replace('src', outDir),
        baseContents: pkg,
      }),
      copy({
        targets: [{ src: `${componentPath}/README.md`, dest: componentPath.replace('src', outDir) }],
      }),
    ],
    watch: { include: 'src/**' },
  };
});

export default components;
