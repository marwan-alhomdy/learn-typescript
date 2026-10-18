# 08 — الاختبار وتصميم الكود

هذا المجلد يركز على **عقلية الاختبار** ومبادئ **تصميم برمجي** تجعل TypeScript أسهل في الفهم والصيانة والاختبار. معظم الملفات **عروض مفاهيمية (demos)**: دوال `assertEqual` و `assertThrows` بسيطة و `console.log` — **ليست** إعداد Jest أو Vitest كامل. الهدف أن تفهم *ماذا* تختبر و*كيف* تبني الكود قبل إدخال أداة اختبار حقيقية.

> **تشغيل أي درس:**
> ```bash
> npx tsx 08_testing_design/01_unit_testing.ts
> ```
> النجاح يظهر كـ `✓` ورسالة «All ... passed»؛ الفشل يرمي `Error` ويتوقف التشغيل.

---

## 01_unit_testing — اختبار الوحدة (Unit testing)

### ماذا تتعلم؟

- **Unit test**: اختبار **وحدة صغيرة** (دالة) بمعزل عن قاعدة البيانات والشبكة.
- **Assertion**: مقارنة **فعلي** vs **متوقع** — إذا اختلفا → فشل الاختبار.
- **`assertThrows`**: التأكد أن دالة **ترمي خطأ** في سينario معيّن (مثل القسمة على صفر).
- بناء أساس يمكن لاحقاً استبداله بـ Jest/Vitest (`expect`, `toBe`, `toThrow`).

### أفكار من الكود

```ts
function assertEqual<T>(actual: T, expected: T, name: string): void {
  if (actual !== expected) {
    throw new Error(`${name}: expected ${String(expected)}, got ${String(actual)}`);
  }
  console.log(`✓ ${name}`);
}

assertEqual(add(2, 3), 5, "add positives");
assertThrows(() => divide(10, 0), "divide by zero throws");
```

### نقاط مهمة / عقلية الاختبار

- **اختبر السلوك، لا التنفيذ الداخلي**: المهم النتيجة ورسالة الخطأ، لا «كم مرة استدعيت دالة» في هذه المرحلة.
- **اسم الاختبار (`name`)**: يجب أن يشرح الحالة — يسهّل تشخيص الفشل.
- **خطأ شائع في `assertThrows`**: إذا رُمي خطأ **من الاختبار نفسه** (رسالة تبدأ باسم الاختبار)، الكود يعيد رميه — تمييز بين «فشل متوقع» و«فشل assertion».
- **`!==` للأرقام والنصوص**: للكائنات العميقة تحتاج مقارنة أعمق (لاحقاً في أ frameworks).

### التشغيل

```bash
npx tsx 08_testing_design/01_unit_testing.ts
```

---

## 02_assertions_edge_cases — Assertions وحالات الحافة

### ماذا تتعلم؟

- **Happy path**: الحالات «العادية» التي يتوقعها المستخدم.
- **Edge cases**: فارغ، حرف واحد، صفر، 100%، حدود الرanges — حيث تظهر الأ bugs غالباً.
- **Expected failures**: التأكد أن **المدخلات غير الصالحة** تُرفض (throw) لا تُرجع قيمة غريبة.
- نفس أدوات assertion من الدرس 01 — التركيز على **تغطية الحالات** لا على أدوات جديدة.

### أفكار من الكود

```ts
assertEqual(normalizeEmail("  Ali@Mail.com "), "ali@mail.com", "trim + lowercase");
assertEqual(getDiscount(0, 50), 0, "zero price");
assertThrows(() => getDiscount(100, 150), "percent over 100");
```

`getDiscount` يتحقق من `price < 0`, `percent < 0`, `percent > 100` قبل الحساب.

### نقاط مهمة / عقلية الاختبار

