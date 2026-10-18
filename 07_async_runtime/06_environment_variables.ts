// Environment variables — process.env + .env
import "dotenv/config"; // يقرأ ملف .env ويحط القيم في process.env

// قراءة متغير بيئة (قيمته string | undefined)
const nodeEnv = process.env.NODE_ENV;
console.log("NODE_ENV:", nodeEnv);

// قيمة مع افتراضي
const port = process.env.PORT ?? "3000";
console.log("PORT:", port);

// التحقق قبل الاستخدام (مهم لأن القيمة ممكن undefined)
function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing env variable: ${name}`);
  }
  return value;
}

try {
  const appName = requireEnv("APP_NAME");
  console.log("APP_NAME:", appName);
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(error.message);
  }
}

// تحويل إلى number
const timeoutMs = Number(process.env.TIMEOUT_MS ?? "1000");
console.log("TIMEOUT_MS:", timeoutMs);

// الخلاصة:
// 1) أنشئ ملف .env في جذر المشروع
// 2) استورد "dotenv/config" في بداية الملف
// 3) اقرأ القيم عبر process.env
