// Named exports — تصدير بأسماء محددة (ممكن أكثر من واحد)
export const PI = 3.14;

export function add(a: number, b: number): number {
  return a + b;
}

export type User = {
  id: number;
  name: string;
};

// Default export — تصدير افتراضي واحد لكل ملف
export default function greet(name: string): string {
  return `Hello, ${name}`;
}
