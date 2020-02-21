const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const glob = require('glob');

const entryComponents = () => {
  const entryComponents = {};
  glob.sync('./src/components/**/index.ts').forEach(file => {
    const fileParts = file.split('/');
    entryComponents[fileParts[3]] = file;
  });
  return entryComponents;
};

module.exports = env => {
  return {
    mode: env.MODE,
    entry: entryComponents,
    devtool: env.MODE === 'development' ? 'inline-source-map' : 'none',
    devServer: {
      contentBase: './dist',
      port: 9000,
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: 'ts-loader',
          exclude: /node_modules/,
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
        {
          test: /\.css$/i,
          use: [
            'to-string-loader',
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'postcss-loader',
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new CleanWebpackPlugin(),
      new CopyPlugin([
        {
          from: 'node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js',
          to: 'webcomponentsjs/webcomponents-loader.js',
        },
        /*{ from: 'node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js', to: 'webcomponentsjs/custom-elements-es5-adapter.js' },*/
      ]),
      new HtmlWebpackPlugin({
        inject: 'head',
        template: 'public/index.html',
      }),
    ],
  };
};
