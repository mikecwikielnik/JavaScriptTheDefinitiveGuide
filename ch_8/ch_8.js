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

// ex: Return a unique integer whenever it is called

// Initialize the counter property of the function object.
// Function declarations are hoisted so we really can
// do this assignment before the function declaration
uniqueInteger.counter = 0;

// This function returns a different integer each time it is called
// It uses a property of itself to remember the next value to be returned.
function uniqueInteger(){
    return uniqueInteger.counter++;     // Return and increment counter property
}
uniqueInteger()     // => 0
uniqueInteger()     // => 1

// ex: consider the following factorial() function
// that uses properties of itself (treating itself as an array)

// Compute factorials and cache results as properties of the function itself.
function factorial(n){
    if(Number.isInteger(n) && n>0){ // Positive integers only
        if(!(n in factorial)){ // If no cached result
            factorial[n] = n*factorial(n-1);    // Compute and cache it
        }
        return factorial[n];    // Return the cached result
    } else{
        return NaN;     // If input was bad
    }
}
factorial[1] = 1;   // Initialize the cache to hold this base case
factorial(6)    // => 720
factorial[5]    // => 120; the call above caches this value

// 8.5 Functions as Namespaces

// Flanagan, David. JavaScript: The Definitive Guide (p. 203). O'Reilly Media. Kindle Edition. 

function chunkNamespace(){
    // Chunk of code goes here
    // Any variables defined in the chunk are local to this function
    // instead of cluttering up the global namespace
}
chunkNamespace();   // But don't forget to invoke the function! AKA calling the function. you've seen this a million times in python- SIMPLE!

// 8.6 Closures

// Flanagan, David. JavaScript: The Definitive Guide (p. 204). O'Reilly Media. Kindle Edition. 

// ex: lexical scoping rules for nested functions 

let scope = "global scope";     // A global variable
function checkscope(){
    let scope = "local scope";  // A local variable
    function f(){return scope;}  // Return the value in scope here
    return f();
}
checkscope()    // => "local scope"..this should make sense. it is out of the nested fn, in it's own scope

// ex: change the code slightly. What will the code return?

let scope1 = "global scope";     // A global variable
function checkscope(){
    let scope = "local scope";  // A local variable
    function f(){return scope;}  // Return the value in scope here
    return f;
}
let s1 = checkscope()();     // What does this return?

// ex:

let uniqueInteger1 = (function(){ // Define and invoke
    let counter = 0;    // Private state of function below
    return function(){return counter++;};
}());
uniqueInteger1()    // => 0
uniqueInteger1()    // => 1

// ex:

function counter(){
    let n = 0;
    return{
        count: function(){return n++;},
        reset: function(){n=0;}
    };
}

let c = counter(), d = counter();   // Create two counters
c.count()   // => 0
d.count()   // => 0: they count independently
c.reset();  // reset() and count() methods share state
c.count()   // => 0: because we reset c
d.count()   // => 1: d was not reset

// the above code should make sense. c was reset, and d was not. 

// ex: same example from above but using property getters/setters

function counter(n){ // Function argument n is the private variable
    return{
        // Property getter method returns and increments private counter var.
        get count(){return n++;},
        // Property setter doesn't allow teh value of n to decrease
        set count(m){
            if(m>n)n=m;
            else throw Error("count can only be set to a larger value")
        }
    };
}

let c1 = counter(1000);
c1.count    // => 1000
c1.count    // => 1001
c1.count = 2000;
c1.count    // => 2000
c1.count = 2000;    // !Error: count can only be set to a larger value 


// ex: 8-2 Private property accessor methods using closures

