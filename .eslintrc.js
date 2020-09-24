module.exports = {
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/jsx-filename-extension': [
      1, { extensions: ['.js', '.jsx'] },
    ],
    'no-param-reassign': [
      'error', { props: true, ignorePropertyModificationsFor: ['state'] }],
    'linebreak-style': 0,
  },
};