- **لا تكتفِ بمسار واحد**: إيميل بمسافات، سعر 0، نسبة 100% — كلها سلوك مُعرّف يستحق assertion.
- **الاختبار يوثّق القواعد**: قراءة قائمة الاختبارات = قراءة spec للدالة.
- **خطأ شائع**: اختبار «النجاح» فقط وتجاهل ما يحدث عند `-1` أو `150%`.
- **رسائل assertThrows**: هنا يُفحص أن رسالة الخطأ **لا** تبدأ بـ `"negative price:"` (تنسيق assertion) — أي خطأ **حقيقي** من الدالة يُقبل.

### التشغيل

```bash
npx tsx 08_testing_design/02_assertions_edge_cases.ts
```

---

## 03_dependency_injection — حقن الاعتمادية (DI)

### ماذا تتعلم؟

- **Dependency Injection**: بدل أن تنشئ `Mailer` أو `Database` **داخل** الخدمة، **تمرّرها** من الخارج (constructor أو parameters).
- **Interface / type** (`Mailer`): الخدمة تعتمد على **عقد** لا على `console.log` ثابت.
- **Fake / mock**: تنفيذ وهمي يخزّن في مصفوفة `sent[]` — اختبار **بدون** إيميل حقيقي.
- الفرق بين `OrderServiceBad` (مربوط بتنفيذ) و `OrderService(mailer)`.

### أفكار من الكود

```ts
class OrderService {
  constructor(private mailer: Mailer) {}
  placeOrder(email: string): void {
    this.mailer.send(email, "Your order was placed");
  }
}

const fakeMailer: Mailer = {
  send(to, message) {
    sent.push(`${to}:${message}`);
  },
};
```

### نقاط مهمة / عقلية التصميم

- **قابلية الاختبار = تصميم**: إذا لا تستطيع استبدال الاعتمادية، الاختبار يصبح integration دائماً.
- **DI ليس «framework» بالضرورة**: تمرير كائن في `constructor` يكفي في TypeScript.
- **خطأ شائع**: Singleton مخفي لـ DB داخل الكلاس — صعب mock في unit test.
- **الاختبار في الملف**: يتحقق `sent.length === 1` ومحتوى العنوان — هذا **manual assertion** بنفس روح الدرس 01.

### التشغيل

```bash
npx tsx 08_testing_design/03_dependency_injection.ts
```

---

## 04_separation_of_concerns — فصل الاهتمامات

### ماذا تتعلم؟

- **Separation of Concerns (SoC)**: كل دالة/وحدة **مسؤولية واحدة** — تحقق، إنشاء كائن، حفظ، إرسال بريد.
- **`registerUserBad`**: كل شيء في دالة واحدة — صعب اختبار «التحقق فقط» أو «الحفظ فقط».
- **`registerUser`**: orchestrator يستدعي خطوات صغيرة؛ `validateEmail`, `createUser`, `saveUser`, `sendWelcomeEmail`.
- إرجاع `User | null` عند فشل التحقق بدل خلط `console.log` فقط.

### أفكار من الكود

```ts
function registerUser(name: string, email: string): User | null {
  if (!validateEmail(email)) {
    console.log("invalid email");
    return null;
  }
  const user = createUser(name, email);
  saveUser(user);
  sendWelcomeEmail(user);
  return user;
}
```

### نقاط مهمة / عقلية التصميم

- **اختبار كل طبقة على حدة**: `validateEmail("bad-email")` → `false` بدون لمس DB أو mail.
- **التعديل الم localized**: تغيير قواعد الإيميل في `validateEmail` فقط.
- **خطأ شائع**: «God function» تجمع HTTP + SQL + business rules — أي تغيير يكسر كل شيء.
- **التحقق في الدرس بسيط** (`@` و `.`) — في production تستخدم validator أقوى (يربط بدرس 07).

### التشغيل

```bash
npx tsx 08_testing_design/04_separation_of_concerns.ts
```

---

## 05_solid_basics — أساسيات SOLID

### ماذا تتعلم؟

مبادئ تصميم **OOP/وحدات** — كل حرف مثال صغير في الملف:

