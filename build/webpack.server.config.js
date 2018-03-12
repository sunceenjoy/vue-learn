const webpack = require('webpack')
const path = require('path')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = {
  target: 'node',
  devtool: '#source-map',
  entry: './src/entry-server.js',
  output: {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, '../public'),
    publicPath: '/'
  },
  resolve: {
    alias: {
      'public': path.resolve(__dirname, '../public'),
      vue: 'vue/dist/vue.js'
    }
  },
  module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: '[name].[ext]?[hash]'
          }
        },
      ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),
    new VueSSRServerPlugin()
  ]
}
