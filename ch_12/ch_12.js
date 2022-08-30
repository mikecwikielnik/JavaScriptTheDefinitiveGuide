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

// ex: for/of loop loop written the "hard" way:

let iterable = [99];
let iterator = iterable[Symbol.iterator]();
for(let result = iterator.next(); !result.done; result = iterator.next()){
    console.log(result.value)   // result.value == 99
}

// ex: "partially used" iterator:

let list = [1,2,3,4,5];
let iter = list[Symbol.iterator]();
let head = iter.next().value;   // head == 1
let tail = [...iter];   // tail == [2,3,4,5]

// 12.2 Implementing Iterable Objects

// Flanagan, David. JavaScript: The Definitive Guide (p. 329). O'Reilly Media. Kindle Edition. 

// ex: Implement an iterable Range class. Demonstrate how to create iterable, iterator, & iteration result objects

/**
 * A Range object represents a range of numbers {x: from <= x <= to}
 * Range defines a has() method for testing whether a given number is a member
 * of the range. Range is iterable and iterates all integers within the range.
 */
class Range{
    constructor(from, to){
        this.from = from;
        this.to = to;
    }

    // Make a Range act like a Set of numbers
    has(x){return typeof x === "number" && this.from <= x && x <= this.to;}

    // Return string representation of the range using set notation
    toString(){return `{x| ${this.from} < x < ${this.to}}`;}

    // Make a Range iterable by returning an iterator object.
    // Note that the name of this method is a special symbol, not a string.
    [Symbol.iterator](){
        // Each iterator instance must iterate the range independently of 
        // others. So we need a state variable to track our location in the 
        // iteration. We start at the first integer >= from.
        let next = Math.ceil(this.from);    // This is the next value we return
        let last = this.to;     // We won't return anythign > this
        return{     // This is the iterator object
            // This next() method is what makes this an iterator object.
            // It must return an iterator result object.
            next(){
                return (next <= last)   // If we haven't returned last value yet
                ?{value: next++}    // return next value and increment it
                :{done: true};  // otherwise indicate that we're done.
            },

            // As a convenience, we make the iterator itself iterable.
            [Symbol.iterator](){return this;}
        };
    }
}

for(let x of new Range(1,10))console.log(x);    // Logs numbers 1 to 10
// [...new Range(-2,2)]     // => [-2, -1, 0, 1, 2]

// ex: map() and filter() methods

// Return an iterable object that iterates the result of applying f()
// to each value from the source iterable
function map(iterable, f){
    let iterator = iterable[Symbol.iterator]();
    return { // This object is both iterator and iterable
        [Symbol.iterator](){return this;},
        next(){
            let v = iterator.next();
            if(v.done){
                return v;
            }else{
                return {value: f(v.value)};
            }
        }
    };
}

// Map a range of integers to their squares and convert to an array
// [...map(new Range(1,4), x => x*X)]   // => [1,4,9,16]

// Return an iterable object that filters the specified iterable,
// iterating only those elements for which the predicate returns true
function filter(iterable, predicate){
    let iterator = iterable[Symbol.iterator]();
    return { // This object is both iterator and iterable
        [Symbol.iterator](){return this;},
        next(){
            for(;;){
                let v = iterator.next();
                if(v.done || predicate(v.value)){
                    return v;
                }
            }
        }
    };
}

// Filter a range so we're left with only even numbers
//[...filter(new Range(1,10), x => x%2 === 0)]  // => [2,4,6,8,10]

// ex:

function words(s){
    var r = /\s+|$/g;   // Match one or more spaces or end
    r.lastIndex = s.match(/[^]/).index;     // Start matching at first nonspace
    return {    // Return an iterable iterator object
        [Symbol.iterator](){    // This makes us iterable
            return this;
        },
        next(){     // This makes us an iterator
            let start = r.lastIndex;    // Resume where the last match ended
            if(start < s.length){   // If we're not done
                let match = r.exec(s);  // Match the next word boundary
                if(match){  // If we found one, return the word
                    return{value: s.substring(start, match.index)};
                }
            }
            return{done: true};     // Otherwise, say that we're done
        }
    };
}

// [...words(" abc def ghi! ")]     // => ["abc","def","ghi!"]

// 12.3 Generators

// Flanagan, David. JavaScript: The Definitive Guide (p. 332). O'Reilly Media. Kindle Edition. 

// ex:

// A generator function that yields the set of one digit (base-10) primes
function* oneDigitPrimes(){ // Invoking this function does not run the code
    yield 2;    // but just returns a generator object. Calling
    yield 3;    // the next() method of that generator runs
    yield 5;    // the code until a yield statement provides
    yield 7;    // the return value for the next() method.
}

// When we invoke the generator function, we get a generator
let primes = oneDigitPrimes();

// A generator is an iterator object that iterates the yielded values
primes.next().value     // => 2
primes.next().value     // => 3
primes.next().value     // => 5
primes.next().value     // => 7
primes.next().done     // => true

// Generators have a Symbol.iterator method to make them iterable
primes[Symbol.iterator]()   // => primes

// We can use generators like other iterable types
// [...oneDigitPrimes09]    // => [2,3,5,7]
let sum1 = 0;
for(let pries of oneDigitPrimes()) sum += primes;
sum     // => 17

// ex:

const seq = function*(from,to){
    for(let i = from; i <= to; i++)yield i;
};
// [...seq(3,5)]    // => [3,4,5]

// ex:

let o = {
    x: 1, y: 2, z: 3,
    // A generator that yields each of the keys of this object
    *g(){
        for(let key of Object.keys(this)){
            yield key;
        }
    }
};
// [...o.g()]   // => ["x", "y", "z", "g"]

// ex: 

/*

*[Symbol.iterator](){
    for(let x = Math.ceil(this.from); x <= this.to; x++) yield x;
}

*/

// 12.3.1 Generator Examples

// Flanagan, David. JavaScript: The Definitive Guide (p. 334). O'Reilly Media. Kindle Edition. 

