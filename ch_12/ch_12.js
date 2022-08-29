/*

Chapter 12. Iterators and Generators

Flanagan, David. JavaScript: The Definitive Guide (p. 327). O'Reilly Media. Kindle Edition. 

*/

// ex: for/of loop

let sum = 0;
for(let i of [1,2,3]){ // Loop once for each of these values
    sum += 1;
}
sum     // => 6

// ex: ... spread operator

let chars = [..."abcd"];    // chars == ["a", "b", "c", "d"]
let data = [1,2,3,4,5];
Math.max(...data)   // => 5

// ex: destructuring assignment

let purpleHaze = Uint8Array.of(255,0,255,128);
let [r,g,b,a] = purpleHaze;     // a == 128

// ex: iterarte a Map object with for/of loop:

let m = new Map([["one", 1], ["two", 2]]);
for(let [k,v] of m) console.log(k, v);  // Logs 'one 1' and 'two 2'

// ex: when you want to iterate keys or values:

[...m]  // => [["one", 1], ["two", 2]]: default iteration
// [...m.entries()]    // => [["one", 1], ["two", 2]]: entries() method is the same
// [...m.keys()]    // => ["one", "two"]: keys() method iterates just map keys
// [...m.values()]  // => [1, 2]: values() method iterates just map values

// ex: Set() constructor

new Set("abc")  // => new Set(["a", "b", "c"])

// 12.1 How Iterators Work

// Flanagan, David. JavaScript: The Definitive Guide (p. 328). O'Reilly Media. Kindle Edition. 