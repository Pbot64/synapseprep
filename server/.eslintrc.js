module.exports = {
  env: {
    browser: true,
    es6: true,
    'jest/globals': true,
    jest: true
  },
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier', 'jest'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    'prettier/prettier': ['error'],
    'no-console': 'off'
  }
};