// This function adds property accessor methods for a property with
// the specified name to the object o. The methods are anmed get<name>
// and set<name>. If a predicate function is supplied, the setter
// method uses it to test its argument for validity before storing it.
// If the predicate returns false, the setter method throws an exception.
//
// The unusual thing about this function is that the property value
// that is manipulated by the getter and setter methods is not stored in
// the object o. Instead, the value is stored only in a local variable
// in this function. The getter and setter methods are also defined
// locally to this function and therefore have access to this local variable.
// This means that the value is private to the two accessor methods, and it
// cannot be set or modified except through the setter method. 
function addPrivateProperty(o, name, predicate){
    let value;  // This is the property value

    // The getter method simply returns the value. 
    o[`get${name}`] = function(){return value;};

    // The setter method stores the value or throws an exception if
    // the predicate rejects the value
    o[`set${name}`] = function(v){
        if(predicate && !predicate(v)){
            throw new TypeError(`set${name}: invalid value ${v}`);
        }else{
            value = v;
        }
    };
}

// The following code demonstrates the addPrivateProperty() method
let o3 = {};    // Here is an empty object

// Add property accessor methods getName and setName()
// Ensure that only string values are allowed
addPrivateProperty(o,"Name",x=>typeofx==="string");
o3.setName("Frank");    // Set the property value
o3.getName()    // => "Frank"
o3.setName(0);  // !TypeError: try to set a value of the wrong type

// ex: when closures share access to a variable that they should not share

// This function returns a function that always retuns v
function constfunc(v){return ()=>v;}

// Create an array of constant functions:
let funcs = [];
for(var i1=0; i1<10; i1++)funcs[i1]=constfunc(i1);

// The function at array element 5 returns the value 5
funcs[5]()  // => 5

// Return an array of functions that return the values 0-9
function constfunc(){
    let funcs = [];
    for(var i=0; i<10; i++){
        funcs[i]=()=>i;
    }
    return funcs;
}

let funcs1 = constfunc();
funcs1[5]()     // => 10; Why doesn't this return 5?

// ex:

const self = this;  // Make the this value available to nested functions 

// 8.7 Function Properties, Methods, and Constructor

// Flanagan, David. JavaScript: The Definitive Guide (p. 209). O'Reilly Media. Kindle Edition. 

// 8.7.4 The call() and apply() Methods

// Flanagan, David. JavaScript: The Definitive Guide (p. 210). O'Reilly Media. Kindle Edition. 

// ex: to invoke function f() as a method of the object o (passing no arguments)
// you could use either call() or apply():

f.call(o);
f.apply(o);

o.m = f;    // Make f a temporary method of o
o.m();  // Invoke it, passing no arguments
delete o.m;     // Remove the temporary method

// ex: to pass two numbers to the function f() and invoke it as
// if it were a method of the object o, you can do this:

f.call(o,1,2);

// ex: apply() is like call() except the arguments passsed,
// are specified as an array:

f.apply(o,[1,2]);

// ex: to find the largest number in an array of numbers without using the spread operator, 
// you could use the apply() method to pass the elements of the array to the Math.max() function:

// Flanagan, David. JavaScript: The Definitive Guide (p. 211). O'Reilly Media. Kindle Edition. 

let biggest = Math.max.apply(Math, arrayOfNumbers);

// Replace the method named m of the object o with a version that logs
// messages before and after invoking the original method
function trace(o,m){
    let original = o[m];    // Remeber original method in the closure
    o[m] = function(...args){ // Now define the new method.
        console.log(new Date(), "Entering:", m);     // Log message
        let result = original.apply(this, args);    // Invoke original
        console.log(new Date(), "Exiting:", m);     // Log message
        return result;  // Return result
    };
}

// 8.7.5 The bind() Method

// Flanagan, David. JavaScript: The Definitive Guide (p. 211). O'Reilly Media. Kindle Edition. 

function f(y){return this.x+y;}     // This function needs to be bound
let o4 = {x: 1};    // An object we'll bind to
let g1 = f.bind(o);     // Calling g(x) invokes f() on o
g1(2)    // => 3
let p1 = {x: 10, g};    // Invoke g() as a method of this object
p.g(2)  // => 3: g is still bound to o, not p.

// ex: bind() method used for partial applications:

