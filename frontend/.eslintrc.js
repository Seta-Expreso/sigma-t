module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    // React Refresh
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    
    // TypeScript - Reglas de calidad
    '@typescript-eslint/no-explicit-any': 'error', // 🔼 Subir a error
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
    '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
    
    // JavaScript - Buenas prácticas
    'prefer-const': 'error',
    'eqeqeq': ['error', 'always'],
    'no-var': 'error',
    'prefer-template': 'warn',
  },
};