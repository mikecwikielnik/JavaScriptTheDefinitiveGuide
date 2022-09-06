/*

Chapter 14. Metaprogramming

Flanagan, David. JavaScript: The Definitive Guide (p. 379). O'Reilly Media. Kindle Edition. 

*/

// 14.1 Property Attributes

// Flanagan, David. JavaScript: The Definitive Guide (p. 380). O'Reilly Media. Kindle Edition. 

// A property can have a name and four attributes:

// value, writable, enumerable, and configurable

// Accessor properties don't have a value attribute.

// Accessor properties have four attributes: get, set, enumerable, and configurable

// ex: to obtain the property descriptor for a named property of a specified object

// call Object.getOwnPropertyDescriptor():

// Returns {value: 1, writable: true, enumerable: true, configurable: true}
Object.getOwnPropertyDescriptor({x: 1}, "x");

// Here is an object with a read-only accessor property
const random ={
    get octet(){ return Math.floor(Math.random()*256);},
};

// Returns { get: /*func*/, set: undefined, enumerable: true, configurable: true} 
Object.getOwnPropertyDescriptor(random, "octet");

// Returns undefined for inherited properties and properties that don't exist
Object.getOwnPropertyDescriptor({}, "x")    // => undefined; no such prop
Object.getOwnPropertyDescriptor({}, "toString")     // => undefined; inherited

// ex: 

let o = {};     // Start with no properties at all
// Add a non-enumerable data property x with value 1
Object.defineProperty(o, "x", {
    value: 1,
    writable: true,
    enumerable: false,
    configurable: true
});

// Check that the property is there but is non-enumerable
o.x     // => 1
Object.keys(o)  // => []

// Now modify the property x so that it is read-only
Object.defineProperty(o, "x", { writable: false });

// Try to change the value of the property
o.x = 2;    // Fails silently or throws TypeError in strict mode
o.x     // => 1

// The property is still configurable, so we can change its value like this:
Object.defineProperty(o, "x", { value : 2 });
o.x     // => 2

// Now change x from a data property to an accessor property
Object.defineProperty(o, "x", { get: function(){ return 0;}});
o.x     // => 0

// ex:

let p = Object.defineProperties({}, {
    x: { value: 1, writable: true, enumerable: true, configurable: true },
    y: { value: 1, writable: true, enumerable: true, configurable: true },
    r: { 
        get(){ return Math.sqrt(this.x * this.x + this.y * this.y);},
        enumerable: true,
        configurable: true
    }
});
p.r     // => Math.SQRT2

// Example 14-1. Copying properties and their attributes from one object to another

// Flanagan, David. JavaScript: The Definitive Guide (p. 383). O'Reilly Media. Kindle Edition. 

/**
 * Define a new Object.assignDescriptors() function that works like
 * Object.assign() except that it copies property descriptors from
 * source objects into the target object instead of just copying
 * property values. This function copies all own properties,
 * both enumerable and non-enumerable. And because it copies descriptors,
 * it copies getter functions from source objects and overwrites setter
 * functions in the target object rather than invoking those getters and
 * setters.
 * 
 * Object.assignDescriptors() propagates any TypeError thrown by
 * Object.defineProperty(). This can occur if the target object is sealed
 * or frozen of it any of the source properties try to change an existing
 * non-configurable property on the target object.
 * 
 * Note that the assignDescriptors property is added to Object with
 * Object.defineProperty() so that the new function can be created as
 * a non-enumerable property like Object.assign().
 */
Object.defineProperty(Object, "assignDescriptors", {
    // Match the attributes of Object.assign()
    writable: true,
    enumerable: false,
    configurable: true,
    // The function that is the value of the assignDescriptors property.
    value: function(target, ...sources){
        for(let source of sources){
            for(let name of Object.getOwnPropertyNames(source)){
                let desc = Object.getOwnPropertyDescriptor(source, name);
                Object.defineProperty(target, name, desc);
            }

            for(let symbol of Object.getOwnPropertySymbols(source)){
                let desc = Object.getOwnPropertyDescriptor(source, symbol);
                Object.defineProperty(target, symbol, desc);
            }
        }
        return target;
    }
});

let o = {c: 1, get count() { return this.c++;}};    // Define object with getter
let p1 = Object.assign({}, o);  // Copy the property values
let q = Object.assignDescriptors({}, o);    // Copy the property descriptors
p1.count    // => 1: This is now just a data property so
p1.count    // => 1: ...the counter does not increment
q.count     // => 2: Incremented once whne we copied it the first time
q.count     // => 3: ...but we copied the getter method so it increments

// 14.2 Object Extensibility

// Flanagan, David. JavaScript: The Definitive Guide (p. 384). O'Reilly Media. Kindle Edition. 

// Create a sealed object with a frozen prototype and a non-enumerable property
let o = Object.seal(Object.create(Object.freeze({x: 1}),{y: {value: 2, writable: true}}));

// 14.3 The prototype Attribute

// Flanagan, David. JavaScript: The Definitive Guide (p. 386). O'Reilly Media. Kindle Edition. 

// ex: querying the prototype of any object