| المبدأ | الفكرة في الدرس |
|--------|------------------|
| **S** — Single Responsibility | `UserRepository` للحفظ، `EmailService` للإرسال |
| **O** — Open/Closed | `Shape` + `Circle`/`Square`؛ `totalArea` بدون تعديل عند إضافة شكل جديد |
| **L** — Liskov Substitution | `Sparrow` يُمرَّر حيث `Bird` متوقع |
| **I** — Interface Segregation | `Printer` و `Scanner` منفصلان بدل واجهة ضخمة |
| **D** — Dependency Inversion | `App` يعتمد على `Logger` لا على `ConsoleLogger` مباشرة |

### أفكار من الكود

```ts
interface Shape {
  area(): number;
}

function totalArea(shapes: Shape[]): number {
  return shapes.reduce((sum, s) => sum + s.area(), 0);
}

class App {
  constructor(private logger: Logger) {}
  run(): void {
    this.logger.info("app started");
  }
}
```

### نقاط مهمة / عقلية التصميم

- **SOLID إرشادات** لا قوانين دينية — طبّق ما يخدم الوضوح والاختبار في مشروعك.
- **O + L**: إضافة `Triangle implements Shape` دون لمس `totalArea` — extension آمن.
- **D يربط بـ DI**: `App(new ConsoleLogger())` — نفس فكرة الدرس 03.
- **خطأ شائع**: كلاس واحد «Repository + Email + Validation» — يكسر S ويصعّب الاختبار.

### التشغيل

```bash
npx tsx 08_testing_design/05_solid_basics.ts
```

---

## 06_repository_service — نمط Repository و Service

### ماذا تتعلم؟

- **Repository**: طبقة **وصول للبيانات** — `save`, `findByEmail`, `findAll`؛ لا قواعد أعمال معقدة.
- **Service**: **منطق الأعمال** — مثلاً منع تسجيل إيميل مكرر، تطبيع `trim`/`toLowerCase`.
- **Service يستقبل Repository** في constructor — DI + فصل واضح.
- `findAll` يرجع `[...this.users]` — نسخة حتى لا يُعدَّل المخزن الداخلي من الخارج.

### أفكار من الكود

```ts
class UserService {
  constructor(private repo: UserRepository) {}

  register(name: string, email: string): User {
    const existing = this.repo.findByEmail(email.toLowerCase());
    if (existing) throw new Error("Email already registered");
    // ...
    return this.repo.save(user);
  }
}
```

### نقاط مهمة / عقلية التصميم

- **Unit test للـ Service**: repository **fake** في الذاكرة — بدون DB حقيقية.
- **Repository قابل للاستبدال**: لاحقاً `PostgresUserRepository` بنفس الواجهة (مفهومياً).
- **خطأ شائع**: SQL داخل `UserService.register` — يخلط Service مع Repository.
- **الدرس يوضّح خطأ مكرر**: `marwan@example.com` vs `Marwan@Example.com` بعد التطبيع.

### التشغيل

```bash
npx tsx 08_testing_design/06_repository_service.ts
```

---

## 07_data_validation — التحقق من البيانات

### ماذا تتعلم؟

- **لا تثق بالمدخلات** — خصوصاً `unknown` من HTTP أو JSON.
- جمع **أخطاء متعددة** في مصفوفة `ValidationError[]` ثم throw رسالة واحدة (أو لاحقاً إرجاع structured errors).
- بعد النجاح: **تطبيع** (`trim`, `toLowerCase`) في الإرجاع.
- يرتبط بـ `07_async_runtime/04_json_runtime_validation` — نفس فلسفة runtime checks.

### أفكار من الكود

```ts
function validateCreateUser(input: unknown): CreateUserInput {
  if (typeof input !== "object" || input === null) {
    throw new Error("Input must be an object");
  }
  const data = input as Record<string, unknown>;
  const errors: ValidationError[] = [];
  // فحص name, email, age...
  if (errors.length > 0) {
    throw new Error(errors.map((e) => `${e.field}: ${e.message}`).join(" | "));
  }
  return { name: (data.name as string).trim(), /* ... */ };
}
```

