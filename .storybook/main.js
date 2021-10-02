const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    stories: ['../src/components/**/*.stories.ts'],
    addons: [
      '@storybook/addon-docs',
      '@storybook/addon-knobs',
      '@storybook/addon-a11y',
      '@storybook/addon-viewport',
      '@storybook/addon-postcss',
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
        new CopyPlugin({
          patterns:  [
            { from: 'node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js', to: 'webcomponentsjs/webcomponents-loader.js' },
            /*{ from: 'node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js', to: 'webcomponentsjs/custom-elements-es5-adapter.js' },*/
          ]
          }),
      );
      return config;
    },
};
  