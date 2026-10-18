# 07 — التشغيل غير المتزامن وبيئة Node

هذا المجلد يربط TypeScript بالعالم الحقيقي: **Promises** و **async/await**، التعامل مع الأخطاء بأمان، قراءة JSON من مصادر خارجية، الملفات في Node.js، متغيرات البيئة، و **optional chaining**. الدروس قابلة للتشغيل مباشرة بـ `tsx` وتبني على ما تعلمته في الوحدات السابقة.

> **تشغيل أي درس:** من جذر المشروع:
> ```bash
> npx tsx 07_async_runtime/01_promise_async_await.ts
> ```
> (غيّر اسم الملف حسب الدرس.)

---

## 01_promise_async_await — Promise و async/await

### ماذا تتعلم؟

- **Promise**: كائن يمثل عملية **غير متزامنة** — إما تنجح (`resolve`) أو تفشل (`reject`) لاحقاً.
- **async**: الدالة التي تُعلَّن `async` **ترجع دائماً** `Promise` حتى لو كتبت `return 5`.
- **await**: داخل دالة `async` فقط — «توقف» منطقياً حتى ينتهي الـ Promise وتحصل على القيمة.
- مقارنة بين أسلوب **`.then()`** (سلسلة callbacks) و **`await`** (كود يقرأ كأنه متزامن).

### أفكار من الكود

```ts
function fetchUser(id: number): Promise<{ id: number; name: string }> {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id, name: "Marwan" }), 500);
  });
}

async function main() {
  const user = await fetchUser(2);
  console.log("await:", user);
}
```

المثال يحاكي طلب شبكة بـ `setTimeout` — المهم أن نوع الإرجاع `Promise<...>` واضح لـ TypeScript.

### نقاط مهمة / أخطاء شائعة

- **`await` خارج `async`**: خطأ في TypeScript (إلا في بعض إعدادات الموديولات العليا).
- **نسيان `await`**: تحصل على `Promise` بدل القيمة — `console.log` يطبع `[object Promise]`.
- **عدم معالجة رفض Promise**: إذا استخدمت `.then()` بدون `.catch()` أو `try/catch` مع `await`، قد تحصل على **unhandled rejection**.
- **`async` لا يجعل الكود «متزامن» فعلياً**: يعيد ترتيب القراءة فقط؛ العمل ما زال غير متزامن تحت الغطاء.

### التشغيل

```bash
npx tsx 07_async_runtime/01_promise_async_await.ts
```

---

## 02_promise_all_settled — Promise.all و Promise.allSettled

### ماذا تتعلم؟

- **`Promise.all([...])`**: ينتظر **كل** الـ Promises؛ إذا **واحد** رُفض → يرفض الكل فوراً (fail-fast).
- **`Promise.allSettled([...])`**: ينتظر **الكل** دائماً؛ كل عنصر إما `{ status: "fulfilled", value }` أو `{ status: "rejected", reason }`.
- متى تختار أيهما: مهام **كلها ضرورية** vs مهام **مستقلة** وتريد نتيجة كل واحدة.

### أفكار من الكود

```ts
const results = await Promise.allSettled([
  delay(100, "A"),
  delay(150, "B", true), // يفشل
  delay(200, "C"),
]);

for (const result of results) {
  if (result.status === "fulfilled") console.log("ok:", result.value);
  else console.log("error:", result.reason);
}
```

في `withAll()` السطر الذي يفشل معلّق — لو فعّلته، `Promise.all` يلتقط الخطأ في `catch`.

### نقاط مهمة / أخطاء شائعة

- **`Promise.all` مع مهام طويلة وفشل مبكر**: الباقي قد يكمل في الخلفية لكن النتيجة الإجمالية «فشل» — لا تعتمد على إلغاء تلقائي.
- **خلط `all` و `allSettled`**: `allSettled` **لا يرمي** — لا تحتاج `try/catch` للفشل الجزئي، بل تفحص `status`.
- **ترتيب النتائج**: في `all` و `allSettled` ترتيب المصفوفة الناتجة **يطابق** ترتيب المدخلات (وليس وقت الانتهاء).

### التشغيل

```bash
npx tsx 07_async_runtime/02_promise_all_settled.ts
```

---

## 03_try_catch_unknown — try/catch وأخطاء من نوع unknown

### ماذا تتعلم؟

