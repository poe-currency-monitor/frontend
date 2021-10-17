module.exports = {
  extends: ['@totominc/react', '@totominc/react/jest'],

  // Add this part if you are using the ESLint config on a TypeScript project
  parserOptions: {
    project: ['./tsconfig.json'],
  },

  rules: {
    'react/jsx-props-no-spreading': 'off',
  },
};
