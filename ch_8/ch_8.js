/*

Chapter 8. Functions

Flanagan, David. JavaScript: The Definitive Guide (p. 181). O'Reilly Media. Kindle Edition. 

*/

// 8.1 Defining Functions

// Flanagan, David. JavaScript: The Definitive Guide (pp. 181-182). O'Reilly Media. Kindle Edition. 

// 8.1.1 Function Declarations

// Flanagan, David. JavaScript: The Definitive Guide (p. 182). O'Reilly Media. Kindle Edition. 

// ex:

// Print the name and value of each property of o. Return undefined.
function printprops(o){
    for(let p in o){
        console.log(`${o[p]}\n`);
    }
}

// Compute the distance between Cartesian points (x1,y1) and (x2,y2)
function distance(x1,y1,x2,y2){
    let dx = x2 - x1;
    let dy = y2 - y1;
    return Math.sqrt(dx*dx + dy*dy)
}

// A recursive function (one that calls itself) that computes factorials
// Recall that x! is the product of x and all positive integers less than it
function factorial(x){
    if(x<=1)return 1;
    return x*factorial(x-1);
}

// 8.1.2 Function Expressions

// Flanagan, David. JavaScript: The Definitive Guide (p. 184). O'Reilly Media. Kindle Edition. 

// This function expression defines a function that squares its argument.
// Note that we assign it to a variable
const square = function(x){return x*x;};

// Function expressions can include names, which is useful for recursion
const f = function fact(x){if(x<=1)return 1;else return x*fact(x-1);};

// Function expressions can also be used as arguments to other functions:
[3,2,1].sort(function(a,b){return a-b;});

// Function expressions are sometimes defined and immediately invoked:
let tensquared = (function(x){return x*x;}(10));

// 8.1.3 Arrow Functions

// Flanagan, David. JavaScript: The Definitive Guide (p. 185). O'Reilly Media. Kindle Edition. 

const sum = (x,y) => {return x+y;};

// or

const sum1 = (x,y) => x+y;

// or

const polynommial = x => x*x + 2*x + 3;

// Note:

const constantFunc = () => 42;

// more examples:

const f1 = x => {return {value: x};};   // Good: f() returns an object
const g = x => ({value: x});    // Good: g() returns an object
const h = x => {value: x};  // Bad: h() returns nothing
// const i = x => {v: x, w: x};    // Bad: Syntax Error

// Make a copy of an array with null elements removed
let filtered = [1,null,2,3].filter(x => x !== null);    // filtered == [1,2,3]
// Square some numbers:
let squares = [1,2,3,4].map(x => x*x);  // squares == [1,4,9,16]

// 8.1.4 Nested Functions

// Flanagan, David. JavaScript: The Definitive Guide (p. 186). O'Reilly Media. Kindle Edition. 

function hypotneuse(a,b){
    function square(x){return x*x;}
    return Math.sqrt(square(a) + square(b));
}

// 8.2 Invoking Functions

// Flanagan, David. JavaScript: The Definitive Guide (p. 186). O'Reilly Media. Kindle Edition. 

/*

JavaScript functions can be invoked in five ways: 

As functions  

As methods  

As constructors  

Indirectly through their call() and apply() methods  

Implicitly, via JavaScript language features that do not appear like normal function invocations

Flanagan, David. JavaScript: The Definitive Guide (pp. 186-187). O'Reilly Media. Kindle Edition. 

*/

// 8.2.1 Function Invocation

// Flanagan, David. JavaScript: The Definitive Guide (p. 187). O'Reilly Media. Kindle Edition. 

printprops({x: 1});
let total = distance(0,0,2,1) + distance(2,1,3,5);
let probability = factorial(5)/factorial(13);

// conditionial invocation

f?.(x)

// is equivalent to:

(f !== null && f !== undefined)?f(x): undefined

// Define and invoke a function to determine if we're in strict mode
const strict = (function(){return !this;}());

// 8.2.2 Method Invocation

// Flanagan, David. JavaScript: The Definitive Guide (p. 188). O'Reilly Media. Kindle Edition. 

// If you have function f and an object o,
// you can define a method named m of o with the following line:

o.m = f;

// Having defined the method m() of the object o, invoke it like this:

o.m();

// Or, if m() expects two arguments, you might invoke it like this:

o.m(x,y);

// In a method-invocation expression like this, the object o becoes the invocation context,
// and the function body can refer to that object by using the keyword this. 

let calculator = { // An object literal
    operand1: 1,
    operand2: 1,
    add(){ // We're using method shorthand syntax for this function
        // Note the use of the *this* keyword to refer to the containing object
        this.result = this.operand1 + this.operand2;
    }
};
calculator.add();   // A method invocation to compute 1 + 1.
calculator.result   // => 2

// the above chunk makes sense. this has python syntax all over it

// ex: square brackets also cause method invocation

o["m"](x,y);    // Another way to write o.m(x,y).
a[0](z)     // Also a method invocation (assuming a[0] is a function).

// ex:

customer.surname.toUppercase();     // Invoke method on customer.surname
f().m();    // Invoke method m() on return value of f()

// ex:

