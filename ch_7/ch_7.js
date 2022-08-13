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

let a = [1,2,3,];
let b1 = [0,...a,4];    // b1 == [0, 1, 2, 3, 4, 5]

let original = [1,2,3];
let copy = [...original];
copy[0] = 0;    // Modifying the copy does not change the original 
original[0]     // => 1

// ex:

let digits = [..."12AB"];
digits  // => ["1","2","A","B"]


// ex:

let letters = [..."hello world"];
[...new Set(letters)]   // => ["h","e","l","o","w","r","d"]

// 7.1.3 The Array() Constructor

// Flanagan, David. JavaScript: The Definitive Guide (p. 157). O'Reilly Media. Kindle Edition. 

let a1 = new Array();

// Call it with a single numeric argument, which specifies a length:

// Flanagan, David. JavaScript: The Definitive Guide (p. 157). O'Reilly Media. Kindle Edition. 

let a2 = new Array(10);

// ex:

let a3 = new Array(3,2,1,"testing testing")

// 7.1.4 Array.of()

// Flanagan, David. JavaScript: The Definitive Guide (p. 158). O'Reilly Media. Kindle Edition. 

Array.of()  // => []; returns empty array with no arguments
Array.of(10)    // => [10]; can create arrays with a single numeric argument
Array.of(1,2,3)     // => [1,2,3]

// 7.1.5 Array.from()

// Flanagan, David. JavaScript: The Definitive Guide (p. 158). O'Reilly Media. Kindle Edition. 

let copy = Array.from(original);

// ex: Array-like objects

let truearray = Array.from(arraylike);

// 7.2 Reading and Writing Array Elements

// Flanagan, David. JavaScript: The Definitive Guide (p. 159). O'Reilly Media. Kindle Edition. 

