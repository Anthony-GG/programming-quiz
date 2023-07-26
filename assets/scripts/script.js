
//variable declarations to point to various elements on the page
var window = document.querySelector('window');
var highscore = document.getElementById("highscorebutton");
var returnButton = document.getElementById("returnButton");
var timer = document.getElementById("timercounter");
var body = document.querySelector("body");
var mainH1 = document.getElementById("mainH1");
var highScoreDiv = document.getElementById("highscoreul");
var questionsDiv = document.getElementById("questionsol");
var mainP = document.getElementById("mainP");
var endingH1 = document.getElementById("endingH1");
var endingP = document.getElementById("endingP");
var opening = document.getElementById("opening");
var ending = document.getElementById("ending");
var startButton = document.getElementById("startButton");
var submitButton = document.getElementById("submitButton");
var clearButton = document.getElementById("clearButton");
var initialsInput = document.getElementById("initialsInput");

//variable declarations for the total score to be saved and for the questions to be asked during the game
let score = 1;
var answer = false;
//hides the ending and clear button so it doesn't appear until needed
clearSpecific(ending);
clearSpecific(clearButton);
clearSpecific(returnButton);

//array declarations and initializations for Question List
var questionList = [
  ["A _______ is a way to store information to be later referenced and manipulated 	within a program.", ['variable', 'algorithm', 'array', 'loop'], "variable"],
  ["Which of the following is not an operating system?", ['Windows', 'Linux', 'Jellyfin', 'macOS'], "Jellyfin"],
  ["The term 'FANG' refers to the stocks of four popular American technology companies. Which of the following was most recently included in 2017?", ['Amazon', 'Netflix', 'TikTok', 'Apple'], "Apple"],
  ["Which of the following is the most in demand and popular programming languages in the current year of 2023?", ['Python', 'Javascript', 'C++', 'Java'], "Javascript"],
  ["What is an array?", ['a block of code that can be referenced by name to run the code it contains', 'a group of instructions given to a computer to be processed', 'a collection of code made by other programmers for you to import and use', 'a collection of items of same data type stored at contiguous memory locations'], "a collection of items of same data type stored at contiguous memory locations"]
];

//CLEARS LOCAL STORAGE FOR DEBUG PURPOSES - now added in 'View High Scores' section
//localStorage.clear();

//Creates the sigh score list and readds any previous high scores that might have been reached previously
hsParse = JSON.parse(localStorage.getItem("savedHighScoreList"));
if (hsParse == null) {
  var highScoreList = [];
} else {
  var highScoreList = hsParse;
}
// console.log(highScoreList);

// console.log(questionList);
// //Console log example pointing to all the questions
// console.log("Questions:");
// console.log(questionList[0][0]) //Q1 q
// console.log(questionList[1][0]) //Q2 q
// console.log(questionList[2][0]) //Q3 q
// console.log(questionList[3][0]) //Q4 q
// console.log(questionList[4][0]) //Q5 q
// //Console log example pointing to answers for Q1 (this will need to cycle 5 times in total)
// console.log("Q1 Answers:");
// console.log(questionList[0][1][0]) //Q1 a1
// console.log(questionList[0][1][1]) //Q1 a2
// console.log(questionList[0][1][2]) //Q1 a3
// console.log(questionList[0][1][3]) //A1 a4
// //Console log example pointing to correct answers
// console.log("Correct Answers:");
// console.log(questionList[0][2]);
// console.log(questionList[1][2]);
// console.log(questionList[2][2]);
// console.log(questionList[3][2]);
// console.log(questionList[4][2]);

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

  questionList = shuffleArr(questionList);
  // console.log("Shuffled:");
  // console.log(questionList);

  mainH1.textContent = questionList[0][0];
  var questionsOl = document.createElement("ol");
  questionsDiv.appendChild(questionsOl);
  //shuffles order of questions to be different each time they appear
  questionList[0][1] = shuffleArr(questionList[0][1]);
  questionList[0][1].forEach(function(option){
    var listValue = option;
    var listItem = document.createElement("button")
    listItem.textContent = listValue;
    questionsOl.appendChild(listItem);
  });
  mainH1.textContent = questionList[0][0];
  // questionList.splice(0,1);
}

var secondsLeft = 60;