rect.setSize(width, height);
setRectSize(rect, width, height);

// Method Chaining

// Run three asynchronous operations in sequence, handling errors
doStepOne().then(doStepTwo).then(doStepThree).catch(handleErrors);

// it is when an object is named once, and then multiple methods can be invoked on it:

new square().x(100).y(100).size(50).outline("red").fill("blue").draw();

// ex:

let o ={ // An object o.
    m: function(){ // Method m of the object
        let self = this;    // Save the "this" value in a variable
        this === o  // => true: "this" is the object o.
        f();    // Now call the helper function f()

        function f(){ // A nested function f
            this === o  // => false: "this" is global or undefined
            self === o  // => true: self is the outer "this" value
        }
    }
};
o.m();  // Invoke the method m on the object o


// ex: the below ES6 workaround to the chunk above

const f2 = () => {
    this === o  // true, since arrow functions inherit this
};

// ex: bind() method of the nested function

const f3 = (function(){
    this === o  // true, since we bound this function to the outer this
}).bind(this);

// 8.2.3 Constructor Invocation

// Flanagan, David. JavaScript: The Definitive Guide (p. 191). O'Reilly Media. Kindle Edition. 

o = new Object();

// 8.3 Function Arguments and Parameters

// Flanagan, David. JavaScript: The Definitive Guide (p. 193). O'Reilly Media. Kindle Edition. 

// 8.3.1 Optional Parameters and Defaults

// Flanagan, David. JavaScript: The Definitive Guide (p. 193). O'Reilly Media. Kindle Edition. 

// ex: it's useful to write functions so that some arguments are optional

// Append the names of the enumerable properties of object o to the
// array a, and return a. If a is omitted, create and return a new array
function getPropertyNames(o,a){
    if(a === undefined) a = [];  // If undefined, use a new array
    for(let property in o) a.push(property);
    return a;
}

// getPropertyNames() can be invoked with one or two arguments:
let o1 = {x: 1}, p = {y: 2,z: 3};  // Two objects for testing
let a = getPropertyNames(o);    // a == ["x"]; get o's properties in a new array
getPropertyNames(p,a);  // a == ["x","y","z"]; add p's properties to it

// ex:

a = a || [];

// Append the names of the enumerable properties of object o to the 
// array a, and return a. If a is omitted, create and return a new array
function getPropertyNames(o,a=[]){
    for(let property in o)a.push(property);
    return a;
}

// This function returns an object representing a rectangle's dimensions. 
// If only width is supplied, make it twice as high as it is wide. 
const rectangle = (width,height=width*2) => ({width,height});
rectangle(1)    // => {width: 1,height: 2}

// 8.3.2 Rest Parameters and Variable-Length Argument Lists

// Flanagan, David. JavaScript: The Definitive Guide (p. 194). O'Reilly Media. Kindle Edition. 

// Rest parameters allow us to write functions that can 
// be invoked with arbitrarily more arguments than parameters

function max(first =- Infinity,...rest){
    let maxValue = first;   // Start by assuming the first arg is biggest
    // Then loop through the rest of the arguments, looking for bigger
    for(let n of rest){
        if(n > maxValue){
            maxValue = n;
        }
    }
    // Return the biggest
    return maxValue;
}

max(1,10,100,2,3,1000,4,5,6)    // => 1000

// 8.3.3 The Arguments Object

// Flanagan, David. JavaScript: The Definitive Guide (p. 195). O'Reilly Media. Kindle Edition. 

function max(x){
    let maxValue = -Infinity;
    // Loop through the arguments, looking for, and remembering, the biggest
    for(let i=0; i<arguments.length; i++){
        if(arguments[i]>maxValue) maxValue = arguments[i];
    }
    // Return the biggest 
    return maxValue;
}

max(1,10,100,2,3,1000,4,5,6)    // => 1000

// 8.3.4 The Spread Operator for Function Calls

// Flanagan, David. JavaScript: The Definitive Guide (p. 196). O'Reilly Media. Kindle Edition. 

let numbers = [5,2,10,-1,9,100,1];
Math.min(...numbers)    // => -1

// This function takes a function and returns a wrapped version
function timed(f){
    return function(...args){ // Collect args into a rest parameter array
        console.log(`Entering function ${f.name}`);
        let startTime = Date.now();
        try{
            // Pass all of our arguments to the wrapped function
            return f(...args);  // Spread the args back out again
        }
        finally{
            // Before we return the wrapped return value, print elapsed time
            console.log(`Exiting ${f.name} after ${Date.now()-startTime}ms`);
        }
    };
}

// Compute the sume of the numbers between 1 and n by brute force
function benchmark(n){
    let sum = 0;
    for(let i=1; i<=n; i++) sum+=i;
    return sum;
}

// Now invoke the timed version of that test function
timed(benchmark)(1000000)   // => 500000500000; this is the sum of the numbers

// 8.3.5 Destructuring Function Arguments into Parameters

// Flanagan, David. JavaScript: The Definitive Guide (p. 197). O'Reilly Media. Kindle Edition. 

function vectorAdd(v1,v2){
    return [v1[0] + v[0], v1[1] + v2[1]];
}
vectorAdd([1,2],[3,4])  // => [4,6]

