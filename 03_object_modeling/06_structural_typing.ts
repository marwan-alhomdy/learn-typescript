// Structural typing — المهم شكل الكائن، مو اسم النوع

interface Point {
  x: number;
  y: number;
}

function printPoint(p: Point) {
  console.log(`(${p.x}, ${p.y})`);
}

// ما لازم يكون النوع Point بالاسم — يكفي أنه يملك x و y
const coords = { x: 10, y: 20 };
printPoint(coords); // يعمل

const labeled = { x: 1, y: 2, label: "A" };
printPoint(labeled); // يعمل — الخصائص الزائدة مسموحة عند تمرير متغير

// Excess property checks — عند تمرير object حرفي مباشرة
printPoint({ x: 5, y: 8 }); // يعمل

// printPoint({ x: 5, y: 8, label: "B" }); // Error:
// Object literal may only specify known properties

// الخلاصة:
// TypeScript يقارن الشكل (structure) مو الاسم
// لكن الـ object الحرفي يُفحص بصرامة أكثر (excess property check)
