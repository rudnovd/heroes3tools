// https://eslint.org/docs/user-guide/configuring
// https://eslint.vuejs.org/

module.exports = {
  root: true,
  env: {
    node: true,
    'vue/setup-compiler-macros': true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    extraFileExtensions: ['.vue'],
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'plugin:vue/base',
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-strongly-recommended',
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    rules: {
      'vue/block-tag-newline': [
        'error',
        {
          singleline: 'always',
          multiline: 'always',
        },
      ],
      'vue/custom-event-name-casing': ['error', 'kebab-case'],
      'vue/html-comment-content-spacing': [process.env.NODE_ENV === 'production' ? 'error' : 'warn', 'always'],
      'vue/no-reserved-component-names': [
        'error',
        {
          disallowVueBuiltInComponents: true,
          disallowVue3BuiltInComponents: true,
        },
      ],
      'vue/padding-line-between-blocks': [process.env.NODE_ENV === 'production' ? 'error' : 'warn', 'always'],
      'vue/v-on-function-call': [
        'error',
        'never',
        {
          ignoreIncludesComment: false,
        },
      ],
      'vue/arrow-spacing': ['error'],
    },
  },
  overrides: [
    {
      files: ['*.d.ts'],
      rules: {
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'no-unused-vars': 'off',
      },
    },
  ],
  ignorePatterns: ['/node_modules/**', '/dist/**', '/public/**'],
}
