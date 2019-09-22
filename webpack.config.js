/**
 * @type import('webpack').Configuration
 */

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: './src/index.tsx',
  output: {
    path: `${__dirname}/dist`,
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
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
};
