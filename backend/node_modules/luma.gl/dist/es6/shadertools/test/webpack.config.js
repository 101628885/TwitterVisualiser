const _require = require('path'),
      resolve = _require.resolve;

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devServer: {
    stats: {
      warnings: false
    },
    quiet: true
  },
  entry: {
    'test-fp64': resolve('./index-fp64.js')
  },
  output: {
    path: resolve('./dist'),
    filename: '[name]-bundle.js'
  },
  devtool: '#inline-source-maps',
  resolve: {
    alias: {
      'luma.gl': resolve('../../../src')
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
  plugins: [new HtmlWebpackPlugin({
    title: 'Shader Module Tests'
  })]
};
//# sourceMappingURL=webpack.config.js.map