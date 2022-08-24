/*

Example 9-5. Span.js: a simple subclass of Range

Flanagan, David. JavaScript: The Definitive Guide (p. 238). O'Reilly Media. Kindle Edition. 

*/

// This is the constructor function for our subclass
function Span(start, span){
    if(span >= 0){
        this.from = start;
        this.to = start + span;
    }else{
        this.to = start;
        this.from = start + span;

    }
}

// Ensure that the Span prototype inherits from the Range prototype
Span.prototype = Object.create(Range.prototype);

// We don't want to inherit Range.prototype.constructor, so we 
// define our own constructor property.
Span.prototype.constructor = Span;

// By defining its own toString() method, Span overrides the
// toString() method that it would otherwise inherit from Range.
Span.prototype.toString = function(){
    return `(${this.from}... + ${this.to - this.from})`;
};

/*

The key line of code in the preceding example is this one, and if it makes sense to you, you understand how subclasses work in JavaScript:

Flanagan, David. JavaScript: The Definitive Guide (p. 238). O'Reilly Media. Kindle Edition. 

Span.prototype = Object.create(Range.prototype);

*/

