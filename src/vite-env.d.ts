/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Web3Forms access key: https://web3forms.com (public by design; only sends mail to you). */
  readonly VITE_WEB3FORMS_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
