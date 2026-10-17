// Parameter properties — اختصار لتعريف الخاصية وتعيينها من الـ constructor

// بدون parameter properties (طويل)
class UserLong {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

// مع parameter properties (مختصر)
class User {
  constructor(
    public name: string,
    public age: number,
    private password: string,
    readonly id: number,
  ) {}

  checkPassword(input: string): boolean {
    return this.password === input;
  }
}

const user = new User("Marwan", 20, "secret", 1);
console.log(user.name, user.age, user.id);
console.log(user.checkPassword("secret"));
// console.log(user.password); // Error: private

const long = new UserLong("Ali", 25);
console.log(long.name, long.age);

// الخلاصة:
// public/private/protected/readonly قبل parameter = إنشاء خاصية تلقائياً
