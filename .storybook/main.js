const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    addons: ['@storybook/addon-knobs/register'],
    webpackFinal: async config => {
      config.module.rules.push({
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: require.resolve('ts-loader'),
          },
        ],
      });
      config.resolve.extensions.push('.ts', '.tsx');
      config.plugins.push(
        new CopyPlugin([
            { from: 'node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js', to: 'webcomponentsjs/webcomponents-loader.js' },
            { from: 'node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js', to: 'webcomponentsjs/custom-elements-es5-adapter.js' },
          ]),
      );
      return config;
    },
};
  