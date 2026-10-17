// Generic constraints — تقييد T بشرط باستخدام extends

// T لازم يكون له خاصية length
function logLength<T extends { length: number }>(value: T): number {
  console.log(value.length);
  return value.length;
}

logLength("hello"); // string عنده length
logLength([1, 2, 3]); // array عنده length
// logLength(123); // Error: number ما عنده length

// مثال أوضح: كائن فيه name
interface HasName {
  name: string;
}

function greet<T extends HasName>(person: T): string {
  return `Hello, ${person.name}`;
}

console.log(greet({ name: "Marwan", age: 20 }));
console.log(greet({ name: "Ali" }));
// greet({ age: 20 }); // Error: ناقص name

// الخلاصة:
// <T> حر تماماً
// <T extends ...> حر داخل حدود معينة
