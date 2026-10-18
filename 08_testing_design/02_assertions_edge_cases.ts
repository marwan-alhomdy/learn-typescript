// Assertions و edge cases

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function getDiscount(price: number, percent: number): number {
  if (price < 0 || percent < 0 || percent > 100) {
    throw new Error("Invalid price or percent");
  }
  return price * (percent / 100);
}

function assertEqual<T>(actual: T, expected: T, name: string): void {
  if (actual !== expected) {
    throw new Error(`${name}: expected ${String(expected)}, got ${String(actual)}`);
  }
  console.log(`✓ ${name}`);
}

function assertThrows(fn: () => void, name: string): void {
  try {
    fn();
    throw new Error(`${name}: expected an error`);
  } catch (error: unknown) {
    if (error instanceof Error && error.message.startsWith(`${name}:`)) {
      throw error;
    }
    console.log(`✓ ${name}`);
  }
}

// حالات عادية (happy path)
assertEqual(normalizeEmail("  Ali@Mail.com "), "ali@mail.com", "trim + lowercase");
assertEqual(getDiscount(200, 10), 20, "10% of 200");

// Edge cases — حدود وحالات حافة
assertEqual(normalizeEmail(""), "", "empty email");
assertEqual(normalizeEmail("A"), "a", "single char");
assertEqual(getDiscount(0, 50), 0, "zero price");
assertEqual(getDiscount(100, 0), 0, "zero percent");
assertEqual(getDiscount(100, 100), 100, "full discount");

// حالات فشل متوقعة
assertThrows(() => getDiscount(-1, 10), "negative price");
assertThrows(() => getDiscount(100, -5), "negative percent");
assertThrows(() => getDiscount(100, 150), "percent over 100");

console.log("All assertion / edge-case tests passed");
