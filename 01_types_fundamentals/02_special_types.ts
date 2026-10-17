// any — يقبل أي شيء، لكن خطير
let data: any = "hello";
data = 42;
data.toFixed(); // TypeScript ما يعترض — حتى لو خطأ وقت التشغيل

// unknown — آمن: لازم narrow قبل الاستخدام
let input: unknown = "hello";
if (typeof input === "string") {
  console.log(input.toUpperCase());
}

// void — دالة بدون return مفيد
function logMessage(msg: string): void {
  console.log(msg);
}

logMessage("Hello, world!");

// never — ما ترجع أبداً
function throwError(message: string): never {
  throw new Error(message);
}

//throwError("An error occurred");
