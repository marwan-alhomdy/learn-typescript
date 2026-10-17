// readonly — الخاصية تُقرأ فقط، ما تتغير بعد الإنشاء
interface User {
  readonly id: number;
  name: string;
  email?: string; // optional — ممكن ما تكون موجودة
}

const user: User = {
  id: 1,
  name: "Marwan Alhomdy",
};

// user.id = 2; // Error: Cannot assign to 'id' because it is a read-only property
user.name = "Marwan"; // مسموح

console.log(user);

const userWithEmail: User = {
  id: 2,
  name: "Ali",
  email: "ali@example.com",
};

console.log(userWithEmail);

// الفرق باختصار:
// readonly: موجودة وملزومة، لكن ما تتعدل
// optional (?): ممكن تكون موجودة أو لا
