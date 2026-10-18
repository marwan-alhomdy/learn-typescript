// try/catch و unknown errors

async function fetchData(ok: boolean): Promise<string> {
  if (!ok) {
    throw new Error("Network failed");
  }
  return "data";
}

async function main() {
  try {
    const data = await fetchData(false);
    console.log(data);
  } catch (error: unknown) {
    // مع strict: error نوعه unknown — مو any
    // لازم تفحص قبل ما تستخدمه

    if (error instanceof Error) {
      console.log("Error message:", error.message);
    } else {
      console.log("Unknown error:", error);
    }
  }
}

await main();

// مثال: شيء مو Error
try {
  throw "something went wrong"; // string مو Error
} catch (error: unknown) {
  if (typeof error === "string") {
    console.log("string error:", error);
  }
}

// الخلاصة:
// catch (error: unknown) آمن أكثر من any
// استخدم instanceof / typeof قبل ما تتعامل مع الخطأ
