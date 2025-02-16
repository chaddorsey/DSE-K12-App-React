const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');

const isProduction = process.env.NODE_ENV === 'production';

const productionConfig = {
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
      name: false,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
};

module.exports = {
  entry: './src/index.tsx',
  mode: isProduction ? 'production' : 'development',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: isProduction ? '[name].[contenthash].js' : 'bundle.js',
    chunkFilename: isProduction ? '[name].[contenthash].chunk.js' : '[name].chunk.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: [
          /node_modules/,
          /[\\/]__tests__[\\/]/,
          /[\\/]__mocks__[\\/]/,
          /\.test\.(ts|tsx)$/,
          /\.spec\.(ts|tsx)$/,
          /test-utils[\\/]/,
          /[\\/]testing[\\/]/,
          /.*\.test\..*/,
          /.*\.spec\..*/,
          /.*\/tests\/.*/,
          /.*\/testing\/.*/,
          /.*\/test-utils\/.*/,
          /.*\/mocks\/.*/,
          /src\/mocks\/.*/,
          /.*mock.*/i,
          /.*\.test\.tsx?$/
        ],
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.build.json',
            transpileOnly: true,
            compilerOptions: {
              noEmit: false,
              module: 'esnext',
              moduleResolution: 'node'
            }
          }
        }
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new Dotenv({
      path: `.env.${process.env.NODE_ENV}`
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  devServer: {
    historyApiFallback: true,
    hot: true
  },
  optimization: {
    ...isProduction ? productionConfig.optimization : {},
    nodeEnv: process.env.NODE_ENV,
    minimize: isProduction,
    splitChunks: {
      chunks: 'all',
      name: false,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
}; 