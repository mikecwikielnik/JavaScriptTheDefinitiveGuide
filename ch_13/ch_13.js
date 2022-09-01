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
function stopCheckingForUpdates() {
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

function getCurrentVersionNumber(versionCallback) {  // Note callback argument
    // Make a scripted HTTP request to a backend version API
    let request = new XMLHttpRequest();
    request.open("GET", "http://www.example.com/api/version");
    request.send();

    // Register a callback that will be invoked when the response arrives
    request.onload = function () {
        if (request.status === 200) {
            // If HTTP status is good, get version number and call callback.
            let currentVersion = parseFloat(request.responseText);
            versionCallback(null, currentVersion);
        } else {
            // Otherwise report an error to the callback
            versionCallback(response.statusText, null);
        }
    };
    // Register another callback that will be invoked for network erros
    request.onerror = request.ontimeout = function (e) {
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
    if (err) {
        // If there was an error, display a warning, but continue
        console.warn("Could not read config file:", err);
    } else {
        // Otherwise, parse the file contents and assign to the options object
        Object.assign(options, JSON.parse(text));
    }

    // In either case, we can now start running the program
    startProgram(options);
});

// ex:

const https = require("https");
const { resolve } = require("path");
const { cachedDataVersionTag } = require("v8");

// Read teh text content of the URL and asynchronously pass it to the callback.
function getText(url, callback) {
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
        response.on("data", chunk => { body += chunk; });

        // This event handler is called when the resposne is complete
        response.on("end", () => {
            if (httpStatus === 200) { // IF the HTTP response was good
                callback(null, body);   // Pass response body to the callback
            } else {  // Otherwise pass an error
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
function displayUserProfile(profile) {/* implementation omitted */ }

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
    if (response.ok &&
        response.headers.get("Content-Type") === "applications/json") {
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

// ex: verbose and nonidiomatic way (aka wordy and not easy to understand- naturally!)

function c1(response) {  // callback1
    let p4 = response.json();
    return p4;  // returns promise 4
}

function c2(profile) {   // callback2
    displayUserProfile(profile);
}

let p1 = fetch("/api/user/profile");    // promise 1, task 1
let p2 = p1.then(c1);   // promise 2, task 2
let p3 = p2.then(c2);   // promise 3, task 3

// 13.2.4 More on Promises and Errors

// Flanagan, David. JavaScript: The Definitive Guide (p. 355). O'Reilly Media. Kindle Edition. 

// The catch and finally methods

// Flanagan, David.JavaScript: The Definitive Guide(p. 356).O'Reilly Media. Kindle Edition. 

// ex: a shortcut

p.then(null, c);
p.catch(c);

// ex: A more realistic example of the URL-fetching code

fetch("/api/user/profile")  // Start the HTTP request
    .then(response => {     // Call this when status and headers are ready
    if(!response.ok){   // IF we got a 404 Not Found or similar error
        return null;    // Maybe user is logged out; return null profile
    }

    // Now check the headers to ensure that the server sent us JSON
    // If not, our server is brok, and this is a serious error!
    let type = response.headers.get("content=type");
    if(type !== "application/json"){
        throw new TypeError(`Expected JSON, get ${type}`);
    }

    // If we get here, then we got a 2xx status and a JSON content-type
    // so we can confidently return a Promise for the response
    // body as a JSON object.
    return response.json();
    })
    .then(profile => {  // Called with the parsed response body or null
        if(profile){
            displayUserProfile(profile);
        }
        else{ // IF we got a 404 error above and returned null we end up here
            displayLoggedOutProfilePage();
        }
    })
    .catch(e => {
        if(e instanceof NetworkError){
            // fetch() can faill this way if the iternet connection is down
            displayErrorMessage("Check the internet");
        }
        else if(e instanceof TypeError){
            // This happens if we throw TypeError above
            displayErrorMessage("Something is wrong with our server!");
        }
        else{
            // This must be some kind of unanticipated error
            console.error(e);
        }
    });

// ex: 

startAsyncOperation()
    .then(doStageTwo)
    .catch(recoverFromStageTwoError)
    .then(doStageThree)
    .then(doStageFour)
    .catch(logStageThreeAndFourErros);

// ex: a Promise-based operation to query a database:

queryDatabase()
    .then(displayTable)
    .catch(displayDatabaseError);

// ex: a solution to the previous code

queryDatabase()
    .catch(e => wait(500).then(queryDatabase))  // On failure, wait and retry
    .then(displayTable)
    .catch(displayDatabaseError);

// If the hypothetical failures are truly random, then adding this one line of code should reduce your error rate from 1% to .01%.

// Flanagan, David. JavaScript: The Definitive Guide (p. 359). O'Reilly Media. Kindle Edition. 

// 13.2.5 Promises in Parallel

// Flanagan, David. JavaScript: The Definitive Guide (p. 360). O'Reilly Media. Kindle Edition. 

// ex: fetch the text content of multiple URLs

// We start with an array of URLs
const urls = [/* zero or more URLs here */];
// And convert it to an array of Promise objects
promises = urls.map(url => fetch(url).then(r => r.text()));
// Now get a Promise to run all those Promises in parallel
Promise.all(promises)
    .then(bodies => {/* do something with the array of strings */})
    .catch(e => console.error(e));

// ex: Promise.allSettled() method

Promise.allSettled([Promise.resolve(1), Promise.reject(2), 3]).then(results => {
    results[0]  // => {status: "fulfilled", value: 1}
    results[1]  // => {status: "rejected", reason: 2}
    results[2]  // => {status: "fulfilled", value: 3}
});

// 13.2.6 Making Promises

// Flanagan, David. JavaScript: The Definitive Guide (p. 361). O'Reilly Media. Kindle Edition. 

// Promises based on other Promises

// Flanagan, David. JavaScript: The Definitive Guide (p. 361). O'Reilly Media. Kindle Edition. 

// ex:

function getJSON(url){
    return fetch(url).then(response => response.json());
}

// ex: another Promise-returning function, using getJSON() as the source of the initial Promise:

function getHighScore(){
    return getJSON("/api/user/profile").then(profile => profile.highscore);
}

// Promises from scratch

// Flanagan, David. JavaScript: The Definitive Guide (p. 363). O'Reilly Media. Kindle Edition. 

// ex: a Promised-based wait() function

function wait(duration){
    // Create and return a new Promise
    return new Promise((resolve, reject) => { // These control the Promise
        // If the argument is invalid, reject the Promise
        if(duration < 0){
            reject(new Error("Time travel not yet implemented"));
        }
        // Otherwise, wait asynchronously adn then resolve the Promise.
        // setTimeout will invoke resolve() with no argumetns, which means
        // that the Promise will fulfill with the undefined value
        setTimeout(resolve, duration);
    });
}

// Example 13-1. An asynchronous getJSON() function

// Flanagan, David. JavaScript: The Definitive Guide (p. 364). O'Reilly Media. Kindle Edition. 

const http = require("http");

function getJSON(url){
    // Create and return a new Promise
    return new Promise((resolve, reject) => {
        // Start an HTTP GET request for the specified URL
        request = http.get(url, response => { // called when response starts
            // Reject the Promise if the HTTP status is wrong
            if(response.statusCode !== 200){
                reject(new Error(`HTTP status ${response.statusCode}`));
                response.resume();  // so we don't leak memory
            }
            // And reject if the response headers are wrong
            else if(response.headers["content-type"] !== "application/json"){
                reject(new Error("Invalid content-type"));
                response.resume();  // don't leak memory
            }
            else{
                // Otherwise, register events to read the body of the response
                let body = "";
                response.setEncoding("utf-8");
                response.on("data", chunk => {body += chunk;});
                response.on("end", () => {
                    // When the response body is complete, try to parse it
                    try{
                        let parsed = JSON.parse(body);
                        // If it parsed successfully, fulfill the Promise
                        resolve(parsed);
                    } catch(e){
                        // If parsing failed, reject the Promise
                        reject(e);
                    }
                });
            }
        });
        // We also reject the Promise if the request fails before we
        // even get a response (such as when the network is down)
        request.on("error", error => {
            reject(error);
        });
    });
}

// 13.2.7 Promises in Sequence

// Flanagan, David. JavaScript: The Definitive Guide (p. 365). O'Reilly Media. Kindle Edition. 

// ex: array of arbitrary length and unknown content, can't write our a Promise chain in advance:

function fetchSequentially(urls){
    // We'll store the URL bodies here as we fetch tehm
    const bodies = [];

    // Here's a Promise-returning function that fetches one body
    function fetchOne(url){
        return fetch(url)
            .then(response => response.text())
            .then(body => {
                // We save the body to the array, and we're purposely 
                // omitting a return value here (returning undefined)
                bodies.push(body);
            });
    }

    // Start with a Promise that will fulfill right away (with value undefined)
    let p = Promise.resolve(undefined);

    // Now loop through the desired URLs, building a Promise chian
    // of arbitrary length, fetching one URLs at each stage of the chain
    for(url of urls){
        p = p.then(() => fetchOne(url));
    }

    // When the last Promise in that chain is fulfilled, then the
    // bodies array is ready. So let's return a Promise for that
    // bodies array. Note that we don't include any error handlers:
    // we want to allow erros to propagate to the caller.
    return p.then(() => bodies);
}

fetchSequentially(urls)
    .then(bodies => {/* do somethign with the array of strings */})
    .catch(e => console.log(e));

// This function takes an array of input values and a "promiseMaker" function.
// For any input value x in the array, promiseMaker(x) should return a Promise
// that will fulfill to an output value. This function returns a Promise
// that fulfills to an array of the computed output values.
//
// Rather than creating the Promises all at once and letting them run in 
// parallel, however, promiseSequence() only runs one Promise at a time
// and does ont call promiseMaker() for a value until the previous Promise
// has fulfilled.
function promiseSequence(inputs, promiseMaker){
    // Make a private copy of the array that we can modify
    inputs = [...inputs];

    // Here's the function that we'll use as a Promise callback
    // This is the pseudorecursive magic that makes this all work
    function handleNextInput(outputs){
        if(inputs.length === 0){
            // If there are no more inputs left, then return the array
            // of outputs, finally fulfilling this Promise and all the
            // previous resolved-but-not-fulfilled Promises
            return outputs;
        }else{
            // If there are still input values to process, then we'll
            // return a Promise object, resolving the current Promise
            // with the future value from a new Promise.
            let nextInput = inputs.shift();     // Get the next input value,
            return promiseMaker(nextInput)   // compute the next output value,
                // then create a new outputs array with teh new output value
                .then(output => outputs.concat(output))
                // Then "recurse", passing the new, longer, outputs array
                .then(handleNextInput);
        }
    }

    // Start with a Promise that fulfills to an empty array and use
    // the function above as its callback.
    return Promise.resolve([]).then(handleNextInput);
}

// This promiseSequence() function is intentionally generic. 

// We can use it to fetch URLs with code like this:

// Flanagan, David. JavaScript: The Definitive Guide (p. 367). O'Reilly Media. Kindle Edition. 

// Given a URL, return a Promise that fulfills to the URL body text
function fetchBody(url){return fetch(url).then(r => r.text());}
// Use it to sequentically fetch a bunch of URL bodies
promiseSequence(urls, fetchBody)
    .then(bodies => {/* do something wiht the array of strings */})
    .catch(console.error);

// 13.3 async and await

// Flanagan, David. JavaScript: The Definitive Guide (p. 367). O'Reilly Media. Kindle Edition. 

