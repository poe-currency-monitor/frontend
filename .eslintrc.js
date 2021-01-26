module.exports = {
  extends: ['@totominc/react/typescript'],

  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },

  rules: {
    'react/prop-types': 'off',
  },
};
