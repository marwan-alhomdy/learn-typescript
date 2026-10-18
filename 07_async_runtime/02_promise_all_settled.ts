// Promise.all و Promise.allSettled

function delay(ms: number, value: string, shouldFail = false): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) reject(new Error(`Failed: ${value}`));
      else resolve(value);
    }, ms);
  });
}

async function withAll() {
  try {
    // Promise.all — ينتظر الكل، وإذا واحد فشل → الكل يفشل
    const results = await Promise.all([
      delay(100, "A"),
      delay(200, "B"),
      // delay(150, "C", true), // لو فعّلتها، يرمي error ويتوقف
    ]);
    console.log("all:", results); // ["A", "B"]
  } catch (error) {
    console.log("all failed:", error);
  }
}

async function withAllSettled() {
  // Promise.allSettled — ينتظر الكل، وما يوقف حتى لو بعضهم فشل
  const results = await Promise.allSettled([
    delay(100, "A"),
    delay(150, "B", true), // يفشل
    delay(200, "C"),
  ]);

  for (const result of results) {
    if (result.status === "fulfilled") {
      console.log("ok:", result.value);
    } else {
      console.log("error:", result.reason);
    }
  }
}

await withAll();
await withAllSettled();

// الفرق باختصار:
// all        → نجاح الكل أو فشل سريع
// allSettled → نتيجة كل واحد (نجاح أو فشل) بدون ما يوقف الباقي
