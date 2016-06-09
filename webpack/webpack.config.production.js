const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

webpackConfig.output.filename = '[name].min.js';

webpackConfig.plugins = [
  new CleanWebpackPlugin('dist', {
    root: path.resolve(__dirname, '..'),
  }),
  new ExtractTextPlugin('[name].min.css', {
    allChunks: true,
  }),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    comments: false,
  }),
];

module.exports = webpackConfig;
