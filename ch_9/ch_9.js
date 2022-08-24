/*

Chapter 9. Classes

Flanagan, David. JavaScript: The Definitive Guide (p. 221). O'Reilly Media. Kindle Edition. 

*/

// 9.1 Classes and Prototypes

// Flanagan, David. JavaScript: The Definitive Guide (p. 222). O'Reilly Media. Kindle Edition. 

// ex: 9-1 a simple JavaScript class

// This is a factory function that returns a new range object
function range(from, to){
    // Use Object.create() to create an object that inherits from the
    // prototype object defined below. The prototype object is stored as
    // a property of this function, and defines the shared methods(behavior)
    // for all range objects.
    let r = Object.create(range.methods);

    // Store the start and end points (state) of this new range object. 
    // These are noninherited properties that are unique to this object.
    r.from = from;
    r.to = to;

    // Finally return the new object
    return r;
}

// This prototype object defines methods inherited by all range objects
range.methods = {
    // Return true if x is in the range, false otherwise
    // This method works for textual and Date ranges as well as numeric.
    includes(x){return this.from <= x && x <= this.to;},

    // A generator function that makes instances of the class iterable
    // Note that it only works for numeric ranges
    *[Symbol.iterator](){
        for(let x = Math.ceil(this.from); x <= this.to; x++) yield x;
    },

    // Return a string representation of the range
    toString(){return "(" + this.from + "..." + this.to + ")";}
};

// Here are example uses of a range object
let r = range(1,3);     // Create a range object
r.includes(2)   // => true: 2 is in the range
r.toString()    // => "(1...3"
// [...r]  // => [1,2,3]; convert to an array via iterator

// 9.2 Classes and Constructors

// Flanagan, David. JavaScript: The Definitive Guide (p. 224). O'Reilly Media. Kindle Edition. 

// ex: 9-2 A Range class using a constructor
// this is older JavaScript code. For reference

// This is a constructor function that initializes new Range objects.
// Note that it does not create or return the object. It just initializes this.
function Range(from, to){
    // Store the start and end points (state) of this new range object.
    // These are noninherited properties that are unique to this object. 
    this.from = from;
    this.to = to;
}

// All range objects inherit from this object
// Note that the property name must be "prototype" for this to work
Range.prototype = {
    // Return true if x is in the range, false otherwise
    // This method works for textual and Date ranges as well as numeric
    includes: function(x){return this.from <= x && x <= this.to;},

    // A generator function that makes instances of the class iterable.
    // Note that it only works for numeric ranges
    [Symbol.iterator]: function*(){
        for(let x = Math.ceil(this.from); x <= this.to; x++) yield x;
    },

    // Return a string representation of the range
    toString: function(){return "(" + this.from + "..." + this.to + ")";}
};

// Here are example uses of this new Range class
let r1 = new Range(1,3);     // Create a Range object; note the use of new
r1.includes(2)  // => true: 2 is in the range
r1.toString()   // => "(1...3)"
// [...r1]     // => [1,2,3]; convert an array via iterator

// 9.2.1 Constructors, Class Identity, and instanceof

// Flanagan, David. JavaScript: The Definitive Guide (p. 226). O'Reilly Media. Kindle Edition. 

r instanceof Range  // => true: r inherits from Range.prototype

// ex:

function Strange(){}
Strange.prototype = Range.prototype;
new Strange() instanceof Range  // => true

// ex:

range.methods.isPrototypeOf(r);     // range.methods is the prototype object. 

// 9.2.2 The constructor Property

// Flanagan, David. JavaScript: The Definitive Guide (p. 228). O'Reilly Media. Kindle Edition. 

let F = function(){};   // This is a function object.
let p = F.prototype;    // This is the prototype object associated with F.
let c = p.constructor;  // This is the function associated with the prototype
c === F     // => true: F.prototype.constructor === F for any F

let o = new F();    // Create an object o of class F
o.constructor === F     // => true: the constructor property specifies the class

// ex:

Range.prototype = {
    constructor: Range,     // Explicitly set the constructor back-reference

    /* method definitions go here */
};

