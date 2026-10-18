// Unit testing — اختبار وحدة صغيرة من الكود

function add(a: number, b: number): number {
  return a + b;
}

function divide(a: number, b: number): number {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
}

// assertion بسيط — أساس فكرة الاختبار
function assertEqual<T>(actual: T, expected: T, name: string): void {
  if (actual !== expected) {
    throw new Error(`${name}: expected ${String(expected)}, got ${String(actual)}`);
  }
  console.log(`✓ ${name}`);
}

function assertThrows(fn: () => void, name: string): void {
  try {
    fn();
    throw new Error(`${name}: expected an error, but none was thrown`);
  } catch (error: unknown) {
    if (error instanceof Error && error.message.startsWith(name)) {
      throw error;
    }
    console.log(`✓ ${name}`);
  }
}

// الاختبارات
assertEqual(add(2, 3), 5, "add positives");
assertEqual(add(-1, 1), 0, "add negative and positive");
assertEqual(divide(10, 2), 5, "divide numbers");
assertThrows(() => divide(10, 0), "divide by zero throws");

console.log("All unit tests passed");
