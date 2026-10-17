// Composition vs Inheritance

// Inheritance — "هو نوع من" (is-a)
class Engine {
  start(): void {
    console.log("Engine started");
  }
}

class CarWithInheritance extends Engine {
  drive(): void {
    this.start();
    console.log("Car is driving");
  }
}

const car1 = new CarWithInheritance();
car1.drive();

// Composition — "يملك" (has-a) — غالباً أفضل وأكثر مرونة
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
car2.drive();

// الفرق باختصار:
// inheritance: Car يمتد من Engine (علاقة قوية)
// composition: Car يستخدم Engine من داخله (أسهل للتغيير والاستبدال)
