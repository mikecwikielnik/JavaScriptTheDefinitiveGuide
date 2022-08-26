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