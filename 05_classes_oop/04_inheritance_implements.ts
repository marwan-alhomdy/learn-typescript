// Inheritance (extends) و implements

// interface — عقد يجب على الكلاس الالتزام به
interface Printable {
  print(): void;
}

class Animal {
  constructor(public name: string) {}

  move(): void {
    console.log(`${this.name} is moving`);
  }
}

// extends — يرث من كلاس آخر
// implements — يلتزم بـ interface
class Dog extends Animal implements Printable {
  bark(): void {
    console.log(`${this.name} says woof`);
  }

  print(): void {
    console.log(`Dog: ${this.name}`);
  }
}

const dog = new Dog("Rex");
dog.move(); // من Animal
dog.bark(); // من Dog
dog.print(); // من Printable

// الفرق باختصار:
// extends: وراثة سلوك/خصائص من كلاس
// implements: الالتزام بشكل (عقد) بدون وراثة تنفيذ
