# learn-typescript

مستودع تطبيقي لتعلّم TypeScript — من الأساسيات إلى التصميم والاختبار.

كل مجلد يمثل مرحلة، وكل ملف درس مستقل يمكنك تشغيله وقراءته على حدة.

> النسخة الإنجليزية: [`README.md`](./README.md)

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

نظرة سريعة:

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

للتقدّم كقائمة تحقق انظر [`roadmap.md`](./roadmap.md).

---

### `01_types_fundamentals` — الأنواع والأساسيات

أساس TypeScript: أنواع القيم، الاستدلال، والتركيبات الأولى للأنواع.

| الملف | الشرح |
|-------|--------|
| `01_primitives.ts` | الأنواع البدائية: `string`, `number`, `boolean` والمتغيرات القابلة للتغيير |
| `02_special_types.ts` | أنواع خاصة: `any`, `unknown`, `never`, `void` ومتى تستخدم كل واحد |
| `03_inference_annotations.ts` | الفرق بين استنتاج النوع تلقائيًا وكتابة الـ annotation يدويًا |
| `04_arrays_tuples.ts` | المصفوفات (`T[]`) والـ tuples بطول وأنواع ثابتة لكل موضع |
| `05_objects_optional.ts` | كائنات بخصائص مطلوبة وخصائص اختيارية بـ `?` |
| `06_enums_literals.ts` | الـ enums والقيم الحرفية (literal types) مثل `"admin"` |
| `07_union_intersection.ts` | اتحاد الأنواع `|` وتقاطع الأنواع `&` |

---

### `02_functions_control_flow` — الدوال وتدفّق التحكم

كتابة دوال آمنة وتضييق الأنواع داخل الشروط.

| الملف | الشرح |
|-------|--------|
| `01_function_params_return.ts` | معاملات الدالة ونوع القيمة المُرجَعة (صريح أو مستنتج) |
| `02_optional_default_params.ts` | معاملات اختيارية `?` وقيم افتراضية |
| `03_arrow_callbacks.ts` | دوال السهم (arrow) وتمرير الدوال كـ callbacks |
| `04_function_overloads.ts` | نفس الدالة بعدة توقيعات (overloads) حسب نوع المدخل |
| `05_type_narrowing.ts` | تضييق union إلى نوع أدق داخل `if` / `else` |
| `06_typeof_instanceof_in.ts` | أدوات التضييق: `typeof`, `instanceof`, `in` |
| `07_type_predicates_assertions.ts` | دوال `is` (type predicates) و assertion functions |

---

### `03_object_modeling` — نمذجة الكائنات

كيف تصمّم أشكال البيانات بـ `type` و `interface`.

| الملف | الشرح |
|-------|--------|
| `01_type_interface.ts` | الفرق والاستخدام الأساسي لـ `type` و `interface` |
| `02_extending_intersection.ts` | وراثة الـ interface بـ `extends` والتقاطع `&` |
| `03_readonly_optional.ts` | خصائص `readonly` والخصائص الاختيارية |
| `04_index_signatures.ts` | مفاتيح ديناميكية: `[key: string]: ...` |
| `05_discriminated_unions.ts` | unions بمميّز (`status`) لتفريق الحالات بأمان |
| `06_structural_typing.ts` | الكتابة البنيوية: المهم شكل الكائن لا اسم النوع |

---

### `04_generics_advanced_types` — Generics والأنواع المتقدمة

أنواع مرنة قابلة لإعادة الاستخدام وأدوات تحويل الأنواع.

| الملف | الشرح |
|-------|--------|
| `01_generic_functions_interfaces.ts` | دوال وواجهات عامة بـ `<T>` |
| `02_generic_constraints.ts` | تقييد الـ generic بـ `extends` |
| `03_keyof_typeof.ts` | استخراج مفاتيح النوع بـ `keyof` ونوع القيمة بـ `typeof` |
| `04_indexed_access.ts` | الوصول لنوع خاصية: `T[K]` |
| `05_conditional_infer.ts` | أنواع شرطية `T extends U ? X : Y` و `infer` |
| `06_mapped_types.ts` | تحويل كل خصائص نوع إلى شكل جديد |
| `07_utility_types.ts` | أنواع جاهزة: `Partial`, `Pick`, `Omit`, `Record`, ... |
| `08_template_literal_types.ts` | بناء أنواع نصية من أجزاء بـ template literals |

---

### `05_classes_oop` — الكلاسات والبرمجة الكائنية

OOP في TypeScript: تغليف، وراثة، وتركيبة.