- **`try/catch`** مع **`async/await`**: الأخطاء المرمية داخل دالة async تُلتقط في `catch` عند `await`.
- **`catch (error: unknown)`** مع `strict`: أفضل من `any` — TypeScript يجبرك **التحقق** قبل استخدام الخطأ.
- **`instanceof Error`**, **`typeof error === "string"`**: طرق ضيّقة للتعامل مع أنواع مختلفة مما يُرمى في JavaScript.

### أفكار من الكود

```ts
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log("Error message:", error.message);
  } else {
    console.log("Unknown error:", error);
  }
}
```

مثال ثانٍ: `throw "something went wrong"` — ليس `Error`، لذا نفحص `typeof error === "string"`.

### نقاط مهمة / أخطاء شائعة

- **`catch (error: any)`**: يعطّل الحماية — تصل لـ `error.message` على string أو object وتفشل وقت التشغيل.
- **افتراض أن كل throw هو `Error`**: في JS يمكن رمي أي قيمة.
- **`try/catch` حول Promise بدون `await`**: الخطأ قد لا يُلتقط — إما `await` أو `.catch()` على الـ Promise.

### التشغيل

```bash
npx tsx 07_async_runtime/03_try_catch_unknown.ts
```

---

## 04_json_runtime_validation — JSON.parse والتحقق وقت التشغيل

### ماذا تتعلم؟

- **`JSON.parse`**: يرجع بيانات خام؛ TypeScript **لا يضمن** شكل الكائن بعد التحليل.
- **Type assertion (`as User`)**: يخبر المترجم فقط — **لا يفحص** JSON فعلياً (خطر إذا المصدر غير موثوق).
- **Type guard** (`isUser`): فحص حقيقي وقت التشغيل → بعد النجاح TypeScript يضيّق النوع إلى `User`.
- ربط مع الدرس السابق: أخطاء التحقق تُرمى وتُلتقط بـ `instanceof Error`.

### أفكار من الكود

```ts
function isUser(value: unknown): value is User {
  if (typeof value !== "object" || value === null) return false;
  const obj = value as Record<string, unknown>;
  return typeof obj.id === "number" && typeof obj.name === "string";
}

function parseUser(json: string): User {
  const data: unknown = JSON.parse(json);
  if (!isUser(data)) throw new Error("Invalid user JSON");
  return data;
}
```

### نقاط مهمة / أخطاء شائعة

- **الثقة في API أو ملف بدون validate**: `id` كنص `"oops"` يمرّ كـ `User` مع `as User` فقط.
- **نسيان `null`**: `typeof null === "object"` — لازم تستبعد `null` صراحة.
- **الحلول الإنتاجية**: غالباً مكتبات مثل **Zod** أو **Valibot** بدل guards يدوية طويلة — نفس المبدأ: **runtime validation**.

### التشغيل

```bash
npx tsx 07_async_runtime/04_json_runtime_validation.ts
```

---

## 05_filesystem_nodejs — نظام الملفات وأنواع Node.js

### ماذا تتعلم؟

- **`node:fs/promises`**: `readFile`, `writeFile`, `mkdir` بـ Promises (تناسب `async/await`).
- **`node:path`** و **`import.meta.url`**: بناء مسارات آمنة بجانب ملف الدرس (`__dirname` في ESM).
- **`mkdir(..., { recursive: true })`**: ينشئ المجلد إن لم يكن موجوداً.
- حاجة **`@types/node`** و `"types": ["node"]` في `tsconfig` لمعرفة أنواع Node.

### أفكار من الكود

```ts
const __dirname = fileURLToPath(new URL(".", import.meta.url));
const dataDir = join(__dirname, "data");
await mkdir(dataDir, { recursive: true });
await writeFile(filePath, "Hello from TypeScript + Node.js", "utf8");
const content = await readFile(filePath, "utf8");
```

### نقاط مهمة / أخطاء شائعة

- **مجلد `data/`**: المشروع يضيف **`07_async_runtime/data/`** في `.gitignore` — الملفات التي ينشئها الدرس **لا تُرفع لـ git** (طبيعي للبيانات المحلية).
- **مسارات نسبية خاطئة**: التشغيل من مجلد آخر قد يكتب في مكان غير متوقع — استخدم `import.meta.url` كما في الدرس.
- **نسيان ترميز `utf8`**: قد تحصل على Buffer أو نص مشوّه.

