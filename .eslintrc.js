// https://eslint.org/docs/user-guide/configuring
// https://eslint.vuejs.org/

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/base',
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-strongly-recommended',
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
  ],
  rules: {
    // 'no-console': import.meta.env.PROD ? ['error', { allow: ['warn', 'error'] }] : 'off',
    // 'no-debugger': import.meta.env.PROD ? 'error' : 'off',
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/block-tag-newline': 'error',
    'vue/custom-event-name-casing': ['error', 'camelCase'],
    // 'vue/html-comment-content-spacing': [import.meta.env.PROD ? 'error' : 'warn', 'always'],
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
    // 'vue/no-unused-properties': [
    //   import.meta.env.PROD ? 'error' : 'warn',
    //   {
    //     groups: ['props', 'setup'],
    //   },
    // ],
    // 'vue/padding-line-between-blocks': [import.meta.env.PROD ? 'error' : 'warn', 'always'],
    'vue/require-name-property': ['error'],
    'vue/v-on-function-call': [
      'error',
      'never',
      {
        ignoreIncludesComment: false,
      },
    ],
    'vue/arrow-spacing': ['error'],
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
}
