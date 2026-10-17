// type — يعرّف اسم لنوع (objects, unions, primitives, ...)
type UserId = string | number;

type User = {
  id: UserId;
  name: string;
};

const user: User = {
  id: 1,
  name: "Marwan Alhomdy",
};

console.log(user);

// interface — يعرّف شكل object (غالباً للكائنات)
interface Product {
  id: number;
  title: string;
  price: number;
}

const product: Product = {
  id: 10,
  title: "Laptop",
  price: 1200,
};

console.log(product);

// الفرق باختصار:
// type: أوسع (unions, primitives, tuples, ...)
// interface: مخصص أكثر لوصف شكل الكائنات، ويقبل الامتداد بسهولة
