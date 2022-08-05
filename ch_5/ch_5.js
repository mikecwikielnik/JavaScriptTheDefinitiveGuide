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

