/**
 * Development-specific webpack configuration
 */

import path from 'path';
import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import dotenv from 'dotenv';
import CopyPlugin from 'copy-webpack-plugin';
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

// Load environment variables
const env = dotenv.config().parsed || {};

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
  mode: 'development',
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript'
              ]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    plugins: [new TsconfigPathsPlugin()],
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules'
    ],
    fallback: {
      "path": false,
      "fs": false
    }
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html')
    }),
    new webpack.DefinePlugin({
      'window.__CONFIG__': JSON.stringify({
        apiUrl: env.REACT_APP_API_URL || 'http://localhost:3000/api',
        environment: 'development',
        debug: true
      })
    }),
    new CopyPlugin({
      patterns: [
        { 
          from: 'node_modules/msw/lib/mockServiceWorker.js',
          to: 'mockServiceWorker.js'
        }
      ]
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    historyApiFallback: true,
    port: 3000,
    hot: true,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        pathRewrite: { '^/api': '' },
        changeOrigin: true,
        secure: false,
        onError: (err: Error) => {
          console.log('Proxy error:', err);
        }
      }
    }
  },
  devtool: 'inline-source-map'
};

export default config; 