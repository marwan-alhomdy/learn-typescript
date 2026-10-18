# الوحدة 06: الوحدات (Modules) والأدوات (Tooling)

ملاحظات تعلّم مفصّلة لكل مجلد فرعي في `06_modules_tooling`. المشروع يستخدم **ESM** (`"type": "module"` في `package.json`) و**NodeNext** في `tsconfig.json`، لذلك الاستيراد من ملفات `.ts` يكتب بامتداد **`.js`** في المسار.

---

## 01_named_default_exports

### عنوان الوحدة
**Named exports و Default export** — تصدير واستيراد القيم والأنواع من ملف إلى آخر.

### ماذا تتعلّم؟
- الفرق بين **named export** (عدة تصديرات بأسماء ثابتة) و **default export** (تصدير افتراضي واحد لكل ملف).
- كيف تستورد الافتراضي بدون أقواس `{ }` والمسماة داخل أقواس.
- استخدام `import type` لاستيراد **نوع** فقط (`User`) دون إدخاله في JavaScript الناتج.

### دور كل ملف
| ملف | الدور |
|-----|--------|
| `exports.ts` | يُعرّف ويُصدّر `PI`، `add`، `User`، ودالة `greet` كـ default. |
| `main.ts` | نقطة الدخول: يستورد من `exports.js` ويطبع النتائج. |

### مفاهيم أساسية (من الكود)

**Named exports — أكثر من تصدير بأسماء:**

```ts
export const PI = 3.14;

export function add(a: number, b: number): number {
  return a + b;
}

export type User = {
  id: number;
  name: string;
};
```

**Default export — واحد لكل ملف:**

```ts
export default function greet(name: string): string {
  return `Hello, ${name}`;
}
```

**الاستيراد في `main.ts`:**

```ts
import greet, { PI, add } from "./exports.js";
import type { User } from "./exports.js";
```

- `greet` ← الافتراضي (بدون `{ }`).
- `{ PI, add }` ← named exports.
- `import type { User }` ← نوع فقط؛ مناسب مع `verbatimModuleSyntax: true`.

### الخلاصة (Takeaways)
- ملف واحد يمكن أن يجمع **named** و **default** معاً.
- الافتراضي تسمّيه كما تشاء عند الاستيراد: `import greet from "..."`.
- الأنواع تُستورد بـ `import type` لتفصل بين «ما يُشغَّل» و«ما يُفحَص».

### التشغيل

```bash
npx tsx 06_modules_tooling/01_named_default_exports/main.ts
```

---

## 02_import_export_type

### عنوان الوحدة
**`export type` و `import type`** — تصدير واستيراد الأنواع فقط.

### ماذا تتعلّم؟
- أن `type` يُحذف عند الترجمة إلى JavaScript؛ لا يوجد «قيمة» للنوع وقت التشغيل.
- الفرق بين استيراد **قيم** (`storeName`, `createProduct`) واستيراد **أنواع** (`Product`, `Id`).
- مع `verbatimModuleSyntax`: الأنواع عبر `import type`، والقيم عبر `import { ... }` العادي.

### دور كل ملف
| ملف | الدور |
|-----|--------|
| `models.ts` | أنواع `Product` و `Id`، بالإضافة إلى قيم قابلة للتصدير (`storeName`, `createProduct`). |
| `main.ts` | يستخدم الأنواع للتعليقات ويستدعي الدوال والثوابت. |

### مفاهيم أساسية (من الكود)

**تصدير أنواع وقيم من نفس الوحدة:**

```ts
export type Product = {
  id: number;
  title: string;
  price: number;
};

export type Id = string | number;

export const storeName = "TypeScript Shop";

export function createProduct(title: string, price: number): Product {
  return { id: 1, title, price };
}
```

**فصل الاستيراد في `main.ts`:**

```ts
import type { Product, Id } from "./models.js";
import { storeName, createProduct } from "./models.js";
```

### الخلاصة (Takeaways)
- `export type` / `import type` يوضحان نية الكود للمترجم والمراجع.
- لا تخلط استيراد نوع كقيمة — مع الإعدادات الصارمة في المشروع سيظهر خطأ.
- الدوال والثوابت تبقى استيراداً عادياً لأنها موجودة في JS بعد `tsc`.

### التشغيل

```bash
npx tsx 06_modules_tooling/02_import_export_type/main.ts
```

---

## 03_module_organization

