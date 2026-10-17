// Optional parameters — بـ ? (ممكن ما تمرّره)
function greet(name: string, title?: string): string {
  if (title) {
    return `Hello, ${title} ${name}`;
  }
  return `Hello, ${name}`;
}

console.log(greet("Marwan"));
console.log(greet("Marwan", "Eng."));

// Default parameters — قيمة افتراضية إذا ما مرّرت شيء
function createUser(name: string, role: string = "user"): string {
  return `${name} is a ${role}`;
}

console.log(createUser("Ali"));
console.log(createUser("Sara", "admin"));

// الفرق باختصار:
// optional (?): ممكن undefined
// default (=): دائماً فيه قيمة (الافتراضية أو اللي مرّرتها)
