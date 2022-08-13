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

let a4 = ["world"];     // Start with a one-element array
let value = a[0];   // Read element 0
a[1] = 3.14;    // Write element 1
let i = 2;
a[i] = 3;   // Write element 2
a[i + 1] = "hello";     // Write element 3
a[a[i]] = a[0];     // Read elements 0 and 2, write element 3

a4.length   // => 4

// ex: converting the index from number to a string

let o = {};     // Create a plain object
o[1] = "one"    // Index it with an integer
o["1"]  // => "one"; numeric and string property names are the same

// ex: difference between array index and object property name

a[-1.23] = true;    // This creates a property named "-1.23"
a["1000"] = 0;  // This the 1001st element of the array
a[1.000] = 1;   // Array index 1. Same as a[1] = 1;

// ex: query of a nonexistent property 

let a = [true, false];  // This array has elements at indexes 0 and 1
a[2]    // => undefined; no element at this index
a[-1]   // => undefined; no property with this name

// 7.3 Sparse Arrays

// Flanagan, David. JavaScript: The Definitive Guide (p. 160). O'Reilly Media. Kindle Edition. 

let a5 = new Array(5);  // No elements, but a.length is 5.
a5 = [];    // Create an array with no elements and length = 0.
a[1000] = 0;    // Assignment adds one element but sets length to 1001

let a6 = [,];   // This array has no elements and length 1
let a7 = [undefined];   // This array has one undefined element 
0 in a6     // => false: a6 has no element with index 0
0 in a7     // => true: a7 has the undefined value at index 0

// 7.4 Array Length

// Flanagan, David. JavaScript: The Definitive Guide (p. 161). O'Reilly Media. Kindle Edition. 

// [].length   // => 0: the array has no elements
["a", "b", "c"].length  // => 3: highest index is 2, length is 3

// ex:

a = [1,2,3,4,5];    // Start with a 5-element array
a.length = 3;   // a is now [1,2,3]
a.length = 0;   // Delete all elements. a is []
a.length = 5;   // Length is 5, but no elements, like new Array(5)

// 7.5 Adding and Deleting Array Elements

// Flanagan, David. JavaScript: The Definitive Guide (p. 161). O'Reilly Media. Kindle Edition. 

// We’ve already seen the simplest way to add elements to an array: just assign values to new indexes:

// Flanagan, David. JavaScript: The Definitive Guide (p. 161). O'Reilly Media. Kindle Edition. 

let a = [];     // Start with an empty array 
a[0] = "zero";  // And add elements to it
a[1] = "one"; 

// You can also use the push() method to add one or more values to the end of an array:

// Flanagan, David. JavaScript: The Definitive Guide (pp. 161-162). O'Reilly Media. Kindle Edition. 

let a = [];     // Start with an empty array
a.push("zero");     // Add a value at the end. a = ["zero"]
a.push("one", "two");   // Add two more values. a = ["zero", "one", "two"]

// ex: delete

let a = [1,2,3];
delete a[2];    // a now has no element at index 2
2 in a  // => false: no array index 2 is defined
a.length    // => 3: delete does not affect array length 

// 7.6 Iterating Arrays

// Flanagan, David. JavaScript: The Definitive Guide (p. 162). O'Reilly Media. Kindle Edition. 


