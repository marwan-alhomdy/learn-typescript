// Abstract classes — كلاس أساسي ما ينفع تنشئ منه كائن مباشرة

abstract class Shape {
  constructor(public color: string) {}

  // method عادية — مشتركة لكل الأشكال
  describe(): string {
    return `A ${this.color} shape`;
  }

  // abstract — لازم كل كلاس فرعي يعرّفها
  abstract area(): number;
}

// const s = new Shape("red"); // Error: Cannot create an instance of an abstract class

class Circle extends Shape {
  constructor(
    color: string,
    public radius: number,
  ) {
    super(color);
  }

  area(): number {
    return Math.PI * this.radius * this.radius;
  }
}

class Rectangle extends Shape {
  constructor(
    color: string,
    public width: number,
    public height: number,
  ) {
    super(color);
  }

  area(): number {
    return this.width * this.height;
  }
}

const circle = new Circle("red", 5);
const rect = new Rectangle("blue", 4, 6);

console.log(circle.describe(), circle.area().toFixed(2));
console.log(rect.describe(), rect.area());
