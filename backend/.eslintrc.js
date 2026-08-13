module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    'no-console': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
    '@typescript-eslint/require-await': 'warn',
    '@typescript-eslint/no-floating-promises': 'error',
    'prefer-const': 'error',
    'eqeqeq': ['error', 'always'],
  },
};