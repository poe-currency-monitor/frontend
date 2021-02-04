const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],

  darkMode: false,

  theme: {
    extend: {
      colors: {
        'blue-gray': colors.blueGray,
      },

      fontFamily: {
        inter: 'Inter',
      },
    },
  },

  variants: {
    extend: {},
  },

  plugins: [],
};
