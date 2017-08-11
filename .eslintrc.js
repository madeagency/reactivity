var path = require('path');

module.exports = {
  'extends': 'eslint-config-airbnb',
  'env': {
    'browser': true,
    'node': true
  },
  'rules': {
    'global-require':'off',
    'comma-dangle': 'off', // not sure why airbnb turned this on.
    'no-console': 'off',
    'no-underscore-dangle': 'off',
    'react/no-danger': 'off',
    'no-bitwise':'off',
    'semi': [
      2,
      'never'
    ],
    'react/jsx-filename-extension': [
      2,
      {
        'extensions': [
          '.jsx',
          '.js'
        ]
      }
    ]
  },
  'parser': 'babel-eslint',
  'plugins': [
    'react',
    'import'
  ],
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': path.join(__dirname, 'webpack', 'client.prod.js')
      },
      'node': {
        'paths': [
          'node_modules',
          'src',
          'components',
          'reducers'
        ]
      }
    }
  }
};
