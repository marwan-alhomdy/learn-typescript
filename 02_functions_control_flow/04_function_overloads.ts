// Function overloads — نفس الدالة بأكثر من توقيع

// التوقيعات (overloads)
function format(value: string): string;
function format(value: number): string;
function format(value: boolean): string;

// التنفيذ الفعلي (implementation)
function format(value: string | number | boolean): string {
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  if (typeof value === "number") {
    return value.toFixed(2);
  }
  return value ? "yes" : "no";
}

console.log(format("marwan"));
console.log(format(3.14159));
console.log(format(true));

// الفائدة:
// TypeScript يعرف نوع الإرجاع حسب نوع الـ argument اللي مرّرته
