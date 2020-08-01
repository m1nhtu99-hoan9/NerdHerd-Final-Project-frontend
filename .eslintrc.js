module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  env: {
    jest: true,
  },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/jsx-one-expression-per-line': [0],
    'semi': 'off',
    'space-before-function-paren': 'off',
    'func-call-spacing': 'off',
    'comma-dangle': 'off',
    'no-use-before-define': 'off'
  },
}