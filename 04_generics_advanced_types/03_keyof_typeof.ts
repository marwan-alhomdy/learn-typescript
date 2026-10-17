// keyof — يستخرج أسماء خصائص النوع كـ union من الـ literals
type User = {
  id: number;
  name: string;
  email: string;
};

type UserKeys = keyof User; // "id" | "name" | "email"

const keys: UserKeys[] = ["id", "name", "email"];
// const badKey: UserKeys = "age"; // Error: "age" مش من مفاتيح User

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user: User = {
  id: 1,
  name: "Marwan",
  email: "marwan@example.com",
};

const key: UserKeys = "name";
console.log(getProperty(user, key));
console.log(getProperty(user, "id"));
console.log(keys);

// typeof — يستخرج نوع قيمة موجودة وقت الترجمة
const config = {
  host: "localhost",
  port: 3000,
  debug: true,
};

type Config = typeof config;
// نفس الشكل: { host: string; port: number; debug: boolean }

const anotherConfig: Config = {
  host: "127.0.0.1",
  port: 8080,
  debug: false,
};

console.log(anotherConfig);

// الفرق باختصار:
// keyof: مفاتيح النوع
// typeof: نوع القيمة