function setTime() {
  // Sets interval in variable
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timer.textContent = "Timer: " + secondsLeft;

    if(secondsLeft === 0 || secondsLeft < 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      // Calls function to create and append image
      unclearSpecific(ending);
      clearSpecific(questionsDiv);
      clearSpecific(mainH1);
      endingP.textContent = "Your final score was: " + score;
      mainH1.style.margin = "15% 0% 0% 0%";
      secondsLeft = 60;
      timer.textContent = "Timer: ";
    }
  }, 1000);
  createQuestion();
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

//PURPOSE: a function that validates if the question clicked is correct or incorrect, giving out penalties or rewards and continues the game depending
//PARAMETERS: event, an event from questionsDiv
//RETURNS: NONE
function answerValidation(event){
  // console.log(questionList[0][2])
  // console.log(event.target.textContent);
  // console.log(event.target.type);
  //Makes sure you are clicking on a submit button in the Ol
  if(event.target.type === 'submit'){
    //Checks to see if your answer is correct or incorrect
    if (event.target.textContent === questionList[0][2]) {
      event.target.style.backgroundColor = "green";
      //gives points based on a random value of 1-5 plus the total seconds left divided by 6 (rounded down)
      score+=(Math.floor(secondsLeft/6) + Math.floor(Math.random()*5));
      console.log("Your current score is: " + score);
      questionList.splice(0,1);
      if(questionList.length > 0){
        while(event.currentTarget.firstChild){
          event.currentTarget.removeChild(event.currentTarget.firstChild);
        }
        createQuestion();
      } else {
        secondsLeft = 0;
      }
    } else {;
      event.target.style.backgroundColor = "red";
      secondsLeft -= 5;
      timer.textContent = "Timer: " + secondsLeft;
    }
  }
}

//PURPOSE: starts the game and starts the timer
//PARAMETERS: a click on the 'start button'
//RETURNS: NONE
startButton.addEventListener("click", function(){
    score = 0;
    clearSpecific(opening);
    mainH1.style.margin = "10% 0% 0% 0%";
    setTime();
});

//generic event listener for generated questions, passes to answer validation
questionsDiv.addEventListener("click", answerValidation, false);


//PURPOSE: allows user to submit initials and score to the list to be displayed on the high score screen
//PARAMETERS: a click on the 'submit' button
//RETURNS: NONE
submitButton.addEventListener("click", function(event){
    event.preventDefault();
    highScoreList.push([initialsInput.value, score])
    initialsInput.value="";
    var savedHighScoreList = JSON.stringify(highScoreList);
    localStorage.setItem("savedHighScoreList", savedHighScoreList);
    console.log(savedHighScoreList);
    console.log(highScoreList);
    window.location.reload();
});
//PURPOSE: displays all currently saved high scores to the user and allows them to clear said scores if they wish
//PARAMETERS: a click on the 'high score' section
//RETURNS: NONE
highscore.addEventListener("click", function(){
    //Clears other aspects of the page that should not show up while showcasing the scores
    clearSpecific(mainP);
    clearSpecific(timer);
    clearSpecific(highscore);
    clearSpecific(startButton);

    //shows hidden clear button
    unclearSpecific(clearButton);
    unclearSpecific(returnButton);

    //Changes the text value to better represent what the page is displaying
    mainH1.textContent= "High Scores:"

    //iterates through high score function, creating and adding each string to a list
    var i = 1;
    var highScoreUl = document.createElement("ul");
    highScoreDiv.appendChild(highScoreUl);
    //Sorts values based on their scores rather than on their names
    highScoreList.sort((a, b) => b[1] - a[1]);
    highScoreList.forEach(function(score){
      var listValue = i + ".    " + score[0] + ' - ' + score[1];
      console.log(listValue);
      var listItem = document.createElement("li")
      listItem.textContent = listValue;
      highScoreUl.appendChild(listItem);
      i++;
    });
    
});

//PURPOSE: clears all saved scores and refreshes the page
//PARAMETERS: a click on the 'Clear Scores' button
//RETURNS: NONE
clearButton.addEventListener("click", function(){
    localStorage.clear();
    window.location.reload();
});

//PURPOSE: takes user back to beginning of quiz by refreshing the page
//PARAMETERS: a click on the 'return' button
//RETURNS: NONE
returnButton.addEventListener("click", function(){
  window.location.reload();
});

