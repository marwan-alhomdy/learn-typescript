# 01 — Types & Fundamentals

أساس TypeScript: أنواع القيم، الاستدلال، والتركيبات الأولى للأنواع.

شغّل أي درس من جذر المشروع:

```bash
npx tsx 01_types_fundamentals/01_primitives.ts
```

---

## 01_primitives.ts — الأنواع البدائية

### ماذا تتعلّم؟
- الأنواع الأساسية الثلاثة الأكثر استخدامًا: `string`, `number`, `boolean`
- الفرق بين `const` (قيمة ثابتة بعد التعيين) و `let` (قابلة للتغيير)

### أفكار من الكود

```ts
const id: number = 5;
const name: string = "Marwan Alhomdy";
const isWorking: boolean = true;

let x: number = 3;
x++; // مسموح لأن x معرّفة بـ let
```

### خلاصة وأخطاء شائعة
- في TypeScript، `number` يغطي الأعداد الصحيحة والعشرية معًا (لا يوجد `int` منفصل).
- لا تخلط الأنواع: تعيين `"5"` لمتغير من نوع `number` خطأ.
- استخدم `const` افتراضيًا، و`let` فقط عندما تحتاج تغيير القيمة.

### التشغيل
```bash
npx tsx 01_types_fundamentals/01_primitives.ts
```

---

## 02_special_types.ts — أنواع خاصة

### ماذا تتعلّم؟
- `any`: يقبل أي شيء لكن يلغي فائدة TypeScript
- `unknown`: آمن؛ يجب تضييق النوع قبل الاستخدام
- `void`: دالة لا ترجع قيمة مفيدة (غالبًا للطباعة/الآثار الجانبية)
- `never`: دالة لا ترجع أبدًا (مثل `throw` أو حلقة لا نهائية)

### أفكار من الكود

```ts
let data: any = "hello";
data = 42;
data.toFixed(); // TypeScript لا يعترض — حتى لو كان خطأ وقت التشغيل

let input: unknown = "hello";
if (typeof input === "string") {
  console.log(input.toUpperCase()); // بعد التضييق فقط
}

function logMessage(msg: string): void { console.log(msg); }
function throwError(message: string): never { throw new Error(message); }
```

### خلاصة وأخطاء شائعة
- تجنّب `any` قدر الإمكان؛ فضّل `unknown` عندما لا تعرف النوع بعد.
- `void` ≠ `undefined` كمعنى تصميمي: `void` يعني «لا تعتمد على القيمة المُرجَعة».
- `never` يفيد في exhaustiveness checks لاحقًا (مثل `switch` على كل الحالات).

### التشغيل
```bash
npx tsx 01_types_fundamentals/02_special_types.ts
```

---

## 03_inference_annotations.ts — الاستدلال والتعليقات النوعية

### ماذا تتعلّم؟
- **Type inference**: TypeScript يستنتج النوع من القيمة الابتدائية
- **Type annotations**: أنت تكتب النوع صراحةً بـ `: Type`

### أفكار من الكود

```ts
const name = "Marwan Alhomdy"; // مستنتج: string
const age = 20;                // مستنتج: number

const id: number = 5;          // annotation صريح
const city: string = "Sana'a";
```

### خلاصة وأخطاء شائعة
- مع `const` والقيم البسيطة، الاستدلال غالبًا كافٍ وواضح.
- اكتب annotation عندما يكون النوع غير واضح، أو عندما تريد توثيق العقد (مثل معاملات الدوال وقيم الإرجاع).
- لا تُفرط في annotations غير الضرورية؛ الكود يصبح أطول دون فائدة.

### التشغيل
```bash
npx tsx 01_types_fundamentals/03_inference_annotations.ts
```

---

## 04_arrays_tuples.ts — المصفوفات والـ Tuples

### ماذا تتعلّم؟
- المصفوفة: طول مرن، عناصر من نوع واحد عادةً
- طريقتان لكتابة نوع المصفوفة: `number[]` و `Array<number>`
- الـ tuple: طول ثابت، وكل موضع له نوعه الخاص

### أفكار من الكود

```ts
const numbers: number[] = [1, 2, 3];
const names: Array<string> = ["Marwan", "Ali", "Sara"];

const person: [string, number] = ["Marwan Alhomdy", 20];
const point: [number, number] = [10, 25];
```

### خلاصة وأخطاء شائعة
| | Array | Tuple |
|---|--------|--------|
| الطول | مرن | ثابت (مفهوميًا) |
| الأنواع | غالبًا نوع واحد لكل العناصر | نوع لكل موضع |
| مثال | قائمة مستخدمين | زوج إحداثيات `[x, y]` |