### عنوان الوحدة
**تنظيم الوحدات** — فصل الأنواع، المجالات، و**Barrel file** (`index.ts`).

### ماذا تتعلّم؟
- تقسيم المشروع: `types.ts` للأنواع المشتركة، ملفات مجال (`users`, `products`) للمنطق.
- **Barrel**: `index.ts` يعيد تصدير كل ما يحتاجه المستهلك من مكان واحد.
- `main.ts` يستورد من `./index.js` بدلاً من مسارات متعددة.

### دور كل ملف
| ملف | الدور |
|-----|--------|
| `types.ts` | `User` و `Product` — مصدر واحد للحقيقة للأنواع. |
| `users.ts` | `createUser`, `formatUser` مع `import type { User }`. |
| `products.ts` | `createProduct`, `formatProduct` مع `import type { Product }`. |
| `index.ts` | Barrel: `export type` و `export` من الملفات الفرعية. |
| `main.ts` | يجمّع الاستخدام ويطبع النتائج. |

### مفاهيم أساسية (من الكود)

**Barrel — واجهة عامة:**

```ts
export type { User, Product } from "./types.js";
export { createUser, formatUser } from "./users.js";
export { createProduct, formatProduct } from "./products.js";
```

**استيراد نظيف من نقطة الدخول:**

```ts
import {
  createUser,
  formatUser,
  createProduct,
  formatProduct,
} from "./index.js";
```

**فصل نوع عن منطق في `users.ts`:**

```ts
import type { User } from "./types.js";

export function createUser(name: string): User {
  return { id: Date.now(), name };
}
```

### الخلاصة (Takeaways)
- **types.ts** يقلّل التكرار ويمنع تعارض التعريفات.
- **index.ts** لا يلزم أن يحتوي منطقاً — فقط إعادة تصدير.
- الهيكل يسهّل النمو: تضيف ملف مجال جديد وتُحدّث الـ barrel.

### التشغيل

```bash
npx tsx 06_modules_tooling/03_module_organization/main.ts
```

---

## 04_tsconfig_strict

### عنوان الوحدة
**خيارات `tsconfig` الصارمة** — `strict` وقواعد إضافية في هذا المشروع.

### ماذا تتعلّم؟
- ماذا يعني `"strict": true` (مجموعة فحوصات معاً).
- `noImplicitAny` — لا معاملات بدون نوع ضمني `any`.
- `strictNullChecks` — التعامل مع `null`/`undefined` صراحة.
- `noUncheckedIndexedAccess` — `arr[i]` من نوع `T | undefined`.
- `exactOptionalPropertyTypes` — الخاصية الاختيارية `email?` ليست نفس «تعيين `undefined`».
- مرجع نصي في `strict_options.ts` لـ `verbatimModuleSyntax` و `module: nodenext`.

### دور كل ملف
| ملف | الدور |
|-----|--------|
| `strict_options.ts` | توثيق (تعليقات) لأهم خيارات `tsconfig.json` في المشروع؛ `export {}` يجعله وحدة. |
| `main.ts` | أمثلة **صحيحة**؛ الأخطاء المحتملة موضّحة في تعليقات. |

### مفاهيم أساسية (من الكود)

**`strictNullChecks` — فحص قبل الاستخدام:**

```ts
function printLength(text: string | null) {
  if (text !== null) {
    console.log(text.length);
  }
}
```

**`noUncheckedIndexedAccess`:**

```ts
const nums = [10, 20, 30];
const first = nums[0]; // number | undefined
console.log(first?.toFixed(2));
```

**`exactOptionalPropertyTypes`:**

```ts
type User = {
  name: string;
  email?: string;
};

const user: User = { name: "Marwan" }; // OK
// { name: "Marwan", email: undefined } // Error مع exactOptionalPropertyTypes
```

من `strict_options.ts` — ملخّص الإعدادات:

```ts
/**
 * "strict": true
 * "noUncheckedIndexedAccess": true
 * "exactOptionalPropertyTypes": true
 * "verbatimModuleSyntax": true
 * "module": "nodenext"
 */
```

### الخلاصة (Takeaways)
- الصرامة تكتشف أخطاء مبكراً؛ التعليقات في `main.ts` تعلّمك «لماذا» يُرفض سطر معيّن.
- فهرسة المصفوفات والكائنات تحتاج optional chaining أو فحص `undefined`.
- `nodenext` + `.js` في الاستيراد = سلوك Node الحديث.

