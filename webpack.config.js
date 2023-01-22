const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './client/index.js',
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|browser_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: { extensions: ['*', '.js', '.jsx']},
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/dist',
    filename: 'bundle.js',
  },
  devServer: {
    port: 8080,
    hot: true,
    proxy: {
      '/': {
        target: 'http://localhost:3000'
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}