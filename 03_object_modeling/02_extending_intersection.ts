// Extending interfaces — interface يرث خصائص من interface ثاني
interface Person {
  name: string;
}

interface Employee extends Person {
  salary: number;
}

const employee: Employee = {
  name: "Marwan Alhomdy",
  salary: 5000,
};

console.log(employee);

// Intersection (&) — يجمع أكثر من type في نوع واحد
type HasId = { id: number };
type HasEmail = { email: string };
type Account = HasId & HasEmail;

const account: Account = {
  id: 1,
  email: "marwan@example.com",
};

console.log(account);

// الفرق باختصار:
// extends: شائع مع interface للوراثة
// & : شائع مع type لدمج الأنواع
