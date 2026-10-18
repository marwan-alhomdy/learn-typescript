// import type — استيراد أنواع فقط (ما تدخل في الـ JS الناتج)
import type { Product, Id } from "./models.js";

// استيراد قيم عادية
import { storeName, createProduct } from "./models.js";

const id: Id = "p-100";
const product: Product = createProduct("Laptop", 1200);

console.log(storeName);
console.log(id, product);

// مع verbatimModuleSyntax:
// import type { Product }  ← للأنواع
// import { createProduct } ← للقيم
