# Generics والأنواع المتقدمة

هذا المجلد يأخذك من **الـ Generics** الأساسية إلى **أدوات TypeScript على مستوى الأنواع**: `keyof`، `typeof`، الوصول بالفهرس، الأنواع الشرطية، `infer`، الـ mapped types، الـ utility types، وأنواع القوالب النصية. الهدف أن تكتب دوال وأنواع **مرنة وآمنة** دون تكرار الكود أو فقدان التحقق وقت الترجمة.

---

## 01_generic_functions_interfaces — دوال وواجهات عامة (Generics)

### ماذا تتعلم؟

- **Generic function**: دالة تأخذ «معامل نوع» `T` يُحدَّد عند الاستدعاء (صريحاً أو بالاستنتاج).
- **Generic interface**: واجهة مثل `Box<T>` تعمل مع أي نوع للحقل `value`.
- الفكرة المركزية: **كود واحد، أنواع متعددة، مع الحفاظ على نوع الإرجاع والمعاملات**.

### أفكار من الكود

```ts
function identity<T>(value: T): T {
  return value;
}

const num = identity<number>(42);
const text = identity("hello"); // T = string (مستنتج)
```

```ts
function firstElement<T>(items: T[]): T | undefined {
  return items[0];
}
```

```ts
interface Box<T> {
  value: T;
}
const numberBox: Box<number> = { value: 100 };
```

### نقاط مهمة / أخطاء شائعة

- لا تستخدم `any` بدل `T` إذا أردت أن يبقى النوع **مرتبطاً** بالقيمة (مثلاً `identity` يرجع نفس نوع المدخل).
- `T | undefined` في `firstElement` يعكس أن المصفوفة قد تكون فارغة — لا تفترض دائماً وجود عنصر.
- يمكنك كتابة `identity<number>(42)` أو ترك TypeScript يستنتج من `"hello"`.

### التشغيل

```bash
npx tsx 04_generics_advanced_types/01_generic_functions_interfaces.ts
```

---

## 02_generic_constraints — تقييد الـ Generic بـ extends

### ماذا تتعلم؟

- **`T extends ...`**: `T` يبقى عاماً لكن **يجب** أن يلبي شرطاً (شكل نوع، واجهة، إلخ).
- الفرق بين «`T` حر تماماً» و«`T` حر داخل حدود».

### أفكار من الكود

```ts
function logLength<T extends { length: number }>(value: T): number {
  return value.length;
}
logLength("hello");
logLength([1, 2, 3]);
// logLength(123); // خطأ: number ليس له length
```

```ts
interface HasName {
  name: string;
}
function greet<T extends HasName>(person: T): string {
  return `Hello, ${person.name}`;
}
```

### نقاط مهمة / أخطاء شائعة

- بدون `extends` لا يمكنك الوصول لـ `value.length` لأن TypeScript لا يعرف أن `T` له `length`.
- `greet({ name: "Marwan", age: 20 })` صحيح لأن الكائن **يحتوي** على `name`؛ `greet({ age: 20 })` خطأ.
- لا تبالغ في التقييد: قيّد فقط ما تحتاجه للوصول الآمن للخصائص.

### التشغيل

```bash
npx tsx 04_generics_advanced_types/02_generic_constraints.ts
```

---

## 03_keyof_typeof — مفاتيح النوع ونوع القيمة

### ماذا تتعلم؟

- **`keyof T`**: union من أسماء خصائص `T` كنصوص حرفية (`"id" | "name" | ...`).
- **`typeof value`**: يبني **نوعاً** من شكل قيمة موجودة (غالباً كائن const).
- دالة **`getProperty<T, K extends keyof T>`**: ربط المفتاح بنوع القيمة `T[K]`.

### أفكار من الكود

