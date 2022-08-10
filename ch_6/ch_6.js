/*

Chapter 6. Objects

Flanagan, David. JavaScript: The Definitive Guide (p. 129). O'Reilly Media. Kindle Edition. 

*/

// 6.1 Introduction to Objects

// Flanagan, David. JavaScript: The Definitive Guide (p. 129). O'Reilly Media. Kindle Edition. 

// objects are python dictionaries

// object has an unordered collection of properties, each have a name, value pair

// we say that the objects map string to values 

// 6.2 Creating Objects

// Flanagan, David. JavaScript: The Definitive Guide (p. 130). O'Reilly Media. Kindle Edition. 

// 6.2.1 Object Literals

// Flanagan, David. JavaScript: The Definitive Guide (p. 131). O'Reilly Media. Kindle Edition. 

let empty = {};     // An object with no properties
let point = {x:0, y:0};     // Two numeric properties
let p2 = {x: point.x, y:point.y+1};     // More complex values
let book = {
    "main title": "JavaScript",     // These property names include spaces,
    "sub-title": "The Definitive Guide",    // and hypens, so use string literals.
    for: "all audiences",   // for is reversed, but no quotes.
    author: {   // The value of this property is
        firstname: "David",     // itself an object
        surname: "Flanagan"
    }
};

// 6.2.2 Creating Objects with new

// Flanagan, David. JavaScript: The Definitive Guide (p. 131). O'Reilly Media. Kindle Edition. 

let o = new Object();   // Create an empty object: same as {}
let a = new Array();    // Create an empty array: same as []
let d = new Date();     // Create a Date object representing the current time
let r = new Map();  // Create a Map object for key/value mapping

// 6.2.3 Prototypes

// Flanagan, David. JavaScript: The Definitive Guide (p. 132). O'Reilly Media. Kindle Edition. 

// Almost every JavaScript object has a second JavaScript object associated with it. 

// This second object is known as a prototype, and the first object inherits properties from the prototype.

// 6.2.4 Object.create()

// Flanagan, David. JavaScript: The Definitive Guide (p. 132). O'Reilly Media. Kindle Edition. 

// Object.create() creates a new object, using its first argument as the prototype of the object:

let o1 = Object.create({x:1, y:2});     // o1 inherits properties x and y
o1.x + o1.y     // => 3

// If you do this below, you won't inherit any methods like toString() or + operator

let o2 = Object.create(null);   // o2 inherits no props or methods

// If you want to create an ordinary empty object

// (like the object returned by {} or new Object()), pass Object.prototype:

let o3 = Object.create(Object.prototype);   // o3 is like {} or new Object()

// Object.create() creates a new object with an arbitrary prototype
// is a powerful tool. 

// Object.create() guards against unintended changes of an object

// by a library function that you don't control 

let oO = {x:"don't change this value"};
library.function(Object.create(o));     // Guard against accidental modifications

// To understand why this works, we need to know 
// how properties are queried and set in JavaScript

// 6.3 Querying and Setting Properties

// Flanagan, David. JavaScript: The Definitive Guide (p. 133). O'Reilly Media. Kindle Edition. 

let author = book.author;   // Get the "author" property of the book.
let name = author.surname;  // Get the "surname" property of the author
let title = book["main title"];     // Get the "main title" property of the book

// To create or set a property, use a dot or square brackets
// as you would to query the property, but put them on LHS = 

book.edition = 7;   // Create an "edition" property of book
book["main title"] = "ECMAScript";  // Change the "main title" property

// 6.3.1 Objects As Associative Arrays

// Flanagan, David. JavaScript: The Definitive Guide (p. 134). O'Reilly Media. Kindle Edition. 

// These have the same value:

object.property 
object["property"]  // aka associative array 

// Ex:

let addr = "";
for(let i = 0; i < 4; i++){
    addr += customer[`address${i}`] + "\n";
}

// ex: user holds 50 shares of IBM, the portfolio.ibm property has the value 50

// ex: adding a new stock to the portfolio:

function addstock(portfolio, stockname, shares){
    portfolio[stockname] = shares;
}

// The power of this JavaScript statement becomes clear when you consider its use
// with associative arrays

// ex: computing total value of a portfolio

function computeValue(portfolio){
    let total = 0.0;
    for(let stock in portfolio){    // For each stock in the portfolio:
        let shares = portfolio[stock];  // get the number of shares
        let price = getQuote(stock);    // look up share price
        total += shares * price;    // add stock value to total value
    }
    return total;   // Return total value
}

// It is common that JavaScript objects are used as associative arrays
// as above, and it is important to understand how this works.

// In ES6 and later, the Map class is often a better choice
// than using a plain object

// 6.3.2 Inheritance

// Flanagan, David. JavaScript: The Definitive Guide (p. 135). O'Reilly Media. Kindle Edition. 

