// CommonJS require (مع verbatimModuleSyntax)
import math = require("./cjs_math.cjs");

console.log(`[${math.label}] 4 * 5 =`, math.multiply(4, 5));
