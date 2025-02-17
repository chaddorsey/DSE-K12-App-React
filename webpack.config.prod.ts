import MiniCssExtractPlugin from 'mini-css-extract-plugin';
console.log('Loading webpack production config...');
console.log('CSS Loaders:', [
  MiniCssExtractPlugin.loader,
  {
    loader: 'css-loader',
    options: { importLoaders: 1 }
  },
  'postcss-loader'
]);

{
  test: /\.css$/,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [
            require('tailwindcss'),
            require('autoprefixer'),
            require('cssnano'),
          ]
        }
      }
    }
  ]
}, 