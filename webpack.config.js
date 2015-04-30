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
  }
};

module.exports = config;
