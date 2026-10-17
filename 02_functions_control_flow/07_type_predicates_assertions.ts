// Type predicates — دالة ترجع boolean وتعلّم TypeScript بالنوع (is)
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function isFish(animal: Fish | Bird): animal is Fish {
  return "swim" in animal;
}

function move(animal: Fish | Bird) {
  if (isFish(animal)) {
    animal.swim(); // TypeScript يعرف إنه Fish
  } else {
    animal.fly();
  }
}

move({ swim: () => console.log("swimming") });
move({ fly: () => console.log("flying") });

// Assertion functions — ترمي error إذا الشرط غلط، وبعدها النوع يتضيّق
function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== "string") {
    throw new Error("Not a string");
  }
}

function printUpper(value: unknown) {
  assertIsString(value);
  // بعد الـ assertion: value صار string
  console.log(value.toUpperCase());
}

printUpper("marwan");
// printUpper(123); // يرمي Error وقت التشغيل
