/**
 * Development-specific webpack configuration
 */

import path from 'path';
import { Configuration as WebpackConfig } from 'webpack';
import { Configuration as WebpackDevServerConfig } from 'webpack-dev-server';
import { merge } from 'webpack-merge';
import baseConfig from './webpack.config';

interface Configuration extends WebpackConfig {
  devServer?: WebpackDevServerConfig;
}

const devConfig: Configuration = {
  mode: 'development',
  devtool: 'eval-source-map',
  
  // Development-specific output
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },

  // Development server configuration
  devServer: {
    hot: true,
    historyApiFallback: true,
    port: 3000,
    host: 'localhost',
    open: true,
    compress: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
      progress: true,
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      }
    },
    static: {
      directory: path.join(__dirname, 'public'),
      publicPath: '/'
    }
  },

  // Development-specific optimizations
  optimization: {
    minimize: false,
    splitChunks: {
      chunks: 'all'
    }
  },

  // Additional development plugins
  plugins: []
};

// Merge with base config
export default merge(baseConfig, devConfig); 