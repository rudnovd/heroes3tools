import globals from 'globals'
import parser from 'vue-eslint-parser'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  {
    ignores: ['node_modules/**/*', 'dist/**/*', 'public/**/*'],
  },
  ...compat.extends(
    'plugin:vue/base',
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-strongly-recommended',
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended',
    'plugin:prettier-vue/recommended',
  ),
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },

      parser: parser,
      ecmaVersion: 2020,
      sourceType: 'module',
    },

    rules: {
      'no-console': 'off',
      'no-debugger': 'off',
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/block-tag-newline': 'error',
      'vue/custom-event-name-casing': ['error', 'camelCase'],
      'vue/html-comment-content-spacing': ['warn', 'always'],

      'vue/match-component-file-name': [
        'error',
        {
          extensions: ['vue'],
          shouldMatchCase: true,
        },
      ],

      'vue/no-reserved-component-names': [
        'error',
        {
          disallowVueBuiltInComponents: true,
          disallowVue3BuiltInComponents: true,
        },
      ],

      'vue/no-unused-properties': [
        'warn',
        {
          groups: ['props', 'setup'],
        },
      ],

      'vue/padding-line-between-blocks': ['warn', 'always'],
      'vue/require-name-property': ['error'],

      'vue/v-on-function-call': [
        'error',
        'never',
        {
          ignoreIncludesComment: false,
        },
      ],

      'vue/arrow-spacing': ['error'],
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-duplicate-enum-values': 'off',
    },
  },
]
