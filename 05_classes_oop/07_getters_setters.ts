// Getters و Setters — قراءة وكتابة خصائص مع تحكم إضافي

class Person {
  private _age: number = 0;

  constructor(public name: string) {}

  // getter — يُستدعى كخاصية: person.age
  get age(): number {
    return this._age;
  }

  // setter — يُستدعى عند التعيين: person.age = 20
  set age(value: number) {
    if (value < 0) {
      throw new Error("Age cannot be negative");
    }
    this._age = value;
  }
}

const person = new Person("Marwan");
person.age = 20; // يستدعي الـ setter
console.log(person.name, person.age); // يستدعي الـ getter

// person.age = -5; // يرمي Error وقت التشغيل

// الفائدة:
// تقدر تضيف تحقق (validation) بدون ما تغيّر طريقة الاستخدام
