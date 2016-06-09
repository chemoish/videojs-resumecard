const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

webpackConfig.cache = true;
webpackConfig.debug = true;
webpackConfig.devtool = 'inline-source-map';

webpackConfig.module.postLoaders = [{
  include: /src/,
  loader: [
    'style',
    'css?module&sourceMap&importLoaders=2&localIdentName=[local]__[hash:base64:5]',
    'postcss',
    'sass?sourceMap',
  ].join('!'),
  test: /\.scss$/,
}];

webpackConfig.plugins = [
  new webpack.HotModuleReplacementPlugin(),
];

webpackConfig.devServer = {
  hot: true,
  inline: true,
  progress: true,
};

module.exports = webpackConfig;
