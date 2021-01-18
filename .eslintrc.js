module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  settings: { react: { version: 'detect' } },
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [
    '.eslintrc.js',
    'node_modules/*',
    '.next/*',
    '.out/*',
    '!.prettierrc.js',
  ],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    // We will use TypeScript's types for component props instead
    'react/prop-types': 'off',
    // No need to import React when using Next.js:
    'react/react-in-jsx-scope': 'off',
    // This rule is not compatible with Next.js's <Link /> components:
    'jsx-a11y/anchor-is-valid': 'off',
    // Report unused vars?:
    '@typescript-eslint/no-unused-vars': ['error'],
  },
};
