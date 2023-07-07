const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './client/index.jsx',
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  devServer: {
    port: 8080,
    hot: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
      },
    },
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
