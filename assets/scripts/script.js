
//variable declarations to point to various elements on the page
var highscore = document.getElementById("highscorebutton");
var timer = document.getElementById("timercounter");
var body = document.querySelector("body");
var mainH1 = document.getElementById("mainH1");
var mainP = document.getElementById("mainP");
var endingH1 = document.getElementById("endingH1");
var endingP = document.getElementById("endingP");
var opening = document.getElementById("opening");
var ending = document.getElementById("ending");
var startButton = document.getElementById("startButton");
var submitButton = document.getElementById("submitButton");
var initialsInput = document.getElementById("initialsInput");

//variable declarations for the total score to be saved and for the questions to be asked during the game
let score = 1;
//hides the ending so it doesn't appear until needed
clearSpecific(ending);

//array declarations and initializations
var questionList = [
  ["A _______ is a way to store information to be later referenced and manipulated 	within a program.", ['variable', 'algorithm', 'array', 'loop'], "variable"],
  ["Which of the following is not an operating system?", ['Windows', 'Linux', 'Jellyfin', 'loop'], "macOS"],
  ["The term 'FANG' refers to the stocks of four popular American technology companies. Which of the following was most recently included in 2017?", ['Amazon', 'Netflix', 'TikTok', 'Apple'], "Apple"],
  ["Which of the following is the most in demand and popular programming languages in the current year of 2023?", ['Python', 'Javascript', 'C++', 'Java'], "Javascript"],
  ["What is an array?", ['a block of code that can be referenced by name to run the code it contains', 'a group of instructions given to a computer to be processed', 'a collection of code made by other programmers for you to import and use', 'a collection of items of same data type stored at contiguous memory locations'], "a collection of items of same data type stored at contiguous memory locations"]
];

//CLEARS LOCAL STORAGE FOR DEBUG PURPOSES
//localStorage.clear();

//Creates the sigh score list and readds any previous high scores that might have been reached previously
var highScoreList = [];
hsParse = JSON.parse(localStorage.getItem("savedHighScoreList"));
console.log(hsParse);
highScoreList.push(hsParse);
console.log(highScoreList);

console.log(questionList);
//Console log example pointing to all the questions
console.log("Questions:");
console.log(questionList[0][0]) //Q1 q
console.log(questionList[1][0]) //Q2 q
console.log(questionList[2][0]) //Q3 q
console.log(questionList[3][0]) //Q4 q
console.log(questionList[4][0]) //Q5 q
//Console log example pointing to answers for Q1 (this will need to cycle 5 times in total)
console.log("Q1 Answers:");
console.log(questionList[0][1][0]) //Q1 a1
console.log(questionList[0][1][1]) //Q1 a2
console.log(questionList[0][1][2]) //Q1 a3
console.log(questionList[0][1][3]) //A1 a4
//Console log example pointing to correct answers
console.log("Correct Answers:");
console.log(questionList[0][2]);
console.log(questionList[1][2]);
console.log(questionList[2][2]);
console.log(questionList[3][2]);
console.log(questionList[4][2]);

//PURPOSE: hides the specific element called and deletes the space it normally takes up 
//PARAMETERS: element, an element that is currently unshown
//RETURNS: NONE
function clearSpecific(element) {
    element.style.display = "none";
}

//PURPOSE: unhides the specific element called and fills the space it normally takes up 
//PARAMETERS: element, an element that is currently unshown
//RETURNS: NONE
function unclearSpecific(element) {
    element.style.display = "";
}

function createQuestion() {
    clearAll();
    unclearSpecific(body);
    unclearSpecific(mainH1);
    
}

var secondsLeft = 3;

function setTime() {
  // Sets interval in variable
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timer.textContent = "Timer: " + secondsLeft;

    if(secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      // Calls function to create and append image
      // unclearSpecific(opening);
      unclearSpecific(ending);
      clearSpecific(mainH1);
      // clearSpecific(startButton);
      // mainH1.textContent = "All done!";
      endingP.textContent = "Your final score was: " + score;
      mainH1.style.margin = "15% 0% 0% 0%";
      secondsLeft = 10;
    }
  }, 1000);
  questionList = shuffleArr(questionList);
  console.log("Shuffled:");
  console.log(questionList);
  mainH1.textContent = questionList[0][0];
}

//PURPOSE: a function that shuffles an array using the Fisher-Yates algorithm as it is less biased than standard Math.random practices according to research
//PARAMETERS: arr, array
//RETURNS: arr, shuffled array
function shuffleArr(arr){
  let oldElement;
  for (let i = arr.length - 1; i > 0; i--) {
    let rand = Math.floor(Math.random() * (i + 1));
    oldElement = arr[i];
    arr[i] = arr[rand];
    arr[rand] = oldElement;
  }
  return arr;
}

//PURPOSE: deletes elements from opening and adds/edits elements for the test
//PARAMETERS: element, an element that is currently unshown
//RETURNS: NONE
startButton.addEventListener("click", function(){
    score = 0;
    clearSpecific(opening);
    mainH1.style.margin = "10% 0% 0% 0%";
    setTime();
});
//
submitButton.addEventListener("click", function(event){
    event.preventDefault();
    highScoreList.push([initialsInput.value, score])
    initialsInput.value="";
    var savedHighScoreList = JSON.stringify(highScoreList);
    localStorage.setItem("savedHighScoreList", savedHighScoreList);
    console.log(savedHighScoreList)
    console.log(highScoreList);
    
});
//
highscore.addEventListener("click", function(){
    score++;
});
