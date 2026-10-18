# Classes والبرمجة كائنية التوجه (OOP)

هذا المجلد يغطي **الكلاسات في TypeScript** من الأساس (constructors، خصائص) إلى **الت encapsulation** (public/private/protected)، **readonly/static**، **الوراثة والواجهات**، **الكلاسات الم abstract**، **التكوين مقابل الوراثة**، **getters/setters**، و**parameter properties** للاختصار. الأسلوب قريب من JavaScript الحديث مع طبقة types إضافية.

---

## 01_classes_constructors — الكلاسات والـ constructors

### ماذا تتعلم؟

- تعريف **class** بخصائص وmethods.
- **`constructor`**: يُنفَّذ عند `new ClassName(...)` ويُهيّئ `this`.
- إنشاء **عدة instances** من نفس الكلاس بقيم مختلفة.

### أفكار من الكود

```ts
class Person {
  name: string;
  age: number;

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
```

### نقاط مهمة / أخطاء شائعة

- يجب استخدام **`new`** — استدعاء `Person(...)` بدون `new` خطأ (في strict class mode).
- الخصائص تُعلَن على الكلاس (أو عبر parameter properties في درس لاحق) قبل أو داخل الـ constructor حسب أسلوبك.
- `this` داخل methods يشير إلى **نفس الـ instance**.

### التشغيل

```bash
npx tsx 05_classes_oop/01_classes_constructors.ts
```

---

## 02_access_modifiers — public, private, protected

### ماذا تتعلم؟

- **`public`**: متاح من أي مكان (الافتراضي إن لم تُذكر).
- **`private`**: داخل الكلاس فقط — لا من subclasses ولا من خارج الكلاس.
- **`protected`**: داخل الكلاس **والكلاسات الفرعية** — لا من خارج الهرم.

### أفكار من الكود

```ts
class BankAccount {
  public owner: string;
  private balance: number;
  protected bankName: string;

  public getBalance(): number {
    return this.balance;
  }

  public deposit(amount: number): void {
    this.balance += amount;
  }
}

class SavingsAccount extends BankAccount {
  showBank(): string {
    return this.bankName; // protected — مسموح
    // return this.balance; // خطأ: private
  }
}
```

```ts
const account = new BankAccount("Marwan", 1000, "AlKuraimi");
console.log(account.owner);
// console.log(account.balance);   // خطأ
// console.log(account.bankName);  // خطأ من خارج الهرم
```

### نقاط مهمة / أخطاء شائعة

- **private في TS** يقيّد وقت الترجمة فقط — في JavaScript الناتج الحقول قد تبقى موجودة؛ لا تعتمد على private للأمان الأمني.
- استخدم **methods عامة** (`getBalance`, `deposit`) للتحكم في الوصول للـ `balance`.
- من خارج الكلاس لا يمكن قراءة `protected` حتى لو كان لديك instance.

### التشغيل

```bash
npx tsx 05_classes_oop/02_access_modifiers.ts
```

---

## 03_readonly_static — readonly و static

### ماذا تتعلم؟

- **`readonly`**: تُعيَّن في الـ constructor (أو عند التعريف) و**لا تُعاد كتابتها** بعد ذلك.
- **`static`**: ينتمي لل**كلاس** نفسه وليس لكل instance — عدادات، factories، constants مشتركة.

### أفكار من الكود

```ts
class User {
  readonly id: number;
  name: string;

  static count = 0;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    User.count++;
  }

  static getCount(): number {
    return User.count;
  }
}

// u1.id = 99; // خطأ: readonly
console.log(User.count);
console.log(User.getCount());
// u1.count // خطأ: static من الكائن
```

### نقاط مهمة / أخطاء شائعة

- `readonly` ≠ `const`: الأول على **خاصية كائن**، الثاني على **ربط متغير**.
- `User.count++` في الـ constructor يزيد العداد لكل instance جديد — نمط شائع للتتبع.
- استدعِ static عبر **`ClassName.member`** وليس `instance.member`.

### التشغيل

```bash
npx tsx 05_classes_oop/03_readonly_static.ts
```

---

## 04_inheritance_implements — extends و implements

### ماذا تتعلم؟

- **`extends`**: وراثة من **class** — methods وخصائص الأب (مع `super` عند الحاجة).
- **`implements`**: الالتزام ب**interface** — شكل/عقد؛ لا يرث تنفيذاً تلقائياً.
- يمكن الجمع: `class Dog extends Animal implements Printable`.

### أفكار من الكود

```ts
interface Printable {
  print(): void;
}

class Animal {
  constructor(public name: string) {}
  move(): void {
    console.log(`${this.name} is moving`);
  }
}

class Dog extends Animal implements Printable {
  bark(): void { /* ... */ }
  print(): void {
    console.log(`Dog: ${this.name}`);
  }
}

const dog = new Dog("Rex");
dog.move();  // من Animal
dog.bark();  // من Dog
dog.print(); // من Printable
```

### نقاط مهمة / أخطاء شائعة

- **`implements`**: يجب تنفيذ **كل** members الـ interface وإلا خطأ compile.
- **`extends`**: إذا أعدت تعريف constructor في الابن، غالباً **`super(...)`** مطلوب قبل استخدام `this`.
- الفرق: **extends** = وراثة سلوك؛ **implements** = التزام بشكل API.

