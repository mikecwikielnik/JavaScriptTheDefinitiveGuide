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

