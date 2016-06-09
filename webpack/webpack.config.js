const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const moment = require('moment');
const pkg = require('../package.json');
const webpack = require('webpack');

module.exports = {
  entry: {
    'videojs.resumecard': './src/videojs-resumecard',
  },

  output: {
    filename: '[name].js',
    libraryTarget: 'umd',
    path: 'dist',
  },

  module: {
    preloaders: [{
      exclude: /node_modules/,
      loader: 'eslint',
      test: /\.js$/,
    }],

    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      test: /.js$/,

      query: {
        presets: [
          'es2015',
        ],

        plugins: [
          'transform-object-rest-spread',
          'transform-runtime',
        ],
      },
    }],

    postLoaders: [{
      include: /src/,
      loader: ExtractTextPlugin.extract('style', [
        'css?module&importLoaders=2',
        'postcss',
        'sass',
      ].join('!')),
      test: /\.scss$/,
    }],
  },

  plugins: [
    new webpack.BannerPlugin([
      '/**',
      ` * ${pkg.name} v${pkg.version}`,
      ' * ',
      ` * @author: ${pkg.author}`,
      ` * @date: ${moment().format('YYYY-MM-DD')}`,
      ' */',
      '',
    ].join('\n'), {
      raw: true,
    }),
    new ExtractTextPlugin('[name].css', {
      allChunks: true,
    }),
  ],

  postcss() {
    return [
      autoprefixer,
    ];
  },

  externals: {
    'video.js': 'videojs',
  },
};
