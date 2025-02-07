/**
 * Development-specific webpack configuration
 */

export {};  // Make this a module

const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const config = merge(baseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    hot: true,
    port: 3000,
    historyApiFallback: true,
    open: true,
    client: {
      overlay: {
        errors: true,
        warnings: false  // Don't show warnings in overlay
      }
    }
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: ['node_modules', 'src']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        DEBUG: JSON.stringify(true)
      }
    }),
    process.env.ANALYZE && new BundleAnalyzerPlugin()
  ].filter(Boolean),
  performance: {
    hints: false  // Change from 'warning' to false
  }
});

module.exports = config; 