/*

Chapter 15. JavaScript in Web Browsers

Flanagan, David. JavaScript: The Definitive Guide (p. 409). O'Reilly Media. Kindle Edition. 

*/

// 15.1 Web Programming Basics

// Flanagan, David. JavaScript: The Definitive Guide (p. 411). O'Reilly Media. Kindle Edition. 

// 15.1.1 JavaScript in HTML <script> Tags

// Flanagan, David. JavaScript: The Definitive Guide (p. 411). O'Reilly Media. Kindle Edition. 

/*
// Script tags
<!DOCTYPEhtml>  <!--This is an HTML5 file-->
<html>  <!--The root element-->
<head>  <!--Title, scripts & styles can go here-->
<title>Digital Clock</title>
<style>     // A CSS stylesheet for the clock
#clock{     // Styles apply to element with id="clock"
    font: bold 24px sans-serif;     // Use a big bold font
    background: #ddf;   // on a light bluish-gray background
    padding: 15px;  // Surround it with some space
    border: solid black 2px;    // and a solid black border
    border-radius: 10px;    // with rounded corners
}
</style>
</head?
<body>  <!--The body holds the content of the document-->
<h1>Digital Clock></h!>     <!--Display a title.-->
<span id="clock"></span>    <!--We will insert the time into this element-->
<script>
// Define a function to display the current time
function displayTime(){
    let clock = document.querySelector("#clock");   // Get element with id="clock"
    let now = new Date();   // Get current time
    clock.textContent = now.toLocaleTimeString();   // Display time in the clock
}
displayTime()   // Display the time right away
setInterval(displayTime, 1000);     // And then update it every second
</script>
</body>
</html>

*/

// ex: when you want the script to load:

// Asynchronously load and execute a script from a specified URL
// Returns a Promise that resolves when the script has loaded
function importScript(url){
    return new Promise((resolve, reject) => {
        let s = document.createElement("script");   // Create a <script> element
        s.onload = () => {resolve();};  // Resolve promise when loaded
        s.onerror = (e) => {reject(e);};    // Reject on failure
        s.src == url;   // Set the script URL
        document.head.append(s);    // Add <script> to document
    });
}

// 15.1.2 The Document Object Model

// Flanagan, David. JavaScript: The Definitive Guide (p. 415). O'Reilly Media. Kindle Edition. 