let sum = (x,y) => x+y;     // Return teh sum of 2 args
let succ = sum.bind(null,1);    // Bind the first argument to 1
succ(2)     // => 3: x is bound to 1, and we pass 2 for the y argument

function f(y,z){return this.x+y+z;}
let g2 = f.bind({x: 1}, 2);     // Bind this and y
g2(3)   // => 6: this.x is bound to 1, y is bound to 2 and z is 3

// 8.7.7 The Function() Constructor

// Flanagan, David. JavaScript: The Definitive Guide (p. 212). O'Reilly Media. Kindle Edition. 

const f = new Function("x","y","return x*y;");

// ex: above is similar to below

const f = function(x,y){return x*y;};

// ex: 

let scope2 = "global";
function constructFunction(){
    let scope = "local";
    return new Function("return scope");    // Doesn't capture local scope!
}
// This line returns "global" because the function returned by the
// Function() constructor does not use the local scope
constructFunction()()   // => "global"

// 8.8 Functional Programming

// Flanagan, David. JavaScript: The Definitive Guide (p. 213). O'Reilly Media. Kindle Edition. 

// ex: the following sections are for mind-expanding exploration of the power of JavaScript
// not a prescription for a good programming style

// 8.8.1 Processing Arrays with Functions

// Flanagan, David. JavaScript: The Definitive Guide (p. 214). O'Reilly Media. Kindle Edition. 

// ex: compute the mean and standard deviation of an array

let data = [1,2,3,5,5];     // This is our array of numbers

// The mean is the sum of the elements divided by the number of elements
let total1 = 0;
for(let i=0; i<data.length; i++)total += data[i];
let mean = total/data.length;   // mean == 3; the mean of our data is 3

// To compute the standard deviation, we first sum the squares of
// the deviation of each element from the mean
total = 0;
for(let i=0; i<data.length; i++){
    let deviation = data[i] - mean;
    total += deviation * deviation;
}
let stddev = Math.sqrt(total/(data.length-1));  // stddev == 2

// ex: array methods map() and reduce()

// First, define two simple functions
const sum = (x,y) => x+y;
const square = x => x*x;

// Then use those functions with Array methods to compute mean and stddev
let data1 = [1,1,3,5,5];
let mean1 = data.reduce(sum)/data.length;   // mean == 3
let deviations = data.map(x=>x-mean);
let stddev1 = Math.sqrt(deviations.map(square).reduce(sum)/(data.length-1));
stddev1     // => 2

// ex: Let's write functional versions of the map() and reduce() methods:

const map = function(a, ...args){return a.map(...args);};
const reduce = function(a, ...args){return a.reduce(...args);};

// With these map() and reduce() functions defined, our code to compute
// mean and standard deviation now looks like this:

const sum = (x,y) => x+y;
const square = x => x*x;

let data2 = [1,1,3,5,5];
let mean2 = reduce(data, sum)/data.length;
let deviations1 = map(data, x=>x-mean);
let stddev2 = Math.sqrt(reduce(map(deviations1,square), sum)/(data.length-1));
stddev2     // => 2

// 8.8.2 Higher-Order Functions

// Flanagan, David. JavaScript: The Definitive Guide (p. 215). O'Reilly Media. Kindle Edition. 

// A higher-order function that operates on functions, taking one or more functions as
// arguments and returning a new function:

// This higher-order function returns a new function that passes its
// arguments to f and returns the logical negation of f's return value;
function not(f){
    return function(...args){ // Return a new function
        let result = f.apply(this, args);   // that calls f
        return !results;    // and negates its result
    };
}

const even = x => x%2 === 0;    // A function to determine if a number is even
const odd = not(even);  // A new function that does the opposite
[1,1,3,5,5].every(odd)  // => true: every element of the array is odd

// ex: another example

// Return a function that expects an array argument and applies f to
// each element, returning the array of return values
// Contrast this with the map() function from earlier
function mapper(f){
    return a => map(a,f);
}

const increment1 = x => x+1;
const incrementAll = mapper(increment1);
incrementAll([1,2,3])   // => [2,3,4]

// ex: a more general example

