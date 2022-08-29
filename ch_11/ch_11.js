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

// 11.3.1 Defining Regular Expressions

// Flanagan, David. JavaScript: The Definitive Guide (p. 281). O'Reilly Media. Kindle Edition. 

// ex:

let pattern1 = /s$/;

// or its equivalent:

let pattern2 = new RegExp("s$");

// ex: case-insensitive matching: match strings with both "s" or "S"

let pattern3 = /s$/i;

// ex: 

let r = /\d{2,4}/;  // Match between two and four digits
r = /\w{3}\d?/;     // Match exactly three word characters and an optional digit
r = /\s+java\s+/;   // Match "java" with one or more space before and after
r = /[^(*]/;    // Match zer or more characters that are not open parens

// 11.3.2 String Methods for Pattern Matching

// Flanagan, David. JavaScript: The Definitive Guide (p. 292). O'Reilly Media. Kindle Edition. 

// ex: replace()

// No matter how it is capitalized, replace it with the correct capitalization
text.replace(/javascript/gi, "Javascript");

// ex: replace quotation marks in a string with other characters:

// A quote is a quotation mark, followed by any number of
// nonquotation mark characters (which we capture), followed
// by another quotation mark
let quote = /"([^"]*)"/g;
// Replace the straight quotation marks with guillemets
// leaving the quoted text (stored in $1) unchanged.
'He said "stop"'.replace(quote, '<<$1>>')   // => 'He said <<stop>>'

// an example, here is code that uses a replacement function to 

// convert decimal integers in a string to hexadecimal:

// Flanagan, David. JavaScript: The Definitive Guide (p. 294). O'Reilly Media. Kindle Edition. 

let s2 = "15 tiems 15 is 225"
s2.replace(/\d+/gu, n => parseInt(n).toString(16))  // => "f times f is el"

// ex: match()

"7 plus 8 equals 15".match(/\d+/g)  // => ["7", "8", "15"]

// ex: parsing a URL :

// A very simple URL parsing RegEx:
let url = /(\w+):\/\/([\w.]+)\/(\S*)/;
let text = "Visit my blog at http://www.example.com/~david";
let match = text.match(url);
let fullurl, protocol, host, path;
if(match !== null){
    fullurl = match[0];     // fullurl == "http://www.example.com/~david"
    protocol = match[1];    // protocol == "http"
    host = match[2];    // host == "www.example.com"
    path = match[3];    // path == "~david"
}

// ex: we could rewrite above like:

let url1 = /(?<protocol>\w+):\/\/(?<host>[\w.]+)\/(?<path>\S*)/;
let text1 = "Visit my blog at http://www.example.com/~david";
let match1 = text.match(url);
match[0]    // => "http://www.example.com/~david"
match.input     // => text
match.index     // => 17
match.groups.protocol   // => "http"
match.groups.host   // => "www.example.com"
match.groups.path   // => "~david"

// ex:

let vowel = /[aeiou]/y;     // Sticky vowel match
"test".match(vowel)     // => null: "test" does not begin with a vowel
vowel.lastIndex = 1;    // Specify a different match position
"test".match(vowel)[0]  // => "e": we found a vowel at position 1
vowel.lastIndex     // => 2: lastIndex was automatically updated
"test".match(vowel)     // => null: no vowel at position 2
vowel.lastIndex     // => 0: lastIndex gets reset after failed match

// ex: matchAll()

// This makes matchAll() the easiest and most general way to loop through all matches within a string.

// Flanagan, David. JavaScript: The Definitive Guide (p. 296). O'Reilly Media. Kindle Edition. 

// ex: use matchAll() to loop through the words in a string of text

// One or more Unicode alphabetic characters between word boundaries
const words = /\b\p{Alphabetic}+\b/gu;  // \p is not supported in Firefox yet
const text2 = "This is a naive test of the matchAll() method.";
for(let word of text.matchAll(words)){
    console.log(`Found '${word[0]}' at index ${word.index}.`);
}

// ex: split()

"123,456,789".split(",")    // => ["123","456","789"]

// ex:

"1,2,3,\n4,5".split(/\s*,\s*/)  // => ["1","2","3","4","5"]

// 11.3.3 The RegExp Class

