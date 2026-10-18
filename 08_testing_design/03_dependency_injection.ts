// Dependency Injection — تمرير الاعتمادية من برا بدل إنشائها من الداخل

type Mailer = {
  send(to: string, message: string): void;
};

// بدون DI — مربوط بتنفيذ ثابت (صعب الاختبار)
class OrderServiceBad {
  placeOrder(email: string): void {
    // مربوط مباشرة بـ console — ما تقدر تستبدله بسهولة
    console.log(`Email to ${email}: order placed`);
  }
}

// مع DI — تعتمد على واجهة، والتنفيذ يُمرَّر من الخارج
class OrderService {
  constructor(private mailer: Mailer) {}

  placeOrder(email: string): void {
    this.mailer.send(email, "Your order was placed");
  }
}

// تنفيذ حقيقي
const consoleMailer: Mailer = {
  send(to, message) {
    console.log(`[real] to=${to} | ${message}`);
  },
};

// تنفيذ وهمي للاختبار (mock)
const sent: string[] = [];
const fakeMailer: Mailer = {
  send(to, message) {
    sent.push(`${to}:${message}`);
  },
};

// استخدام حقيقي
const realService = new OrderService(consoleMailer);
realService.placeOrder("marwan@example.com");

// اختبار بدون إرسال إيميل حقيقي
const testService = new OrderService(fakeMailer);
testService.placeOrder("ali@example.com");

if (sent.length !== 1 || !sent[0]?.includes("ali@example.com")) {
  throw new Error("DI test failed");
}
console.log("✓ dependency injection test passed");
console.log("sent:", sent);

// الخلاصة:
// DI = مرّر الاعتمادية (mailer) من الخارج
// يسهّل الاختبار والاستبدال بدون تغيير OrderService
