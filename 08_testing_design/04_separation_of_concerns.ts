// Separation of Concerns — كل جزء له مسؤولية واحدة

type User = { id: number; name: string; email: string };

// بدون فصل — كل شيء مختلط في دالة واحدة
function registerUserBad(name: string, email: string): void {
  if (!email.includes("@")) {
    console.log("invalid email");
    return;
  }
  const user = { id: Date.now(), name, email: email.toLowerCase() };
  console.log("saved to db:", user);
  console.log("welcome email sent to", user.email);
}

// مع فصل الاهتمامات — كل طبقة واضحة
function validateEmail(email: string): boolean {
  return email.includes("@") && email.includes(".");
}

function createUser(name: string, email: string): User {
  return {
    id: Date.now(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
  };
}

function saveUser(user: User): void {
  // مسؤولية التخزين فقط
  console.log("db.save:", user);
}

function sendWelcomeEmail(user: User): void {
  // مسؤولية الإشعار فقط
  console.log("mail.send: Welcome", user.email);
}

function registerUser(name: string, email: string): User | null {
  if (!validateEmail(email)) {
    console.log("invalid email");
    return null;
  }

  const user = createUser(name, email);
  saveUser(user);
  sendWelcomeEmail(user);
  return user;
}

const user = registerUser("  Marwan  ", "Marwan@Example.com");
console.log("result:", user);

registerUser("Ali", "bad-email"); // يفشل التحقق

// الخلاصة:
// validation / create / save / email كل واحد مستقل
// أسهل للفهم والاختبار والتعديل
