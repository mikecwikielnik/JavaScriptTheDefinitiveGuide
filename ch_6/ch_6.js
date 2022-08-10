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

let g ={};  // g inherits object methods from Object.prototype
g.x = 1;    // and it now has an own property x
let p = Object.create(o);   // p inherits properties from o and Object.prototype
p.y = 2;    // and has an own property
let q = Object.create(p);   // q inherits properties from p, g and...
q.z = 3;    // ... Object.prototype and has an own property z
let f = q.toString();   // toString is inherited from Object.prototype
q.x + q.y   // => 3; x and y are inherited from g and p

// ex:

let unitcircle = {r:1};   // An object to inherit from // a mini dictionary
let c = Object.create(unitcircle);  // c inherits the property r // a JavaScript syntax to create another object (variable)
c.x = 1; c.y = 1;   // c defines two properties of its own // now the dictionary has 3 names in the name/value pair: r, x, y
c.r = 2;    // c overrides its inherited property // r is not 2, not 1
unitcircle.r    // => 1: the prototype is not affected // you only call r through dot notation


// see: setter method 6.10.6

// 6.3.3 Property Access Errors

// Flanagan, David. JavaScript: The Definitive Guide (p. 137). O'Reilly Media. Kindle Edition. 

// ex: recall that our book has a "sub-title" property, but not a "subtitle" property

book.subtitle   // => undefined: property doesn't exist 

let len = book.subtitle.length;     // !TypeError: undefined doesn't have length

// Two ways to prevent calling variables that don't exist or are not defined:

// a verbose and explicit technique
let surname = undefined;
if(book){
    if(book.author){
        surname = book.author.surname;
    }
}

// A concise and idiomatic alt to get surname or null or undefined
surname = book && book.author && book.author.surname;

// ?  allows us to rewrite the previous assignment expression as:

let sSurname = book?.author?.surname;

// the reasons for failure of setting property p of an object o is usually to deal with p is a ready only

// Flanagan, David. JavaScript: The Definitive Guide (p. 138). O'Reilly Media. Kindle Edition. 

// 6.4 Deleting Properties

// Flanagan, David. JavaScript: The Definitive Guide (p. 138). O'Reilly Media. Kindle Edition. 

