const path = require('path');

module.exports = {
  entry: './Client/app.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: '/node_modules/',
      loader: 'babel-loader'
    }],

  },
  watch: true,
  mode: 'development'
}