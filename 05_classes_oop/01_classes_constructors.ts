// Classes و Constructors

class Person {
  name: string;
  age: number;

  // constructor — يشتغل عند إنشاء كائن جديد
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet(): string {
    return `Hello, I'm ${this.name}`;
  }
}

const person = new Person("Marwan Alhomdy", 20);
console.log(person.greet());
console.log(person.name, person.age);

// كائن ثاني من نفس الـ class
const person2 = new Person("Ali", 25);
console.log(person2.greet());
