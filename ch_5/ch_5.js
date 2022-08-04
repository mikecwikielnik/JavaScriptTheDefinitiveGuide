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

