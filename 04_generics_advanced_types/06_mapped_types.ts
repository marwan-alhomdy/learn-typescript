// Mapped types — تحويل كل خصائص نوع إلى شكل جديد

type User = {
  id: number;
  name: string;
  email: string;
};

// اجعل كل الخصائص optional
type PartialUser = {
  [K in keyof User]?: User[K];
};

const draft: PartialUser = {
  name: "Marwan", // باقي الخصائص مش مطلوبة
};

console.log(draft);

// اجعل كل الخصائص readonly
type ReadonlyUser = {
  readonly [K in keyof User]: User[K];
};

const user: ReadonlyUser = {
  id: 1,
  name: "Ali",
  email: "ali@example.com",
};

// user.name = "Sara"; // Error: readonly
console.log(user);

// اجعل كل القيم boolean
type Flags = {
  [K in keyof User]: boolean;
};

const flags: Flags = {
  id: true,
  name: false,
  email: true,
};

console.log(flags);

// الخلاصة:
// [K in keyof T]: تمر على كل مفتاح وتحوّل نوعه
