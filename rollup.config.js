import ts from '@wessberg/rollup-plugin-ts';
import html from 'rollup-plugin-html';
import postcss from 'rollup-plugin-postcss-config';
import { string } from 'rollup-plugin-string';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import prettier from 'rollup-plugin-prettier';
import generatePackageJson from 'rollup-plugin-generate-package-json';
import { eslint } from 'rollup-plugin-eslint';
import clear from 'rollup-plugin-clear';
import copy from 'rollup-plugin-copy';
import analyze from 'rollup-plugin-analyzer';

import glob from 'glob';
import camelcase from 'camelcase';

const outDir = 'distroll';
let componentsToInsert = '';

const oneTimePlugins = [
  eslint({
    throwOnError: true,
    include: ['**/*.js', '**/*.ts'],
  }),
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

const components = glob.sync('./src/components/**/index.ts').map((file, i, arr) => {
  const fileParts = file.split('/');
  const componentName = camelcase(fileParts[3]);
  const componentPath = file.replace('/index.ts', '');
  const outputJs = file.replace('src', outDir).replace('index.ts', componentName + '.js');
  const outputJsDist = file.replace('src', outDir).replace('index.ts', componentName + '.dist.js');

  componentsToInsert += `<script src="${outputJs.replace('./distroll/', '')}"></script>`;

  // Create package.json for the component
  const pkg = require(componentPath + '/package.json');
  pkg.main = componentName + '.js';
  pkg.module = componentName + '.js';
  pkg.type = 'module';
  // inser one time plugins in last iteration
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
        plugins: [prettier()],
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
      ts({
        tsconfig: resolvedConfig => Object.assign({}, resolvedConfig, { declaration: true }),
      }),
      html({
        include: componentPath + '/*.html',
        htmlMinifierOptions: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          conservativeCollapse: true,
          removeComments: true,
        },
      }),
      postcss({
        include: componentPath + '/*.css',
        exclude: 'node_modules/**',
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
      analyze({
        summaryOnly: true,
      }),
    ],
  };

  return COMPONENT;
});

export default components;
