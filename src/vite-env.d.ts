/// <reference types="vite/client" />

interface ViteTypeOptions {
  strictImportMetaEnv: unknown
}
interface ImportMetaEnv {
  VITE_IS_TAURI?: string
  VITE_APP_VERSION?: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
