var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var combineLoaders = require('webpack-combine-loaders');

module.exports = {
  devtool: 'eval',
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin("styles.css")
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.cjsx', '.coffee']
  },
  module: {
    loaders: [{
      test: /\.jsx?$|/,
      loaders: ['babel'],
      exclude: /(node_modules|bower_components)/,
      include: path.join(__dirname, 'src')
    }, {
      test: /\.cjsx$/,
      loaders: ['coffee', 'cjsx']
    }, {
      test: /\.coffee$/,
      loader: 'coffee'
    },
    {
      test: /(\.sass|\.css)/,
      loader: ExtractTextPlugin.extract(
        combineLoaders([
          {
            loader: 'css-loader',
            query: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          {loader: 'sass'}
        ])
      )
    }]
  }
};