Object.getPrototypeOf({})   // => Object.prototype
Object.getPrototypeOf({})   // => Array.prototype
Object.getPrototypeOf(() => {})     // => Function.prototype

// ex:

let p2 = {x: 1};    // Define a prototype object
let o1 = Object.create(p2);  // Create an object with that prototype
p2.isPrototypeOf(o1)     // => true: o1 inherits from p2
Object.prototype.isPrototypeOf(p2)  // => true: p2 inherits from Object.prototype
Object.prototype.isPrototypeOf(o1)  // => true: o1 does too

let o2 = {x: 1};
let p3 = {y: 2};
Object.setPrototypeOf(o, p3);    // Set the property of o2 to p3
o2.y    // => 2: o2 now inherits the property y
let a = [1,2,3];
Object.setPrototypeOf(a, p3);    // Set the prototype of array a to p3
a.join  // => undefined: a no longer has a join() method

// ex: __proto__ example

let p4 = {z: 3};
let o3 = {
    x: 1,
    y: 2,
    __proto__: p4
};
o3.z    // => 3: o3 inherits from p4

// 14.4 Well-Known Symbols

// Flanagan, David. JavaScript: The Definitive Guide (p. 387). O'Reilly Media. Kindle Edition. 

// 14.4.2 Symbol.hasInstance

// Flanagan, David. JavaScript: The Definitive Guide (p. 388). O'Reilly Media. Kindle Edition. 

// ex: generic type checking with pseudotype objects with Symbol.hasInstance

// Define an object as a "type" we can use with instanceof
let uint8 = {
    [Symbol.hasInstance](x){
        return Number.isInteger(x) && x >= 0 && x <= 255;
    }
};
128 instanceof uint8    // => true
256 instanceof uint8    // => false: too big
Math.PI instanceof uint8    // => false: not an integer

// 14.4.3 Symbol.toStringTag

// Flanagan, David. JavaScript: The Definitive Guide (p. 388). O'Reilly Media. Kindle Edition. 

// {}.toString()   // => "[object Object]"

Object.prototype.toString.call([])  // => "[object Array]"
Object.prototype.toString.call(/./)     // => "[object RegExp]"
Object.prototype.toString.call(() => {})    // => "[object Function]"
Object.prototype.toString.call("")  // => "[object String]"
Object.prototype.toString.call(0)   // => "[object Number]"
Object.prototype.toString.call(false)   // => "[object Boolean]"

// ex:

function classof(o){
    return Object.prototype.toString.call(o).slice(8, -1);
}

classof(null)   // => null
classof(undefined)  // => undefined
classof(1)  // => number
classof(10n**100n)  // => BigInt
classof("")     // => String
classof(false)  // => Boolean
classof(Symbol())   // => Symbol
classof({})     // => Object
classof([])     // => Array
classof(/./)    // => RegExp
classof(() => {})   // => Function
classof(new Map())  // => Map
classof(new Set())  // => Set
classof(new Date())     // => Date

// ex:

class Range{
    get [Symbol.toStringTag](){ return "Range";}
    // the rest of this class is omitted here
}
let r = new Range(1, 10);
Object.prototype.toString.call(r)   // => [object Range]
classof(r)  // => Range

// 14.4.4 Symbol.species

// Flanagan, David. JavaScript: The Definitive Guide (p. 389). O'Reilly Media. Kindle Edition. 

// ex: simple subclass of Array:

// A trivial Array subclass that adds getters for the first and lasat elements.
class EZArray extends Array {
    get first() { return this[0];}
    get last() { return this[this.length-1];}
}

let e = new EZArray(1,2,3);
let f = e.map(x => x * x);
e.last  // => 3: the last element of EZArray e
f.last  // => 9: f is also an EZArray with a last property

// ex: 

EZArray[Symbol.species] = Array;    // Attempt to set a read-only property fails

// Instead we can use defineProperty():
Object.defineProperty(EZArray, Symbol.species, {value: Array});

// ex: explicitly define your own Symbol.species getter when creating the subclass in the first place:

class EZArray extends Array {
    static get [Symbol.species](){ return Array; }
    get first(){ return this[0]; }
    get last(){ return this[this.length-1];}
}

let e1 = new EZArray(1,2,3);
let f1 = e1.map(x => x - 1);
e1.last     // => 3
f1.last     // => undefined: f1 is a regular array with no last getter

// 14.4.5 Symbol.isConcatSpreadable

// Flanagan, David. JavaScript: The Definitive Guide (p. 391). O'Reilly Media. Kindle Edition. 

// ex:

let arraylike = {
    length: 1,
    0: 1,
    [Symbol.isConcatSpreadable]: true
};
[].concat(arraylike)    // => [1]: (would be [[1]] if not spread)

// ex:

class NonSpreadableArray extends Array {
    get [Symbol.isConcatSpreadable](){ return false; }
}
let a1 = new NonSpreadableArray(1,2,3);
[].concat(a).length     // => 1; (would be 3 elements long if a1 was spread)

// 14.4.6 Pattern-Matching Symbols

// Flanagan, David. JavaScript: The Definitive Guide (p. 392). O'Reilly Media. Kindle Edition. 