- لا تستخدم tuple لكل شيء؛ استخدمه عندما المواضع لها معنى ثابت (مثل `[lat, lng]`).

### التشغيل
```bash
npx tsx 01_types_fundamentals/04_arrays_tuples.ts
```

---

## 05_objects_optional.ts — الكائنات والخصائص الاختيارية

### ماذا تتعلّم؟
- تعريف شكل كائن inline: `{ name: string; age: number }`
- الخصائص الاختيارية بـ `?` — قد توجد أو لا

### أفكار من الكود

```ts
const user: { name: string; age: number } = {
  name: "Marwan Alhomdy",
  age: 20,
};

const profile: { name: string; email?: string } = {
  name: "Marwan Alhomdy",
  // email غير موجود — مسموح
};
```

### خلاصة وأخطاء شائعة
- الخاصية المطلوبة إن نُسيت → خطأ من TypeScript.
- الخاصية الاختيارية إن وُجدت يجب أن تطابق نوعها (`email` إن وُجد فهو `string`).
- عند قراءة `email?` قد تكون `undefined`؛ لا تفترض وجودها دون فحص.

### التشغيل
```bash
npx tsx 01_types_fundamentals/05_objects_optional.ts
```

---

## 06_enums_literals.ts — Enums والقيم الحرفية

### ماذا تتعلّم؟
- `enum`: مجموعة قيم مسماة جاهزة للاستخدام (`Role.Admin`)
- **Literal types**: تقييد المتغير بقيم محددة فقط (`"up" | "down"`)

### أفكار من الكود

```ts
enum Role {
  Admin = "admin",
  User = "user",
  Guest = "guest",
}
const currentRole: Role = Role.Admin;

type Direction = "up" | "down" | "left" | "right";
const move: Direction = "up"; // "up2" خطأ

type Dice = 1 | 2 | 3 | 4 | 5 | 6;
const roll: Dice = 4; // 7 خطأ
```

### خلاصة وأخطاء شائعة
| | Enum | Literal union |
|---|------|----------------|
| الاستخدام | قيم بأسماء جاهزة | مجموعة قيم مسموحة |
| مثال | `Role.Admin` | `"up" \| "down"` |

- كثير من مشاريع TypeScript الحديثة تفضّل union of string literals على enums لبساطة الناتج في JavaScript.
- كلا الأسلوبين صحيحان؛ المهم الاتساق في المشروع.

### التشغيل
```bash
npx tsx 01_types_fundamentals/06_enums_literals.ts
```

---

## 07_union_intersection.ts — الاتحاد والتقاطع

### ماذا تتعلّم؟
- **Union (`|`)**: قيمة واحدة من عدة أنواع ممكنة — «إما هذا أو ذاك»
- **Intersection (`&`)**: يجب توفر خصائص كل الأنواع معًا — «هذا وذاك»

### أفكار من الكود

```ts
type Id = string | number;
const userId: Id = "abc-123";
const productId: Id = 42;
// true غير مسموح

type Person = { name: string };
type Employee = { salary: number };
type Staff = Person & Employee;

const staff: Staff = {
  name: "Marwan Alhomdy",
  salary: 5000, // لازم الاثنان معًا
};
```

### خلاصة وأخطاء شائعة
- Union: قبل استخدام القيمة كـ `string` أو `number`، تحتاج narrowing (ستتعمّقه في المجلد 02).
- Intersection: نسيان خاصية من أحد الطرفين → خطأ.
- لا تخلط المعنى: `|` اختيار بين أنواع، `&` دمج متطلبات.

### التشغيل
```bash
npx tsx 01_types_fundamentals/07_union_intersection.ts
```

---

## خريطة سريعة للمجلد

| الملف | الفكرة الجوهرية |
|-------|------------------|
| `01_primitives` | `string` / `number` / `boolean` |
| `02_special_types` | `any` / `unknown` / `void` / `never` |
| `03_inference_annotations` | استدلال مقابل annotation |
| `04_arrays_tuples` | قوائم مرنة مقابل مواضع ثابتة |
| `05_objects_optional` | شكل الكائن و `?` |
| `06_enums_literals` | قيم مسماة وقيم مقيّدة |
| `07_union_intersection` | `\|` مقابل `&` |

التالي: [`02_functions_control_flow/NOTES.md`](../02_functions_control_flow/NOTES.md)
