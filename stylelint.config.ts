import type { Config } from 'stylelint'

export default {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-scss',
    'stylelint-config-recommended-vue/scss',
    'stylelint-config-recess-order',
  ],
  plugins: [
    'stylelint-declaration-block-no-ignored-properties',
    'stylelint-order',
    'stylelint-rem-over-px',
  ],
  overrides: [{ files: ['**/*.vue'], customSyntax: 'postcss-html' }],
  ignoreFiles: ['node_modules', 'dist'],
  rules: {
    'at-rule-empty-line-before': 'never',
    'declaration-empty-line-before': 'never',
    'plugin/declaration-block-no-ignored-properties': true,
    'rule-empty-line-before': 'never',
    'selector-class-pattern': '[a-z]([a-z-]+)?(__([a-z]+-?)+)?(--([a-z]+-?)+){0,2}',
  },
} satisfies Config
