const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',

  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  },

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
    publicPath: '/dist/',
    filename: 'bundle.js'
  },
  devServer: {
    port: 8080,
    proxy: {
      "/api/**": "http://localhost:3000"
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}
