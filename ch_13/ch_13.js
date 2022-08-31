/*

Chapter 13. Asynchronous JavaScript

Flanagan, David. JavaScript: The Definitive Guide (p. 341). O'Reilly Media. Kindle Edition. 

*/

// 13.1 Asynchronous Programming with Callbacks

// Flanagan, David. JavaScript: The Definitive Guide (p. 342). O'Reilly Media. Kindle Edition. 

// 13.1.1 Timers

// Flanagan, David. JavaScript: The Definitive Guide (p. 342). O'Reilly Media. Kindle Edition. 

// ex: run code after some time has elapsed:

setTimeout(checkForUpdates, 60000);

// ex: setInveral() instead of setTimeout()

// Call checkForUpdates in one minute and then again every mimnute after that
let updateIntervalID = setInterval(checkForUpdates, 60000);

// setInterval() returns a value that we can use to stop the repeated
// invocations by calling clearInterval(). (Similarly, setTimeout() 
// returns a value that you can pass to clearTimeout())
function stopCheckingForUpdates(){
    clearInterval(updateIntervalID);
}

// 13.1.2 Events

// Flanagan, David. JavaScript: The Definitive Guide (p. 343). O'Reilly Media. Kindle Edition. 

// ex:

// Ask the web browser to return an object representing the HTML
// <button> element that matches this CSS selector
let okay = document.querySelector('#confirmUpdateDialog button.okay');

// Now register a callback function to be invoked when the user
// clicks on that button.
okay.addEventListener('click', applyUpdate);

// 13.1.3 Network Events

// Flanagan, David. JavaScript: The Definitive Guide (p. 343). O'Reilly Media. Kindle Edition. 

// ex: JavaScript running in the browser can fetch data from the web server:

function getCurrentVersionNumber(versionCallback){  // Note callback argument
    // Make a scripted HTTP request to a backend version API
    let request = new XMLHttpRequest();
    request.open("GET", "http://www.example.com/api/version");
    request.send();

    // Register a callback that will be invoked when the response arrives
    request.onload = function(){
        if(request.status === 200){
            // If HTTP status is good, get version number and call callback.
            let currentVersion = parseFloat(request.responseText);
            versionCallback(null, currentVersion);
        }else{
            // Otherwise report an error to the callback
            versionCallback(response.statusText, null);
        }
    };
    // Register another callback that will be invoked for network erros
    request.onerror = request.ontimeout = function(e){
        versionCallback(e.type, null);
    };
}

const { profile } = require("console");
const { rename } = require("fs");
// 13.1.4 Callbacks and Events in Node

// Flanagan, David. JavaScript: The Definitive Guide (p. 345). O'Reilly Media. Kindle Edition. 

const fs = require("Fs");   // The "fs" module has filesystem-related APIs
const { request } = require("http");
let options = {     // An object to hold options for our program
    // default options would go here
};

// Read a configuration file, then call the callback function
fs.readFile("config.json", "utf-8", (err, text) => {
    if(err){
        // If there was an error, display a warning, but continue
        console.warn("Could not read config file:", err);
    }else{
        // Otherwise, parse the file contents and assign to the options object
        Object.assign(options, JSON.parse(text));
    }

    // In either case, we can now start running the program
    startProgram(options);
});

// ex:

const https = require("https");
const { cachedDataVersionTag } = require("v8");

// Read teh text content of the URL and asynchronously pass it to the callback.
function getText(url, callback){
    // Start an HTTP GET request for the URL
    request = https.get(url);

    // Register a function to handle the "response" event.
    request.on("response", response => {
        // The response event means that response headers have been received
        let httpStatus = response.statusCode;

        // The body of the HTTP response has not been received yet.
        // So we register more event handlers to to be called when it arrives
        response.setEncoding("utf-8");  // We're expecting Unicode text
        let body = "";  // which we will accumulate here

        // This event handler is called when a chunk of the body is ready
        response.on("data", chunk => {body += chunk;});

        // This event handler is called when the resposne is complete
        response.on("end", () => {
            if(httpStatus === 200){ // IF the HTTP response was good
                callback(null, body);   // Pass response body to the callback
            }else{  // Otherwise pass an error
                callback(httpStatus, null);
            }
        });
    });

    // We also register an event handler for lower-level network errors
    request.on("error", (err) => {
        callback(err, null);
    });
}

