/*
Chapter 2. Lexical Structure

Flanagan, David. JavaScript: The Definitive Guide (p. 15). O'Reilly Media. Kindle Edition. 
*/

// 2.3 Literals

// Flanagan, David. JavaScript: The Definitive Guide (p. 16). O'Reilly Media. Kindle Edition. 

12  // the number twelve
1.2 // the number one point two
"hello world"   // A string of text
'Hi'    // Another string
true    // A Boolean value 
false   // The other Boolean value
null    // Absence of an object

// 2.4 Identifiers and Reserved Words

// Flanagan, David. JavaScript: The Definitive Guide (p. 16). O'Reilly Media. Kindle Edition. 

i
my_variable_name
v13
_dummy
$str    // All are legal indentifiers

// 2.5 Unicode

// Flanagan, David. JavaScript: The Definitive Guide (p. 17). O'Reilly Media. Kindle Edition. 

const π = 3.14;
const si = true;

// 2.5.1 Unicode Escape Sequences

// Flanagan, David. JavaScript: The Definitive Guide (p. 18). O'Reilly Media. Kindle Edition. 

let πCafe = 1;   // Define a variable using a Unicode character
caf\u00e9   // => 1; access the variable using an escape sequence
caf\u{E9}   // => 1; another form of the same escape sequence

console.log("\u{1F600}");   // Prints a smiley face emoji

// 2.5.2 Unicode Normalization

// Flanagan, David. JavaScript: The Definitive Guide (p. 18). O'Reilly Media. Kindle Edition. 

// const café = 1; // This constant is named "caf\u{e9}"
// const café = 2; // This constant is different: "caf\u{301}}"

// 2.6 Optional Semicolons

// Flanagan, David. JavaScript: The Definitive Guide (p. 19). O'Reilly Media. Kindle Edition. 

a = 3;  // could omit this semi colon
b = 4;

a = 3; b = 4;   // but the first semi colon is needed here 

// let a 
// a
// =
// 3
// console.log(a)

// let a; a = 3; console.log(a) // Javascripts see the above code like this

// let y = x + f
// (a+b).toString()

// // Javascripts reads it like this
// let y = x + f(a+b).toString();

let x = 0   // Semi colon omitted here
;[x,x+1,x+2].forEach(console.log)   // Defensive; keeps this statement separate