// Error classes و Result types

// Error class مخصص
class NotFoundError extends Error {
  constructor(resource: string, id: string | number) {
    super(`${resource} not found: ${id}`);
    this.name = "NotFoundError";
  }
}

class ValidationError extends Error {
  constructor(public field: string, message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

// Result type — نجاح أو فشل بدون throw إجباري
type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

function ok<T>(value: T): Result<T, never> {
  return { ok: true, value };
}

function err<E>(error: E): Result<never, E> {
  return { ok: false, error };
}

function findUser(id: number): Result<{ id: number; name: string }, NotFoundError> {
  if (id !== 1) {
    return err(new NotFoundError("User", id));
  }
  return ok({ id: 1, name: "Marwan" });
}

function parseAge(input: string): Result<number, ValidationError> {
  const age = Number(input);
  if (Number.isNaN(age) || age < 0) {
    return err(new ValidationError("age", "Invalid age"));
  }
  return ok(age);
}

const userResult = findUser(1);
if (userResult.ok) {
  console.log("user:", userResult.value);
} else {
  console.log("error:", userResult.error.message);
}

const missing = findUser(99);
if (!missing.ok) {
  console.log(missing.error.name, missing.error.message);
}

const ageResult = parseAge("20");
console.log(ageResult.ok ? ageResult.value : ageResult.error.message);

const badAge = parseAge("abc");
if (!badAge.ok) {
  console.log(badAge.error.field, badAge.error.message);
}

// الخلاصة:
// Error class = أخطاء واضحة بأنواع/أسماء
// Result = ترجع نجاح/فشل صراحة بدون الاعتماد على throw فقط
