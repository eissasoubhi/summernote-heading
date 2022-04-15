const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src'),

  output: {
    filename: 'summernote-header.min.js',
    publicPath: 'dist/',
  },

  resolve: {
    alias: {
        '@': path.resolve(__dirname, 'src/')
    }
  },

  module: {
    rules: [{ test: /\.js?$/, loader: 'babel-loader', exclude: /node_modules/ }],
  },

  devtool: 'source-map'
};