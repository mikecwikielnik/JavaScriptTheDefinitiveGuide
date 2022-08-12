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

delete book.author;     // The book object now has has no author property
delete book["main title"];  // Now it doesn't have "main title", either. 

let oOO = {x:1};    // oOO has own property x and inherits property toString
delete oOO.x    // => true: deletes property x
delete oOO.x    // => true: does nothing (x doesn't exist) but true anyway
delete oOO.toString     // => true: does nothing (toString isn't an own property)
delete 1    // => true: nonsense, but true anyway 

// In strict mode, all these deletions throw TypeError instead of returning false
delete Object.prototype     // => false: property is non-configurable
var x = 1;  // Declare a global variable
delete globalThis.x     // => false: can't delete this property
function f(){}  // Declare a global function
delete globalThis.f     // => false: can't delete this property either 

// Deleting objects in non-strict mode. 

globalThis.x = 1;   // Create a configurable global property (no let or var)
delete x    // => true: this property can be deleted 

// In strict mode, you have to be explicit about the property access:

delete x;   // SyntaxError in strict mode
delete globalThis.x;    // This works 

// 6.5 Testing Properties

// Flanagan, David. JavaScript: The Definitive Guide (p. 139). O'Reilly Media. Kindle Edition. 

// in operator 

let q = {x:1};
"x" in q    // => true: q has an own property "x"
"y" in q    // => false: q doesn't have a property "y"
"toString" in q     // => true: q inherits a toString property

// hasOwnProperty() method

let z = {x:1};
z.hasOwnProperty("x")   // => true: z has an own property x
z.hasOwnProperty("y")   // => false: z doesn't have a property y
z.hasOwnProperty("toString")    // => false: toString is an inherited property 

// propertyIsEnumerable()

let k = {x:1};
k.propertyIsEnumerable("x")     // => true: k has an own enumerable property x
k.propertyIsEnumerable("toString")  // => false: not an own property 
Object.prototype.propertyIsEnumerable("toString")   // => false: not enumerable

// !== use instead of in operator, !== makes sure it is not undefined

let s = {x:1};
s.x !== undefined   // => true: s has a property x
s.y !== undefined   // => false: s doesn't have a property y
s.toString !== undefined    // => true: s inherits a toString property

// ex:

let j = {x: undefined};     // Property is explicitly set to undefined
j.x !== undefined   // => false: property exists but is undefined
j.y !== undefined   // => false: property doesn't even exist
"x" in j    // => true: the property exits
"y" in j    // => false: the property doesn't exist
delete j.x;     // Delete the property x
"x" in j    // => false: it doesn't exist anymore

// the above chunk seems elementary 
// but it is the undefined part that is new 

// 6.6 Enumerating Properties

// Flanagan, David. JavaScript: The Definitive Guide (p. 140). O'Reilly Media. Kindle Edition. 

// FOR/IN LOOP

let p ={x:1, y:2, z:3};     // Three enumerable own properties
p.propertyIsEnumerable("toString")  // => false: not enumerbale
for(let q in p){    // Loop through the properties
    console.log(q);     // Prints x,y, and z, but not toString
}

// To guard against enumerating inherited properties with for/in, you can add an explicit check inside the loop body:

// Flanagan, David. JavaScript: The Definitive Guide (p. 140). O'Reilly Media. Kindle Edition. 

for(let q in p){
    if(!p.hasOwnProperty(q))continue;   // Skip inherited properties
}

for(let q in p){
    if(typeof p[q] === "function")continue;     // Skip all methods
}

// As an alternative to using a for/in loop, 
// it is often easier to get an array of property names for an object and then loop through that array with a for/of loop.

// Flanagan, David. JavaScript: The Definitive Guide (p. 141). O'Reilly Media. Kindle Edition. 

/* 

Please see:

Object.keys() 

Object.getOwnPropertyNames()

Object.getOwnPropertySymbols()

Reflect.ownKeys()

*/

// 6.7 Extending Objects

// Flanagan, David. JavaScript: The Definitive Guide (p. 142). O'Reilly Media. Kindle Edition. 

// There is a common need in JavaScript to copy the properties of one object to another object. 

let target = {x:1}, source = {y:2, z:3};
for(let key of Object.keys(source)){
    target[key] = source[key];
}

target  // => {x:1, y:2, z:3}

// Usually extend() performs this copying operation 

// ES6 gives Object.assign()