// ex: another older JavaScript technique

// Extend the predefined Range.prototype object so we don't overwrite
// the automatically created Range.prototype.constructor property
Range.prototype.includes = function(x){
    return this.from <= x && x <= this.to;
};
Range.prototype.toString = function(){
    return "(" + this.from + "..." + this.to + ")";
};

// 9.3 Classes with the class Keyword

// Flanagan, David. JavaScript: The Definitive Guide (p. 229). O'Reilly Media. Kindle Edition. 

// ex: ES6 syntax- looks more like python than before 

class Range {
    constructor(from,to){
        // Store the start and end points (state) of this new range object.
        // These are noninherited properties that are unique to this object.
        this.from = from;
        this.to = to;
    }

    // Return true if x is in the range, false else 
    // This method works for textual and Date ranges as well as numeric.
    includes(x){return this.from <= x && x <= this.to;}

    // A generator function that makes instances of the class iterable.
    *[Symbol.iterator](){
        for(let x = Math.ceil(this.from); x <= this.to; x++) yield x;
    }

    // Return a string representation of the range
    toString(){return `(${this.from}...${this.to})`;}
}

// Here are example uses of this new Range class
let r2 = new Range(1,3);    // Create a Range object
r2.includes(2)  // => true: 2 is in the range
r2.toString()   // => "(1...3)"
// [...r2]  // => [1,2,3]; convert to an array via iterator

// ex:

// A Span is like a Range, but instead of initializing it with
// a start and an end, we initialize it with a start and a length
class Span extends Range {
    constructor(start, length){
        if(length >= 0){
            super(start, start + length);
        }else {
            super(start + length, start);
        }
    }
}

// ex: class declarations have both statement and expression forms.

let square = function(x){return x*x;};
square(3)   // => 9

// we can also write:

let Square = class {constructor(x){this.area = x*x;}};
new Square(3).area  // => 9

// 9.3.1 Static Methods

// Flanagan, David. JavaScript: The Definitive Guide (p. 231). O'Reilly Media. Kindle Edition. 

// ex: add below code to ex 9-3

/*

static parse(s){
    let matches = s.match(/^\((d+)\.\.\.(\d+)\)$/);
    if(!matches){
        throw new TypeError(`Cannot parse Range from "${s}".`)
    }
    return new Range(parseInt(matches[1]), parseInt(matches[2]));
}
*/

let r3 = Range.parse('(1...10)');    // Returns a new Range object
r3.parse('(1...10)');   // TypeError: r.parse is not a function

// 9.3.2 Getters, Setters, and other Method Forms

// Flanagan, David. JavaScript: The Definitive Guide (p. 232). O'Reilly Media. Kindle Edition. 

/*

*[Symbol.iterator](){
    for(let x = Math.ceil(this.from); x <= this.to; x++) yield x;
}

*/

// 9.3.3 Public, Private, and Static Fields

// Flanagan, David. JavaScript: The Definitive Guide (p. 232). O'Reilly Media. Kindle Edition. 

// ex: constructor that initializes three fields

class Buffer {
    constructor(){
        this.size = 0;
        this.capacity = 4096;
        this.buffer = new Uint8Array(this.capacity);
    }
}

// ex: With the new instance field syntax likely to be standardized, you could write instead:

class Buffer { // More like python
    size = 0;
    capacity = 4096;
    buffer = new Uint8Array(this.capacity);
}

// ex: # makes fields private, which means immutable

class Buffer {
    #size = 0;
    get size(){return this.#size;}
}

// ex: static field

/*

static integerRangePattern = /^\((\d+)\.\.\.(\d+)\)$/;
static parse(s){
    let matches = s.match(Range.integerRangePattern);
    if(!matches){
        throw new TypeError(`Cannot parse Range from "${s}".`)
    }
    return new Range(parseInt(matches[1]), matches[2]);
}

*/

// 9.3.4 Example: A Complex Number Class

// Flanagan, David. JavaScript: The Definitive Guide (p. 234). O'Reilly Media. Kindle Edition. 