```ts
type UserKeys = keyof User; // "id" | "name" | "email"

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

```ts
const config = { host: "localhost", port: 3000, debug: true };
type Config = typeof config;
```

### نقاط مهمة / أخطاء شائعة

- **`keyof`**: مفاتيح **النوع** (type).
- **`typeof`**: نوع **القيمة** (value) — مفيد لنسخ شكل كائن config دون تكرار التعريف يدوياً.
- `"age"` ليس من `UserKeys` إذا لم تكن `age` خاصية في `User`.
- `getProperty(user, "name")` يرجع `string` تلقائياً بفضل `T[K]`.

### التشغيل

```bash
npx tsx 04_generics_advanced_types/03_keyof_typeof.ts
```

---

## 04_indexed_access — أنواع الوصول بالفهرس T[K]

### ماذا تتعلم؟

- **`User["id"]`**: استخراج نوع خاصية واحدة.
- **`User["id" | "name"]`**: union لأنواع عدة خصائص.
- دمج **`keyof`** مع **`User[K]`** في دوال مثل `getField` لنوع إرجاع دقيق.

### أفكار من الكود

```ts
type UserId = User["id"];           // number
type UserName = User["name"];       // string
type UserIdOrName = User["id" | "name"]; // number | string
```

```ts
function getField<K extends keyof User>(user: User, key: K): User[K] {
  return user[key];
}
const email = getField(user, "email"); // string
const userId = getField(user, "id");   // number
```

### نقاط مهمة / أخطاء شائعة

- لا تخلط بين **قيمة وقت التشغيل** `user["id"]` و**نوع وقت الترجمة** `User["id"]`.
- عند تغيير تعريف `User`، أنواع `UserId` و`getField` تتحدث تلقائياً — هذا من فوائد indexed access.
- استخدم union في المفتاح عندما تقبل أكثر من اسم حقل.

### التشغيل

```bash
npx tsx 04_generics_advanced_types/04_indexed_access.ts
```

---

## 05_conditional_infer — أنواع شرطية واستنتاج infer

### ماذا تتعلم؟

- **Conditional type**: `T extends U ? X : Y` — مثل if/else على مستوى الأنواع.
- **`infer`**: التقاط نوع داخل نمط (مثلاً عنصر المصفوفة، نوع الإرجاع لدالة).
- أمثلة: `Flatten<T>`، `ReturnOf<T>` من توقيع دالة.

### أفكار من الكود

```ts
type IsString<T> = T extends string ? "yes" : "no";
type Flatten<T> = T extends (infer Item)[] ? Item : T;
```

```ts
type ReturnOf<T> = T extends (...args: infer _A) => infer R ? R : never;

function getUser() {
  return { id: 1, name: "Marwan" };
}
type User = ReturnOf<typeof getUser>;
```

### نقاط مهمة / أخطاء شائعة

- الأنواع الشرطية تُقيَّم غالباً على **الشكل** (distributive behavior مع union — موضوع متقدم لاحقاً).
- `infer Item` يعمل فقط في فرع `extends` حيث يُعرَّف النمط.
- `ReturnOf<typeof getUser>` أفضل من نسخ شكل الكائن يدوياً عند تغيير الدالة.

### التشغيل

```bash
npx tsx 04_generics_advanced_types/05_conditional_infer.ts
```

---

## 06_mapped_types — تحويل خصائص نوع بالكامل

### ماذا تتعلم؟

- **`[K in keyof T]`**: تمر على كل مفتاح في `T` وتبني خاصية جديدة.
- أمثلة: جعل الكل **optional** (`?`)، **readonly**، أو تغيير نوع القيمة (مثل `boolean` لكل حقل).

### أفكار من الكود

```ts
type PartialUser = {
  [K in keyof User]?: User[K];
};

type ReadonlyUser = {
  readonly [K in keyof User]: User[K];
};

