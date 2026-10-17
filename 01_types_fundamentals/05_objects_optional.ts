// Objects — خصائص مطلوبة
const user: { name: string; age: number } = {
  name: "Marwan Alhomdy",
  age: 20,
};

console.log(user);

// Optional properties — الخاصية اختيارية بـ ?
const profile: { name: string; email?: string } = {
  name: "Marwan Alhomdy",
  // email مش موجود — مسموح
};

const profileWithEmail: { name: string; email?: string } = {
  name: "Ali",
  email: "ali@example.com",
};

console.log(profile, profileWithEmail);
