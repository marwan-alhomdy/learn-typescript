/**
 * Ambient types و Declaration files
 *
 * .d.ts = ملف أنواع فقط (ما فيه كود يشتغل)
 * declare = تخبر TypeScript بشكل شيء موجود وقت التشغيل من برا
 *
 * الملفات:
 * - global.d.ts     → متغيرات عامة (CONFIG, APP_VERSION)
 * - legacy-lib.d.ts → وصف مكتبة بدون @types
 * - runtime.ts      → القيم الحقيقية وقت التشغيل
 * - main.ts         → الاستخدام
 */

import "./runtime.js";

// TypeScript يعرف الأنواع من global.d.ts — بدون import
console.log("API:", CONFIG.apiUrl);
console.log("Debug:", CONFIG.debug);
console.log("Version:", APP_VERSION);

// مثال: لو عندك مكتبة قديمة
// import { log } from "legacy-logger";
// الأنواع تجي من legacy-lib.d.ts
