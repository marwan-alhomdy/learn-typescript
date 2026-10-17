// Union Types — إما هذا أو ذاك (|)
type Id = string | number;

const userId: Id = "abc-123";
const productId: Id = 42;
//const productId2: Id = true; // Error: Type 'boolean' is not assignable to type 'Id'.

console.log(userId, productId);

// Intersection Types — يجمع النوعين معاً (&)
type Person = { name: string };
type Employee = { salary: number };
type Staff = Person & Employee;

const staff: Staff = {
  name: "Marwan Alhomdy",
  salary: 5000,
};

console.log(staff);

// الفرق باختصار:
// union (|): قيمة واحدة من عدة أنواع ممكنة
// intersection (&): لازم تكون كل الخصائص من كل الأنواع موجودة
