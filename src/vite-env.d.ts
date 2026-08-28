/// <reference types="vite/client" />

interface ViteTypeOptions {
  strictImportMetaEnv: unknown
}
interface ImportMetaEnv {
  VITE_IS_TAURI?: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
