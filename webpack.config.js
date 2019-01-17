const webpack = require('webpack')
const path = require('path')
const webpackNodeExternals = require('webpack-node-externals')

module.exports = {
  mode: 'production',
  target: 'node',
  entry: './src/index.js',
  output: {
    filename: 'grpc-vuex.sh',
    path: path.resolve(__dirname, 'bin')
  },
  plugins: [
    new webpack.BannerPlugin({ banner: "#!/usr/bin/env node", raw: true })
  ],
  externals: [webpackNodeExternals()],
}
