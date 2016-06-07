module.exports = {
  entry: {
    src: './src/videojs-resumecard',
  },

  output: {
    filename: 'videojs.resumecard.js',
    libraryTarget: 'umd',
    path: 'dist',
  },

  module: {
    preloaders: [{
      exclude: /node_modules/,
      loader: 'eslint',
      test: /\.js$/,
    }],

    loaders: [],

    postLoaders: [{
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
  },

  plugins: [],

  externals: {
    'video.js': 'videojs',
  },
};
