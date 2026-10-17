// public, private, protected — من يقدر يوصل للخاصية؟

class BankAccount {
  public owner: string; // متاحة من أي مكان (الافتراضي)
  private balance: number; // داخل الكلاس فقط
  protected bankName: string; // داخل الكلاس + الكلاسات الفرعية

  constructor(owner: string, balance: number, bankName: string) {
    this.owner = owner;
    this.balance = balance;
    this.bankName = bankName;
  }

  public getBalance(): number {
    return this.balance; // مسموح — داخل الكلاس
  }

  public deposit(amount: number): void {
    this.balance += amount;
  }
}

class SavingsAccount extends BankAccount {
  showBank(): string {
    return this.bankName; // مسموح — protected
    // return this.balance; // Error: private
  }
}

const account = new BankAccount("Marwan", 1000, "AlKuraimi");
console.log(account.owner); // public — مسموح
console.log(account.getBalance());
// console.log(account.balance); // Error: private
// console.log(account.bankName); // Error: protected من برا

account.deposit(500);
console.log(account.getBalance());

const savings = new SavingsAccount("Ali", 2000, "CAC");
console.log(savings.showBank());
