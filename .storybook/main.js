/** @type { import('@storybook/html-webpack5').StorybookConfig } */
const config = {
  stories: ['../src/components/**/*.stories.ts'],
  addons: [
    '@storybook/addon-webpack5-compiler-babel',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/html-webpack5',
    options: {},
  },
  staticDirs: [
    { from: '../node_modules/@webcomponents/webcomponentsjs', to: '/webcomponentsjs' },
  ],
  webpackFinal: async (config) => {
    // Exclude component files from default loaders
    config.module.rules.forEach((rule) => {
      if (rule.test) {
        const testStr = rule.test.toString();
        if (testStr.includes('html')) {
          rule.exclude = rule.exclude ? [].concat(rule.exclude, /\.component\.html$/) : /\.component\.html$/;
        }
        if (testStr.includes('css')) {
          rule.exclude = rule.exclude ? [].concat(rule.exclude, /\.component\.css$/) : /\.component\.css$/;
        }
      }
    });

    // Load component HTML/CSS as raw strings
    config.module.rules.unshift(
      { test: /\.component\.html$/, type: 'asset/source' },
      { test: /\.component\.css$/, type: 'asset/source' }
    );

    // TypeScript support
    config.module.rules.push({
      test: /\.tsx?$/,
      use: [{ loader: 'ts-loader', options: { transpileOnly: true } }],
      exclude: /node_modules/,
    });
    config.resolve.extensions.push('.ts', '.tsx');

    return config;
  },
};

export default config;
