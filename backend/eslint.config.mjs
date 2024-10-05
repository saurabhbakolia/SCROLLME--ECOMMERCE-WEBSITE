import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  { files: ['**/*.js'] },
  {
    languageOptions: {
      sourceType: 'commonjs', // CommonJS for Node.js
      ecmaVersion: 2021, // ECMAScript version (2021 to support modern JS features)
      globals: {
        ...globals.browser, // for browser globals
        ...globals.node, // for Node.js globals
      },
    },
  },
  pluginJs.configs.recommended,
  {
    rules: {
      'no-unused-vars': 'error',
      'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
      'no-unused-expressions': 'error',
      'arrow-body-style': ['error', 'always'],
      curly: ['error', 'multi', 'consistent'],
    },
  },
];