Object.assign(o, defaults);     // overwrites everything in o with defaults

// Instead, what you can do is create a new object, copy the defaults into it,
// and then override those defaults with the properties in o:

o = Object.assign({}, defaults, o);

// ... spread operator

o = {...defaults, ...o};

// Like Object.assign() but doesn't override existing properties
// (and also doesn't handle Symbol properties)

function merge(target, ...sources){
    for(let source of sources){
        for(let key of Object.keys(source)){
            if(!(key in target)){   // This is different than Object.assing()
                target[key] = source[key];
            }
        }
    }
    return target;
}
Object.assign({x:1}, {x:2, y:2}, {y:3, z:4})    // => {x:2, y:3, z:4}
merge({x:1}, {x:2, y:2}, {y:3, z:4})    // => {x:1, y:2, z:4}

// 6.8 Serializing Objects

// Flanagan, David. JavaScript: The Definitive Guide (p. 143). O'Reilly Media. Kindle Edition. 

// Object serialization is when you convert objects to strings which can be reversed later

// The functions JSON.stringify() and JSON.parse() serialize and restore JavaScript objects.

// Flanagan, David. JavaScript: The Definitive Guide (p. 143). O'Reilly Media. Kindle Edition. 

// JSON === JavaScript Object Notation 

let f = {x:1, y: {z: [false, null, ""]}};    // Define a test object
let y = JSON.stringify(f);  // y == '{"x": "y": {"z":[false, null, ""]}}'
let u = JSON.parse(y);  // u == {x:1, y: {z:[false, null, ""]}}

// JSON syntax is a subset of JavaScript syntax

// 6.9 Object Methods

// Flanagan, David. JavaScript: The Definitive Guide (p. 144). O'Reilly Media. Kindle Edition. 

// 6.9.1 The toString() Method

// Flanagan, David. JavaScript: The Definitive Guide (p. 144). O'Reilly Media. Kindle Edition. 

let sS = {x:1, y:1}.toString();  // sS == "[object Object]"

let point1 = {
    x:1,
    y:2,
    toString: function(){return `(${this.x}, ${this.y})`;}
};
String(point)

// 6.9.2 The toLocaleString() Method

// Flanagan, David. JavaScript: The Definitive Guide (p. 145). O'Reilly Media. Kindle Edition. 

let point2 = {
    x: 1000,
    y: 2000,
    toString: function(){return `(${this.x}, ${this.y})`;},
    toLocaleString: function(){
        return `(${this.x.toLocaleString()}, ${this.y.toLocaleString()})`;
    }
};
point.toString()    // => "(1000, 2000)"
point.toLocaleString()  // => "(1,000, 2,000)": note thousands separators

// 6.9.3 The valueOf() Method

// Flanagan, David. JavaScript: The Definitive Guide (p. 145). O'Reilly Media. Kindle Edition. 

// turns an object to some object other than string- typically, a number

// Ex: 

let point3 = {
    x:3,
    y:4,
    valueOf: function(){return Math.hypot(this.x, this.y);}
};
Number(point)   // => 5: valueOf() is used for conversations to numbers

point3 > 4  // => true
point3 > 5  // => false
point3 < 6  // =>> true

// 6.9.4 The toJSON() Method

// Flanagan, David. JavaScript: The Definitive Guide (p. 146). O'Reilly Media. Kindle Edition. 

let point4 = {
    x:1,
    y:2,
    toString: function(){return `(${this.x}, ${this.y})`;},
    toJSON: function(){return this.toString();}
};
JSON.stringify([point4])    // => '["(1,2)"]'

// 6.10 Extended Object Literal Syntax

// Flanagan, David. JavaScript: The Definitive Guide (p. 146). O'Reilly Media. Kindle Edition. 

// 6.10.1 Shorthand Properties

// Flanagan, David. JavaScript: The Definitive Guide (p. 146). O'Reilly Media. Kindle Edition. 

// basic object literal syntax:

let v = 1, p = 2;
let h = {
    v:v,
    p:p
};

// In ES6 and later, you can drop the colon and one copy of the identifier & it yields simpler code:

let b = 1, e = 2;
let i = {b,e};
i.b + i.e   // => 3

// 6.10.2 Computed Property Names

// Flanagan, David. JavaScript: The Definitive Guide (p. 147). O'Reilly Media. Kindle Edition. 

const PROPERTY_NAME = "p1";
function computePropertyName(){return "p" + 2;}

