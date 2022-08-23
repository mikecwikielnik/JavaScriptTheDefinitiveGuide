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

