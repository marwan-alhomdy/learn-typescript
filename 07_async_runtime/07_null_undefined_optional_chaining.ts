// null و undefined و optional chaining

// undefined — قيمة لم تُعيَّن
let username: string | undefined;
console.log(username); // undefined

// null — قيمة فارغة مقصودة
let selectedId: number | null = null;
console.log(selectedId);

selectedId = 5;
console.log(selectedId);

// Optional chaining (?.) — وصول آمن بدون crash
type User = {
  name: string;
  address?: {
    city: string;
    street?: string;
  };
};

const user: User = {
  name: "Marwan",
  address: {
    city: "Sana'a",
  },
};

console.log(user.address?.city); // "Sana'a"
console.log(user.address?.street); // undefined — ما يرمي error
console.log(user.address?.street?.toUpperCase()); // undefined

const guest: User = { name: "Guest" };
console.log(guest.address?.city); // undefined

// Nullish coalescing (??) — افتراضي فقط لـ null/undefined
const city = guest.address?.city ?? "Unknown";
console.log(city); // "Unknown"

const count = 0;
console.log(count || 10); // 10 — لأن 0 falsy
console.log(count ?? 10); // 0  — لأن 0 مو null/undefined

// الخلاصة:
// ?.  → وصول آمن
// ??  → قيمة افتراضية عند null/undefined فقط
