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

// 10.2.1 Node Exports

// Flanagan, David. JavaScript: The Definitive Guide (p. 253). O'Reilly Media. Kindle Edition. 

const sum = (x, y) => x + y;
const square = x => x * x;

exports.mean = data => data.reduce(sum)/data.length;
exports.stddev = function(d){
    let m = exports.mean(d);
    return Math.sqrt(d.map(x => x - m).map(square).reduce(sum)/(d.length - 1));
};

modules.exports = class BitSet extends AbstractWritableSet{
    // implementation omitted;
};

// Define all the functions, public and private
const sum1 = (x, y) => x + y;
const square1 = x => x * x;
const mean = data => data.reduce(sum)/data.length;
const stddev = d => {
    let m = mean(d);
    return Math.sqrt(d.map(x => x - m).map(square).reduce(sum)/(d.length-1));
};

// Now export only the public ones
modules.exports = {mean, stddev};

// 10.2.2 Node Imports

// Flanagan, David. JavaScript: The Definitive Guide (p. 254). O'Reilly Media. Kindle Edition. 

// These modules are built in to Node
const fs = require("fs");   // The buit-in filesystem module
const http = require("http");   // The built-in HTTP module

// The Express HTTP server framework is a third-party module.
// It is not part of Node but has been installed locally.
const express = require("express");

// ex: relative path (./ or ../) vs abosulte path (/)

const stats1 = require('./stats.js');
const BitSet1 = require('./utils/bitset.js');

// Import the entire stats object, with all of its functions
const stats1 = require('./stats.js')

// We've got more functions than we need, but they're neatly
// originated into a convenient "stats" namespace.
let average1 = stats.mean(data)

// Alternatively, we can use idiomatic destructuring assignment to import
// exactly the functions we want directly into the local namespace:
const {stddev} = require('./stats.js');

// This is nice and succinct, though we lose a bit of context
// without the 'stats' prefix as a namespace for the stddev() function.
let sd = stddev(data);

// 10.3 Modules in ES6

// Flanagan, David. JavaScript: The Definitive Guide (p. 255). O'Reilly Media. Kindle Edition. 

// 10.3.1 ES6 Exports

// Flanagan, David. JavaScript: The Definitive Guide (p. 256). O'Reilly Media. Kindle Edition. 

export const PI = Math.PI;

export function degreesToRadians(d){return d * PI / 180;}

export class Circle{
    constructor(r){this.r = r;}
    area(){return PI * this.r * this.r;}
}

// So instead of writing three individual exports in the preceding code, 

// we could have equivalently written a single line at the end:

// Flanagan, David. JavaScript: The Definitive Guide (p. 256). O'Reilly Media. Kindle Edition. 

export{Circle, degreesToRadians, PI}

export default class BitSet1 {
    // implementation omitted
}

// 10.3.2 ES6 Imports

// Flanagan, David. JavaScript: The Definitive Guide (p. 257). O'Reilly Media. Kindle Edition. 

// The simplest form of import is used for modules that define a default export:

// Flanagan, David. JavaScript: The Definitive Guide (p. 257). O'Reilly Media. Kindle Edition. 

import Bitset1 from './bitset.js';

// To import values from a module that exports multiple values, 

// we use a slightly different syntax:

// Flanagan, David. JavaScript: The Definitive Guide (p. 258). O'Reilly Media. Kindle Edition. 

// import {mean, stddev} from "./stats.js";    // You have seen similar in python

// import * as stats from "./stats.js"  // You have seen this in sql. select *

import "./analytics.js";

// 10.3.3 Imports and Exports with Renaming

// Flanagan, David. JavaScript: The Definitive Guide (p. 259). O'Reilly Media. Kindle Edition. 

// ex: You can use the as keyword to rename imports as you import them

import {render as renderImage} from "./imageutils.js";
import {render as renderUI} from "./ui.js";

// ex: import both the default and named exports of that module:

import {default as Histogram, mean, stddev1} from "./histogram-stats.js";

export {
    layout as calculateLayout,
    render as renderLayout
};

// ex: SyntaxError

// export {Math.sin as sin, Math.cos as cos};

// 10.3.4 Re-Exports

// Flanagan, David. JavaScript: The Definitive Guide (p. 260). O'Reilly Media. Kindle Edition. 

// import {mean} from "./stats/mean.js";
// import {stddev} from "./stats/stddev.js";
// export {mean, stdev};

export {mean} from "./stats/mean.js"
export {stddev} from "./stats/stddev.js";

// ex: export all

export * from "./stats/mean.js";
export * from "./stats/stddev.js";

// ex: for some reason you see some sql syntax in here 

export {mean, mean as average} from "./stats/mean.js";
export {stddev} from "./stats/stddev.js";

export {default as mean} from "./stats/mean.js";
export {default as stddev} from "./stats/stddev.js";

// Import the mean() function from ./stats.js and make it the 
// default export of this module
export {mean as default} from "./stats.js"

// 10.3.5 JavaScript Modules on the Web

// Flanagan, David. JavaScript: The Definitive Guide (p. 262). O'Reilly Media. Kindle Edition. 

// ex: main entry point for a modular JavaScript program can be as simple as this:

<script type="module">import "./main.js</script>

// 10.3.6 Dynamic Imports with import()

// Flanagan, David. JavaScript: The Definitive Guide (p. 264). O'Reilly Media. Kindle Edition. 

// ex: instead of importing the "./stats.js" module statically like this:

import * as stats1 from "./stats.js";

// we might import it and use it dynamtically like this:

import("./stats.js").then(stats =>{
    let average = stats.mean(data);
})

// 10.3.7 import.meta.url

// Flanagan, David. JavaScript: The Definitive Guide (p. 265). O'Reilly Media. Kindle Edition. 

