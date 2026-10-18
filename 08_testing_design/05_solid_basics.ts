// SOLID basics — مبادئ تصميم الكلاسات/الوحدات

// S — Single Responsibility: مسؤولية واحدة
class UserRepository {
  save(name: string): void {
    console.log("save user:", name);
  }
}

class EmailService {
  send(to: string, msg: string): void {
    console.log(`email to ${to}: ${msg}`);
  }
}

// O — Open/Closed: مفتوح للإضافة، مغلق للتعديل
interface Shape {
  area(): number;
}

class Circle implements Shape {
  constructor(private radius: number) {}
  area(): number {
    return Math.PI * this.radius ** 2;
  }
}

class Square implements Shape {
  constructor(private side: number) {}
  area(): number {
    return this.side ** 2;
  }
}

function totalArea(shapes: Shape[]): number {
  return shapes.reduce((sum, s) => sum + s.area(), 0);
}

// L — Liskov Substitution: الفرع يقدر يحل محل الأصل بأمان
class Bird {
  move(): string {
    return "moving";
  }
}

class Sparrow extends Bird {
  move(): string {
    return "flying";
  }
}

function start(bird: Bird): void {
  console.log(bird.move());
}

// I — Interface Segregation: واجهات صغيرة بدل واحدة ضخمة
interface Printer {
  print(): void;
}

interface Scanner {
  scan(): void;
}

class SimplePrinter implements Printer {
  print(): void {
    console.log("printing...");
  }
}

// D — Dependency Inversion: اعتمد على تجريد (abstraction)
interface Logger {
  info(message: string): void;
}

class ConsoleLogger implements Logger {
  info(message: string): void {
    console.log("[info]", message);
  }
}

class App {
  constructor(private logger: Logger) {}
  run(): void {
    this.logger.info("app started");
  }
}

// تشغيل سريع
new UserRepository().save("Marwan");
new EmailService().send("a@b.com", "welcome");
console.log("areas:", totalArea([new Circle(2), new Square(3)]).toFixed(2));
start(new Sparrow());
new SimplePrinter().print();
new App(new ConsoleLogger()).run();
