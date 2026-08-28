/// <reference types="vite/client" />

interface ViteTypeOptions {
  strictImportMetaEnv: unknown
}
interface ImportMetaEnv {
  IS_TAURI_BUILD: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