### التشغيل

```bash
npx tsx 06_modules_tooling/04_tsconfig_strict/main.ts
```

---

## 05_tsc_tsx_nodejs

### عنوان الوحدة
**`tsc` و `tsx` و Node.js** — ثلاث طرق للتعامل مع TypeScript.

### ماذا تتعلّم؟
- **`tsx`**: تشغيل `.ts` مباشرة (مناسب للتعلّم والتجربة).
- **`tsc`**: ترجمة المشروع إلى `.js` حسب `tsconfig.json`.
- **`node`**: تشغيل JavaScript فقط بعد البناء.
- الفرق بين «تشغيل سريع» و«بناء للإنتاج».

### دور كل ملف
| ملف | الدور |
|-----|--------|
| `app.ts` | وحدة بسيطة: `export function sum`. |
| `main.ts` | يستورد `sum` ويطبع؛ يحتوي شرحاً في تعليقات لأوامر التشغيل. |

### مفاهيم أساسية (من الكود)

**استيراد وحدة محلية:**

```ts
import { sum } from "./app.js";

console.log(`2 + 3 = ${sum(2, 3)}`);
```

**من تعليقات `main.ts` — أوامر مرجعية:**

```text
npx tsx 06_modules_tooling/05_tsc_tsx_nodejs/main.ts
npx tsc
node 06_modules_tooling/05_tsc_tsx_nodejs/main.js   # بعد tsc
```

### الخلاصة (Takeaways)
- Node **لا** ينفّذ TypeScript خاماً؛ إما `tsx` أو `tsc` ثم `node`.
- `tsc` يفيد عندما تريد `declaration`، `sourceMap`، أو نشر مجلد `dist`.
- نفس نمط الاستيراد `./app.js` يعمل مع `tsx` ومع المخرجات بعد `tsc`.

### التشغيل (الطريقة الموصى بها للتعلّم)

```bash
npx tsx 06_modules_tooling/05_tsc_tsx_nodejs/main.ts
```

**اختياري — مسار البناء:**

```bash
npx tsc
node 06_modules_tooling/05_tsc_tsx_nodejs/main.js
```

(مسار `main.js` يعتمد على `outDir`/`rootDir` إن فعّلتهما؛ بدون `outDir` قد يظهر `.js` بجانب `.ts`.)

---

## 06_esm_commonjs

### عنوان الوحدة
**ESM مقابل CommonJS** — نظامي الوحدات في Node.

### ماذا تتعلّم؟
- **ESM**: `import` / `export`، مشروعك `"type": "module"`.
- **CommonJS**: `require` / `module.exports`؛ في TypeScript غالباً ملفات **`.cts`** و `export =`.
- مع `verbatimModuleSyntax`: استيراد CJS قد يستخدم `import x = require(...)`.
- `main.ts` رسالة توجيهية؛ التجربة الفعلية من `esm_main.ts` أو `cjs_main.cts`.

### دور كل ملف
| ملف | الدور |
|-----|--------|
| `esm_math.ts` | دوال وثوابت بصيغة ESM (`export function`, `export const`). |
| `esm_main.ts` | نقطة دخول ESM؛ يستورد من `./esm_math.js`. |
| `cjs_math.cts` | منطق CJS؛ `export = { multiply, label }`. |
| `cjs_main.cts` | نقطة دخول CJS؛ `import math = require("./cjs_math.cjs")`. |
| `main.ts` | شرح مقارن؛ يذكّر بتشغيل ESM أو CJS منفصلين. |

> ملاحظة: `.cts` ليست `.ts` لكنها جزء من درس هذه الوحدة؛ TypeScript يترجمها إلى `.cjs`.

### مفاهيم أساسية (من الكود)

**ESM:**

```ts
export function multiply(a: number, b: number): number {
  return a * b;
}

export const label = "ESM";
```

```ts
import { multiply, label } from "./esm_math.js";
```

**CommonJS في TypeScript:**

```ts
function multiply(a: number, b: number): number {
  return a * b;
}

const label = "CommonJS";

export = { multiply, label };
```

```ts
import math = require("./cjs_math.cjs");
console.log(`[${math.label}] 4 * 5 =`, math.multiply(4, 5));
```

