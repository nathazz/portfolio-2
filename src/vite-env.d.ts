/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** EmailJS credentials used by the contact form. */
  readonly VITE_SERVICE_ID: string;
  readonly VITE_TEMPLATE_ID: string;
  readonly VITE_PUBLIC_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
