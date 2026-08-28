import antfu from '@antfu/eslint-config'

export default antfu({
  settings: {
    'import/core-modules': ['vue-router/auto-routes'],
  },
  formatters: {
    css: true,
    html: true,
    markdown: 'prettier',
  },
  ignores: ['src-tauri', 'dist', 'node_modules', '.vscode'],
  rules: {
    'vue/block-order': ['error', { order: ['template', 'script', 'style'] }],
    'pnpm/yaml-enforce-settings': ['off', { settings: { trustPolicy: ['off'] } }],
  },
  globals: {
    definePage: 'readonly',
  },
})
