// Indexed access types — T[K] يستخرج نوع خاصية من نوع آخر

type User = {
  id: number;
  name: string;
  email: string;
};

type UserId = User["id"]; // number
type UserName = User["name"]; // string
type UserIdOrName = User["id" | "name"]; // number | string

const id: UserId = 1;
const name: UserName = "Marwan";
const value: UserIdOrName = "hello"; // أو رقم

console.log(id, name, value);

// مفيد مع الدوال: نوع الإرجاع = نوع الخاصية
function getField<K extends keyof User>(user: User, key: K): User[K] {
  return user[key];
}

const user: User = {
  id: 10,
  name: "Ali",
  email: "ali@example.com",
};

const email = getField(user, "email"); // نوعه string
const userId = getField(user, "id"); // نوعه number

console.log(email, userId);

// الخلاصة:
// User["id"] = نوع خاصية id داخل User
