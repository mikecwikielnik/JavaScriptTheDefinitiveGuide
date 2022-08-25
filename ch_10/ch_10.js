/*

Chapter 10. Modules

Flanagan, David. JavaScript: The Definitive Guide (p. 249). O'Reilly Media. Kindle Edition. 

*/

// 10.1 Modules with Classes, Objects, and Closures

// Flanagan, David. JavaScript: The Definitive Guide (p. 250). O'Reilly Media. Kindle Edition. 

// ex:

const BitSet = (function(){ // Set BitSet to the return value of this function
    // Private implementation details here
    // function isValid(set, n){...}
    // function has(set, byte, bit){...}
    const BITS = new Uint8Array([1,2,4,8,16,32,64,128]);
    const MASKS = new Uint8Array([~1,~2,~4,~8,~16,~32,~64,~128]);

    // The public API of the module is just the BitSet class, which we define
    // and return here. The class can use the private functions and constants
    // defined above, but they will be hidden from users of the class
    return class BitSet extends AbstractWritableSet{
        /// ... implementation omitted
    };
}());

// The following code, for example, defines a mini statistics module 

// that exports mean() and stddev() functions while leaving the implementation details hidden:

// Flanagan, David. JavaScript: The Definitive Guide (p. 251). O'Reilly Media. Kindle Edition. 

// This is how we could define a stats module
const stats = (function(){
    // Utility functions private to the module
    const sum = (x, y) => x + y;
    const square = x => x * x;

    // A public function that will be exported 
    function mean(data){
        return data.reduce(sum)/data.length;
    }

    // A public function that we will export
    function stddev(data){
        let me = mean(data);
        return Math.sqrt(
            data.map(x => x - m).map(square).reduce(sum)/(data.length - 1)
        );
    }

    // We export the public function as properties of an object
    return{mean, stddev};
}());

// And here is how we mmight use the module
stats.mean([1,3,5,7,9])     // => 5
stats.stddev([1,3,5,7,9])   // => Math.sqrt(10)

// 10.1.1 Automating Closure-Based Modularity

// Flanagan, David. JavaScript: The Definitive Guide (p. 251). O'Reilly Media. Kindle Edition. 

const modules = {};
function require(moduleName){return modules[moduleName];}

modules["sets.js"] = (function(){
    const exports = {};

    // The contents of the sets.js file go here:
    // exports.BitSet = class BitSet {...};

    return exports
}());

modules["stats.js"] = (function(){
    const exports = {};

    // The contents of the stats.js file go here:
    const sum = (x, y) => x + y;
    const square = x => x * x;
    // exports.mean = function(data){...};
    // exports.stddev = function(data){...};

    return exports;
}());

// With modules bundled up into a single file like the one shown in the preceding example, 

// you can imagine writing code like the following to make use of those modules:

// Flanagan, David. JavaScript: The Definitive Guide (p. 252). O'Reilly Media. Kindle Edition. 

// Get references to the modules (or the module content) that we need
const stats = require("stats.js")
const BitSet = require("sets.js").BitSet;

// Now write code using those modules
let s = new BitSet(100);
s.insert(10);
s.insert(20);
s.insert(30);
let average = stats.mean([...s]);   // average is 20

// 10.2 Modules in Node

// Flanagan, David. JavaScript: The Definitive Guide (p. 253). O'Reilly Media. Kindle Edition. 

