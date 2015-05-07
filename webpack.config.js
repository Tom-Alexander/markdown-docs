var webpack = require('webpack');

var config = {
  entry: {
    standalone: "./lib/components/standalone.js"
  },
  output: {
    path: 'dist/client',
    filename: "[name].js",
    chunkFilename: "[id].js"
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
    ]
  },
  plugins: [new webpack.optimize.UglifyJsPlugin()]
};

module.exports = config;
