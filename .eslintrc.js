module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'prettier',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:shopify/esnext',
  ],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  env: { jest: true, browser: true, node: true },
  rules: {
    'no-console': 'warn',
    '@typescript-eslint/no-namespace': 'warn',
    'babel/object-curly-spacing': 'off',
    'comma-dangle': 'off',
    'arrow-parens': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src', 'lib', 'test'],
        extensions: ['.js', '.ts'],
      },
    },
  },
};
