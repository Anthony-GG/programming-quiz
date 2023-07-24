
var highscore = document.getElementById("highscorebutton");
var timer = document.getElementById("timercounter");
var body = document.querySelector(body);
var mainH1 = document.getElementById("mainH1")


// hideSpecific(highscore);
// hideSpecific(timer);

//PURPOSE: hides the specific element called but leaves the space it normally takes up 
//PARAMETERS: element, an element that needs to be hidden
//RETURNS: NONE
function hideSpecific(element) {
    element.style.visibility = "hidden";
}

//PURPOSE: hides the specific element called and deletes the space it normally takes up 
//PARAMETERS: element, an element that needs to be hidden
//RETURNS: NONE
function clearSpecific(element) {
    element.style.display = "none";
}

//PURPOSE: unhides the specific element called
//PARAMETERS: element, an element that is currently hidden
//RETURNS: NONE
function unhideSpecific(element) {
    element.style.visibility = "visible";
}

//PURPOSE: hides the specific element called and deletes the space it normally takes up 
//PARAMETERS: element, an element that is currently unshown
//RETURNS: NONE
function unclearSpecific(element) {
    element.style.display = "shown";
}

//PURPOSE: hides all elements and deletes the space they normally take up when shown
//PARAMETERS: NONE
//RETURNS: NONE
function clearAll() {
    document.body.style.display = "none";
}

function createQuestion() {
    clearAll();
    unclearSpecific(body);
    unclearSpecific(mainH1);
    
}