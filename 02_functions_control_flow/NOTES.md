# الدوال وتدفق التحكم (Functions & Control Flow)

هذا المجلد يبني على أساسيات TypeScript ويركز على **كيف تكتب الدوال**، **كيف تضيّق الأنواع (type narrowing)** أثناء التنفيذ، و**كيف تتحكم TypeScript في فهم الكود** عندما تكون القيم unions أو `unknown`. الدروس مرتّبة من البسيط (معاملات وإرجاع) إلى المتقدّم (predicates و assertion functions).

---

## 01_function_params_return — معاملات الدالة ونوع الإرجاع

### ماذا تتعلّم؟

- كتابة **معاملات (parameters)** بأنواع صريحة.
- تحديد **نوع الإرجاع (return type)** أو ترك TypeScript **يستنتجه (inference)**.
- استخدام **`void`** عندما الدالة لا تُرجع قيمة مفيدة للمستدعي (مثل `console.log` فقط).

### أفكار من الكود

```ts
function add(a: number, b: number): number {
  return a + b;
}

function greet(name: string) {
  return `Hello, ${name}`; // النوع المُستنتَج: string
}

function logSum(a: number, b: number): void {
  console.log(a + b);
}
```

- **`add`**: كل معامل `number` والإرجاع `number` — واضح للقارئ وللمترجم.
- **`greet`**: بدون `: string` بعد القوس؛ TypeScript يستنتج من `return`.
- **`logSum`**: `void` يعني «لا تعتمد على قيمة راجعة»؛ استدعاءها كـ `const x = logSum(...)` لن يعطيك رقمًا مفيدًا من ناحية النوع.

### نقاط مهمة / أخطاء شائعة

| نقطة | توضيح |
|------|--------|
| Inference vs صريح | للدوال العامة أو المعقّدة، كتابة نوع الإرجاع صراحةً تقلّل الأخطاء. |
| `void` ≠ `undefined` | `void` للدوال؛ لا تخلطها مع «الدالة ترجع undefined عمدًا» في سياقات أخرى. |
| معاملات بدون نوع | في strict mode غالبًا يُطلب نوع؛ لا تعتمد على `any` ضمنيًا. |

### التشغيل

```bash
npx tsx 02_functions_control_flow/01_function_params_return.ts
```

---

## 02_optional_default_params — المعاملات الاختيارية والافتراضية

### ماذا تتعلّم؟

- **`?` (optional parameter)**: المعامل قد **لا يُمرَّر** → داخل الدالة نوعه يصبح `T | undefined`.
- **`= value` (default parameter)**: إذا لم تمرّر قيمة، تُستخدم **الافتراضية** → النوع يبقى `T` (ليس `undefined`).

### أفكار من الكود

```ts
function greet(name: string, title?: string): string {
  if (title) {
    return `Hello, ${title} ${name}`;
  }
  return `Hello, ${name}`;
}

function createUser(name: string, role: string = "user"): string {
  return `${name} is a ${role}`;
}
```

- **`title?`**: استدعاء `greet("Marwan")` صحيح؛ `title` قد يكون `undefined`.
- **`role = "user"`**: استدعاء `createUser("Ali")` يعطي دور `"user"` دون أن يكون `role` من نوع `string | undefined`.

### نقاط مهمة / أخطاء شائعة

- **Optional ≠ Default**: optional يسمح بعدم التمرير لكن النوع يتضمّن `undefined`؛ default يضمن قيمة عند الغياب.
- **ترتيب المعاملات**: المعاملات الاختيارية/ذات الافتراضي عادةً **بعد** المعاملات الإلزامية.
- **`if (title)`**: truthiness narrowing بسيط — انتبه للسلاسل الفارغة `""` إن كانت قيمة مقبولة.

### التشغيل

```bash
npx tsx 02_functions_control_flow/02_optional_default_params.ts
```

---

## 03_arrow_callbacks — دوال السهم والـ callbacks

### ماذا تتعلّم؟

- **Arrow functions** `() =>` — صياغة مختصرة، مفيدة للتعبيرات والـ callbacks.
- **Callbacks**: تمرير **دالة كمعامل** لدالة أخرى تستدعيها لاحقًا (مثل `map`).

### أفكار من الكود

```ts
const add = (a: number, b: number): number => a + b;

function processNumbers(
  numbers: number[],
  callback: (n: number) => number,
): number[] {
  return numbers.map(callback);
}

const doubled = processNumbers([1, 2, 3], (n) => n * 2);
```

- نوع الـ callback: **`(n: number) => number`** — دالة تأخذ رقمًا وترجع رقمًا.
- `(n) => n * 2`: TypeScript يستنتج `n: number` من سياق `number[]`.

### نقاط مهمة / أخطاء شائعة

- **Arrow ≠ callback**: arrow طريقة **كتابة**؛ callback **فكرة** (دالة تُمرَّر).
- **`this`**: arrow functions لا تربط `this` بنفس طريقة `function` — مهم في الكلاسات (درس لاحق).
- **أنواع الـ callback**: عرّف نوع المعامل `(n: number) => number` لتفادي أخطاء داخل `map`.

### التشغيل

```bash
npx tsx 02_functions_control_flow/03_arrow_callbacks.ts
```

---

## 04_function_overloads — تعدد توقيعات الدالة (Overloads)

### ماذا تتعلّم؟

- **Overloads**: عدة **توقيعات** لنفس اسم الدالة (حسب نوع الـ argument).
- **Implementation واحد**: جسم الدالة الفعلي يجب أن يغطي **كل** الحالات (غالبًا union في المعاملات).

### أفكار من الكود

