// أمثلة تعمل تحت strict — والأخطاء مذكورة بالتعليقات

// 1) noImplicitAny — لازم تعرف النوع
function greet(name: string): string {
  return `Hello, ${name}`;
}
// function greet(name) { ... } // Error: Parameter 'name' implicitly has an 'any' type

// 2) strictNullChecks — null/undefined مش مسموحة بدون فحص
function printLength(text: string | null) {
  // console.log(text.length); // Error: Object is possibly 'null'
  if (text !== null) {
    console.log(text.length);
  }
}

printLength("TypeScript");
printLength(null);

// 3) noUncheckedIndexedAccess — العنصر قد يكون undefined
const nums = [10, 20, 30];
const first = nums[0]; // number | undefined
console.log(first?.toFixed(2));

// 4) exactOptionalPropertyTypes
type User = {
  name: string;
  email?: string;
};

const user: User = { name: "Marwan" }; // OK
// const bad: User = { name: "Marwan", email: undefined }; // Error مع exactOptionalPropertyTypes
console.log(user);

console.log(greet("Marwan"));
