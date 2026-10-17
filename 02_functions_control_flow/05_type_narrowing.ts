// Type narrowing — تضييق النوع من union إلى نوع أدق

function printId(id: string | number) {
  // داخل if، TypeScript يعرف إنه string
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    // هنا لازم يكون number
    console.log(id.toFixed(2));
  }
}

printId("abc-123");
printId(42);

// Truthiness narrowing — فحص وجود القيمة
function printLength(text: string | null | undefined) {
  if (text) {
    console.log(text.length);
  } else {
    console.log("no text");
  }
}

printLength("hello");
printLength(null);

// Equality narrowing
function compare(x: string | number, y: string | boolean) {
  if (x === y) {
    // هنا النوع المشترك: string
    console.log(x.toUpperCase());
  }
}

compare("hi", "hi");
