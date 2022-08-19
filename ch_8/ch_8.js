/*

Chapter 8. Functions

Flanagan, David. JavaScript: The Definitive Guide (p. 181). O'Reilly Media. Kindle Edition. 

*/

// 8.1 Defining Functions

// Flanagan, David. JavaScript: The Definitive Guide (pp. 181-182). O'Reilly Media. Kindle Edition. 

// 8.1.1 Function Declarations

// Flanagan, David. JavaScript: The Definitive Guide (p. 182). O'Reilly Media. Kindle Edition. 

// ex:

// Print the name and value of each property of o. Return undefined.
function printprops(o){
    for(let p in o){
        console.log(`${o[p]}\n`);
    }
}

// Compute the distance between Cartesian points (x1,y1) and (x2,y2)
function distance(x1,y1,x2,y2){
    let dx = x2 - x1;
    let dy = y2 - y1;
    return Math.sqrt(dx*dx + dy*dy)
}

// A recursive function (one that calls itself) that computes factorials
// Recall that x! is the product of x and all positive integers less than it
function factorial(x){
    if(x<=1)return 1;
    return x*factorial(x-1);
}

// 8.1.2 Function Expressions

// Flanagan, David. JavaScript: The Definitive Guide (p. 184). O'Reilly Media. Kindle Edition. 

// This function expression defines a function that squares its argument.
// Note that we assign it to a variable
const square = function(x){return x*x;};

// Function expressions can include names, which is useful for recursion
const f = function fact(x){if(x<=1)return 1;else return x*fact(x-1);};

// Function expressions can also be used as arguments to other functions:
[3,2,1].sort(function(a,b){return a-b;});

// Function expressions are sometimes defined and immediately invoked:
let tensquared = (function(x){return x*x;}(10));

// 8.1.3 Arrow Functions

// Flanagan, David. JavaScript: The Definitive Guide (p. 185). O'Reilly Media. Kindle Edition. 

