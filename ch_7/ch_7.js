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


// easiest way to loop through each of the elements of an array (or any iterable object) is with the for/of loop,

// Flanagan, David. JavaScript: The Definitive Guide (p. 162). O'Reilly Media. Kindle Edition. 

let letters1 = [..."Hello world"];   // An array of letters
let string = "";
for(let letter of letters1){
    string += letter;
}
string  // => "Hello world"; we reassembled the original text 

// If you want to use a for/of loop for an array and need to know the index of each array element, 

// use the entries() method of the array, along with destructuring assignment, like this:

// Flanagan, David. JavaScript: The Definitive Guide (p. 163). O'Reilly Media. Kindle Edition. 

let everyother = "";
for(let [index, letter] of letters1.entries(0)){
    if(index%2 === 0)everyother += letter;  // letters at even indexes
}
everyother  // => "Hlowrd"

// ex: forEach()

let uppercase = "";
letters1.forEach(letter => {// Note arrow notation
    uppercase += letter.toUpperCase();
});
uppercase   // => "HELLO WORLD"

// You can also loop through the elements of an array with a good old-fashioned for loop

// Flanagan, David. JavaScript: The Definitive Guide (p. 163). O'Reilly Media. Kindle Edition. 

let vowels = ""
for(let i = 0; i < letters1.length; i++){// For each index in the array
    let letter = letters[i];    // Get the element at that index
    if(/[aeiou]/.test(letter)){     // Use a regex test
        vowels += letter;   // If it is a vowel, remember it
    }
}

vowels  // => "eoo"

// ex:

// Save the array length into a local variable
for(let i = 0, len = letters1.length; i < len; i++){
    // loop body remains the same
}

// Iterate backwards from the end of teh array to the start
for(let i = letters1.length-1; i >= 0; i--){
    // loop body remains the same
}

// ex: skip undefined and nonexistent elements:

for(let i=0; i<a.length; i++){
    if(a[i] === undefined) continue;    // Skip undefined + nonexistent elements
    // loop body here
}

// 7.7 Multidimensional Arrays

// Flanagan, David. JavaScript: The Definitive Guide (p. 164). O'Reilly Media. Kindle Edition. 

// Create a multidimensional array
let table1 = new Array(10);     // 10 rows of the table
for(let i=0; i<table.length; i++){
    table[i] = new Array(10);   // Each row has 10 columns
}

// Initialize the array
for(let row=0; row<table.length; row++){
    for(let col=0; row<table[row].length; col++){
        table[row][col] = row*col;
    }
}

// Use the multidimensional array to compute 5*7
table[5][7]     // => 35

// 7.8 Array Methods

// Flanagan, David. JavaScript: The Definitive Guide (p. 165). O'Reilly Media. Kindle Edition. 

// Iterator methods: loop over the elements of an array, typically invoking a function that you specify on each element

// Stack and queue methods: add/remove array elements to/from the beginning and the end of an array

// Subarray methods: extracting, deleting, inserting, filling, and copying contiguous regions of a larger array

// Searching/sorting methods: locating elements within an array and for sorting the elements of an array

// 7.8.1 Array Iterator Methods

// Flanagan, David. JavaScript: The Definitive Guide (p. 165). O'Reilly Media. Kindle Edition. 

// forEach()

// Flanagan, David. JavaScript: The Definitive Guide (p. 166). O'Reilly Media. Kindle Edition. 

let data = [1,2,3,4,5], sum = 0;
// Compute the sum of the elements of the array
data.forEach(value => {sum += value;});     // sum == 15

// Now increment each array element
data.forEach(function(v,i,a){a[i] = v +1;});    // data == [2,3,4,5,6]

// map()

// Flanagan, David. JavaScript: The Definitive Guide (p. 166). O'Reilly Media. Kindle Edition. 

let a = [1,2,3];
a.map(x => x*x)     // => [1,4,9]

// filter()

// Flanagan, David. JavaScript: The Definitive Guide (p. 167). O'Reilly Media. Kindle Edition. 

let a = [5,4,3,2,1];
a.filter(x => x < 3)    // => [2,1]; values less than 3
a.filter((x,i) => i%2 === 0)    // => [5,3,1]; every other value

// ex: to close the gaps in a sparse array

let dense = sparse.filter(() => true);

// ex: to close gaps and remove undefined/null elements, you use filter

a = a.filter(x => x !== undefined && x !== null);

// find() and findIndex()

// Flanagan, David. JavaScript: The Definitive Guide (p. 167). O'Reilly Media. Kindle Edition. 

let a = [1,2,3,4,5];
a.findIndex(x => x === 3)   // => 2; the value 3 appears at index 2
a.findIndex(x => x < 0)     // => -1; no negative numbers in the array
a.find(x => x%5 === 0)  // => 5: this is a multiple of 5
a.find(x => x%7 === 0)  // => undefined: no multiples of 7 in the array

// every() and some()

// Flanagan, David. JavaScript: The Definitive Guide (p. 167). O'Reilly Media. Kindle Edition. 

// ex: mathematical for all

let a = [1,2,3,4,5];
a.every(x => x < 10)    // => true: all values are < 10
a.every(x => x%2 === 0)     // => false: not all values are even

// ex: mathematical there exists - intro to proofs! 

let a = [1,2,3,4,5];
a.some(x => x%2 === 0)  // => true; a has some even numbers
a.some(isNaN)   // => false; a has no non-numbers

// reduce() and reduceRight()

// Flanagan, David. JavaScript: The Definitive Guide (p. 168). O'Reilly Media. Kindle Edition. 

