// Template literal types — بناء أنواع نصية من أجزاء

type Lang = "ar" | "en";
type Greeting = `hello-${Lang}`;
// "hello-ar" | "hello-en"

const g1: Greeting = "hello-ar";
const g2: Greeting = "hello-en";
// const g3: Greeting = "hello-fr"; // Error
console.log(g1, g2);

// مثال عملي: event names
type EventName = "click" | "focus" | "blur";
type HandlerName = `on${Capitalize<EventName>}`;
// "onClick" | "onFocus" | "onBlur"

const handler: HandlerName = "onClick";
const handler2: HandlerName = "onFocus"; // صالح — من "focus"
// const handler3: HandlerName = "onHover"; // Error: "hover" مش ضمن EventName
console.log(handler, handler2);

// دمج أكثر من جزء
type HttpMethod = "GET" | "POST";
type ApiRoute = "/users" | "/posts";
type Endpoint = `${HttpMethod} ${ApiRoute}`;
// "GET /users" | "GET /posts" | "POST /users" | "POST /posts"

const endpoint: Endpoint = "GET /users";
console.log(endpoint);

// الخلاصة:
// مثل template strings، لكن على مستوى الأنواع