type Flags = {
  [K in keyof User]: boolean;
};
```

### نقاط مهمة / أخطاء شائعة

- `PartialUser` يسمح بـ `{ name: "Marwan" }` فقط — باقي الحقول غير مطلوبة.
- تعديل `user.name` على `ReadonlyUser` خطأ وقت الترجمة.
- الـ mapped types هي أساس كثير من **utility types** المدمجة في TypeScript.

### التشغيل

```bash
npx tsx 04_generics_advanced_types/06_mapped_types.ts
```

---

## 07_utility_types — أنواع مساعدة جاهزة

### ماذا تتعلم؟

- **`Partial<T>`** — كل الخصائص اختيارية (تحديثات جزئية).
- **`Required<T>`** — كل الخصائص مطلوبة (حتى التي كانت `?`).
- **`Readonly<T>`** — لا إعادة تعيين للخصائص.
- **`Pick<T, Keys>`** / **`Omit<T, Keys>`** — اختيار أو حذف حقول.
- **`Record<Keys, ValueType>`** — كائن بمفاتيح معروفة ونوع قيمة موحّد.
- **`ReturnType<F>`** / **`Parameters<F>`** — من توقيع الدالة.

### أفكار من الكود

```ts
const draft: Partial<User> = { name: "Marwan" };

const full: Required<User> = { id: 1, name: "Ali", email: "ali@example.com" };

type UserPreview = Pick<User, "id" | "name">;
type UserWithoutEmail = Omit<User, "email">;

type Roles = Record<"admin" | "user" | "guest", boolean>;

type Created = ReturnType<typeof createUser>;
type Args = Parameters<typeof createUser>;
```

### نقاط مهمة / أخطاء شائعة

- `Required<User>` يفرض `email` حتى لو كان اختيارياً في `User` الأصلي.
- `Pick`/`Omit` لا تغيّر أنواع الحقول المتبقية — فقط **الوجود**.
- استخدم `typeof createUser` مع `ReturnType`/`Parameters` وليس اسم الدالة كنص.

### التشغيل

```bash
npx tsx 04_generics_advanced_types/07_utility_types.ts
```

---

## 08_template_literal_types — أنواع نصية من قوالب

### ماذا تتعلم؟

- بناء **union من strings** باستخدام backticks على مستوى النوع: `` `hello-${Lang}` ``.
- **`Capitalize<T>`** (وما شابه) لتحويل أجزاء النص في الأنواع.
- دمج عدة unions ينتج **Cartesian product** من النصوص الممكنة.

### أفكار من الكود

```ts
type Lang = "ar" | "en";
type Greeting = `hello-${Lang}`; // "hello-ar" | "hello-en"

type EventName = "click" | "focus" | "blur";
type HandlerName = `on${Capitalize<EventName>}`; // "onClick" | "onFocus" | "onBlur"

type Endpoint = `${HttpMethod} ${ApiRoute}`;
// "GET /users" | "GET /posts" | "POST /users" | "POST /posts"
```

### نقاط مهمة / أخطاء شائعة

- `"hello-fr"` ليس من `Greeting` لأن `"fr"` ليس من `Lang`.
- `"onHover"` خطأ لأن `"hover"` ليس من `EventName`.
- مفيد لـ API routes، أسماء events في React، مفاتيح i18n، إلخ — مع تحقق compile-time.

### التشغيل

```bash
npx tsx 04_generics_advanced_types/08_template_literal_types.ts
```

---

## خريطة سريعة للمجلد

| الدرس | الفكرة بجملة |
|--------|----------------|
| 01 | Generics في الدوال والواجهات |
| 02 | `extends` لتقييد `T` |
| 03 | `keyof` + `typeof` |
| 04 | `T[K]` indexed access |
| 05 | conditional + `infer` |
| 06 | mapped types يدوياً |
| 07 | utility types جاهزة |
| 08 | template literal types |

بعد إتمام هذا المجلد، تستطيع قراءة أنواع مكتبات TypeScript المعقدة وكتابة أنواع API آمنة لفرقك.
