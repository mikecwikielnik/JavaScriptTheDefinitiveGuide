/*

Chapter 5. Statements

Flanagan, David. JavaScript: The Definitive Guide (p. 97). O'Reilly Media. Kindle Edition. 

*/

// 5.1 Expression Statements

// Flanagan, David. JavaScript: The Definitive Guide (p. 98). O'Reilly Media. Kindle Edition. 

// greeting ="Hello" + name;
i *= 3;

counter++;

delete o.x;

console.log(debugMessage);
displaySpinner();   // A hypothetical function to display a spinner in a web app. 

// If a function does not have any side effects, there is no sense in calling it,
// unless it is part of a larger expression or an assignment statement. 

Math.cos(x)     // He says you wouldn't compute this and throw it away

cs = Math.cos(x)    // You'd assign it to a var so you can use it later

// 5.2 Compound and Empty Statements

// Flanagan, David. JavaScript: The Definitive Guide (pp. 98-99). O'Reilly Media. Kindle Edition. 

{
    x = Math.PI;
    cx = Math.cos(x);
    console.log("cos(pi) =" + cx)
}

;   // empty statement

// Initialize an array a

for(let i = 0; i < a.length; a[i++] = 0);

if((a===0)||(b===0));   // Oops! this line does nothing
    o = null;   // and this line is always executed 

// When you want to do it on purpose, do this:

for(let i = 0; i < a.length; a[i++] = 0)/*empty*/;

// 5.3 Conditionals

// Flanagan, David. JavaScript: The Definitive Guide (p. 100). O'Reilly Media. Kindle Edition. 

// 5.3.1 if

// Flanagan, David. JavaScript: The Definitive Guide (p. 100). O'Reilly Media. Kindle Edition. 

// if(expression)
//  statement

if(username == null)    // If username is null or undefined,
    username = "John Doe";  // define it

// OR:

// If usernamem is null, undefined, false, 0, "", or NaN, give it a new value
if(!username)username = "John Doe";

if(!address){
    address = "";
    message = "Please specify a mailing address.";
}

// if(expression)
//  statement 1
// else
//  statement 2

if(n === 1)
    console.log("You have 1 new message.");
else
    console.log(`You have ${n} new messages.`)

// Example that is wrong:

i = j = 1;
k = 2;
if(i === j)
    if(j === k)
        console.log("i equals k");
else
    console.log("i doesn't equal j");   //  WRONG! 

// The identation of the else stmt is wrong. 
// JavaScript read it like:

if(i === j){
    if(j === k)
        console.log("i equals k");
    else
        console.log(" i doesn't equal j");  // OOPS
}

// The wrong example should be this:

if(i === j){
    if(j === k){
        console.log("i equals k");
    }
}else{  // What a difference the location of a curly brace makes!
    console.log("i doesn't equal j");
}

// 5.3.2 else if

// Flanagan, David. JavaScript: The Definitive Guide (p. 102). O'Reilly Media. Kindle Edition. 

// not really JavaScript, its just used alot in programming

if(n === 1){
    // Executes code block #1
}else if(n === 2){
    // Executes code block #2
}else if(n === 3){
    // Executes code block #3 
}else { 
    // If all else fails, execute code block #4
}

// 5.3.3 switch

// Flanagan, David. JavaScript: The Definitive Guide (p. 103). O'Reilly Media. Kindle Edition. 

switch(expression){
    // statements
}

switch(n){
    case 1:     // Start here if n === 1
    // Execute code block #1
    break;  // stop here
    case 2:     // Start here if n === 2
    // Execute code block #2
    break;
    case 3:     // Start here if n === 3
    // Execute code block #3
    break;
    default:    // else stmt
    // Execute code block #4
    break;
}

// A more realistic example:

function convert(x){
    switch(typeofx){
        case "number":  // Convert the number to a hexadecimal integer
            return x.toString(16);
        case "string":  // Return the string enclosed in quotes
            return "" + x + "";
        default:    // Convert any other type in the usual way
            return String(x);
    }
}

// 5.4 Loops

// Flanagan, David. JavaScript: The Definitive Guide (p. 105). O'Reilly Media. Kindle Edition. 

// JavaScript has five looping statements:
// while, do/while, for, for/of (and its for/await variant),
// and for/in.


// 5.4.1 while

// Flanagan, David. JavaScript: The Definitive Guide (p. 105). O'Reilly Media. Kindle Edition. 

// while(expression)
//  statement

// The while statement is JavaScripts's basic loop!!!

let count = 0;
while(count < 10){  // You printed this loop up to one million
    console.log(count);
    count++;
}

// 5.4.2 do/while

// Flanagan, David. JavaScript: The Definitive Guide (p. 106). O'Reilly Media. Kindle Edition. 

// do 
//     statement
// while(expression);

// less common than the while loop,
// because it is uncommon to know that you want the loop 
// to execute at least once. 

// 5.4.3 for

// Flanagan, David. JavaScript: The Definitive Guide (p. 106). O'Reilly Media. Kindle Edition. 

