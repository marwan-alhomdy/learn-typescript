/**
 * tsc و tsx و Node.js — كيف تشغّل TypeScript؟
 *
 * 1) tsx — يشغّل الملف مباشرة بدون خطوة build
 *    npx tsx 06_modules_tooling/05_tsc_tsx_nodejs/main.ts
 *
 * 2) tsc — يترجم TypeScript → JavaScript
 *    npx tsc
 *    (يقرأ tsconfig.json وينتج ملفات .js)
 *
 * 3) node — يشغّل JavaScript الناتج بعد الترجمة
 *    node 06_modules_tooling/05_tsc_tsx_nodejs/main.js
 *
 * الفرق باختصار:
 * - tsx  → سريع للتعلّم والتجربة
 * - tsc  → للبناء والإنتاج (يطلع JS)
 * - node → يشغّل JS فقط، مو TS مباشرة
 */

import { sum } from "./app.js";

console.log(`2 + 3 = ${sum(2, 3)}`);
console.log(`10 + 5 = ${sum(10, 5)}`);
