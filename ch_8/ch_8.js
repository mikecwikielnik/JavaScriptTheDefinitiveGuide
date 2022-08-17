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

