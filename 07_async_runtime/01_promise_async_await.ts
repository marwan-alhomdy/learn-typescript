// Promise و async/await

// Promise — وعد بنتيجة لاحقاً (نجاح أو فشل)
function fetchUser(id: number): Promise<{ id: number; name: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: "Marwan" });
    }, 500);
  });
}

// الطريقة القديمة: .then
fetchUser(1).then((user) => {
  console.log("then:", user);
});

// async/await — نفس الفكرة بصياغة أوضح
async function main() {
  const user = await fetchUser(2); // تنتظر النتيجة
  console.log("await:", user);
}

main();

// الخلاصة:
// Promise = كائن يمثل عملية غير متزامنة
// async = الدالة ترجع Promise
// await = انتظر نتيجة الـ Promise داخل async
