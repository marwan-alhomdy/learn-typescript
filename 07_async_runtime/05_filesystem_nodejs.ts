// File System و Node.js types
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const dataDir = join(__dirname, "data");
const filePath = join(dataDir, "hello.txt");

async function main() {
  // إنشاء مجلد إن ما كان موجود
  await mkdir(dataDir, { recursive: true });

  // كتابة ملف
  await writeFile(filePath, "Hello from TypeScript + Node.js", "utf8");
  console.log(dataDir);
  console.log("written:", filePath);

  // قراءة ملف
  const content = await readFile(filePath, "utf8");
  console.log("content:", content);
}

await main();

// ملاحظة:
// تحتاج @types/node في المشروع عشان TypeScript يعرف أنواع fs/path
// "types": ["node"] في tsconfig.json
