module.exports = {
  extends: ['@totominc/react'],

  parserOptions: {
    project: './tsconfig.json',
  },

  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },

    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: 'tsconfig.json',
      },
    },
  },
};
