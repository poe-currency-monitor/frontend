module.exports = {
  extends: ['@totominc/react'],

  // Add this part if you are using the ESLint config on a TypeScript project
  parserOptions: {
    project: ['./tsconfig.json'],
  },

  rules: {
    'react/jsx-props-no-spreading': 'off',
  },
};
