# نمذجة الكائنات (Object Modeling)

هذا المجلد يعلّمك **كيف تصف أشكال البيانات** في TypeScript: `type` مقابل `interface`، الدمج والوراثة، الخصائص `readonly` و `optional`، المفاتيح الديناميكية، **discriminated unions**، وأخيرًا **structural typing** — الفلسفة التي يبني عليها TypeScript التوافق بين الأنواع.

---

## 01_type_interface — type و interface

### ماذا تتعلّم؟

- **`type`**: alias لأي نوع — objects، unions، primitives، tuples، …
- **`interface`**: لوصف **شكل object**؛ شائع في APIs والكلاسات.
- الفرق العملي: **`type` أوسع**؛ **`interface` يمتد (extends) بسلاسة** ويُدمج أحيانًا في declaration merging (خارج نطاق هذا الدرس).

### أفكار من الكود

```ts
type UserId = string | number;

type User = {
  id: UserId;
  name: string;
};

interface Product {
  id: number;
  title: string;
  price: number;
}
```

- **`UserId`**: union على مستوى alias — مفيد لإعادة الاستخدام.
- **`User`** و **`Product`**: نفس الفكرة (كائن بخصائص) بـ `type` أو `interface`.

### نقاط مهمة / أخطاء شائعة

- للكائنات البسيطة، **`type` و `interface` متبادلان** كثيرًا — اختر اتساقًا في المشروع.
- **Unions و aliases معقدة** → غالبًا `type` فقط.
- لا تخلط «اسم النوع» مع «شكل البيانات» — TypeScript يهتم بالشكل (انظر الدرس 06).

### التشغيل

```bash
npx tsx 03_object_modeling/01_type_interface.ts
```

---

## 02_extending_intersection — extends و Intersection (&)

### ماذا تتعلّم؟

- **`interface B extends A`**: **وراثة** خصائص `A` في `B` (شائع مع interfaces).
- **`A & B` (intersection)**: **دمج** أنواع object في نوع واحد يملك كل الخصائص (شائع مع `type`).

### أفكار من الكود

```ts
interface Person {
  name: string;
}

interface Employee extends Person {
  salary: number;
}

type HasId = { id: number };
type HasEmail = { email: string };
type Account = HasId & HasEmail;
```

- **`Employee`**: يجب `{ name, salary }`.
- **`Account`**: يجب `{ id, email }` — intersection يطلب **كل** الأعضاء.

### نقاط مهمة / أخطاء شائعة

- **تعارض الخصائص** في intersection (نفس المفتاح بنوعين مختلفين) → النوع يصبح `never` للمفتاح — تجنّب ذلك.
- **`extends`** للتسلسل الهرمي الواضح؛ **`&`** لتركيب capabilities من عدة types.
- يمكن **`interface extends type`** في حالات — راجع docs عند الحاجة؛ الدرس يركز على النمط الشائع.

### التشغيل

```bash
npx tsx 03_object_modeling/02_extending_intersection.ts
```

---

## 03_readonly_optional — readonly و optional

### ماذا تتعلّم؟

- **`readonly`**: الخاصية **تُقرأ** بعد إنشاء الكائن و**لا تُعاد كتابتها** (compile-time).
- **`?` (optional)**: الخاصية **قد لا تكون موجودة** → النوع `T | undefined` عند القراءة.

### أفكار من الكود

```ts
interface User {
  readonly id: number;
  name: string;
  email?: string;
}

const user: User = { id: 1, name: "Marwan Alhomdy" };
// user.id = 2;  // Error
user.name = "Marwan"; // OK
```

- **`user` بدون `email`**: الحقل الاختياري غير مطلوب في الـ literal.
- **`userWithEmail`**: يمكن إضافة `email` اختياريًا.

### نقاط مهمة / أخطاء شائعة

| `readonly` | `optional` |
|------------|------------|
| موجودة وإلزامية | قد تكون غائبة |
| لا تُعدَّل بعد الإنشاء | قد تكون `undefined` |

- **`readonly` shallow**: nested objects قد تبقى قابلة للتعديل إن لم تُعلّم deep readonly.
- **Optional ≠ nullable**: `email?: string` يعني غياب المفتاح أو `undefined`؛ `string | null` مختلف صراحةً.

### التشغيل

```bash
npx tsx 03_object_modeling/03_readonly_optional.ts
```

---

## 04_index_signatures — Index signatures

### ماذا تتعلّم؟