### نقاط مهمة / عقلية الاختبار

- **اختبارات validation**: حالة صالحة واحدة + حالة تجمع **عدة أخطاء** (`name`, `email`, `age`).
- **حدود age**: `0` و `120` مقبولة؛ `-3` مرفوض — edge cases.
- **خطأ شائع**: validation في controller **و** service **مكرر** — وحّد في طبقة واحدة.
- **في APIs**: غالباً ترجع 400 مع body من `{ field, message }[]` بدل string واحدة.

### التشغيل

```bash
npx tsx 08_testing_design/07_data_validation.ts
```

---

## 08_error_classes_result — Error classes و Result types

### ماذا تتعلم؟

- **Error classes مخصصة**: `NotFoundError`, `ValidationError` — `name` واضح وخصائص (`field`).
- **Result type**: `{ ok: true, value } | { ok: false, error }` — النجاح/الفشل **صراحة** في نوع الإرجاع.
- **`ok()` / `err()`**: constructors صغيرة لبناء Result.
- بديل لـ **throw فقط**: مفيد عندما الفشل **متوقع** وليس استثنائياً (مثل parse input).

### أفكار من الكود

```ts
type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

function findUser(id: number): Result<{ id: number; name: string }, NotFoundError> {
  if (id !== 1) return err(new NotFoundError("User", id));
  return ok({ id: 1, name: "Marwan" });
}

if (userResult.ok) console.log(userResult.value);
else console.log(userResult.error.message);
```

### نقاط مهمة / عقلية التصميم والاختبار

- **تمييز أنواع الأخطاء**: `instanceof NotFoundError` vs `ValidationError` في handler أو tests.
- **Result + TypeScript**: بعد `if (result.ok)` يضيّق `value`؛ في الفرع الآخر `error`.
- **متى Result vs throw**: Result للتحكم في التدفق؛ throw للحالات الاستثنائية أو أخطاء برمجية.
- **خطأ شائع**: نسيان `this.name` في Error subclass — يصعب التمييز في logs.
- **اختبار Result**: `expect(r.ok).toBe(false)` و `r.error.field` — أو manual `if (!r.ok) throw`.

### التشغيل

```bash
npx tsx 08_testing_design/08_error_classes_result.ts
```

---

## كيف يربط المجلد «الاختبار» بـ «التصميم»؟

```text
Unit tests (01–02)     →  ماذا تتحقق؟
        ↓
DI (03) + SoC (04)     →  كود قابل للعزل والmock
        ↓
SOLID (05)             →  مبادئ عامة
        ↓
Repository/Service (06)→  طبقات حقيقية في backends
        ↓
Validation (07)        →  مدخلات آمنة (يربط مع async/JSON)
        ↓
Errors/Result (08)     →  التعامل مع الفشل بوضوح
```

**الخطوة التالية في مشروعك:** استبدال assertions اليدوية بـ **Vitest** أو **Jest**، وكتابة tests منفصلة في ملفات `*.test.ts` — نفس الحالات (happy path، edge، throws) التي تدربت عليها هنا.

---

## جدول التشغيل السريع

| الملف | الأمر |
|--------|--------|
| 01 | `npx tsx 08_testing_design/01_unit_testing.ts` |
| 02 | `npx tsx 08_testing_design/02_assertions_edge_cases.ts` |
| 03 | `npx tsx 08_testing_design/03_dependency_injection.ts` |
| 04 | `npx tsx 08_testing_design/04_separation_of_concerns.ts` |
| 05 | `npx tsx 08_testing_design/05_solid_basics.ts` |
| 06 | `npx tsx 08_testing_design/06_repository_service.ts` |
| 07 | `npx tsx 08_testing_design/07_data_validation.ts` |
| 08 | `npx tsx 08_testing_design/08_error_classes_result.ts` |
