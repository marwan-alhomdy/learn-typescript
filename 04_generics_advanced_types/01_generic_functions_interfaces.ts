// Generic functions — نوع مرن يُحدد عند الاستدعاء
function identity<T>(value: T): T {
  return value;
}

const num = identity<number>(42);
const text = identity("hello"); // T مستنتج = string

console.log(num, text);

function firstElement<T>(items: T[]): T | undefined {
  return items[0];
}

console.log(firstElement([10, 20, 30]));
console.log(firstElement(["a", "b", "c"]));

// Generic interfaces — واجهة تعمل مع أي نوع
interface Box<T> {
  value: T;
}

const numberBox: Box<number> = { value: 100 };
const stringBox: Box<string> = { value: "TypeScript" };

console.log(numberBox, stringBox);

// الفائدة:
// تكتب الكود مرة واحدة، ويشتغل مع أنواع مختلفة بأمان
