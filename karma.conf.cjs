const typescript = require('@rollup/plugin-typescript');
const { string } = require('rollup-plugin-string');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [{ pattern: 'src/components/**/*.spec.ts', watched: false }],
    exclude: [],
    preprocessors: {
      'src/components/**/*.ts': ['rollup'],
    },
    rollupPreprocessor: {
      plugins: [
        commonjs(),
        resolve(),
        typescript({
          tsconfig: './tsconfig.json',
          outDir: '.karma-rollup-tmp',
          declaration: false,
        }),
        string({
          include: ['src/components/**/*.html', 'src/components/**/*.css'],
        }),
      ],
      output: {
        format: 'iife',
        name: 'components',
        sourcemap: 'inline',
        dir: '.karma-rollup-tmp',
      },
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome', 'Firefox'],
    singleRun: false,
    concurrency: Infinity,
  });
};