- **Index signature** `[key: string]: T`: يسمح **مفاتيح ديناميكية** غير معرّفة مسبقًا بقيم من نوع `T`.
- يمكن الجمع بين **خصائص ثابتة** و index signature بشروط توافق الأنواع.

### أفكار من الكود

```ts
interface StringMap {
  [key: string]: string;
}

interface ScoreBoard {
  [player: string]: number;
}

interface Config {
  appName: string;
  [key: string]: string; // كل المفاتيح بما فيها appName: string
}
```

- **`translations`**: قاموس ترجمات — مفاتيح نصية وقيم نصية.
- **`Config`**: `appName` و `theme` و `lang` كلها `string` لأن الـ index يفرض `string` على **كل** الخصائص.

### نقاط مهمة / أخطاء شائعة

- عند وجود خاصية ثابتة + index، **نوع الخاصية الثابتة** يجب أن يكون **قابل للassignment إلى** نوع الـ index (هنا كل شيء `string`).
- **`[key: number]`** نادر؛ غالبًا string keys في JS objects.
- Index signatures **تضعف** type safety — استخدمها للـ dictionaries الحقيقية لا لكل object.

### التشغيل

```bash
npx tsx 03_object_modeling/04_index_signatures.ts
```

---

## 05_discriminated_unions — Unions مميّزة (Tagged unions)

### ماذا تتعلّم؟

- **Discriminated union**: عدة أنواع object تتشارك **حقل tag** (هنا `status`) بقيم **literal** مختلفة.
- بعد فحص الـ discriminant (`switch (result.status)`)، TypeScript يعرف **أي خصائص** متاحة (`data` vs `message`).

### أفكار من الكود

```ts
type Success = { status: "success"; data: string };
type Failure = { status: "error"; message: string };
type Loading = { status: "loading" };
type Result = Success | Failure | Loading;

function handle(result: Result) {
  switch (result.status) {
    case "success":
      console.log("data:", result.data);
      break;
    case "error":
      console.log("error:", result.message);
      break;
    case "loading":
      console.log("loading...");
      break;
  }
}
```

- **`status`** هو **discriminant** — قيم `"success" | "error" | "loading"` لا تتداخل.

### نقاط مهمة / أخطاء شائعة

- اختر discriminant **ثابتًا** (`as const` أو literal types) — تجنّب `string` عام.
- **`switch` exhaustive**: أضف `default` مع `never` في مشاريع كبيرة لاكتشاف cases ناقصة.
- لا تنسَ خصائص كل فرع — `Loading` بدون `data` عمدًا؛ الوصول لـ `result.data` خارج `success` خطأ.

### التشغيل

```bash
npx tsx 03_object_modeling/05_discriminated_unions.ts
```

---

## 06_structural_typing — الكتابة البنيوية (Structural typing)

### ماذا تتعلّم؟

- **Structural typing**: TypeScript يقبل الكائن إذا **يملك الشكل المطلوب** — **لا يهم اسم** النوع (`Point` vs `coords`).
- **Excess property check**: عند تمرير **object literal مباشرة**، خصائص **زائدة** غير معرّفة في النوع → **خطأ compile**.

### أفكار من الكود

```ts
interface Point {
  x: number;
  y: number;
}

function printPoint(p: Point) {
  console.log(`(${p.x}, ${p.y})`);
}

const coords = { x: 10, y: 20 };
printPoint(coords); // OK

const labeled = { x: 1, y: 2, label: "A" };
printPoint(labeled); // OK — متغير فيه خصائص زائدة

printPoint({ x: 5, y: 8 }); // OK
// printPoint({ x: 5, y: 8, label: "B" }); // Error: excess property
```

### نقاط مهمة / أخطاء شائعة

- **متغير وسيط** (`labeled`) يتجاوز فحص الخصائص الزائدة عند **التمرير** — لأن الهدف assignability للـ target type فقط.
- **Literal مباشر** يُفحص **بصرامة** — يمنع typos مثل `lable`.
- هذا يختلف عن **nominal typing** (Java/C#) — تذكّر: **الشكل هو العقد**.

### التشغيل

```bash
npx tsx 03_object_modeling/06_structural_typing.ts
```

---

## خريطة سريعة للمجلد

```text
type / interface → extends / &
        ↓
readonly / optional → index signatures
        ↓
discriminated unions → structural typing + excess checks
```

مع إتقان هذا المجلد تصبح قادرًا على **نمذجة domain حقيقي** (مستخدم، منتج، نتيجة API) بطريقة آمنة وقابلة للتوسّع، وتفهم **لماذا** بعض تعيينات الكائنات تنجح والبعض يفشل رغم «شكل متشابه».