// 13.2 Promises

// Flanagan, David. JavaScript: The Definitive Guide (p. 346). O'Reilly Media. Kindle Edition. 

// 13.2.1 Using Promises

// Flanagan, David. JavaScript: The Definitive Guide (p. 347). O'Reilly Media. Kindle Edition. 

// ex:

getJSON(url).then(jsonData => {
    // This is a callback function that will be asynchronously
    // invoked with the parsed JSON value when it becomes available.
});

// ex: idiomatic examples

// Suppose you have a function like this to display a user profile
function displayUserProfile(profile){/* implementation omitted */}

// Here's how you might use that function with a Promise
// Notice how this line of code reads almost like an English sentence:
getJSON("/api/user/profile").then(displayUserProfile)

// Handling errors with Promises

// Flanagan, David. JavaScript: The Definitive Guide (p. 348). O'Reilly Media. Kindle Edition. 

// ex: For promises, we can do this by passing a 2nd fn to the then() method:

getJSON("/api/user/profile").then(displayUserProfile, handleProfileError);

/*

When a Promise-based asynchronous computation completes normally, 

it passes its result to the function that is the first argument to then().

Flanagan, David. JavaScript: The Definitive Guide (p. 349). O'Reilly Media. Kindle Edition. 

*/

/*

So, in the code above, if getJSON() runs normally, 

it passes its result to displayUserProfile(). If there is an error,

then getJSON() passes an Error object to handleProfileError().

Flanagan, David. JavaScript: The Definitive Guide (p. 349). O'Reilly Media. Kindle Edition. 

*/

// ex: A better way to handle errors is this:

getJSON("/api/user/profile").then(displayUserProfile).catch(handleProfileError);

// 13.2.2 Chaining Promises

// Flanagan, David. JavaScript: The Definitive Guide (p. 350). O'Reilly Media. Kindle Edition. 

// ex: hypothetical Promise chain:

fetch(documentURL)  // Make an HTTP request
    .then(response => response.json())  // Ask for the JSON body of the response
    .then(document => {     // When we get the parsed JSON
        return render(document);    // display the document to the user
    })
    .then(rendered => {     // When we get teh rendered document
        cacheInDatabase(rendered);  // cache it in the local database.
    })
    .catch(error => handle(error));     // Handle any erros that occur

// We will continue to explore the idea of using Promise chains to make HTTP requests, however.

// Flanagan, David. JavaScript: The Definitive Guide (p. 351). O'Reilly Media. Kindle Edition. 

// ex:

fetch("/api/user/profile").then(response => {
    // When the promise resolves, we have status and headers
    if(response.ok &&
        response.headers.get("Content-Type") === "applications/json"){
            // What can we do here? We don't actually have the response body yet. 
    }
});

// ex: a bad promises example

fetch("/api/user/profile").then(response => {
    response.json().then(profile => { // Ask for the JSON-parsed body
        // When the body of the response arrives, it will be automatically
        // parsed as JSON and passed to this function.
        displayUserProfile(profile);
    });
});

// ex: a good promises example

fetch("/api/user/profile")
    .then(response => {
        return response.json();
    })
    .then(profile => {
        displayUserProfile(profile);
    });

// method invocations in this code: fetch().then().then()
// ignoring arguments

fetch().then().then()   // This is a method chain

// ex: simplified version of the original fetch() above. 

fetch(theURL)   // task 1; returns promise 1
    .then(callback1)     // task 2; returns promise 2
    .then(callback2);    // task 3; returns promise 3

// 13.2.3 Resolving Promises

// Flanagan, David. JavaScript: The Definitive Guide (p. 353). O'Reilly Media. Kindle Edition. 