for(initialize; test; increment)
    statement 

// Seeing how the for loop works in terms of a while loop:

initialize;
while(test){
    statement
    increment;
}

// Printing 0 to 9

for(let count = 0; count < 10; count++){
    console.log(count)
}

let i, j, sum = 0;
for(i=0, j=10; i<10; i++, j--){
    sum += i*j;
}

// 5.4.4 for/of

// Flanagan, David. JavaScript: The Definitive Guide (p. 108). O'Reilly Media. Kindle Edition. 

// Arrays, strings, sets, and maps are ITERABLE.
// They represent a sequence or set of elements
// that you can loop through using a for/of loop

let data = [1,2,3,4,5,6,7,8,9], summ =0;
for(let element of data){
    summ += element;
}
summ    // // => 45

// for/of with objects
// Objects are not (by default) iterable. 

let o = {x: 1, y:2, z: 3};
for(let element of o){  // Throws TypeError because o is not iterable
    console.log(element);
}

// if you want to iterate through the properties of an object:

let oO = {x:1, y:2, z:3};
let keys = "";
for(let k of Object.keys(o)){
    keys += k;
}
keys    // => "xyz"

// Going through the values in the key, value set

let summm = 0;
for(let v of Object.values(o)){
    sum += v;
}
sum     // => 6

// if you are interested in both k,v

let pairs ="";
for(let [k,v]of Object.entries(o)){
    pairs += k + v;
}
pairs   // => "x1y2z3"

// for/of with strings

let frequency = {};
for(let letter of "mississippi"){
    if(frequency[letter]){
        frequency[letter]++;
    }else{
        frequency[letter] = 1;
    }
}
frequency   // => {m: 1, i: 4, s: 4, p: 3}

// for/of with set and map

// The built-in ES6 Set and Map classes are iterable. 

let text = "Na na Batman";
let wordSet = new Set(text.split(""));
let unique = [];
for(let word of wordSet){
    unique.push(word);
}
unique  // => ["Na", "na", "Batman"]

// Example of destructuring k,v pairs

let m = new Map([[1,"one"]]);
for(let [key, value] of m){
    key     // => 1
    value   // => "one"
}

// 5.4.5 for/in

// Flanagan, David. JavaScript: The Definitive Guide (p. 111). O'Reilly Media. Kindle Edition. 

// for(variable in object)
//  statement

for(let p in o){    // Assign property names of o to variable p
    console.log(o[p]);  // Print the value of each property
}

// Ex: copying the names of all object properties into an array:

let oo = {x:1, y:2, z:3};
let a = [], ii = 0;
for(a[ii++] in oo)/*empty*/;

// Putting this at the end of the previous ex, enumerates the array indexes 0, 1, 2

for(let ii in a)console.log(ii);

// NOTE: use for/of loops with arrays, not for/in
// NOTE: use for/of loops when working with arrays

// 5.5 Jumps

// Flanagan, David. JavaScript: The Definitive Guide (p. 112). O'Reilly Media. Kindle Edition. 

// 5.5.1 Labeled Statements

// Flanagan, David. JavaScript: The Definitive Guide (p. 113). O'Reilly Media. Kindle Edition. 

// identifier.statement

// labeled while loop & a continue stmt:

mainloop: while(token !== null){
    // Code omitted
    continue mainloop;  // Jump to the next iteration of the named loop
    // More code omitted
}

// 5.5.2 break

// Flanagan, David. JavaScript: The Definitive Guide (p. 114). O'Reilly Media. Kindle Edition. 

// break;

// Ex: the loop either breaks after finding its value or terminates when it reaches the end

for(let i=o; i<a.length; i++){
    if(a[i] === target)break;
}

// Ex: breaking out a loop that is not the nearest enclosing loop

let matrix = getData();     // Get a 2D array of numbers from somewhere
// Now sum all the numbers in the matrix
let suM = 0, success = false;
// Start with a labeled statement that we can break out of if errors occur
computeSum: if(matrix){
    for(let x=0; x < matrix.length; x++){
        let row = matrix[x];
        if(!row)break computeSum;
        for(let y = 0; y < row.length; y++){
            let cell = row[y];
            if(isNaN(cell)) break computeSum;
            sum += cell;
        }
    }
    success = true;
}
// The break statements jump here. If we arrive here with success == false
// then there was something wrong with the matrix we were given.
// Otherwise, sum contains the sume of all cells of the matrix

// 5.5.3 continue

// Flanagan, David. JavaScript: The Definitive Guide (p. 115). O'Reilly Media. Kindle Edition. 

// continue;

// continue labelname;

// Ex: An unlabeled continue statement being used to skip the rest of the current iteration

for(let i=0; i < data.length; i++){
    if(!data[i]) continue; // Can't proceed with undefined data
    total += data[i];
}

// 5.5.4 return

// Flanagan, David. JavaScript: The Definitive Guide (p. 116). O'Reilly Media. Kindle Edition. 

// return expression;

function square(x){return x*x}  // A function that has a return statement
square(2)   // => 4

