// Discriminated unions — union بأنواع تشترك في خاصية مميزة (tag)

type Success = {
  status: "success";
  data: string;
};

type Failure = {
  status: "error";
  message: string;
};

type Loading = {
  status: "loading";
};

type Result = Success | Failure | Loading;

function handle(result: Result) {
  switch (result.status) {
    case "success":
      console.log("data:", result.data);
      break;
    case "error":
      console.log("error:", result.message);
      break;
    case "loading":
      console.log("loading...");
      break;
  }
}

handle({ status: "success", data: "Hello" });
handle({ status: "error", message: "Something went wrong" });
handle({ status: "loading" });

// الخاصية status هي الـ discriminant:
// بعد فحصها، TypeScript يعرف باقي الخصائص المتاحة
