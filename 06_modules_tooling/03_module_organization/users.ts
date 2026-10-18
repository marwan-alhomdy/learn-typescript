// وحدة users — كل ما يخص المستخدمين
import type { User } from "./types.js";

export function createUser(name: string): User {
  return { id: Date.now(), name };
}

export function formatUser(user: User): string {
  return `#${user.id} - ${user.name}`;
}
