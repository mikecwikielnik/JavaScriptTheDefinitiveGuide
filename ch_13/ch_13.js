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

// 13.1.4 Callbacks and Events in Node

// Flanagan, David. JavaScript: The Definitive Guide (p. 345). O'Reilly Media. Kindle Edition. 

