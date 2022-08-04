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

