/*

Chapter 11. The JavaScript Standard Library

Flanagan, David. JavaScript: The Definitive Guide (p. 267). O'Reilly Media. Kindle Edition. 

*/

// 11.1 Sets and Maps

// Flanagan, David. JavaScript: The Definitive Guide (p. 268). O'Reilly Media. Kindle Edition. 

// 11.1.1 The Set Class

// Flanagan, David. JavaScript: The Definitive Guide (p. 268). O'Reilly Media. Kindle Edition. 

// Create a Set object with the Set() constructor:

let s = new Set();  // A new, empty set
let t = new Set([1, s]);    // A new set with two members

// The argument to the Set() constructor need noy be an array: any iterable object is allowed:

let t1 = new Set(s);     // A new set that copies the elements of s
let unique = new Set("Mississippi");    // 4 elements: "M", "i", "s", and "p"

// The size property of a set is like the length property of an array: it tells you how many values the set contains:

unique.size     // => 4

// Sets can't contain duplicates. Adding a value to a set when it already contains that value has no effer:

let s1 = new Set();     // Start empty
s1.size     // => 0
s1.add(1);  // Add a number
s1.size     // => 1; now the set has one number
s1.add(1);  // Add the same number again
s1.size     // => 1; the size does not change 
s1.add(true);   // Add another value; note that it is fine to mix types
s1.size     // => 2
s1.add([1,2,3]);    // Add an arrau value
s1.size     // => 3; the array was added, not its elements
s1.delete(1)    // => true: successfully deleted element 1
s1.size     // => 2: the size is back down to 2
s1.delete("test")   // => false: "test" was not a member, deletion failed
s1.delete(true)     // => true: delete succeeded
s1.delete([1,2,3])  // => false: the array in the set is different
s1.size     // => 1: there is still that one array in the set
s1.clear();     // Remove everything from the set
s1.size()   // => 0

// In practice, the most important thing we do with sets is not to add and remove elements from them, 

// but to check to see whether a specified value is a member of the set. We do this with the has() method:

// Flanagan, David. JavaScript: The Definitive Guide (p. 270). O'Reilly Media. Kindle Edition. 

let oneDigitPrimes = new Set([2,3,5,7]);
oneDigitPrimes.has(2)   // => true: 2 is a one-digit prime number
oneDigitPrimes.has(3)   // => true: so is 3
oneDigitPrimes.has(4)   // => false: 4 is not a prime
oneDigitPrimes.has("5")     // => false: "5" is not even a number

// and no matter how many members the set has, the has() method will be very fast.

// Flanagan, David. JavaScript: The Definitive Guide (p. 270). O'Reilly Media. Kindle Edition. 

/**
 * Set class is iterable. For/of loop to enumerate all the elements of a set
 */

let sum = 0;
for(let p of oneDigitPrimes){ // Loop through the one-digit primes
    sum += p;   // and add them up
}
sum     // => 17: 2 + 3 + 5 + 7

// Because Set objects are iterable, 

// you can convert them to arrays and argument lists with the ... spread operator:

// Flanagan, David. JavaScript: The Definitive Guide (p. 270). O'Reilly Media. Kindle Edition. 

// [...oneDigitPrimes]     // => [2,3,5,7]: the set converted to an Array
Math.max(...oneDigitPrimes)     // => 7: set elements passed as function arguments

// Set class also implements a forEach() method that is similar to the array method of the same name:

// Flanagan, David. JavaScript: The Definitive Guide (p. 271). O'Reilly Media. Kindle Edition. 

let product = 1;
oneDigitPrimes.forEach(mn => {product *= navigator;});
product     // => 210: 2 * 3 * 5 * 7

// 11.1.2 The Map Class

// Flanagan, David. JavaScript: The Definitive Guide (p. 271). O'Reilly Media. Kindle Edition. 

// Create a new map with the Map() constructor:

let m = new Map();  // Create a new, empty map
let n = new Map([   // A new map initialized with string keys mapped to numbers
    ["one", 1],
    ["two", 2]
]);

// Use the Map() constructor to copy other maps or to copy the property names and values

let copy = new Map(n);  // A new map with the same keys and values as map n
let o = {x: 1, y: 2};   // An object with two properties
let p = new Map(Object.entries(o));     // Same as new map([["x", 1], ["y", 2]])

// ex: set() vs get()

let m1 = new Map();  // Start with an empty map
m1.size     // => 0: empty maps have no keys
m1.set("one", 1);   // Map the key "one" to the value 1
m1.set("two", 2);   // And the key "two" to the value 2
m1.size     // => 2: the map now has two keys
m1.get("two")   // => 2: return the value associated with key "two"
m1.get("three")     // => undefined: this key is not in the set
m1.set("one", true);    // Change the value associated with an existing key
m1.size     // => 2: the size doesn't change
m1.has("one")   // => true: the map has a key "one"
m1.has(true)    // => false: the map does not have a key true
m1.delete("one")    // => true: the key existed and deletion succeeded
m1.size     // => 1
m1.delete("three")  // => false: failed to delete a nonexistent key
m1.clear();     // Remove all keys and values from the map

// Like the add() method of Set, the set() method of Map can be chained,

// Flanagan, David. JavaScript: The Definitive Guide (p. 272). O'Reilly Media. Kindle Edition. 

let m2 = new Map().set("one", 1).set("two", 2).set("three", 3);
m2.size     // => 3
m2.get("two")   // => 2

// ex: 

let m3 = new Map();     // Start with an empty map
m3.set({}, 1);  // Map one empty object to the number 1
m3.set({}, 2);  // Map a different empty object to the number 2
m3.size     // => 2: there are two keys in this map
m3.get({})  // => undefined: this empty object is not a key
m3.set(m, undefined);   // Map the map itself to the value undefined.
m3.has(m)   // => true: m is a key in itself
m3.get(m)   // => undefined: same value we'd get if m wasn't a key

let m4 = new Map([["x", 1], ["y", 2]]);
[...m4]     // => [["x", 1], ["y", 2]]

for(let [key, value] of m){
    // On the first iteration, key will be "x" and value will be 1
    // on the second iteration, key will be "y" and value will be 2
}

// ex: use the keys() and values() methods

[...m4.keys()]  // => ["x", "y"]: just the keys
// [...m4.values()]    // [1,2]: just the values
// [...m4.entries()]    // [["x", 1], ["y", 2]]: same as [...m]

// ex: forEach() method

m4.forEach((value, key) => { // note value, key NOT key, value
    // On the first invocation, value will be 1 and key will be "x"
    // On the second invocation, value will be 2 and key will be "y"
});

// 11.1.3 WeakMap and WeakSet

// Flanagan, David. JavaScript: The Definitive Guide (p. 273). O'Reilly Media. Kindle Edition. 

