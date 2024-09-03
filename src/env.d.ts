/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_APP_TITLE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
