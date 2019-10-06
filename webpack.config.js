const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const dist = `${__dirname}/dist`;
const src = `${__dirname}/src`;

/**
 * @type import('webpack').Configuration
 */

const plugins =
  process.env.NODE_ENV === 'production'
    ? [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
          template: `${src}/static/index.html`,
        }),
        new CopyWebpackPlugin([
          {
            from: `${src}/static/assets`,
            to: `${dist}/assets`,
          },
        ]),
        new WorkboxWebpackPlugin.GenerateSW({
          swDest: 'sw.js',
          clientsClaim: true,
          skipWaiting: true,
        }),
      ]
    : [
        new HtmlWebpackPlugin({
          template: `${src}/static/index.html`,
        }),
      ];

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: `${src}/index.tsx`,
  output: {
    path: dist,
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: '/node_modules',
      },
    ],
  },
  plugins,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
};