### التشغيل

```bash
npx tsx 07_async_runtime/05_filesystem_nodejs.ts
```

بعد التشغيل تحقق من وجود `07_async_runtime/data/hello.txt` محلياً (قد لا تراه في git).

---

## 06_environment_variables — متغيرات البيئة و dotenv

### ماذا تتعلم؟

- **`process.env`**: قيم من نوع `string | undefined` — لا تفترض وجود متغير.
- **`import "dotenv/config"`**: يحمّل ملف **`.env`** من جذر المشروع (أو حسب إعداد dotenv) إلى `process.env`.
- **`??`**: قيمة افتراضية عند `null`/`undefined` فقط (مثلاً `PORT`).
- **`requireEnv`**: نمط صارم — يرمي خطأ إذا المتغير ناقص (مهم للأسرار واسم التطبيق).
- **`Number(process.env.TIMEOUT_MS ?? "1000")`**: تحويل صريح — env دائماً نص.

### أفكار من الكود

```ts
import "dotenv/config";

const port = process.env.PORT ?? "3000";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env variable: ${name}`);
  return value;
}
```

### إعداد `.env` (موصى به قبل التشغيل)

في **جذر المشروع** أنشئ `.env` (عادة **غير** مُتتبَّع في git):

```env
NODE_ENV=development
PORT=3000
APP_NAME=LearnTypeScript
TIMEOUT_MS=1000
```

بدون `APP_NAME`، الدرس يطبع رسالة `Missing env variable: APP_NAME` — هذا متوقع ويوضح `requireEnv`.

### نقاط مهمة / أخطاء شائعة

- **نسيان `import "dotenv/config"`**: `process.env` من `.env` لن يُحمَّل عند التشغيل بـ `tsx`.
- **رفع `.env` إلى git**: خطر أمني — احتفظ بالأسرار في `.env` محلي أو secrets في CI.
- **استخدام `||` بدل `??` للمنفذ**: قد تعامل `"0"` أو `""` بشكل غير مرغوب؛ `??` أدق للقيم الناقصة.
- **`Number("abc")`**: يعطي `NaN` — تحقق بـ `Number.isNaN` في التطبيقات الحقيقية.

### التشغيل

```bash
npx tsx 07_async_runtime/06_environment_variables.ts
```

---

## 07_null_undefined_optional_chaining — null و undefined و optional chaining

### ماذا تتعلم؟

- **`undefined`**: لم تُعيَّن قيمة (اختياري، غير موجود).
- **`null`**: «فارغ» **مقصود** (مثلاً لا اختيار حالياً).
- **`?.` (optional chaining)**: إذا كان الجزء الأيسر `null`/`undefined`، التعبير يرجع `undefined` **بدون** crash.
- **`??` (nullish coalescing)**: افتراضي فقط عند `null`/`undefined` — يختلف عن `||` الذي يعامل `0` و `""` كـ falsy.

### أفكار من الكود

```ts
console.log(guest.address?.city); // undefined — لا error

const city = guest.address?.city ?? "Unknown";

console.log(count || 10);  // 10 — لأن 0 falsy
console.log(count ?? 10);  // 0
```

### نقاط مهمة / أخطاء شائعة

- **`user.address.city` بدون `?.`**: إذا `address` غير معرّف → runtime error.
- **استخدام `||` لقيمة افتراضية لـ `0` أو `""`**: استخدم `??` عندما تريد الاحتفاظ بهذه القيم.
- **خلط `?.` مع non-null assertion (`!`)**: `!` يلغي الحماية — استخدمه فقط عندما **متأكد** من وجود القيمة.

### التشغيل

```bash
npx tsx 07_async_runtime/07_null_undefined_optional_chaining.ts
```

---

## خريطة سريعة للمجلد

| الدرس | الموضوع |
|--------|---------|
| 01 | Promise، async، await |
| 02 | all vs allSettled |
| 03 | try/catch و unknown |
| 04 | JSON + type guards |
| 05 | fs/promises و data/ |
| 06 | .env و process.env |
| 07 | ?. و ?? |

**الخطوة التالية:** مجلد `08_testing_design` — اختبار الوحدات كفكرة، وتصميم قابل للاختبار (DI، SOLID، Repository/Service).
