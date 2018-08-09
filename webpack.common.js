const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './app/index.jsx'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({ template: './app/index.html' }),
    new webpack.ProvidePlugin({
      'errorService': 'errorService'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'errorService': path.resolve(__dirname, './app/utils/errorService')
    },
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [ 'style-loader', 'css-loader', 'sass-loader']
      },
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        use: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.svg$/,
        loader: 'url-loader?limit=100000&mimetype=image/svg+xml&name=images/[sha512:hash:base64:7].[ext]'
      }, {
        test: /\.gif$/,
        loader: 'url-loader?limit=100000&mimetype=image/gif&name=images/[sha512:hash:base64:7].[ext]'
      }, {
        test: /\.png$/,
        loader: 'url-loader?limit=100000&mimetype=image/png&name=images/[sha512:hash:base64:7].[ext]'
      }, {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=100000&minetype=application/font-woff&name=fonts/[sha512:hash:base64:7].[ext]'
      }, {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=100000&name=fonts/[sha512:hash:base64:7].[ext]'
      }
    ]
  }
};
