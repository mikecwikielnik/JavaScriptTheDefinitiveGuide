/* 
Chapter 3. Types, Values, and Variables

Flanagan, David. JavaScript: The Definitive Guide (p. 23). O'Reilly Media. Kindle Edition. 
*/

// a.sort();    // The object-oriented version of sort(a)

// 3.2 Numbers

// Flanagan, David. JavaScript: The Definitive Guide (p. 25). O'Reilly Media. Kindle Edition. 

// 3.2.1 Integer Literals

// Flanagan, David. JavaScript: The Definitive Guide (p. 26). O'Reilly Media. Kindle Edition. 

0
3
10000000

0xff // 255: (15*16 + 15)
0xBADCAFE   // => 195939070

0b10101 // => (1*16 + 0*8 + 1*4 + 0*2 + 1*1)
0o377   // => 255: (3*64 + 7*8 + 7*1)

// 3.2.2 Floating-Point Literals

// Flanagan, David. JavaScript: The Definitive Guide (p. 26). O'Reilly Media. Kindle Edition. 

3.14
2345.6789
.3333333333333333333333
6.02e23 // 6.02 x 10^23
1.4738223E-32   // 1.4738223 x 10^-32

// Separators in numeric literals

// let billion = 1_000_000_000; //Underscore as a thousands separator
// let bytes = 0x89_AB_CD_EF;   // As as bytes separator
// let bits = 0b0001_1101_0111; // As a nibble separator
// let fraction = 0.123_456_789;    // Works in the fractional part, too. 

// 3.2.3 Arithmetic in JavaScript

// Flanagan, David. JavaScript: The Definitive Guide (p. 27). O'Reilly Media. Kindle Edition. 

Math.pow(2,53)  // => 9007199254740992: 2 to the power 53
Math.round(.6)  // => 1.0: round to the nearest integer
Math.ceil(.6)  // => 1.0: round up to the nearest integer
Math.floor(.6)  // => 0.0: round down to an integer
Math.abs(-5)    // => 5: absolute value
Math.max(x,y,z) // Return the largest argument
Math.min(x,y,z) // Return the smallest argument
Math.random()   // Pseudo-random number x where 0 <= x <1.0
Math.PI // pi: circumerenace of a circle / diameter
Math.E  // e: The base of the natural log
Math.sqrt(3)    // => 3**0.5: the square root of 3
Math.pow(3, 1/3)    // => 3**(1/3): the cube root of 3
Math.sin(0) // Trig: also Math.cos, Math.atan, etc
Math.log(10)    // Natural log of 10
Math.log(100)/Math.LN10 // Base 10 log of 100
Math.log(512)/Math.LN2  // Base 2 log of 512
Math.exp(3) // Math.E cubed

// ES6 defines more math functions

Math.cbrt(27)   // => 3: cube root
Math.hypot(3,4) // => 5: square root of sum of squares of all arguments
Math.log10(100) // => 2: Base-10 log
Math.log2(1024) // => 10: Base-2 log
Math.log1p(x)   // Natural log of (1+x); accurate for very small x
Math.expm1(x)   // Math.exp(x)-1; the inverse of Math.log1p()
Math.sign(x)    // -1, 0, or 1 for arguments <, ==, or > 0
Math.imul(2,3)  // => 6: optimized multiplication of 32-bit integers
Math.clz32(0xf) // => 28: number of leading zero bits in a 32-bit integer
Math.trunc(3.9) // => 3: convert to an integer by truncating fractional part
Math.fround(x)  // Round to nearest 32-bit float number
Math.sinh(x)    // Hyperbolic sine. Also Math.cosh(), Math.tanh()
Math.asinh(x)   // Hyperbolic arcsine. Also Math.acosh(), Math.atanh()

Infinity    // A positive number too big to represent
Number.POSITIVE_INFINITY    // Same value
1/0 // => Infinity
Number.MAX_VALUE*2  // => Infinity; overflow

-Infinity   // A negative number too big to represent
Number.NEGATIVE_INFINITY    // The same value
-1/0    // => -Infinity
-Number.MAX_VALUE*2 // => -Infinity

NaN     // The not-a-number value
Number.NaN  // The same value, written another way
0/0     // => Nan
Infinity/Infinity   // => NaN

Number.MIN_VALUE/2  // => 0: underflow
-Number.MIN_VALUE/2     // => -0: negative zero
-1/Infinity     // => -0: also negative 0
-0

// The following Number properties are defined in ES6
Number.parseInt()   // Same as the global parseInt() fn
Number.parseFloat()     // Same as the global parseFloat() fn
Number.isNaN(x)     // Is x the NaN value?
Number.isFinite(x)  // Is x a number and finite?
Number.isInteger(x)     // Is x an integer?
Number.isSafeInteger(x)     // Is x an integer -(2**53) < x < 2**53?
Number.MIN_SAFE_INTEGER     // => -(2**53 - 1)
Number.MAX_SAFE_INTEGER     // => 2**53 - 1
Number.EPSILON  // => 2**-52: smallest difference between numbers

let zero = 0;   // Regular zero
let negz = -0;  // Negavtive zero
zero === negz   // => true: zero and negative zero are equal
1/zero === 1/negz   // => false: Infinity and -Infinity are not equal

// 3.2.4 Binary Floating-Point and Rounding Errors

// Flanagan, David. JavaScript: The Definitive Guide (p. 30). O'Reilly Media. Kindle Edition. 

let x = .3 - .2   // thirty cents minus 20 cents
let y = .2 - .1   // twenty cents minus 10 cents
x === y     // => false: the two values are not the same! 
x === .1    // => false: .3 - .2 is not equal to .1
y === .1    // => true: .2 - .1 is equal to .1 

// 3.2.5 Arbitrary Precision Integers with BigInt

// Flanagan, David. JavaScript: The Definitive Guide (p. 30). O'Reilly Media. Kindle Edition. 

1234n   // A not-so-big BigInt literal
0b111111n   // A binary BigInt
0o7777n     // An octal BigInt
0x800000000000000n      // => 2n**63n: A 64-bit integer

BigInt(Number.MAX_SAFE_INTEGER)     // => 9007199254740991n
let string = "1" + "0".repeat(100);     // 1 followed by 100 zeros
BigInt(string)  // => 10n**100n: one googol

1000n + 2000n   // => 3000n
3000n - 2000n   // => 1000n
2000n * 3000n   // => 6000000n
3000n / 997n    // => 3n: the quotient is 3
3000n % 997n    // => 9n: and the remainder is 9
(2n ** 131071n) - 1n    // A Mersenne prime with 39457 decimal digits

1 < 2n  // => true
2 > 1n  // => true
0 == 0n    // => true
0 === 0n    // => false: the === checks for type equality as well 

// 3.2.6 Dates and Times

// Flanagan, David. JavaScript: The Definitive Guide (p. 32). O'Reilly Media. Kindle Edition. 