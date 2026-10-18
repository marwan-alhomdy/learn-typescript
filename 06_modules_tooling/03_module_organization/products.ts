// وحدة products — كل ما يخص المنتجات
import type { Product } from "./types.js";

export function createProduct(title: string, price: number): Product {
  return { id: Date.now(), title, price };
}

export function formatProduct(product: Product): string {
  return `${product.title}: $${product.price}`;
}
