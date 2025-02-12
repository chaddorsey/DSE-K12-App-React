/**
 * Development-specific webpack configuration
 */

import path from 'path';
import { fileURLToPath } from 'url';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import dotenv from 'dotenv';
import CopyPlugin from 'copy-webpack-plugin';

// ES Module dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
const env = dotenv.config().parsed || {};

// Type definitions
type Configuration = {
  mode: 'development' | 'production' | 'none';
  entry: string;
  output: {
    path: string;
    filename: string;
    publicPath: string;
  };
  module: {
    rules: Array<{
      test: RegExp;
      use: string | Array<{
        loader: string;
        options?: any;
      }>;
      exclude?: RegExp;
    }>;
  };
  resolve: {
    extensions: string[];
    alias: Record<string, string>;
    plugins: any[];
    modules: string[];
    fallback: Record<string, boolean>;
  };
  plugins: any[];
  devServer: {
    historyApiFallback: boolean;
    port: number;
    hot: boolean;
    open: boolean;
  };
  devtool: string;
};

const config: Configuration = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              configFile: path.resolve(__dirname, 'tsconfig.json')
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
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
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(env),
      'window.__CONFIG__': JSON.stringify({
        apiUrl: env.REACT_APP_API_URL || 'http://localhost:3000/api',
        environment: 'development',
        debug: true
      })
    }),
    new CopyPlugin({
      patterns: [
        { 
          from: path.resolve(__dirname, 'public/mockServiceWorker.js'),
          to: path.resolve(__dirname, 'dist/mockServiceWorker.js'),
          force: true
        }
      ]
    })
  ],
  devServer: {
    historyApiFallback: true,
    port: 3000,
    hot: true,
    open: true,
  },
  devtool: 'inline-source-map'
};

export default config; 