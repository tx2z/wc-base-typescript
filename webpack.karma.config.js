const path = require('path');

module.exports = {
  devtool: 'inline-source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
        {
          test: /\.(html)$/,
          use: {
            loader: 'html-loader',
            options: {
              attrs: false,
            },
          },
        },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  }
};