// Flanagan, David. JavaScript: The Definitive Guide (p. 296). O'Reilly Media. Kindle Edition. 

// ex:

// Find all five digit numbers in a string. Note the double \\ in this case
let zipcode = new RegExp("\\d{5}","g");

// ex: 

let exactMatch = /JavaScript/;
let caseInsensitive = new RegExp(exactMatch, "i");


// ex:

let pattern4 = /Java/g;
let text3 = "Javascript > Java";
let match2;
while((match = pattern4.exec(text3)) !== null){
    console.log(`Matched ${match[0]} at ${match.index}`);
    console.log(`Next search begins at ${pattern.lastIndex}`);
}

// Suppose, for example, that we wanted to find the index of 

// all <p> tags within a string of HTML text. We might write code like this:

// Flanagan, David. JavaScript: The Definitive Guide (p. 299). O'Reilly Media. Kindle Edition. 

let match3, positions = [];
while((match = /<p>/g.exec(html)) !== null){ // POSSIBLE INFINITE LOOP
    positions.push(match.index);
}

// ex: loop through words to find words that have double letterss:

let dictionary = ["apple", "book", "coffee"];
let doubleLetterWords = [];
let doubleLetter = /(\w)\1/g;

for(let word of dictionary){
    if(doubleLetter.test(word)){
        doubleLetterWords.push(word);
    }
}
doubleLetterWords   // => ["apple", "coffee"]: "book" is missing!

// 11.4 Dates and Times

// Flanagan, David. JavaScript: The Definitive Guide (p. 300). O'Reilly Media. Kindle Edition. 

let now = new Date();   // The current time

// If you pass one numeric argument, the Date fn interprets it as the number of milliseconds since

let epoch = new Date(0);    // Midnight 1/1/1970, GMT

// ex: if you specify two or more integer arguments, interpreted as: year, month, day, hour, minute, second and millisecond

let century = new Date(2100,    // Year 2100
            0,  // Jan
            1,  // 1st
            2,3,4,5);   // 02:03:04:005, local time

// ex: UTC (Universal Coordinated Time, aka GMT)

// Midnight in England, January 1, 2100
let century1 = new Date(Date.UTC(2100, 0, 1));

// ex: parsing a string

let century2 = new Date("2100-01-01 T00:00:00Z");   // An ISO format date

let d = new Date();     // Start with the current date
d.setFullYear(d.getFullYear() + 1);     // Increment the year 

// 11.4.1 Timestamps

// Flanagan, David. JavaScript: The Definitive Guide (p. 302). O'Reilly Media. Kindle Edition. 

// ex: adding 30 seconds to a Date

d.setTime(d.getTime() + 30000);

// ex: 

let startTime = Date.now();
reticulateSplines();    // Do some time-consuming operation
let endTime = Date.now();
console.log(`Spline reticulation took ${endTime - startTime}ms.`);

// 11.4.2 Date Arithmetic

// Flanagan, David. JavaScript: The Definitive Guide (p. 303). O'Reilly Media. Kindle Edition. 

// ex: adds three months and two weeks to the current date:

let d1 = new Date();
d1.setMonth(d.getMonth() + d.getDate() + 14);

// 11.4.3 Formatting and Parsing Date Strings

// Flanagan, David. JavaScript: The Definitive Guide (p. 303). O'Reilly Media. Kindle Edition. 

// ex: converting Date objects to strings:

let d2 = new Date(2020, 0, 1, 17, 10, 30);  // 5:10:30pm on NYD 2020
d2.toString()   // => "Wed Jan 01 2020 17:10:30 GMT-0800 (PST)"
d2.toUTCString()    // => "Thu, 02 Jan 2020 01:10:30 GMT"
d2.toLocaleDateString()     // => "1/1/2020": 'en-US' locale
d2.toLocaleTimeString()     // => "5:10:30 PM": 'en-US' locale
d2.toISOString()    // => "2020-01-02T01:10:30.000z"

// 11.5 Error Classes

// Flanagan, David. JavaScript: The Definitive Guide (p. 304). O'Reilly Media. Kindle Edition. 

// ex:

