// استدعاء named و default exports
import greet, { PI, add } from "./exports.js";
import type { User } from "./exports.js";

console.log(PI);
console.log(add(2, 3));
console.log(greet("Marwan"));

const user: User = { id: 1, name: "Marwan" };
console.log(user);
