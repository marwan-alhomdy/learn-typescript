// JSON.parse و runtime validation

type User = {
  id: number;
  name: string;
};

// JSON.parse يرجع any تقريباً — TypeScript ما يضمن الشكل وقت التشغيل
const raw = '{"id":1,"name":"Marwan"}';
const parsed = JSON.parse(raw); // نوعه any (أو unknown حسب الإعدادات/الاستخدام)

console.log("parsed:", parsed);

// Type assertion — خطر: تعد TypeScript بدون فحص حقيقي
const unsafeUser = JSON.parse(raw) as User;
console.log("unsafe:", unsafeUser.name);

// Runtime validation — تفحص الشكل بنفسك قبل ما تثق فيه
function isUser(value: unknown): value is User {
  if (typeof value !== "object" || value === null) return false;
  const obj = value as Record<string, unknown>;
  return typeof obj.id === "number" && typeof obj.name === "string";
}

function parseUser(json: string): User {
  const data: unknown = JSON.parse(json);

  if (!isUser(data)) {
    throw new Error("Invalid user JSON");
  }

  return data; // هنا TypeScript يعرف إنه User
}

const user = parseUser('{"id":2,"name":"Ali"}');
console.log("safe:", user);

try {
  parseUser('{"id":"oops","name":"Ali"}'); // id مو number
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log("validation failed:", error.message);
  }
}

// الخلاصة:
// JSON.parse ما يعرف نوعك
// لازم validate وقت التشغيل (type guard / مكتبة مثل zod)
