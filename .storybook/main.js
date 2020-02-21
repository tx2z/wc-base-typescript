const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    addons: [
      '@storybook/addon-notes/register-panel',
      '@storybook/addon-knobs/register',
      '@storybook/addon-a11y/register',
      '@storybook/addon-viewport/register',
    ],
    webpackFinal: async config => {
      // overwrite css rule
      let rule = config.module.rules.find(r =>
        r.test && r.test.toString().includes('css') 
      );
      rule.use = [
        'to-string-loader',
        { loader: 'css-loader', options: { importLoaders: 1 } },
        'postcss-loader',
      ];

      // Add typescript support 
      config.module.rules.push({
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
      }
      );
      config.resolve.extensions.push('.ts', '.tsx', '.js');
      config.plugins.push(
        new CopyPlugin([
            { from: 'node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js', to: 'webcomponentsjs/webcomponents-loader.js' },
            /*{ from: 'node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js', to: 'webcomponentsjs/custom-elements-es5-adapter.js' },*/
          ]),
      );
      return config;
    },
};
  