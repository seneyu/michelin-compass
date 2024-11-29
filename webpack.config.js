const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './client/src/index.tsx',
    mode: isProduction ? 'production' : 'development',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? '[name].[contenthash].js' : '[name].bundle.js',
      publicPath: '/',
      clean: true,
    },
    // module rules for processing different file types
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/env', '@babel/react'],
            },
          },
        },
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: 'ts-loader',
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      modules: [path.resolve(__dirname, 'client/src'), 'node_modules'],
    },
    // plugins for additional build steps
    plugins: [
      new HtmlWebpackPlugin({
        template: './client/public/index.html',
        inject: true,
      }),
      // new webpack.DefinePlugin({
      //   'process.env.GOOGLE_MAPS_API_KEY': JSON.stringify(
      //     process.env.GOOGLE_MAPS_API_KEY
      //   ),
      // }),
      new Dotenv(),
    ],
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
      minimize: isProduction,
    },
    devtool: isProduction ? 'source-map' : 'eval-source-map',
    devServer: isProduction
      ? {}
      : {
          historyApiFallback: true,
          hot: true,
          static: {
            // directory: path.resolve(__dirname, 'dist'),
            directory: path.resolve(__dirname, 'client/public'), // ensure access to static files in the public directory
          },
          proxy: [
            {
              context: ['/api'],
              target: 'http://localhost:3000',
              logLevel: 'info',
            },
          ],
        },
  };
};
