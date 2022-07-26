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

// ex:

class Glob {
    constructor(glob){
        this.glob = glob;

        // We implement glob matching using RegExp Internally
        // ? matches any one character except /, and * matches zero or more
        // of those characters. We use capturing groups around each.
        let regexpText = glob.replace("?", "([^/]").replace("*","([^/]*)");

        // We use the u flag to get Unicode-aware matching.
        // Globs are intended to match entire strings, so we use the ^ and $
        // anchors and do not implement search() or matchAll() since they 
        // are not useful with patterns like this.
        this.regexp = new RegExp(`^${regexpText}$`, "u");
    }

    toString(){ return this.glob; }

    [Symbol.search](s){ return s.search(this.regexp); }
    [Symbol.match](s){ return s.match(this.regexp); }
    [Symbol.replace](s, replacement){
        return s.replace(this.regexp, replacement);
    }
}

let pattern = new Glob("docs/*.txt");
"docs/js.txt".search(pattern)   // => 0: matcches at character 0
"docs/js.htm".search(pattern)   // => -1: does not match
let match = "docs/js.txt".match(pattern);
match[0]    // => "docs/js.txt"
match[1]    // => "js"
match.index     // => 0
"docs/js.txt".replace(pattern, "web/$1.htm")    // => "web/js.htm"

// 14.5 Template Tags

// Flanagan, David. JavaScript: The Definitive Guide (p. 395). O'Reilly Media. Kindle Edition. 

// ex:

function html(strings, ...values){
    // Convert each value to a string and escape special HTML characters
    let escaped = values.map(v => String(v)
                .replace("&","&amp;")
                .replace("<", "&lt;")
                .replace(">","&gt;")
                .replace("","&quot;")
                .replace("","&#39;"));

    // Return the concatenated strings and escaped values
    let result = strings[0];
    for(let i = 0; i < escaped.length; i++){
        result += escaped[i] + strings[i+1];
    }
    return result;
}

let operator = "<";
html`<b>x${operator}y</b>`  // => "<b>x&lt;y</b>"

// ex:

function glob(strings, ...values){
    // Assemble the strings and values into a single string
    let s = strings[0];
    for(let i = 0; i < values.length; i++){
        s += values[i] + strings[i + 1];
    }
    // Return a parsed representation of that string
    return new Glob(s);
}

let root = "/tmp";
let filePattern = glob`${root}/*.html`;     // A RegExp alternative
"/tmp/test.html".match(filePattern)[1]  // => "test"

// 14.7 Proxy Objects

// Flanagan, David. JavaScript: The Definitive Guide (p. 399). O'Reilly Media. Kindle Edition. 

// When we create a Proxy object, we specify two other objects, the target object and the handlers object:

// Flanagan, David. JavaScript: The Definitive Guide (pp. 399-400). O'Reilly Media. Kindle Edition. 

let proxy = new Proxy(target, handlers);

// ex:

let t = {x: 1, y: 2};
let p5 = new Proxy(t, {});
p5.x    // => 1
delete p5.y     // => true: delete property y of the proxy
t.y     // => undefined: this deletes it in the target, too
p5.z = 3    // Defining a new property on the proxy
t.z     // => 3: defines the property on the target

// ex:

function accessTheDatabase(){/*implementation omitted*/ return 42;}
let {proxy1, revoke} = Proxy.revocable(accessTheDatabase, {});

proxy()     // => 42: The proxy gives access to the underlying target function
revoke()    // But that access can be turned off whenever we want
proxy();    // !TypeError: we can no longer call this function

// ex:

// We use a Proxy to create an object that appears to have every
// possible property, with the value of each property equal to its name
let identity = new Proxy({}, {
    // Every property has its own name as its value
    get(o, name, target){return name;},
    // Every property name is defined
    has(o, name){return true;},
    // There are too many properties to enumerate, so we just throw
    ownKeys(o){throw new RangeError("Infinite number of properties");},
    // All properties exist and are not writable, configurable or enumerable
    getOwnPropertyDescriptor(o, name){
        return{
            value: name,
            enumerable: false,
            writable: false,
            configurable: false
        };
    },
    // All properties are read-only so they can't be set
    set(o, name, value, target){return false;},
    //All properties are non-configurable, so they can't be deleted
    deleteProperty(o, name){return false;},
    // All properties exist and are non-configurable so we can't define more
    defineProperty(o, name, desc){return false;},
    // In effect, this means that the object is not extensible
    isExtensible(o){return false;},
    // All properties are already defined on this object, so it couldn't
    // inherit anything even if it did have a prototype object
    getPrototypeOf(o){return null;},
    // The object is not extensible, so we can't change the prototype
    setPrototypeOf(o, proto){return false;},
});

