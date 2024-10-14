import globals from 'globals'
import react from 'eslint-plugin-react'
import reactRecommended from 'eslint-plugin-react/configs/recommended.js'
import prittier from 'eslint-config-prettier';

export default [
  {
    ignores: ['eslint.config.mjs', '**/*.css']
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    ...reactRecommended,
    settings: {
      react: {
        version: 'detect'
      }
    },
    languageOptions: {
      ...reactRecommended.languageOptions,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.serviceworker,
        ...globals.browser
      }
    },
    plugins: {
      react
    },
    rules: {
      'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
      semi: ['error', 'always'],
      'react/jsx-uses-vars': 'error',
      'semi': ['error', 'always'],
    }
  }
]