| الملف | الشرح |
|-------|--------|
| `01_classes_constructors.ts` | تعريف الكلاس والـ constructor |
| `02_access_modifiers.ts` | مستويات الوصول: `public`, `private`, `protected` |
| `03_readonly_static.ts` | خصائص `readonly` وأعضاء `static` على مستوى الكلاس |
| `04_inheritance_implements.ts` | الوراثة بـ `extends` وتنفيذ العقود بـ `implements` |
| `05_abstract_classes.ts` | كلاسات مجرّدة كقوالب لا تُنشأ منها كائنات مباشرة |
| `06_composition_vs_inheritance.ts` | متى تستخدم التركيبة (has-a) بدل الوراثة (is-a) |
| `07_getters_setters.ts` | قراءة/كتابة خصائص مع منطق تحكّم إضافي |
| `08_parameter_properties.ts` | اختصار تعريف الخاصية من معاملات الـ constructor |

---

### `06_modules_tooling` — الوحدات والأدوات

تنظيم الملفات، الإعدادات، وتشغيل TypeScript في Node.

#### `01_named_default_exports/`
| الملف | الشرح |
|-------|--------|
| `exports.ts` | تصدير named و default وأنواع |
| `main.ts` | استيرادها معًا واستخدامها |

#### `02_import_export_type/`
| الملف | الشرح |
|-------|--------|
| `models.ts` | `export type` لأنواع تُحذف وقت التشغيل |
| `main.ts` | `import type` مقابل استيراد القيم العادية |

#### `03_module_organization/`
| الملف | الشرح |
|-------|--------|
| `types.ts` | أنواع مشتركة في ملف واحد |
| `users.ts` / `products.ts` | وحدات منفصلة لكل مجال |
| `index.ts` | barrel يعيد التصدير من مكان واحد |
| `main.ts` | نقطة دخول تستورد من الـ barrel |

#### `04_tsconfig_strict/`
| الملف | الشرح |
|-------|--------|
| `strict_options.ts` | شرح أهم خيارات `strict` في التعليقات |
| `main.ts` | أمثلة كود صحيحة تحت الوضع الصارم |

#### `05_tsc_tsx_nodejs/`
| الملف | الشرح |
|-------|--------|
| `main.ts` | كيف تشغّل TypeScript بـ `tsc` / `tsx` / Node |
| `app.ts` | دالة بسيطة للتجربة مع أدوات التشغيل |

#### `06_esm_commonjs/`
| الملف | الشرح |
|-------|--------|
| `main.ts` | مقارنة ESM و CommonJS |
| `esm_math.ts` / `esm_main.ts` | مثال عملي على `import`/`export` (ESM) |

#### `07_ambient_declarations/`
| الملف | الشرح |
|-------|--------|
| `main.ts` | مقدمة عن ملفات التعريف `.d.ts` و `declare` |
| `global.d.ts` | أنواع عامة على `globalThis` |
| `legacy-lib.d.ts` | وصف مكتبة JS قديمة بدون أنواع جاهزة |
| `runtime.ts` | القيم الفعلية وقت التشغيل التي تطابق التعريفات |

---

### `07_async_runtime` — غير المتزامن وبيئة التشغيل

Promises، التعامل مع الأخطاء، والتعامل مع Node وبيانات وقت التشغيل.

| الملف | الشرح |
|-------|--------|
| `01_promise_async_await.ts` | أساسيات `Promise` و `async`/`await` |
| `02_promise_all_settled.ts` | تشغيل عدة وعود معًا: `Promise.all` و `allSettled` |
| `03_try_catch_unknown.ts` | التقاط الأخطاء ومعاملتها كـ `unknown` بأمان |
| `04_json_runtime_validation.ts` | `JSON.parse` والتحقق من الشكل وقت التشغيل |
| `05_filesystem_nodejs.ts` | قراءة/كتابة ملفات بـ `node:fs/promises` |
| `06_environment_variables.ts` | قراءة `process.env` وملف `.env` عبر `dotenv` |
| `07_null_undefined_optional_chaining.ts` | `null` / `undefined` و `?.` و `??` |

---

### `08_testing_design` — الاختبار والتصميم

مبادئ كتابة كود قابل للاختبار وبنية أوضح للمشاريع.

| الملف | الشرح |
|-------|--------|
| `01_unit_testing.ts` | فكرة اختبار الوحدة: دوال صغيرة + تحقق من النتيجة |
| `02_assertions_edge_cases.ts` | التأكيدات (assertions) وحالات الحدّ (edge cases) |
| `03_dependency_injection.ts` | تمرير الاعتماديات من الخارج لتسهيل الاختبار |
| `04_separation_of_concerns.ts` | فصل المسؤوليات بدل خلط كل شيء في دالة واحدة |
| `05_solid_basics.ts` | مبادئ SOLID باختصار مع أمثلة كلاسات |
| `06_repository_service.ts` | نمط Repository (بيانات) و Service (منطق العمل) |
| `07_data_validation.ts` | التحقق من صحة المدخلات قبل استخدامها |
| `08_error_classes_result.ts` | كلاسات أخطاء مخصّصة ونمط Result للنجاح/الفشل |

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