identity.x  // => x
identity.toString   // => toString
identity[0]     // => 0
identity.x = 1  // Setting properties has no effect
identity.x  // => x
delete identity.x   // => false: can't delete properties either 
identity.x  // => x
Object.keys(identity);  // !RangeError: can't list all the keys
for(let p of identity);     // !RangeError

// ex: uses Proxy to create a read-only wrapper for a target object

function readOnlyProxy(o){
    function readonly(){throw new TypeError("Readonly");}
    return new Proxy(o, {
        set: readonly,
        defineProperty: readonly,
        deleteProperty: readonly,
        setPrototypeOf: readonly,
    });
}

let o = {x: 1, y: 2};   // Normal writable object***
let p6 = readOnlyProxy(o);  // Readonly version of it
p6.x    // => 1: reading properties works
p6.x = 2;   // !TypeError: can't change properties
delete p6.y;    // !TypeError: can't delete properties
p6.z = 3;   // !TypeError: can't add properties
p6.__proto__ = {};  // !TypeError: can't change the prototype

// ex: Proxy that delegates all operations to the target object
// but uses handler methods to log the operations:

/**
 * Return a Proxy object that wraps o, delegating all operations to
 * that object after logging each operation. objname is a string that 
 * will appear in the log messages to identify the object. If o has own
 * properties whose values are objects or functions, then if you query
 * the value of those properties, you'll get a loggingProxy back, so that
 * logging behavior of this proxy is "contagious".
 */
function loggingProxy(o, objname){
    // Define handlers for our logging Proxy object.
    // Each handler logs a message and then delegates to the target object
    const handlers = {
        // This handler is a special case because for own properties
        // whose value is an object or function, it returns a proxy rather
        // than returning the value itself.
        get(target, property, receiver){
            // Log the get operation
            console.log(`Handler get(${objname},${property.toString()})`);

            // Use the Reflect API to get the property value
            let value = Reflect.get(target, property, receiver);

            // If the property is an own property of the target and
            // the value is an object or function then return a Proxy for it.
            if(Reflect.ownKeys(target).includes(property) &&
                (typeof value == "object" || typeof value === "function")){
                    return loggingProxy(value, `${objname}.${property.toString()}`);
            }

            // Otherwise return the value unmodified.
            return value;
        },

        // There is nothing special about the following three methods:
        // they log the operation and delegate to the target object.
        // They are a special case simply so we can avoid logging the 
        // receiver object which can cause infinite recursion.
        set(target, prop, value, receiver){
            console.log(`Handler set(${objname},${prop.toString()},${value})`);
            return Reflect.set(target, prop, value, receiver);
        },
        apply(target, receiver, args){
            console.log(`Handler ${objname}(${args})`);
            return Reflect.apply(target, receiver, args);
        },
        construct(target, args, receiver){
            console.log(`Handler ${objname}(${args})`);
            return Reflect.construct(target, args, receiver);
        }
    };

    // We can automatically generate the rest of the handlers
    // Metaprogramming FTW!
    Reflect.ownKeys(Reflect).forEach(handlerName => {
        if(!(handlerName in handlers)){
            handlers[handlerName] = function(target, ...args){
                // Log the operation
                console.log(`Handler ${handlerName}(${objname},${args})`);
                // Delegate the operation
                return Reflect[handlerName](target, ...args);
            };
        }
    });
    // Return a proxy for the object using these logging handlers
    return new Proxy(o, handlers);
}

// ex: results in some genuine insights about array iteration:

// Define an array of data and an object with a function property
let data = [10, 20];
let methods = {square: x => x * x};

// Create logging proxies for the array and the object
let proxyData = loggingProxy(data, "data");
let proxyMethods = loggingProxy(methods, "methods");

// Suppose we want to understand how the Array.map() method works
data.map(methods.square)    // => [100, 400]

// First, let's try it with a logging Proxy array
proxyData.map(methods.square)   // => [100, 400]
// Log output:
// Handler methods.square(10, 0, 10, 20)
// Handler methods.square(20, 1, 10, 20)

// Finally, let's use a logging proxy to learn about the iteration protocol
for(let x of proxyData) console.log("Datum", x);
// Log output;
// Handler get(data, Symbol(Symbol.iterator))
// Handler get(data, length)
// Datum 10
// Handler get(data, length)
// Handler get(data, 1)
// Datum 20
// Hanlder get(data, length)

// 14.7.1 Proxy Invariants

// Flanagan, David. JavaScript: The Definitive Guide (p. 405). O'Reilly Media. Kindle Edition. 

// ex:

let target = Object.preventExtensions({});
let proxy2 = new Proxy(target, {isExtensible(){return true;}});
Reflect.isExtensible(proxy);    // !TypeError: invariant violation

// ex:

let target1 = Object.freeze({x: 1});
let proxy3 = new Proxy(target, {get(){return 99;}});
proxy3.x;   // !TypeError: value returned by get() doesn't match target