let n = {};
n[PROPERTY_NAME] = 1;
n[computePropertyName()] = 2;

// ES6 allows you to do the following:

const PROPERTY_NAME1 = "p1"
function computePropertyName(){return "p" + 2;}

let w = {
    [PROPERTY_NAME1]: 1,
    [computePropertyName()]: 2
};

w.p1 + w.p2     // => 3

// 6.10.3 Symbols as Property Names

// Flanagan, David. JavaScript: The Definitive Guide (p. 148). O'Reilly Media. Kindle Edition. 


const extension = Symbol("my extension symbol");
let x = {
    [extension]: {/* extension data stored in this object*/}
};
x[extension].y = 0;     // This won't conflict with other properties of x

// 6.10.4 Spread Operator

// Flanagan, David. JavaScript: The Definitive Guide (p. 148). O'Reilly Media. Kindle Edition. 

let position = {x:0, y:0};
let dimensions = {width: 100, height: 75};
let rect = {...position, ... dimensions};
rect.x + rect.y + rect.width + rect.height  // => 175

// ex:

let o4 = {x:1};
let p3 = {x:0, ...o4};
p3.x    // => 1: the value from object o4 overrides the initial value 
let q1 = {...o4, x:2};
q1.x    // => 2: the value 2 overrides the previous value from o4

// ex:

let e1 = Object.create({x:1});  // e1 inherits the property x
let p4 = {...e1};
p4.x    // => undefined 

// 6.10.5 Shorthand Methods

// Flanagan, David. JavaScript: The Definitive Guide (p. 149). O'Reilly Media. Kindle Edition. 

// Prior to ES6:

let square = {
    area:function(){return this.side * this.side;},
    side: 10
};
square.area()   // => 100

// ES6 ex:

let square1 = {
    area(){return this.side * this.side;},
    side:10
};
square.area()   // => 100

// ex: 

const METHOD_NAME = "m";
const symbol = Symbol();
let weirdMethods = {
    "method With Spaces"(x){return x+1;},
    [METHOD_NAME](x){return x + 2},
    [symbol](x){return x + 3;}
};
weirdMethods["method With Spaces"](1)   // => 2
weirdMethods[METHOD_NAME](1)    // => 3
weirdMethods[symbol](1)     // => 4

// 6.10.6 Property Getters and Setters

// Flanagan, David. JavaScript: The Definitive Guide (p. 150). O'Reilly Media. Kindle Edition. 

let o5 = {
    // An ordinary data property
    dataProp: value,

    // An accessor property defined as a pair of functions
    get accessorProp(){return this.dataProp;},
    set accessorProp(value){this.dataProp = value;}
};

let p = {
    // x and y are regular read-write data properties
    x: 1.0,
    y: 1.0,

    // r is a read-write accessor property with getter and setter
    // Don't forget to put a comma after accessor methods
    get r(){return Math.hypot(this.x, this.y);},
    set r(newvalue){
        let oldvalue = Math.hypot(this.x, this.y);
        let ratio = newvalue/oldvalue;
        this.x *= ratio;
        this.y *= ratio;
    },

    // theta is a read-only accessor property with getter only
    get theta(){return Math.atan2(this.y, this.x);}
};

p.r     // => Math.SQRT2
p.theta     // => Math.PI/4

let q = Object.create(p);   // A new object that inherits getters and setters
q.x = 3; q.y = 4;   // Create q's own data properties
q.r     // => 5: the inherited accessor properties work
q.theta     // => Math.atan2(4,3)

// ex:

// This object generates strictly increasing serial numbers
const serialnum = {
    // This data property holds the next serial number
    // The _ in the property name hints that it is for interal use only
    _n: 0,

    // Return the current value and increment it
    get next(){return this._n++;},

    // Set a new value of n, but only if it is larger than current
    set next(n){
        if(n > this._n)this._n = n;
        else throw new Error("serial number can only be set to a larger value");
    }
};
serialnum.next = 10;    // Set the starting serial number
serialnum.next  // => 10
serialnum.next  // => 11: different value each time we get next

// ex: 

// This object has accessor properties that return random numbers
// The expression "random.octet", for example, yields a random number
// between 0 and 255 each time it is evaluated
const random = {
    get octet(){return Math.floor(Math.random()*256);},
    get uint16(){return Math.floor(Math.random()*65536);},
    get int16(){return Math.floor(Math.random()*65536)-32768;}
};

