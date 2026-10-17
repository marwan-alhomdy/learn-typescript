// Arrow functions — صياغة مختصرة للدوال
const add = (a: number, b: number): number => a + b;
const greet = (name: string): string => `Hello, ${name}`;

console.log(add(2, 3));
console.log(greet("Marwan"));

// Callbacks — تمرّر دالة كـ parameter لدالة ثانية
function processNumbers(
  numbers: number[],
  callback: (n: number) => number,
): number[] {
  return numbers.map(callback);
}

const doubled = processNumbers([1, 2, 3], (n) => n * 2);
const squared = processNumbers([1, 2, 3], (n) => n * n);

console.log(doubled, squared);

// الفرق باختصار:
// arrow: طريقة كتابة الدالة (() => ...)
// callback: فكرة تمرير دالة لتُستدعى لاحقاً
