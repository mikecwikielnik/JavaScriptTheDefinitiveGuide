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

// An object creation expression creates a new object and invokes a function (called a constructor) to initialize the properties of that object.

// Flanagan, David. JavaScript: The Definitive Guide (p. 68). O'Reilly Media. Kindle Edition. 

new Object()
new Point(2,3)

new Object
new Date

// 4.7 Operator Overview

// Flanagan, David. JavaScript: The Definitive Guide (p. 68). O'Reilly Media. Kindle Edition. 

// 4.7.1 Number of Operands

// Flanagan, David. JavaScript: The Definitive Guide (p. 70). O'Reilly Media. Kindle Edition. 

/*

* is a binary operator. Combines two expressions into a single expression

- is a unary operator. Converts a single expression into another expression

?:, is a ternary operator. Combines three expressions into a single expression

*/

// 4.7.2 Operand and Result Type

// Flanagan, David. JavaScript: The Definitive Guide (p. 70). O'Reilly Media. Kindle Edition. 

/*

+ operator adds numeric operands but concats string operands. Similarly,
< perform comparison in numerical or alphabetical order depending on the type of operand. 

*/

// 4.7.3 Operator Side Effects

// Flanagan, David. JavaScript: The Definitive Guide (p. 71). O'Reilly Media. Kindle Edition. 

/* 

assingment operators might cause trouble. values changing in assignment to a variable or property.

++ or -- increment/decrement operators are similar, since they perform implicit assignment. 

delete operator: deleting a property is like (but not the same as) assigning undefined to the property. 

*/

// 4.7.4 Operator Precedence

// Flanagan, David. JavaScript: The Definitive Guide (p. 71). O'Reilly Media. Kindle Edition. 

// The multiplication operator * has higher precedence than the addition operator +. 

// The = has the lowest precedence. You can use parentheses like you would in algebra. 

// my is an object with a property named functions whose value is an

// array of functions. We invoke function number x, passing it argument

// y, and then we ask for the type of the value returned.

typeof my.functions[x](y)

// 4.7.5 Operator Associativity

// Flanagan, David. JavaScript: The Definitive Guide (p. 72). O'Reilly Media. Kindle Edition. 

/* 

A value of L specifies left-to-right associativity, and a value of R specifies right-to-left associativity. 

The associativity of an operator specifies the order in which operations of the same precedence are performed.

Left-to-right associativity means that operations are performed from left to right.

Flanagan, David. JavaScript: The Definitive Guide (p. 72). O'Reilly Media. Kindle Edition. 

*/

// 4.7.6 Order of Evaluation

// Flanagan, David. JavaScript: The Definitive Guide (p. 73). O'Reilly Media. Kindle Edition. 

/*

Adding parentheses to the expressions can change the relative order of the multiplication, addition, 

and assignment, but not the left-to-right order of evaluation.

Flanagan, David. JavaScript: The Definitive Guide (p. 73). O'Reilly Media. Kindle Edition. 

*/

// 4.8 Arithmetic Expressions

// Flanagan, David. JavaScript: The Definitive Guide (p. 73). O'Reilly Media. Kindle Edition. 

/* 

The basic arithmetic operators are 
** (exponentiation), * (multiplication), / (division), 
% (modulo: remainder after division), + (addition), and - (subtraction). 
As noted, we’ll discuss the + operator in a section of its own. 
The other five basic operators simply evaluate their operands, convert the values to numbers if necessary, 
and then compute the power, product, quotient, remainder, or difference.

Flanagan, David. JavaScript: The Definitive Guide (p. 73). O'Reilly Media. Kindle Edition. 

*/

// 4.8.1 The + Operator

// Flanagan, David. JavaScript: The Definitive Guide (p. 74). O'Reilly Media. Kindle Edition. 

1 + 2   // => 3
"hello" + "" + "there"  // => "hello there"
"1" + "2"   // => "12"

// Other examples

1 + 2   // => 3: addition
"1" + "2"   // => "12": concat
"1" + 2     // => "12": concat after number-to-string
1 + {}  // => "1[object Object]": concat after object-to-string
true + true     // => 2: addition after boolean-to-number
2 + null    // => 2: addition after null converts to 0
2 + undefined   // => NaN: addition after undefined converts to NaN

// Caution

1 + 2 + "blind mice"    // => "3 blind mice"
1+ (2 + "blind mice")   // => "12 blind mice"

// 4.8.2 Unary Arithmetic Operators

// Flanagan, David. JavaScript: The Definitive Guide (p. 75). O'Reilly Media. Kindle Edition. 