### التشغيل

```bash
npx tsx 05_classes_oop/04_inheritance_implements.ts
```

---

## 05_abstract_classes — كلاسات abstract

### ماذا تتعلم؟

- **`abstract class`**: لا يمكن `new Shape(...)` مباشرة — قالب للأ subclasses.
- **method عادية** في ال abstract: تنفيذ مشترك (`describe`).
- **`abstract method`**: بدون body — **يجب** على كل subclass تنفيذها (`area`).

### أفكار من الكود

```ts
abstract class Shape {
  constructor(public color: string) {}

  describe(): string {
    return `A ${this.color} shape`;
  }

  abstract area(): number;
}

class Circle extends Shape {
  constructor(color: string, public radius: number) {
    super(color);
  }
  area(): number {
    return Math.PI * this.radius * this.radius;
  }
}
```

### نقاط مهمة / أخطاء شائعة

- نسيان **`area()`** في subclass → خطأ: Class is not abstract.
- **`super(color)`** في constructor الابن يمرر للأب ما يحتاجه.
- الفرق عن **interface**: abstract class يمكن أن يحتوي **تنفيذاً** مشتركاً + abstract members.

### التشغيل

```bash
npx tsx 05_classes_oop/05_abstract_classes.ts
```

---

## 06_composition_vs_inheritance — التكوين مقابل الوراثة

### ماذا تتعلم؟

- **Inheritance (is-a)**: `Car extends Engine` — علاقة «نوع من»؛ قوية وقد تربطك بتصميم صعب التغيير.
- **Composition (has-a)**: `Car` **يملك** `Engine` — استبدال واختبار أسهل.

### أفكار من الكود

```ts
// Inheritance
class CarWithInheritance extends Engine {
  drive(): void {
    this.start();
    console.log("Car is driving");
  }
}

// Composition
class CarWithComposition {
  private engine: Engine;
  constructor(engine: Engine) {
    this.engine = engine;
  }
  drive(): void {
    this.engine.start();
    console.log("Car is driving");
  }
}

const car2 = new CarWithComposition(new Engine());
```

### نقاط مهمة / أخطاء شائعة

- سيارة **ليست** محركاً — الوراثة هنا **تعليمية**؛ في تصميم حقيقي غالباً **composition** أنسب.
- مع composition يمكن حقن `Engine` mock في الاختبارات.
- قاعدة عملية: **favor composition over inheritance** عندما لا يكون is-a واضحاً.

### التشغيل

```bash
npx tsx 05_classes_oop/06_composition_vs_inheritance.ts
```

---

## 07_getters_setters — getters و setters

### ماذا تتعلم؟

- **`get` / `set`**: واجهة كالخاصية (`person.age`) مع منطق داخلي.
- تخزين حقيقي غالباً في حقل **private** (`_age`) مع **validation** في الـ setter.

### أفكار من الكود

```ts
class Person {
  private _age: number = 0;

  constructor(public name: string) {}

  get age(): number {
    return this._age;
  }

  set age(value: number) {
    if (value < 0) {
      throw new Error("Age cannot be negative");
    }
    this._age = value;
  }
}

person.age = 20;           // setter
console.log(person.age);   // getter
```

### نقاط مهمة / أخطاء شائعة

- الـ getter/setter **لا يأخذان أقواساً** عند الاستخدام — يبدوان كخصائص.
- التحقق من `-5` يحدث **وقت التشغيل** — TypeScript لا يمنع تعيين number سالب في النوع إلا إذا ضيّقت النوع.
- لا تضع منطقاً ثقيلاً في getter — قد يُستدعى دون أن تنتبه.

### التشغيل

```bash
npx tsx 05_classes_oop/07_getters_setters.ts
```

---

## 08_parameter_properties — خصائص من parameters الـ constructor

### ماذا تتعلم؟

- وضع **`public` / `private` / `protected` / `readonly`** أمام parameter في الـ constructor ينشئ **خاصية تلقائياً** ويعيّنها — بدون تكرار `this.x = x`.

### أفكار من الكود

```ts
// الطويل
class UserLong {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

// المختصر
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
```

### نقاط مهمة / أخطاء شائعة

- **`private password`**: لا `user.password` من خارج الكلاس — استخدم `checkPassword`.
- **`readonly id`**: يُعيَّن مرة عند `new User(...)` ثم لا يتغير.
- parameter properties **ميزة TypeScript** — تعرف على شكل JavaScript المُصدَّر (خصائص على `this`).

### التشغيل

```bash
npx tsx 05_classes_oop/08_parameter_properties.ts
```

---

## خريطة سريعة للمجلد

| الدرس | الفكرة بجملة |
|--------|----------------|
| 01 | class + constructor + methods |
| 02 | public / private / protected |
| 03 | readonly + static |
| 04 | extends + implements |
| 05 | abstract class + abstract methods |
| 06 | composition vs inheritance |
| 07 | getters / setters + validation |
| 08 | parameter properties |

مع إتمام هذا المجلد تستطيع تصميم نماذج OOP في TypeScript مع encapsulation واضح واختيار بين الوراثة والتكوين بشكل واعٍ.
