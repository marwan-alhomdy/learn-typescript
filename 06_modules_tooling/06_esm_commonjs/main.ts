/**
 * ESM vs CommonJS
 *
 * ESM (هذا المشروع):
 *   - package.json → "type": "module"
 *   - import / export
 *   - امتداد الاستيراد .js حتى لو الملف .ts
 *   التشغيل: npx tsx 06_modules_tooling/06_esm_commonjs/esm_main.ts
 *
 * CommonJS (النمط القديم):
 *   - require / module.exports
 *   - في TypeScript: ملفات .cts
 *   - export = و import x = require(...)
 *   التشغيل: npx tsx 06_modules_tooling/06_esm_commonjs/cjs_main.cts
 *
 * الخلاصة:
 *   ESM = الحديث والموصى به
 *   CommonJS = شائع في مكتبات Node القديمة
 */

console.log("شغّل esm_main.ts أو cjs_main.cts كل واحد لوحده");
