// Conditional types — نوع يعتمد على شرط: T extends U ? X : Y

type IsString<T> = T extends string ? "yes" : "no";

type A = IsString<string>; // "yes"
type B = IsString<number>; // "no"

const a: A = "yes";
const b: B = "no";
console.log(a, b);

// مثال عملي: إذا Array استخرج نوع العنصر، وإلا أرجع نفس النوع
type Flatten<T> = T extends (infer Item)[] ? Item : T;

type Flat1 = Flatten<string[]>; // string
type Flat2 = Flatten<number>; // number

const item: Flat1 = "hello";
const num: Flat2 = 42;
console.log(item, num);

// infer — يستخرج نوع من داخل شكل معيّن
type ReturnOf<T> = T extends (...args: infer _A) => infer R ? R : never;

function getUser() {
  return { id: 1, name: "Marwan" };
}

type User = ReturnOf<typeof getUser>; // { id: number; name: string }

const user: User = { id: 1, name: "Marwan" };
console.log(user);

// الخلاصة:
// conditional: if/else على مستوى الأنواع
// infer: التقط نوع من داخل الشكل
