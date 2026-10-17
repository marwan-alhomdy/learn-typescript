// Function parameters و return types

// parameters + return type صريح
function add(a: number, b: number): number {
  return a + b;
}

// return type مستنتج (inference)
function greet(name: string) {
  return `Hello, ${name}`;
}

// void — ما ترجع قيمة مفيدة
function logSum(a: number, b: number): void {
  console.log(a + b);
}

console.log(add(2, 3));
console.log(greet("Marwan"));
logSum(10, 5);
