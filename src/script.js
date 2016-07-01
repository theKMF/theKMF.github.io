var theSequence = [];
var theOptions = ["Red","Green","Blue","Awesome", "Orange", "Pink","Doctor","Tango", "Zebra","Zoo","Win", "O.O", "Klaatu", "Barada", "Flier", "Epic", "Message", "Nikto"];
var codeArray = [];
var guessIndex = 0;
var codeLength = 0;
var numberOfAlternatives = 0;
var debugMode = true;
var lastBtn;
var faultyChoice;
var supportsVibrate = false;

DomReady.ready(function () {
    supportsVibrate = "vibrate" in navigator;
    setUpNewGame(4,6);

});

//this function takes two variables. One to determine the length of the code and one to determine how many
//different options to choose from there will be
function setUpNewGame(howLong,howManyAlternatives){
    codeLength = howLong;
    numberOfAlternatives = howManyAlternatives;
    resetCode();
    generateInput(numberOfAlternatives);
    generateSequence(codeLength);
}

function debugOut(str){
    if(debugMode){
        console.log(str);
    }
}

function beep(item){
    lastBtn = item;
    enterCode(item['id']);
}

//set up the inputbuttons with zero correct guesses
function generateInput(howMany){
    var i=0;
    var codeSnippet = "";
    for(i; i<howMany; i++){
        codeSnippet += "<div id='" + theOptions[i] + "' class='inputBtn' onclick='beep(this)'>" + theOptions[i] + "</div> \n";
    }
    document.getElementById("inputBtns").innerHTML = codeSnippet;
}

//turn off active buttons
function resetInputButtons(){
    var i=0;
    var codeSnippet = "";
    for(i; i<numberOfAlternatives; i++){
        var tmpTrgt = theOptions[i];
        document.getElementById(tmpTrgt).className = 'inputBtn';
    }
}


//generates the hidden code
function generateSequence(howMany){
    var tmpStr = "";
    var iterator = 0;
    var clone = theOptions.slice(0,numberOfAlternatives);
    var newArray = [];    
    
    for(iterator; iterator<howMany; iterator++){ 
        var tmpPos = getRandomInt(clone.length);
        var tmpVal = clone.splice(tmpPos, 1);
        newArray.push(tmpVal);
    }
    codeArray = newArray.slice(0);
}

function enterCode(whatLabel){
    if(whatLabel == codeArray[guessIndex]){
        correct();
    }else{
        incorrect();
    }
}

//Removes the error flash style from a btton so that it can be pressed twice and give eroor flash
function removeErrorStyle(){
    faultyChoice.className = 'inputBtn';
}

function correct(){
    var tmpStr = "";
    var i = 0;
    guessIndex++;
    for(; i <guessIndex; i++){
        tmpStr += "*";
    }
    for(;i < codeLength; i++){
        tmpStr += "-";
    }
    lastBtn.className += ' selected';
    document.getElementById('code').innerHTML = tmpStr;
}

function incorrect(){
    if(supportsVibrate){
        navigator.vibrate(200);
    }
    
    resetCode();
    resetInputButtons();
    lastBtn.className += ' faultyChoice';
    faultyChoice = lastBtn;
    setTimeout(removeErrorStyle, 450);
}

//The code is set to "----" and the guessIndex to 0
function resetCode(){
    tmpStr = "";
    guessIndex = 0;
    for(var i=0;i<codeLength;i++){
        tmpStr += "-";
    }
    document.getElementById('code').innerHTML = tmpStr;
}

function randomGame(){
    var randomCodeLength = 4;
    var randomNumOfButtons = 3;
    randomCodeLength += getRandomInt(5);
    randomNumOfButtons += getRandomInt(4);
    setUpNewGame(randomCodeLength,randomNumOfButtons*3);
}


function testRandomInt(howMany, theMax){
    for(var i = 0; i < howMany; i++){
         document.getElementById('code').innerHTML += getRandomInt(theMax) + " ";
    }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}