```ts
function format(value: string): string;
function format(value: number): string;
function format(value: boolean): string;

function format(value: string | number | boolean): string {
  if (typeof value === "string") return value.toUpperCase();
  if (typeof value === "number") return value.toFixed(2);
  return value ? "yes" : "no";
}
```

- المستدعي يرى overloads فقط؛ التنفيذ مخفي «خلف» التوقيعات.
- داخل التنفيذ تستخدم **`typeof`** لتضييق النوع.

### نقاط مهمة / أخطاء شائعة

- **Implementation غير قابل للاستدعاء المباشر** من منظور الأنواع كoverload منفصل — يجب أن يكون متوافقًا مع كل التوقيعات.
- لا تبالغ في overloads؛ أحيانًا **union + narrowing** أو **generics** أبسط.
- تذكّر: overloads للـ **TypeScript**؛ وقت التشغيل دالة واحدة فقط.

### التشغيل

```bash
npx tsx 02_functions_control_flow/04_function_overloads.ts
```

---

## 05_type_narrowing — تضييق النوع (Type Narrowing)

### ماذا تتعلّم؟

- **Type narrowing**: من union (`string | number`) إلى فرع واحد داخل فرع `if` / `else`.
- **Truthiness narrowing**: `if (text)` يستبعد `null` و `undefined` (و falsy أخرى).
- **Equality narrowing**: `x === y` قد يثبت نوعًا مشتركًا (مثل `string`).

### أفكار من الكود

```ts
function printId(id: string | number) {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id.toFixed(2));
  }
}

function compare(x: string | number, y: string | boolean) {
  if (x === y) {
    console.log(x.toUpperCase()); // هنا x و y كلاهما string
  }
}
```

### نقاط مهمة / أخطاء شائعة

- بعد `else` في `printId`، TypeScript **يستنتج** `number` — لا حاجة لـ cast يدوي.
- **`if (text)`** لا يميّز `""` عن «لا نص» — إن احتجت تمييزًا دقيقًا استخدم `text != null`.
- **Equality narrowing** ذكي لكن محدود؛ لا يعمّم على كل unions.

### التشغيل

```bash
npx tsx 02_functions_control_flow/05_type_narrowing.ts
```

---

## 06_typeof_instanceof_in — typeof و instanceof و in

### ماذا تتعلّم؟

- **`typeof`**: للأنواع **البدائية** في runtime (`string`, `number`, `boolean`, …).
- **`instanceof`**: للتحقق من **instance** لكلاس (سلسلة الـ prototype).
- **`in`**: يفحص **وجود خاصية** على كائن — ممتاز مع **discriminated unions** (مثل `permissions` vs `visitCount`).

### أفكار من الكود

```ts
if (typeof value === "string") { /* ... */ }

if (animal instanceof Dog) {
  animal.bark();
}

if ("permissions" in user) {
  console.log(user.permissions);
} else {
  console.log(user.visitCount);
}
```

- **`Admin | Guest`**: `in` يضيّق حسب الشكل وليس فقط `role`.

### نقاط مهمة / أخطاء شائعة

- **`typeof null === "object"`** في JavaScript — لا تستخدم `typeof` لتمييز `null`.
- **`instanceof`** لا ينفع مع interfaces (لا وجود لها في runtime) — استخدم `in` أو discriminant.
- **`in`** يتحقق من المفتاح على الكائن أو prototype — انتبه للكائنات بدون prototype.

### التشغيل

```bash
npx tsx 02_functions_control_flow/06_typeof_instanceof_in.ts
```

---

## 07_type_predicates_assertions — Type predicates و Assertion functions

### ماذا تتعلّم؟

- **Type predicate**: `parameter is Type` — دالة ترجع `boolean` وتعلّم TypeScript أن المعامل من نوع معيّن إذا رجعت `true`.
- **Assertion function**: `asserts value is Type` — إن فشل الشرط **ترمي خطأ**؛ بعد الاستدعاء الناجح النوع **مضيّق**.

### أفكار من الكود

```ts
function isFish(animal: Fish | Bird): animal is Fish {
  return "swim" in animal;
}

function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== "string") {
    throw new Error("Not a string");
  }
}

function printUpper(value: unknown) {
  assertIsString(value);
  console.log(value.toUpperCase()); // value: string
}
```

- **`isFish`**: بديل أنظف من `"swim" in animal` مكررًا في كل مكان.
- **`assertIsString`**: مفيد عند حدود API (`unknown`) — بعد assertion آمن للاستخدام.

### نقاط مهمة / أخطاء شائعة

- **Predicate يجب أن يكون صادقًا منطقيًا**: إذا `isFish` ترجع `true` والكائن ليس `Fish`، TypeScript يصدّقك والـ runtime يكذب.
- **Assertions ترمي** — لا تستخدمها كـ «تحذير»؛ فشل = exception.
- **`printUpper(123)`** يفشل وقت التشغيل — TypeScript لا يمنع استدعاءً بـ `unknown` خاطئ إن مرّرت قيمة runtime غير string.

### التشغيل

```bash
npx tsx 02_functions_control_flow/07_type_predicates_assertions.ts
```

---

## خريطة سريعة للمجلد

```text
معاملات/إرجاع → optional/default → arrow/callback
        ↓
overloads → narrowing (typeof/truthiness/equality)
        ↓
typeof | instanceof | in → predicates | assertions
```

بعد إنهاء هذا المجلد، يفترض أن تفهم **كيف تكتب دوالًا مtyped** و**كيف تستفيد من control flow** لجعل TypeScript يعرف أنواعًا أدق داخل كل فرع.
