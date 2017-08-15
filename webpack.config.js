var webpack = require('webpack');
var envToBeInjected = {
  PRIVATE_KEY: process.env.PRIVATE_KEY,
  INFURA_API_KEY: process.env.INFURA_API_KEY
};

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(envToBeInjected)
    })
  ]
};