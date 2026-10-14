interface ViteTypeOptions {
  strictImportMetaEnv: unknown
}
interface ImportMetaEnv {
  VITE_IS_TAURI?: 'true' | 'false'
  VITE_APP_VERSION?: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
