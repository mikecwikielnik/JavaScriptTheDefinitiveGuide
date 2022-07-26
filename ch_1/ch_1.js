// Chapter 1. Introduction to JavaScript

// Flanagan, David. JavaScript: The Definitive Guide (p. 1). O'Reilly Media. Kindle Edition. 

// A variable is a symbolic name for a value 
// Variables are declared with the let keyword:
let x;  // Declare a variable named x

// Values can be assigned to variables with an = sign
x = 0;  // Now the variable x has the value 0
x // => 0: A variable evaluates to its value

// JavaScript supports several types of values 

x = 1;  // numbers
x = 0.001   // integers or reals
x = "hello world";  // Strings of text in quotation marks
x = 'JavaScript';   // Single quote marks also strings
x = true;   // a boolean value
x = false;  // the other boolean value
x = null;   // no value
x = undefined;  // a special value like null 

// JavaScript's most important datatype is the object
// An object is a collection of name/value pairs, or a string to value map.
let book = {    // Objects are enclosed in curly braces
    topic:"JavaScript", // The property "topic" has value "JavaScript"
    edition: 7  // The property "edition" has value 7
};  // The curly brace marks the end of the object 

// Access the properties of an object with . or []:
book.topic  // =>"JavaScript"
book["edition"] // => 7: another way to access property values.
book.author="Flanagan"; //Create new properties by assignment
book.contents = {}; //{} is an empty object with no properties 

// Conditionally access properties with ?. (ES2020):
book.contents?.ch01?.sect1 // => undefined: book.contents has no ch01 property. 

// JavaScript also supports arrays (numerically indexed lists) of values:
let primes = [2,3,5,7]; // An array of 4 values, delimited with [ and ]
primes[0]   // => 2: the first element (index 0) of the array
primes.length   // => 4: how many elements in the array
primes[primes.length-1] // => 7: the last element of the array
primes[4] = 9;  // Add a new element by assignment
primes[4] = 11; //Or alter an existing element by assignment 
let empty = []; // [] is an empty array with no elements
empty.length    // => 0

// Arrays and objects can hold other arrays and objects:
let points = [  // An array with 2 elements
    {x: 0, y:0}, // Each element is an object
    {x: 1, y: 1}
];
let data = {    //An object with properties
    trial1:[[1,2],[3,4]],   // The value of each property is an array
    trial2:[[2,3], [4,5]]   // The elements of the arrays are arrays
};

// Operators act on values (the operands) to produce a new value
// Arithmetic operators are some of the simplest:
3 + 2   // => 5: addition 
3 - 2   // => 1: substractioin
3 * 2   // => 6: multiplication
3 / 2   // => 1.5: division
points[1].x-points[0].x // => 1: more complicated operands also work
"3" + "2"   // => "32": concats strings

// JavaScript defines some shorthand arithmetic operators
let count = 0;  // defines a variable
count++;    // increment the variable
count--;    // decrement the variable
count+=2;   //add 2: same as count = count + 2;
count*= 3;  // Mult by 3: same as count = count * 3;
count   // => 6: variable names are expressions too

// Equality and relational operators test whether two values are equal,
// unequal, less than, greater than, etc. They evaluate to true or false
let z = 2,y = 3;   //These = signs are assignments
z === y // => false: equality
z !== y // => true: inequality
z < y   // => true: less-than
z <= y  // => true: less-than or equal
z > y   // => false: greater than
z >= y  // => false: greater than or equal
"two" === "three"   // => false: the two strings are different
"two">"three"   // => true:"tw" is alphabetically greater than "th"
false === (z > y)   // => true: false is equal to false. 

// Functions are parameterized blocks of JavaScript code that we can invoke
function plus1(x){  // Define a function named "plus1" with parameter "x"
    return x + 1;   // Return a value one larger than the value passed in 
}   //  Functions are enclosed in curly braces

plus1(y)    // => 4: y is 3, so this invocation returns 3 + 1

let square = function(x) {  // Functions are values and can be assigned to vars
    return x*x; // Compute the function's value
};  // Semicolon marks the end of the assignment

square(plus1(y))    // => 16: invoke two functions in one expression

// Arrow functions

const plus2 = x => x + 1;   // The input x mmaps to the output x + 1
const square2 = x => x*x;    // The input x maps to the output x*x
plus2(y)    // => 4: function invocation is the same
square2(plus2(y))    // => 16

// Methods

// When functions are assigned to the properties of an object, we call
// them "methods". All JavaScript objects (including arrays) have methods:
let a = []; // Create an empty array
a.push(1,2,3);  // The push() method adds elements to an array
a.reverse();    // Another method: reverse the order of elements

// We can define our own methods, too. The "this" keyword refers to the object
// on whichthe method is defined: in this case, the points array from earlier.
points.dist = function(){   // Define a method to compute distance betwen points
    let p1 = this[0];   // First element of array we're invoked on
    let p2 = this[1];   // Second element of the "this" object
    let a = p2.x-p1.x;  // Difference in x coordinates
    let b = p2.y-p1.y;  // Difference in y coordinates
    return Math.sqrt(a*a + // The Pythagorean theorem
            b*b);   // Math.sqrt() computes the square root
};
points.dist()   // => Math.sqrt(2): distance between our 2 points

// JavaScript statements include conditionals and loops using the syntax
// of C, C++, Java, and other languages
function abs(x){    // A function to compute the absolute value.
    if (x>=0){  // The if statement...
        return x;   // executes this code if the comparison is true
    }   // This is the end of the if clause
    else{   // The optional else clause executes its code if
        return -x;  // the comparison is false
    }   // Curly braces optional when 1 statement per clause
}   // Note return statements nested inside if/else
abs(-10) === abs(10) // => true

