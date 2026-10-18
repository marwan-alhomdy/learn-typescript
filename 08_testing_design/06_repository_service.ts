// Repository و Service patterns

type User = { id: number; name: string; email: string };

// Repository — مسؤول عن الوصول للبيانات فقط
class UserRepository {
  private users: User[] = [];

  save(user: User): User {
    this.users.push(user);
    return user;
  }

  findByEmail(email: string): User | undefined {
    return this.users.find((u) => u.email === email);
  }

  findAll(): User[] {
    return [...this.users];
  }
}

// Service — منطق الأعمال (business logic)
class UserService {
  constructor(private repo: UserRepository) {}

  register(name: string, email: string): User {
    const existing = this.repo.findByEmail(email.toLowerCase());
    if (existing) {
      throw new Error("Email already registered");
    }

    const user: User = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
    };

    return this.repo.save(user);
  }
}

const repo = new UserRepository();
const service = new UserService(repo);

const user = service.register("Marwan", "Marwan@Example.com");
console.log("registered:", user);
console.log("all:", repo.findAll());

try {
  service.register("Ali", "marwan@example.com");
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log("error:", error.message);
  }
}

// الخلاصة:
// Repository = تخزين/قراءة البيانات
// Service = القواعد والمنطق فوق الـ repository
