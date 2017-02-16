var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var combineLoaders = require('webpack-combine-loaders');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: './src/index',
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin("styles.css")
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.cjsx', '.coffee']
  },
  module: {
    loaders: [{
      test: /(\.jsx?$|\.js?$)/,
      loaders: ['babel'],
      exclude: /(node_modules|bower_components)/,
      include: path.join(__dirname, 'src')
    }, {
      test: /\.cjsx$/,
      loaders: ['coffee', 'cjsx']
    }, {
      test: /\.coffee$/,
      loader: 'coffee'
    }, {
      test: /(\.sass|\.css)$/,
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
    }, {
      test: /\.svg$/,
      loader: 'svg-sprite?' + JSON.stringify({
        name: '[name]_[hash]',
        prefixize: false
      })
    }]
  }
};
