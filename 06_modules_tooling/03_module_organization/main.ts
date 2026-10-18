// نقطة الدخول — تستورد من الـ barrel بدل ملفات متعددة
import {
  createUser,
  formatUser,
  createProduct,
  formatProduct,
} from "./index.js";

const user = createUser("Marwan");
const product = createProduct("Laptop", 1200);

console.log(formatUser(user));
console.log(formatProduct(product));

// التنظيم:
// types.ts     → الأنواع المشتركة
// users.ts     → منطق المستخدمين
// products.ts  → منطق المنتجات
// index.ts     → واجهة عامة (barrel)
// main.ts      → تشغيل التطبيق
