const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

module.exports = {
  devtool: '#source-map',
  entry: {
      app: './src/entry-client.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    alias: {
      'public': path.resolve(__dirname, '../public'),
      /** https://vuejs.org/v2/guide/installation.html **/
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
  optimization: {
      // https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693
        runtimeChunk: true,
        splitChunks: {
            chunks: "initial",
            cacheGroups: {
                default: false,
                vendors: false,
            },
        },
    },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': 'client'
    }),
    //new CleanWebpackPlugin(['dist'], {root: path.resolve(__dirname, '../')}),
    new HtmlWebpackPlugin({
        chunks: [
            'vendor',
             'app'
        ],
        filename: 'client.html',
        template: 'src/view/client.html',
        inject: true,
    }),
    
    // extract webpack runtime & manifest to avoid vendor chunk hash changing
    // on every build.
    new VueSSRClientPlugin()
  ]
}
