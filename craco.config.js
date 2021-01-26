/* eslint global-require: "off" */
module.exports = {
  babel: {
    plugins: [
      [
        'import',
        {
          libraryName: 'antd',
          // Use pre-built components CSS files.
          style: 'css',
        },
      ],
    ],
  },

  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
};
