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

