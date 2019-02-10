const path = require('path');

module.exports = {
  mode: 'development',
  entry: './client/game.js',
  output: {
    path: path.resolve(__dirname, 'client'),
    filename: 'bundle.js',
  },
};
