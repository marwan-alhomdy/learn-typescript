// Index signatures — تسمح بمفاتيح ديناميكية غير معروفة مسبقاً

interface StringMap {
  [key: string]: string;
}

const translations: StringMap = {
  hello: "مرحبا",
  bye: "وداعا",
  thanks: "شكرا",
};

console.log(translations.hello);
console.log(translations["bye"]);

// مفاتيح أرقام → قيم numbers
interface ScoreBoard {
  [player: string]: number;
}

const scores: ScoreBoard = {
  Marwan: 95,
  Ali: 88,
  Sara: 92,
};

console.log(scores.Marwan, scores["Ali"]);

// مع خصائص ثابتة + index signature
interface Config {
  appName: string;
  [key: string]: string; // باقي المفاتيح لازم تكون string أيضاً
}

const config: Config = {
  appName: "learn-typescript",
  theme: "dark",
  lang: "ar",
};

console.log(config);