// ex: aka inject and fold

// reduce()

let a = [1,2,3,4,5];
a.reduce((x,y) => x+y, 0)   // => 15; the sum of the values
a.reduce((x,y) => x*y, 1)   // => 120; the product of the values
a.reduce((x,y) => (x > y)?x:y)  // => 5; the largest of the values

// reduceRight()

// Compute 2^(3^4). Exponentiation has right 2 left precedence 
let a = [2,3,4];
a.reduceRight((acc,val) => Math.pow(val,acc))   // => 2.41785

// 7.8.2 Flattening arrays with flat() and flatMap()

// Flanagan, David. JavaScript: The Definitive Guide (p. 169). O'Reilly Media. Kindle Edition. 

[1,[2,3]].flat()    // => [1,2,3]
[1,[2,[3]]].flat()   // => [1,[2,3]]

// ex: pass a number of levels

let a = [1,[2,[3,[4]]]];
a.flat(1)   // => [1,2,[3,[4]]]
a.flat(2)   // => [1,2,3[4]]
a.flat(3)   // => [1,2,3,4]
a.flat(4)   // => [1,2,3,4]

let phrases = ["hello world", "the definitive guid"];
let words = phrases.flatMap(phrase => phrase.split(""));
words   // => ["hello", "world", "the", "definitive", "guide"];

// Map non-negative numbers to their square roots
[-2,-1,1,2].flatMap(x => x< 0?[]:Math.sqrt(x))  // => [1, 2**0.5]

// 7.8.3 Adding arrays with concat()

// Flanagan, David. JavaScript: The Definitive Guide (p. 170). O'Reilly Media. Kindle Edition. 

let a = [1,2,3];
a.concat(4,5)   // => [1,2,3,4,5]
a.concat([4,5],[6,7])   // => [1,2,3,4,5,6,7]; arrays are flattened
a.concat(4,[5,[6,7]])   // => [1,2,3,4,5,[6,7]]; but not nest arrays
a   // => [1,2,3]; the original array is unmodified

// 7.8.4 Stacks and Queues with push(), pop(), shift(), and unshift()

// Flanagan, David. JavaScript: The Definitive Guide (p. 170). O'Reilly Media. Kindle Edition. 

let stack = [];     // stack == []
stack.push(1,2);    // stack == [1,2];
stack.pop();    // stack == [1]; returns 2
stack.push(3);  // stack == [1,3]
stack.pop();    // stack == [1]; returns 3
stack.push([4,5]);  // stack == [1,[4,5]]
stack.pop()     // stack == [1]; returns [4,5]
stack.pop();    // stack == []; returns 1

// ex: push all of the elements from one array onto another

a.push(...value);

let q = [];     // q ==[]
q.push(1,2);    // q == [1,2]
q.shift();  // q == [2]; returns 1
q.push(3)   // q == [2,3]
q.shift()   // q == [3]; returns 2
q.shift()   // q == []; returns 3

let a = [];     // a == []
a.unshift(1)    // a == [1]
a.unshift(2)    // a == [2,1]
a = [];     // a == []
a.unshift(1,2)  // a == [1,2]

// 7.8.5 Subarrays with slice(), splice(), fill(), and copyWithin()

// Flanagan, David. JavaScript: The Definitive Guide (p. 172). O'Reilly Media. Kindle Edition. 

// slice()

// Flanagan, David. JavaScript: The Definitive Guide (p. 172). O'Reilly Media. Kindle Edition. 

let a = [1,2,3,4,5];
a.slice(0,3);   // Returns [1,2,3]
a.slice(3);     // Returns [4,5]
a.slice(1,-1);  // Returns [2,3,4]
a.slice(-3,-2);     // Returns [3]    

// splice()

// Flanagan, David. JavaScript: The Definitive Guide (p. 172). O'Reilly Media. Kindle Edition. 

let a = [1,2,3,4,5,6,7,8];
a.splice(4)     // => [5,6,7,8]; a is now [1,2,3,4]
a.splice(1,2)   // => [2,3]; a is now [1,4]
a.splice(1,1)   // => [4]; a is now [1]

// ex:

let a = [1,2,3,4,5]
a.splice(2,0,"a","b")   // => []; a is now [1,2,"a","b",3,4,5]
a.splice(2,2,[1,2],3)   // => ["a","b"]; a is now [1,2,[1,2],3,3,4,5]

// fill()

// Flanagan, David. JavaScript: The Definitive Guide (p. 173). O'Reilly Media. Kindle Edition. 

let a = new Array(5);   // Start with no elements and length 5
a.fill(0)   // => [0,0,0,0,0]; fill the array with zeros
a.fill(9,1)     // => [0,9,9,9,9]; fill with 9 starting at index 1
a.fill(8,2,-1)  // => [0,9,8,8,9]; fill with 9 at indexes 2,3

// copyWithin()

// Flanagan, David. JavaScript: The Definitive Guide (p. 173). O'Reilly Media. Kindle Edition. 

let a = [1,2,3,4,5]
a.copyWithin(1)     // => [1,1,2,3,4]: copy array elements up one 
a.copyWithin(2,3,5)     // => [1,1,3,4,4]: copy last 2 elements to index 2
a.copyWithin(0,-2)  // => [4,4,3,4,4]: negative offsets work, too

// 7.8.6 Array Searching and Sorting Methods

// Flanagan, David. JavaScript: The Definitive Guide (p. 174). O'Reilly Media. Kindle Edition. 