function vectorAdd([x1,y1],[x2,y2]){ // Unpack 2 arguments into 4 parameters
    return [x1 + x2, y1 + y2];
}
vectorAdd([1,2],[3,4])  // => [4,6]

// Multiply the vector {x,y} by a scalar value
function vectorMultiply({x,y}, scalar){
    return {x: x*scalar, y: y*scalar};
}
vectorMultiply({x: 1, y: 2}, 2)     // => {x: 2, y:4}

function vectorAdd(
    {x: x1, y: y1},     // Unpack 1st object into x1 and y1 params
    {x: x2, y: y2}  // Unpack 2nd object into x2 and y2 params
)
{
    return {x: x1 + x2, y: y1 + y2};
}
vectorAdd({x: 1, y: 2}, {x: 3, y:  4})  // => {x: 4, y: 6}

// Multiply the vector {x,y} or {x,y,z} by a scalar value
function vectorMultiply({x,y,z=0}, scalar){
    return {x: x*scalar, y: y*scalar, z: z*scalar};
}
vectorMultiply({x: 1, y: 2}, 2)     // => {x: 2, y: 4, z: 0}

function arraycopy({from, to=from, n=from.length, fromIndex=0,
toIndex=0}){
    let valuesToCopy = from.slice(fromIndex, fromIndex + n);
    to.splice(toIndex,0,...valuesToCopy);
    return to;
}
let a1 = [1,2,3,4,5], b = [9,8,7,6,5];
arraycopy({from: a, n:3, to:b, toIndex:4})  // => [9,8,7,6,1,2,3,5]

// This function expects an array argument. The first two elements of that
// array are unpacked into the x and y parameters. Any remaining elements
// are stored in the coords array. And any arguments after the first array
// are packed into the rest array.
function f([x,y,...coords],...rest){
    return [x+y, ...rest, ...coords];   // Note: spread operator here
}
f([1,2,3,4],5,6)    // => [3,5,6,3,4]

// Multiply the vector {x,y} or {x,y,z} by a scalar value, retain other props
function vectorMultiply({x, y, z=0, ...props}, scalar){
    return {x: x*scalar, y: y*scalar, z: z*scalar, ...props};
}
vectorMultiply({x: 1, y: 2, w: -1}, 2)  // => {x:2, y:4, z:0, w:-1}

function drawCircle({x, y, radius, color:[r,g,b]}){
    // Not yet implemented
}

// 8.3.6 Argument Types

// Flanagan, David. JavaScript: The Definitive Guide (p. 199). O'Reilly Media. Kindle Edition. 

// ex: type checking

// Return the sum of the elements an iterable object a.
// The elements of a must all be numbers
function sum(a){
    let total = 0;
    for(let element of a){ // Throws TypeError if a is not iterable
        if(typeof element !== "number"){
            throw new TypeError("sum(): elements must be numbers");
        }
        total += element;
    }
    return total;
}
sum([1,2,3])    // => 6
sum([1,2,3]);   // !TypeError: 1 is not iterable
sum([1,2,"3"]);     // !TypeError: element 2 is not a number

// 8.4 Functions as Values

// Flanagan, David. JavaScript: The Definitive Guide (p. 200). O'Reilly Media. Kindle Edition. 

// ex: consider this function definition

function square(x){return x*x;}

let s = square;     // Now s refers to the same function that squaare does
square(4)   // => 16
s(4)    // => 16

// ex: functions "methods"

let o2 = {square: function(x){return x*x;}};     // An object literal
let y = o.square(16);   // y == 256

// ex: functions don't require names

let a2 = [x => x*x, 20];     // An array literal
a[0](a[1])  // => 400

// ex: using functions as data

// We define some simple functions here
function add(x,y){return x+y;}
function subtract(x,y){return x-y;}
function multiply(x,y){return x*y;}
function divide(x,y){return x/y;}

// Here's a function that takes one of the preceding functions
// as an argument and invokes it on two operands
function operate(operator, operand1,operand2){
    return operator(operand1, operand2);
}

// We could invoke this function like this to compute the value(2+3)+(4*5):
let i = operate(add, operate(add,2,3), operate(multiply,4,5));

// For the sake of the example, we implement the simple functions again, 
// this time within an object literal;
const operators = {
    add: (x,y) => x+y,
    subtract: (x,y) => x-y,
    multiply: (x,y) => x*y,
    divide: (x,y) => x/y,
    pow: Math.pow   // This works for predefined functions too
};

// This function takes the name of an operator, looks up that operator
// in the object, and then invokes it on the supplied operands. Note
// the syntax used to invoke the operator function.
function operate2(operation, operand1, operand2){
    if(typeof operators[operation] === "function"){
        return operators[operation](operand1,operand2);
    }
    else throw "unknown operator";
}

operate2("add","hello",operate2("add","","world"))  // => "hello world"
operate2("pow",10,2)    // => 100

// 8.4.1 Defining Your Own Function Properties

// Flanagan, David. JavaScript: The Definitive Guide (p. 202). O'Reilly Media. Kindle Edition. 

