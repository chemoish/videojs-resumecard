const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

webpackConfig.output.filename = 'videojs.resumecard.min.js';

webpackConfig.plugins.push(
  new CleanWebpackPlugin('dist', {
    root: path.resolve(__dirname, '..'),
  }),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    comments: false,
  })
);

module.exports = webpackConfig;
