# learn-typescript

مستودع تطبيقي لتعلّم TypeScript — من الأساسيات إلى التصميم والاختبار.

كل مجلد يمثل مرحلة، وكل ملف درس مستقل يمكنك تشغيله وقراءته على حدة.

---

## المتطلبات

- [Node.js](https://nodejs.org/) (الإصدار 18 أو أحدث مفضّل)
- TypeScript و أداة تشغيل مثل `tsx` (اختياري لكن مريح للتشغيل السريع)

```bash
npm install
npm install -g typescript tsx   # اختياري عالميًا
```

---

## التشغيل

تشغيل أي درس مباشرة:

```bash
npx tsx 01_types_fundamentals/01_primitives.ts
```

أو التحقق من الأنواع على المشروع كاملًا:

```bash
npx tsc --noEmit
```

---

## هيكل المشروع

| المجلد | الموضوع |
|--------|---------|
| `01_types_fundamentals` | الأنواع الأساسية، الاستدلال، المصفوفات، الاتحادات |
| `02_functions_control_flow` | الدوال، التضييق، الـ overloads |
| `03_object_modeling` | `type` / `interface`، unions مميّزة |
| `04_generics_advanced_types` | Generics، Mapped/Conditional، Utility types |
| `05_classes_oop` | الكلاسات، الوراثة، التركيبة |
| `06_modules_tooling` | الوحدات، `tsconfig`، ESM/CJS |
| `07_async_runtime` | Promises، Node.js، المتغيرات البيئية |
| `08_testing_design` | الاختبار، SOLID، Repository/Service |

للتفاصيل وتتبع التقدّم انظر [`roadmap.md`](./roadmap.md).

---

## إعداد TypeScript

المشروع يستخدم `strict` مع خيارات إضافية مثل:

- `noUncheckedIndexedAccess`
- `exactOptionalPropertyTypes`
- `verbatimModuleSyntax`
- `module`: `nodenext`

راجع [`tsconfig.json`](./tsconfig.json).

---

## ملاحظات

- المجلدات مرقّمة لترتيب التعلّم؛ ابدأ من `01` ثم تصاعديًا.
- بعض دروس `07_async_runtime` قد تحتاج ملف `.env` محليًا (لا يُرفع إلى Git).
- مخرجات الترجمة (`*.js`, `*.d.ts`, `dist/`) مستثناة عبر `.gitignore`.

---

## الترخيص

مشروع تعليمي شخصي — استخدمه بحرّية للتعلّم والممارسة.