### الخلاصة (Takeaways)
- **ESM** هو الافتراض في مشاريع Node الحديثة والموصى به للكود الجديد.
- **CommonJS** ما زال موجوداً في مكتبات قديمة؛ `.cts` / `.cjs` توضّح النية للمترجم.
- امتداد الاستيراد مهم: `.js` لـ ESM المحلي، `.cjs` لملف CJS المترجم.

### التشغيل

**ESM:**

```bash
npx tsx 06_modules_tooling/06_esm_commonjs/esm_main.ts
```

**CommonJS:**

```bash
npx tsx 06_modules_tooling/06_esm_commonjs/cjs_main.cts
```

**ملف الشرح فقط:**

```bash
npx tsx 06_modules_tooling/06_esm_commonjs/main.ts
```

---

## 07_ambient_declarations

### عنوان الوحدة
**Ambient types وملفات الإعلان (`.d.ts`)** — أنواع لأشياء موجودة خارج TypeScript.

### ماذا تتعلّم؟
- **`.d.ts`**: أنواع فقط، بدون تنفيذ.
- **`declare global`**: متغيرات على `globalThis` يعرفها TypeScript بدون `import`.
- **`declare module "..."`**: وصف مكتبة JS بدون `@types` جاهزة.
- **`runtime.ts`**: يضع القيم الحقيقية على `globalThis`؛ **`main.ts`** يستوردها أولاً.

### دور كل ملف
| ملف | الدور |
|-----|--------|
| `global.d.ts` | `declare global` لـ `CONFIG` و `APP_VERSION`؛ `export {}` لجعل الملف module-scoped. |
| `legacy-lib.d.ts` | `declare module "legacy-logger"` كمثال لمكتبة وهمية. |
| `runtime.ts` | يعيّن `globalThis.CONFIG` و `globalThis.APP_VERSION` وقت التشغيل. |
| `main.ts` | `import "./runtime.js"` ثم استخدام `CONFIG` و `APP_VERSION` بدون استيراد أنواع. |

### مفاهيم أساسية (من الكود)

**إعلان عام في `global.d.ts`:**

```ts
declare global {
  var APP_VERSION: string;

  var CONFIG: {
    apiUrl: string;
    debug: boolean;
  };
}

export {};
```

**تنفيذ وقت التشغيل:**

```ts
globalThis.CONFIG = {
  apiUrl: "https://api.example.com",
  debug: true,
};

globalThis.APP_VERSION = "1.0.0";
```

**الاستخدام في `main.ts`:**

```ts
import "./runtime.js";

console.log("API:", CONFIG.apiUrl);
console.log("Debug:", CONFIG.debug);
console.log("Version:", APP_VERSION);
```

**وصف مكتبة (لا تُستدعى في هذا المثال إلا للتعلّم):**

```ts
declare module "legacy-logger" {
  export function log(message: string): void;
  export function error(message: string): void;
}
```

### الخلاصة (Takeaways)
- **Declaration files** تربط عالم JavaScript بفحص TypeScript.
- بدون `runtime.ts` (أو سكربت خارجي)، المتغيرات العامة **غير معرّفة** عند التشغيل رغم أن الأنواع «صحيحة».
- `export {}` في `.d.ts` يمنع أن يصبح الملف «script global» ويُفعّل `declare global` بشكل صحيح.

### التشغيل

```bash
npx tsx 06_modules_tooling/07_ambient_declarations/main.ts
```

---

## ملخص الوحدة كاملة

| المجلد | الفكرة المركزية |
|--------|------------------|
| `01_named_default_exports` | named + default + `import type` |
| `02_import_export_type` | فصل الأنواع عن القيم في الاستيراد/التصدير |
| `03_module_organization` | types + domains + barrel (`index.ts`) |
| `04_tsconfig_strict` | `strict` والخيارات الإضافية في المشروع |
| `05_tsc_tsx_nodejs` | tsx للتجربة، tsc للبناء، node للـ JS |
| `06_esm_commonjs` | ESM (`.ts` + `.js`) vs CJS (`.cts` + `.cjs`) |
| `07_ambient_declarations` | `.d.ts`، `declare global`، `declare module` |

**قاعدة مشتركة:** من جذر المشروع `learn-typescript`، شغّل أي `main.ts` (أو نقطة الدخول المذكورة) بـ:

```bash
npx tsx 06_modules_tooling/<المجلد>/main.ts
```

استبدل `<المجلد>` واسم الملف عند الحاجة (`esm_main.ts`, `cjs_main.cts`).
