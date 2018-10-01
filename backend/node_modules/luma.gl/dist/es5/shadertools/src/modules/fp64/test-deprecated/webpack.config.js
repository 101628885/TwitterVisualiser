"use strict";

var _require = require('path'),
    resolve = _require.resolve;

module.exports = {
  devServer: {
    stats: {
      warnings: false
    },
    quiet: true
  },
  entry: {
    'test-fp64': resolve('fp64-shader.spec.js')
  },
  output: {
    path: resolve('./dist'),
    filename: '[name]-bundle.js'
  },
  devtool: '#inline-source-maps',
  resolve: {
    alias: {
      'luma.gl': resolve('../../../../../src')
    }
  },
  module: {
    rules: [{
      test: /\.glsl$/,
      use: 'raw-loader'
    }]
  },
  node: {
    fs: 'empty'
  },
  plugins: []
};
//# sourceMappingURL=webpack.config.js.map