// Return a new function that computes f(g(...))
// The returned function h passes all of its arguments to g, then passes
// the return value of g to f, then returns the return value of f. <- this should make sense
// Both f and g are invoked with the same this value as h was invoked with.
function compose(f,g){
    return function(...args){
        // We use call for f because we're passing a single value and
        // apply for g because we're passing an array of values.
        return f.call(this, g.apply(this, args));
    };
}

const sum = (x,y) => x+y;
const square = x => x*x;
compose(square, sum)(2,3)   // => 25; the square of the sum

// 8.8.3 Partial Application of Functions

// Flanagan, David. JavaScript: The Definitive Guide (p. 216). O'Reilly Media. Kindle Edition. 

// The arguments to this function are passed on the left
function partialLeft(f, ...outerArgs){
    return function(...innerArgs){ // Return this function
        let args = [...outerArgs, ...innerArgs];    // Build the argument list
        return f.apply(this, args);     // Then invoke f with it
    };
}

// The arugments to this function serve as a template. Undefined values
// in the argument list are filled in with values from the inner set.
function partial(f, ...outerArgs){
    return function(...innerArgs){
        let args = [...outerArgs];  // local copy of outer args template
        let innerIndex = 0;     // which inner arg is next
        // Loop through the args, filling in undefined values from inner args
        for(let i=0; i<args.length; i++){
            if(args[i] === undefined) args[i] = innerArgs[innerIndex++];
        }
        // Now append any remaining inner arguments
        args.push(...innerArgs.slice(innerIndex));
        return f.apply(this, args);
    };
}

// Here is a function with three arguments
const f = function(x,y,z){return x*(y-z)};
// Notice how these three partial applications differ
partialLeft(f,2)(3,4)   // => -2: Bind first argument: 2 * (3-4)
partialRight(f,2)(3,4)  // => 6: Bind last argument: 3 * (4-2)
partial(f, undefined, 2)(3,4)   // => -6: Bind middle argument: 3 * (2-4)


// ex:

const increment = partialLeft(sum, 1);
const cuberoot = partialRight(Math.pow, 1/3);
cuberoot(increment(26))     // => 3

// 8.8.4 Memoization

// Flanagan, David. JavaScript: The Definitive Guide (p. 217). O'Reilly Media. Kindle Edition. 

// Return a memoized version of f
// It only works if arguments to f all have distinct string representations

function memoize(f){
    const cache = new Map();    // Value cache stored in the closure. 

    return function(...args){
        // Create a string version of the arguments to use as a cache key
        let key = args.length + args.join("+");
        if(cache.has(key)){
            return cache.get(key)
        }else{
            let result = f.apply(this, args);
            cache.set(key, result);
        }
    };
}

// Return the Greatest Common Divisor of two integers using the Euclidian
// algorithm: http://en.wikipedia.org/wiki/Euclidean_algorithm
function gcd(a,b){ // Type checking for a and b has been omitted
    if(a<b){ // Ensure that a>=b when we start
        [a,b] = [b,a];  // Destructing assignment to swap variables
    }
    while(b!==0){ // This is Euclid's algorithm for GCD
        [a,b] = [b,a%b];
    }
    return a;
}

const gcdmemo = memoize(gcd);
gcdmemo(85,187)     // => 17

// Note that when we write a recursive function that we will be memoizing,
// we typically want to recurse to the memoized version, not the original.
const factorial = memoize(function(n){
    return (n<=1) ? 1:n*factorial(n-1);
});
factorial(5)    // => 120: also caches values for 4,3,2, and 1.

// 8.9 Summary

// Flanagan, David. JavaScript: The Definitive Guide (p. 220). O'Reilly Media. Kindle Edition. 

// You can define functions wiht the function keyword and with => syntax

// You can use the spread operator to pass elements of an array or iterable object
// as arguments in a function invocation

// functions called closures, are defined inside of and returned by an enclosing
// function retains access to its lexical scope. This means it can read/write
// the variable defined inside the outer function 

