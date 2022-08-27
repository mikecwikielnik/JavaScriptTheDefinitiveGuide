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

// 11.2 Typed Arrays and Binary Data

// Flanagan, David. JavaScript: The Definitive Guide (p. 275). O'Reilly Media. Kindle Edition. 

// 11.2.2 Creating Typed Arrays

// Flanagan, David. JavaScript: The Definitive Guide (p. 276). O'Reilly Media. Kindle Edition. 

// The simplest way to create a typed array is to call the appropriate constructor 

// with one numeric argument that specifies the number of elements you want in the array:

// Flanagan, David. JavaScript: The Definitive Guide (p. 276). O'Reilly Media. Kindle Edition. 

let bytes = new Uint8Array(1024);   // 1024 bytes
let matrix = new Float64Array(9);   // A 3x3 matrix
let point = new Int16Array(3);  // A point in 3D space
let rgba = new Uint8ClampedArray(4);    // A 4-byte RGBA pixel value
let sudoku = new Int8Array(81);     // A 9x9 sudoku board

// ex; from() and of() factory methods that work like Array.from() and Array.of():

let white = Uint8ClampedArray.of(255,255,255,0);    // RGBA opaque white

// ex: 

let ints = Uint32Array.from(white);     // The same 4 numbers, but as ints

// ex:

// Floats truncated to ints, longer ints truncated to 8 bits

Uint8Array.of(1.23, 2.99, 45000)    // => new UintArray([1, 2, 200])

// ex: ArrayBuffer

let buffer = new ArrayBuffer(1024*1024);
buffer.byteLength   // => 1024*1024; one megabyte of memory

// ex: you could create typed arrays like these:

let asbytes = new Uint8Array(buffer);   // Viewed as bytes
let asints = new Int32Array(buffer);    // Viewed as 32-bit signed ints

let lastK = new Uint8Array(buffer, 1023 * 1024);    // Last kilobyte as bytes
let inst2 = new Int32Array(buffer, 1024, 256);  // 2nd kilobyte as 256 integers

// 11.2.3 Using Typed Arrays

// Flanagan, David. JavaScript: The Definitive Guide (p. 278). O'Reilly Media. Kindle Edition. 

// Once you have created a typed array, 

// you can read and write its elements with regular square-bracket notation, 

// just as you would with any other array-like object:

// Flanagan, David. JavaScript: The Definitive Guide (p. 278). O'Reilly Media. Kindle Edition. 

// Return the largest prime smaller than n, using the sieve of Erathosthenes
function sieve(n){
    let a = new Uint8Array(n + 1);  // a[x] will be 1 if x is composite
    let max = Math.floor(Math.sqrt(n));     // Don't do factors higher than this
    let p = 2;  // 2 is the first prime
    while(p <= max){ // For primes less than max
        for(let i = 2 * p; i <= n; i += p)  // Mark multiples of p as composite
            a[i] = 1;
        while(a[++p])/*empty*/;     // The next unmarked index is prime
    }
    while(an[n]) n--;   // Loop backward to find the last prime
    return n;   // And return it
}

let ints1 = new Int16Array(10);     // 10 short integers
ints1.fill(3).map(x => x * x).join("")  // => "9999999999"

// 11.2.4 Typed Array Methods and Properties

// Flanagan, David. JavaScript: The Definitive Guide (p. 278). O'Reilly Media. Kindle Edition. 

// ex: set() method

let bytes1 = new Uint8Array(1024);  // A 1k buffer
let pattern = new Uint8Array([0,1,2,3]);    // An array of 4 bytes
bytes1.set(pattern);    // Copy them to the start of another byte array
bytes1.set(pattern, 4);     // Copy them to the start of another byte array
bytes1.set([0, 1, 2, 3], 8);    // Or just copy values direct from a regular array
bytes1.slice(0, 12);    // => new Uint8Array([0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3])

// Typed arrays also have a subarray method that

// returns a portion of the array on which it is called:

// Flanagan, David. JavaScript: The Definitive Guide (p. 279). O'Reilly Media. Kindle Edition. 

let ints2 = new Int16Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);     // 10 short integers
let last3 = ints.subarray(ints.length - 3, ints.length);    // Last 3 of them
last3[0]    // => 7: this is the same as ints[7]

// ex: subarray() vs slice()

ints[9] = -1;   // Change a value in the original array and ...
last3[2]    // => -1: it also changes in the subarray

// ex: 

last3.buffer    // The ArrayBuffer object for a typed array
last3.buffer === ints.buffer    // => true: both are views of the same buffer
last3.byteOffset    // => 14: this view starts at byte 14 of the buffer
last3.byteLength    // => 6: this view is 6 bytes (3 16-bit ints) long
last3.buffer.byteLength     // => 20: but the underlying buffer has 20 bytes

// ex:

let bytes2 = new Uint8Array(8);
bytes2[0] = 1;  // Set the first byte to 1
bytes2[0]   // => undefined: buffer doesn't have index 0
bytes2.buffer[1] = 255;  // Try incorrectly to set a byte in the buffer
bytes2.buffer[1]     // => 255: this just sets a regular JS property
bytes2[1]   // => 0: the line above did not set the byte

// ex:

let bytes3 = new Uint8Array(1024);  // 1024 bytes
let ints = new Uint32Array(bytes3.buffer);   // or 256 integers
let floats = new Float64Array(bytes3.buffer);   // or 128 doubles

// 11.2.5 DataView and Endianness

// Flanagan, David. JavaScript: The Definitive Guide (p. 280). O'Reilly Media. Kindle Edition. 

// If the integer 0x00000001 is arranged in memory as 01 00 00 00, then
// we're on a little-endian platform. On a big-endian platform, we'd get 
// bytes 00 00 00 01 instead.
let littleEndian = new Int8Array(new Int32Array([1]).buffer)[0] === 1;

// ex: DataView class

// Assume we have a typed array of bytes of binary data to process. First,
// we create a DataView object so we can flexibly read and write
// values from those bytes
let view = new DataView(bytes.buffer,
    bytes.byteOffset,
    bytes.byteLength);

let int = view.getInt32(0);     // Read big-endian signed int from byte 0
int = view.getInt32(4, false);  // Next int is also big-endian
int = view.getUint32(8, true);  // Next int is little-endian and unsigned
view.setUint32(8, int, false);  // Write it back in big-endian format. 

// 11.3 Pattern Matching with Regular Expressions

// Flanagan, David. JavaScript: The Definitive Guide (p. 281). O'Reilly Media. Kindle Edition. 

