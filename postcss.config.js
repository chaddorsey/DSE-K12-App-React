console.log('Loading PostCSS config...');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('Processing CSS with plugins:', {
  tailwind: !!require('tailwindcss'),
  autoprefixer: !!require('autoprefixer'),
  cssnano: !!(process.env.NODE_ENV === 'production' && require('cssnano'))
});

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
  }
} 