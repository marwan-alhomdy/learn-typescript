/**
 * tsconfig.json — أهم الخيارات في مشروعك الحالي:
 *
 * "strict": true
 *   يشغّل مجموعة فحوصات معاً:
 *   - strictNullChecks
 *   - strictFunctionTypes
 *   - strictBindCallApply
 *   - strictPropertyInitialization
 *   - noImplicitAny
 *   - noImplicitThis
 *   - alwaysStrict
 *   - useUnknownInCatchVariables
 *
 * "noUncheckedIndexedAccess": true
 *   الوصول لمصفوفة يعطي T | undefined
 *
 * "exactOptionalPropertyTypes": true
 *   optional ما يعني إنك تقدر تعيّنها undefined صراحة إلا إذا النوع يسمح
 *
 * "verbatimModuleSyntax": true
 *   لازم import type للأنواع، و ESM واضح
 *
 * "module": "nodenext"
 *   يطابق سلوك Node الحديث (امتداد .js في الاستيراد)
 */

export {};
