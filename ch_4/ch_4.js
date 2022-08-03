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

// 4.3 Function Definition Expressions

// Flanagan, David. JavaScript: The Definitive Guide (p. 63). O'Reilly Media. Kindle Edition. 

// This function returns the square of the value passed to it

let square = function(x){return x*x};

// 4.4 Property Access Expressions

// Flanagan, David. JavaScript: The Definitive Guide (p. 64). O'Reilly Media. Kindle Edition. 

// expression.indentifier
// expression[expression]

let o = {x: 1, y:{z:3}};    // An example object
let a = [0, 4, [5,6]];  // An example array that contains the object. 
o.x     // => 1: property x of expression o
o.y.z   // => 3: property z of expression o.y
o["x"]  // => 1: property x of object o
a[1]    // => 4: element at index 1 of expression a
a[2]["1"]   // => 6: element at index 1 of expression a[2]
a[0].x  // => 1: property x of expression a[0]

// 4.4.1 Conditional Property Access

// Flanagan, David. JavaScript: The Definitive Guide (p. 65). O'Reilly Media. Kindle Edition. 

// expression?.indentifier
// expression?.[expression]

// optional chaining

let aa = {b:null};
aa.b?.c.d   // => undefined

let aaa = {b:{}};
aaa.b?.c.d  // => undefined

let b;  // Oops, we forgot to initialize this variable! 
let index = 0;
try{
    b[index++];     // Throws TypeError
}catch(e){
    index   // => 1: increment occurs before TypeError is thrown
}
b?.[index++]    // => undefined: because a is undefined
index   // => 1: not incremented because ?.[] short-circuits
b[index++]  // !TypeError: can't index undefined. 

// 4.5 Invocation Expressions

// Flanagan, David. JavaScript: The Definitive Guide (p. 66). O'Reilly Media. Kindle Edition. 

// Invocation expression is js syntax for calling a function or method. 
// Seems pretty similar to Python

f(0)    // f is the function expression; 0 is the argument expression
Math.max(x,y,z)     // Math.max is the function; x, y, and z are the arguments
a.sort()    // a.sort is the function; there are no arguments

// 4.5.1 Conditional Invocation

// Flanagan, David. JavaScript: The Definitive Guide (p. 67). O'Reilly Media. Kindle Edition. 

// Before ES2020

function square(x, log){    // The second argument is an optional function 
    if(log){    // If the optional function is passed
        log(x);     // Invoke it
    }
    return x*x;     // Return the square of the argument
}

// After ES2020

function square(x, log){    // The second argument is an opotion function
    log?.(x);   // Call the function if there is one
    return x*x;     // Return the square of the argument  
}

let f = null, x = 0;
try{
    f(x++);     // Throws TypeError because f is null
}catch(e){
    x   // => 1: x gets incremented before the exception is thrown
}
f?.(x++)    // => undefined: f is null, but no exception thrown
x   // => 1: increment is skipped because of short-circuiting

// Understand the nuances below:

o.m()   // Regular property access, regular invocation
o?.m()  // Conditional property access, regular invocation
o.m?.()     // Regular property access, conditional invocation 

// 4.6 Object Creation Expressions

// Flanagan, David. JavaScript: The Definitive Guide (p. 68). O'Reilly Media. Kindle Edition. 

