const webpack = require('webpack')
const path = require('path')

const rootPath = path.resolve(__dirname)

module.exports = {
  entry: path.resolve(rootPath, 'src', 'index.js'),
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './public'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(rootPath, 'public'),
    libraryTarget: 'umd'
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: "babel-loader",
    }]
  },
}