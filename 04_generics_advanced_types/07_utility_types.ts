// Utility types — أنواع جاهزة من TypeScript

type User = {
  id: number;
  name: string;
  email?: string;
};

// Partial — كل الخصائص اختيارية
const draft: Partial<User> = { name: "Marwan" };
console.log(draft);

// Required — كل الخصائص مطلوبة (حتى اللي كانت ?)
const full: Required<User> = {
  id: 1,
  name: "Ali",
  email: "ali@example.com",
};
console.log(full);

// Readonly — ما تتعدل
const frozen: Readonly<User> = { id: 2, name: "Sara" };
// frozen.name = "X"; // Error
console.log(frozen);

// Pick — اختر خصائص معينة
type UserPreview = Pick<User, "id" | "name">;
const preview: UserPreview = { id: 3, name: "Omar" };
console.log(preview);

// Omit — احذف خصائص معينة
type UserWithoutEmail = Omit<User, "email">;
const noEmail: UserWithoutEmail = { id: 4, name: "Lina" };
console.log(noEmail);

// Record — خريطة مفاتيح → قيم
type Roles = Record<"admin" | "user" | "guest", boolean>;
const roles: Roles = { admin: true, user: true, guest: false };
console.log(roles);

// ReturnType و Parameters — من توقيع الدالة
function createUser(name: string, age: number) {
  return { name, age };
}

type Created = ReturnType<typeof createUser>; // { name: string; age: number }
type Args = Parameters<typeof createUser>; // [string, number]

const created: Created = { name: "Marwan", age: 20 };
const args: Args = ["Marwan", 20];
console.log(created, args);
