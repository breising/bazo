var path = require('path');

module.exports = {
  entry: './public/javascripts/template-build.js',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};