/* 

Chapter 4. Expressions and Operators

Flanagan, David. JavaScript: The Definitive Guide (p. 61). O'Reilly Media. Kindle Edition. 

*/ 

// 4.1 Primary Expressions

// Flanagan, David. JavaScript: The Definitive Guide (p. 62). O'Reilly Media. Kindle Edition. 

1.23    // A number literal
"hello"     // A string literal
// /pattern/ // A regular expression literal

true    // Evaluates to the boolean true value
false   // Evaluates to teh boolean false value
null    // Evaluates to the null value
this    // Evaluates to the "current" object

i   // Evaluates to the value of the variable i
sum     // Evaluates to the value of teh variable sum
undefined   // The value of the "undefined" property of the global object

// 4.2 Object and Array Initializers

// Flanagan, David. JavaScript: The Definitive Guide (p. 62). O'Reilly Media. Kindle Edition. 

// []  // An empty array: no expressions inside brackets = no elements
[1+2, 3+4]  // A 2-element array. First element is 3, second is 7

// You can make nested arrays from this syntax

let matrix = [[1,2,3], [4,5,6], [7,8,9]];

// The following array contains five elements, including three undefined elements

let sparseArray = [1,,,,5];

let p = {x: 2.3, y: -1.2};  // An object with 2 properties
let q = {};     // An empty object with no properites
q.x = 2.3; q.y = -1.2;  // Now q has teh same properties as p

// ES6 allows for much more feature-rich syntax

let rectangle = {
    upperLeft: {x: 2, y: 2},
    lowerRight: {x: 4, y: 5}
};

