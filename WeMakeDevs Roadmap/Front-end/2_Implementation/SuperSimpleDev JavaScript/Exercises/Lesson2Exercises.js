// 2a:
console.log(10 + 3 * 8 + 5, "$");

// 2b:
console.log(3 * (10 + 3 * 8 + 5), "$");

// 2c:
console.log((1850 + 2 * 750)/ 100, "$");

// 2d:
console.log(Math.round((1850 + 2 * 750) * 0.1) / 100, "$");

// 2e:
console.log(Math.round((1850 + 2 * 750) * 0.2) / 100, "$");

// 2f:
console.log((2095 + 799 + 1899) / 100, "$");

// 2g:
console.log((2095 + 799 + 1899 + 499) / 100, "$");

// 2h:
console.log(Math.round((2095 + 799 + 1899 + 499) * 0.1) / 100, "$");

// 2i:
console.log((2095 + 799 + 1899 + 499 + Math.round((2095 + 799 + 1899 + 499) * 0.1)) / 100, "$");

// 2j: Use Math.floor for always rounding to lower value
console.log(Math.floor(2.8));

// 2k: Use Math.round or Math.floor for rounding to greater value
console.log(Math.ceil(2.8));

// 2l, 2m, 2n: Celsius/Fahrenheit conversion

console.log(9/5 * 25 + 32);
console.log(5/9 * (86 - 32));
console.log(9/5 * -5 + 32);
