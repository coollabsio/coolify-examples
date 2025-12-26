/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BUILD_PUBLIC_VAR: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
