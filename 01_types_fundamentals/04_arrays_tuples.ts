// Arrays — قائمة قيم من نفس النوع
const numbers: number[] = [1, 2, 3];
const names: Array<string> = ["Marwan", "Ali", "Sara"]; // نفس الفكرة بطريقة ثانية

console.log(numbers, names);

// Tuples — قائمة بطول ثابت وأنواع محددة لكل موضع
const person: [string, number] = ["Marwan Alhomdy", 20];
const point: [number, number] = [10, 25];

console.log(person, point);

// الفرق باختصار:
// array: طول مرن، كل العناصر عادة من نوع واحد
// tuple: طول ثابت، كل موضع له نوعه
