module.exports = {
  extends: ['@totominc/react/typescript'],

  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },

  rules: {
    '@typescript-eslint/no-non-null-assertion': 'off',
    'react/prop-types': 'off',
  },
};
