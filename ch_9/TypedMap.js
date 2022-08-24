/*

Example 9-6. TypedMap.js: a subclass of Map that checks key and value types

Flanagan, David. JavaScript: The Definitive Guide (p. 239). O'Reilly Media. Kindle Edition. 

*/

class TypedMap extends Map{
    constructor(keyType, valueType, entries){
        // If entries are specified, check their typs
        if(entries){
            for(let[k, v] of entries){
                if(typeof k !== keyType || typeof v !== valueType){
                    throw new TypeError(`Wrong type for entry [${k}, ${v}]`);
                }
            }
        }

        // Initialize the superclass with the (type-checked) initial entries
        super(entries);

        // And then initialize this subclass by storing the types
        this.keyType = keyType;
        this.valueType = valueType;
    }
    // Now redefine the set() method to add type checking for any
    // new entries added to the map
    set(key, value){
        // Throw an error if the key or value are of the wrong type
        if(this.keyType && typeofkey !== this.keyType){
            throw new TypeError(`${key} is not of type ${this.keyType}`);
        }
        if(this.valueType && typeofvalue !== this.valueType){
            throw new TypedError(`${value} is not of type ${this.valueType}`);
        }

        // If the types are correct, we invoke the superclasse's version of
        // the set() method, to actually add the entry to the map. And we
        // return whatever the superclass method returns.
        return super.set(key, value);
    }
}

