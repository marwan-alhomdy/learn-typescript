// readonly و static داخل الكلاسات

class User {
  readonly id: number; // ما تتغير بعد الإنشاء
  name: string;

  static count = 0; // تخص الكلاس نفسه، مو كل كائن

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    User.count++;
  }

  static getCount(): number {
    return User.count;
  }
}

const u1 = new User(1, "Marwan");
const u2 = new User(2, "Ali");

// u1.id = 99; // Error: readonly
u1.name = "Marwan Alhomdy"; // مسموح

console.log(u1, u2);
console.log(User.count); // 2
console.log(User.getCount()); // 2
// console.log(u1.count); // Error: static تُستدعى من الكلاس مو من الكائن
