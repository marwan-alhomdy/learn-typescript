// Enums — مجموعة قيم مسماة
enum Role {
  Admin = "admin",
  User = "user",
  Guest = "guest",
}

const currentRole: Role = Role.Admin;
console.log(currentRole);

// Literal types — قيمة محددة فقط، مو أي string/number
type Direction = "up" | "down" | "left" | "right";
const move: Direction = "up";
//const move2: Direction = "up2"; // Error: Type '"up2"' is not assignable to type 'Direction'.

type Dice = 1 | 2 | 3 | 4 | 5 | 6;
const roll: Dice = 4;
//const roll2: Dice = 7; // Error: Type '7' is not assignable to type 'Dice'.
console.log(move, roll);

// الفرق باختصار:
// enum: مجموعة قيم بأسماء جاهزة (Role.Admin)
// literal: تقيّد المتغير بقيم محددة فقط ("up" | "down" ...)
