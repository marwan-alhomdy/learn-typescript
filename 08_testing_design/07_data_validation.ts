// Data validation — التحقق من صحة البيانات قبل استخدامها

type CreateUserInput = {
  name: string;
  email: string;
  age: number;
};

type ValidationError = {
  field: string;
  message: string;
};

function validateCreateUser(input: unknown): CreateUserInput {
  if (typeof input !== "object" || input === null) {
    throw new Error("Input must be an object");
  }

  const data = input as Record<string, unknown>;
  const errors: ValidationError[] = [];

  if (typeof data.name !== "string" || data.name.trim().length < 2) {
    errors.push({ field: "name", message: "name must be at least 2 chars" });
  }

  if (typeof data.email !== "string" || !data.email.includes("@")) {
    errors.push({ field: "email", message: "email is invalid" });
  }

  if (typeof data.age !== "number" || data.age < 0 || data.age > 120) {
    errors.push({ field: "age", message: "age must be between 0 and 120" });
  }

  if (errors.length > 0) {
    throw new Error(errors.map((e) => `${e.field}: ${e.message}`).join(" | "));
  }

  return {
    name: (data.name as string).trim(),
    email: (data.email as string).trim().toLowerCase(),
    age: data.age as number,
  };
}

try {
  const user = validateCreateUser({
    name: "  Marwan  ",
    email: "Marwan@Example.com",
    age: 20,
  });
  console.log("valid:", user);
} catch (error: unknown) {
  if (error instanceof Error) console.log(error.message);
}

try {
  validateCreateUser({ name: "A", email: "bad", age: -3 });
} catch (error: unknown) {
  if (error instanceof Error) console.log("invalid:", error.message);
}

// الخلاصة:
// لا تثق بالمدخلات — تحقق من النوع والقواعد قبل المتابعة