class HTTPError extends Error {
    constructor(status, statusText, url){
        super(`${status} ${statusText}: ${url}`);
        this.status = status;
        this.statusText = statusText;
        this.url = url;
    }

    getName(){return "HTTPError";}
}

let error = new HTTPError(404, "Not found", "http://example.com/");
error.status    // => 404
error.message   // => "404 Not Found: http://example.com/"
error.name  // => "HTTPError"

// 11.6 JSON Serialization and Parsing

// Flanagan, David. JavaScript: The Definitive Guide (p. 306). O'Reilly Media. Kindle Edition. 

// ex:

let o1 = {s: "", n: 0, a:[true, false, null]};
let s3 = JSON.stringify(o);     // s == '{"s":"","n":0,"a"[true,false,null]}'
let copy1 = JSON.parse(s3);     // copy == {s:""",n:0,a:[true,false,null]}

// ex:

let o2 = {s: "test", n: 0};
JSON.stringify(o, null, 2)  // => '{\n "s": "test", \n "n": 0\n}'

// 11.6.1 JSON Customizations

// Flanagan, David. JavaScript: The Definitive Guide (p. 307). O'Reilly Media. Kindle Edition. 

// ex:

let data = JSON.parse(text, function(key, value){
    // Remove any values whose property name begins with an underscore
    if(key[0] === "-") return undefined;

    // If the value is a string in ISO 8601 date format convert it to a Date.
    if(typeof value === "string" && 
    /^\d\d\d\d-\d\d-\d\dT\d\d:\d\d.\d\ddZ$/.test(value)){
        return new Date(value);
    }
    
    // Otherwise, return the value unchanged
    return value;
});

// ex:

// Specify what fields to serialize, and what order to serialize them in 
let text4 = JSON.stringify(address, ["city", "state", "country"]);

// Specify a replacer function that omits RegExp- value properties
let json = JSON.stringify(o, (k, v) => v instanceof RegExp ? undefined: v);

// 11.7 The Internationalization API

// Flanagan, David. JavaScript: The Definitive Guide (p. 309). O'Reilly Media. Kindle Edition. 

// 11.7.1 Formatting Numbers

// Flanagan, David. JavaScript: The Definitive Guide (p. 309). O'Reilly Media. Kindle Edition. 

// ex:

let euros = Intl.NumberFormat("es", {style: "currency", currency: "EUR"});
euros.format(10)    // => "10,00 €": ten euros, Spanish formatting

let pounds = Intl.NumberFormat("en", {style: "currency", currency: "GBP"});
pounds.format(1000)     // => "£1,000.00": One thousand pounds, English formatting

// ex:

let data1 = [0.05, .75, 1];
let formatData = intl.NumberFormat(undefined, {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
}).format;

data.map(formatData)    // => ["5.0%", "75.0%", "100.0%"]: in en-US locale

// ex: arabic numbers example

let arabic = Intl.NumberFormat("ar", {useGrouping: false}).format;
arabic(1234567890)  // => "١٢٣٤٥٦٧٨٩٠"

// 11.7.2 Formatting Dates and Times

// Flanagan, David. JavaScript: The Definitive Guide (p. 312). O'Reilly Media. Kindle Edition. 

// ex:

let d3 = new Date("2020-01-02T13:14:15Z");  // January 2nd, 2020, 13:14:15 UTC

// With no options, we get a basic numeric date format
Intl.DateTimeFormat("en-US").format(d3)     // => "1/2/2020"
Intl.DateTimeFormat("fr-FR").format(d3)     // => "02/01/2020"

// Spelled out weekday and month
let opts2 = {weekday: "long", month: "long", year: "numeric", day: "numeric"};
Intl.DateTimeFormat("en-US", opts2).format(d3)   // => "Thursday, January 2, 2020"
Intl.DateTimeFormat("es-ES", opts2).format(d3)   // => "Jueves, 2 de Enero de 2020"

// The time is NYC, for a french-speaking Canadian
opts2 = {hour: "numeric", minute: "2-digit", timeZone: "America/New_York"};
Intl.DateTimeFormat("fr-CA", opts2).format(d3)

// 11.7.3 Comparing Strings

// Flanagan, David. JavaScript: The Definitive Guide (p. 314). O'Reilly Media. Kindle Edition. 