// Ex: return statement can also be used w.o an expression
// to make the function return undefined to its caller:

function displayObject(o){
    // Return immediately if the argument is null or undefined.
    if(!o)return;
    // Rest of function goes here
}

// 5.5.5 yield

// Flanagan, David. JavaScript: The Definitive Guide (p. 117). O'Reilly Media. Kindle Edition. 

// yield is used in ES6 only. Produces the next value in sequence of values
// w.o actually returning:

// A generator function that yields a range of integers
function*range(from,to){
    for(let i=from; i<=to; i++){
        yield i;
    }
}

// 5.5.6 throw

// Flanagan, David. JavaScript: The Definitive Guide (p. 117). O'Reilly Media. Kindle Edition. 

// throw expression;

// Ex: function that throws an Error Object when invoked with an invalid argument

function factorial(x){
    // If the input argument is invalid, throw an exception!
    if (x<0) throw new Error("x must not be negative");
    // Otherwise, compute a value and return normally
    let f;
    for (f=1; x>1; f*=x, x--)/*empty*/;
    return f;
}
factorial(4)    // => 24

// 5.5.7 try/catch/finally

// Flanagan, David. JavaScript: The Definitive Guide (p. 118). O'Reilly Media. Kindle Edition. 

// try/catch/finally stmt is JavaScript's exception handling mechanism


// Ex: illustrating the syntax and purpose of the try/catch/finally stmt

try{
    // Normally, this code runs from teh top of the block to the bottom
    // without problems. But it can sometimes throw an exceptioin,
    // either directly, with a throw statement, or indirectly, by calling
    // a method that throws an exception
}

catch(e){
    // The statements in this block are executed if, and only if, the try
    // block throws an exception. These statements can use the local variable
    // e to refer to the Error object or other value that was thrown.
    // This block may handle the exception somehow, may ignore the 
    // exception by doing nothing, or may rethrow the exception with throw.
}

finally{
    // This block contains statements that are always executed, regardless of
    // what happens in the try block. They are executed whether the try
    // block terminates:
    // 1) normally, after reaching the bottom of the block
    // 2) because of a break, continue, or return statement
    // 3) with an exception that is handled by a catch clause above
    // 4) with an uncaught exception that is still propagating
}

// Ex: a more realistic example

try{
    // Ask the user to enter a number
    let n = Number(prompt("Please enter a positive integer", ""));
    // Compute the factorial of the number, assuming the input is valid
    let f = factorial(n);
    // Display the result
    alert(n + "!= " + f);
}
catch(ex){  // If the user's input was not valid, we end up here
    alert(ex);  // Tell the user what the error is
}

// 5.6 Miscellaneous Statements

// Flanagan, David. JavaScript: The Definitive Guide (p. 121). O'Reilly Media. Kindle Edition. 

// with, debugger, and "use strict"

// 5.6.1 with

// Flanagan, David. JavaScript: The Definitive Guide (p. 121). O'Reilly Media. Kindle Edition. 

// with(object)
//  statement 

// Don't use the with statement. It will run more slowly. 

with(document.forms[0]){
    // Access form elements directly here. For example:
    name.value = "";
    address.value = "";
    email.value = "";
}

// Ex: Below is a better example that avoids the with statement 

let f = document.forms[0];
f.name.value = "";
f.address.value = "";
f.email.value = "";

// 5.6.2 debugger

// Flanagan, David. JavaScript: The Definitive Guide (p. 122). O'Reilly Media. Kindle Edition. 

// Normally, the debugger statement does nothing. 

function f(o){
    if(o === undefined) debugger;   // Temporary line for debuggins purposes
                // The rest of the function goes here.
}

// 5.6.3 “use strict”

// Flanagan, David. JavaScript: The Definitive Guide (p. 122). O'Reilly Media. Kindle Edition. 

// with statement is not allowed in strict mode

// All variables must be declared. Reference Error is thrown. 

// Functions invoked as functions (rather than as methods) have a this value of undefined. 

// 5.7 Declarations

// Flanagan, David. JavaScript: The Definitive Guide (p. 124). O'Reilly Media. Kindle Edition. 

// 5.7.1 const, let, and var

// Flanagan, David. JavaScript: The Definitive Guide (p. 125). O'Reilly Media. Kindle Edition. 

// In ES6 and later, const declares constants, and let declares variables 

// In modern JavaScript, there is really no reason to use var instead of let

const TAU = 2*Math.PI;
let radius = 3;
var circumference = TAU * radius;

// 5.7.2 function

// Flanagan, David. JavaScript: The Definitive Guide (p. 125). O'Reilly Media. Kindle Edition. 

// Ex:

function area(radius){
    return Math.PI*radius*radius;
}

// 5.7.3 class

// Flanagan, David. JavaScript: The Definitive Guide (p. 125). O'Reilly Media. Kindle Edition. 

// Looks like JavaScript class is similar to Python class

class Circle{
    constructor(radius){this.r = radius;}
    area(){return Math.PI*this.r*this.r;}
    circumference(){return 2*Math.PI*this.r;}
}

