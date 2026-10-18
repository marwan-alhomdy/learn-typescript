// Declaration file (.d.ts) — أنواع فقط، بدون تنفيذ

declare global {
  var APP_VERSION: string;

  var CONFIG: {
    apiUrl: string;
    debug: boolean;
  };
}

export {};
