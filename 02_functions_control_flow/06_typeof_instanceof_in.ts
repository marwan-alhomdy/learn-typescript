// typeof — للأساسيات (string, number, boolean, ...)
function handleValue(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else {
    console.log(value.toFixed(2));
  }
}

handleValue("hello");
handleValue(3.14);

// instanceof — للكلاسات / الـ instances
class Dog {
  bark() {
    console.log("woof");
  }
}

class Cat {
  meow() {
    console.log("meow");
  }
}

function speak(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark();
  } else {
    animal.meow();
  }
}

speak(new Dog());
speak(new Cat());

// in — يفحص وجود خاصية في الكائن
type Admin = { role: "admin"; permissions: string[] };
type Guest = { role: "guest"; visitCount: number };

function describe(user: Admin | Guest) {
  if ("permissions" in user) {
    console.log("admin perms:", user.permissions);
  } else {
    console.log("guest visits:", user.visitCount);
  }
}

describe({ role: "admin", permissions: ["read", "write"] });
describe({ role: "guest", visitCount: 3 });
