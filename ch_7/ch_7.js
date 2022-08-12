/*

Chapter 7. Arrays

Flanagan, David. JavaScript: The Definitive Guide (p. 155). O'Reilly Media. Kindle Edition. 

*/

// 7.1 Creating Arrays

// Flanagan, David. JavaScript: The Definitive Guide (p. 156). O'Reilly Media. Kindle Edition. 

// Array literals

// ... spread operator on an interable object

// array() constructor

// arrray.of() and array.from() factory methods 

// 7.1.1 Array Literals

// Flanagan, David. JavaScript: The Definitive Guide (p. 156). O'Reilly Media. Kindle Edition. 

let empty = [];     // An array with no elements
let primes = [2,3,5,7,11];  // An array with 5 numeric elements
let misc = [1.1, true, "a"];    // 3 elements of various types + trailing comma

// The values in an array literal need not be constants; they may be arbitrary expressions:

// Flanagan, David. JavaScript: The Definitive Guide (p. 156). O'Reilly Media. Kindle Edition. 

let base = 1024;
let table = [base, base+1, base+2, base+3];

// Array literals can contain object literals or other array literals:

// Flanagan, David. JavaScript: The Definitive Guide (p. 156). O'Reilly Media. Kindle Edition. 

let b = [[1, {x:1, y:2}],[2,{x:3, y:4}]];

// spare array

let count = [1,,3];     // Elements at indexes 0 and 2. No element at index 1
let undefs = [,,];  // An array with no elements but a length of 2

// Array literal syntax allows an optional trailing comma, so [,,] has a length of 2, not 3.

// Flanagan, David. JavaScript: The Definitive Guide (p. 156). O'Reilly Media. Kindle Edition. 

// 7.1.2 The Spread Operator

// Flanagan, David. JavaScript: The Definitive Guide (p. 157). O'Reilly Media. Kindle Edition. 

