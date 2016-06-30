var theSequence = [];
var theOptions = ["Red","Green","Blue","Awesome", "Orange", "Pink","Doctor","Tango", "Zebra","Zoo","Win", "O.O", "Klaatu", "Barada", "Flier", "Epic", "Message", "Nikto"];
var codeArray = [];
var guessIndex = 0;
var codeLength = 0;
var numberOfAlternatives = 0;
var debugMode = true;
var lastBtn;

DomReady.ready(function () {
    setUpNewGame(6,18);

});

//this function takes two variables. One to determine the length of the code and one to determine how many
//different options to choose from there will be
function setUpNewGame(howLong,howManyAlternatives){
    codeLength = howLong;
    numberOfAlternatives = howManyAlternatives;
    incorrect();
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

function generateInput(howMany){
    var i=0;
    var codeSnippet = "";
    for(i; i<howMany; i++){
        codeSnippet += "<div id='" + theOptions[i] + "' class='inputBtn' onclick='beep(this)'>" + theOptions[i] + "</div> \n";
    }
    document.getElementById("inputBtns").innerHTML = codeSnippet;
}

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
    debugOut(codeArray);
}

function enterCode(whatColour){
    if(whatColour == codeArray[guessIndex]){
        correct();
    }else{
        incorrect();
    }
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
    document.getElementById('demo').innerHTML = tmpStr;
}

function incorrect(){
    tmpStr = "";
    guessIndex = 0;
    for(var i=0;i<codeLength;i++){
        tmpStr += "-";
    }
     generateInput(numberOfAlternatives);
     document.getElementById('demo').innerHTML = tmpStr;
}

function myFunction() {
    setUpNewGame(codeLength,numberOfAlternatives);
}

function testRandomInt(howMany, theMax){
    for(var i = 0; i < howMany; i++){
         document.getElementById("demo").innerHTML += getRandomInt(theMax) + " ";
    }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}