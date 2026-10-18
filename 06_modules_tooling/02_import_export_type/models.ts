// export type — تصدير أنواع فقط (تُحذف وقت التشغيل)

export type Product = {
  id: number;
  title: string;
  price: number;
};

export type Id = string | number;

// قيمة عادية للتصدير (للمقارنة مع type)
export const storeName = "TypeScript Shop";

export function createProduct(title: string, price: number): Product {
  return { id: 1, title, price };
}
