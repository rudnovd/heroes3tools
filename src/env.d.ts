interface ImportMetaEnv {
  VITE_APP_TITLE: string
  IS_TAURI_BUILD: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
