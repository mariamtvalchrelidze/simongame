//Globals
var level = 0;
var chosenPattern = [];
var sequence = [];
var colors = ["green", "red", "yellow", "blue"];
var count = 0;
var success = true;
var randomNumber =0;
var length = 0;

//Next sequence
function nextSequence() {
  randomNumber = Math.floor(Math.random() * 4);
  level++;
  $("h1").text("level " + level);
  sequence.push(randomNumber);
  length = sequence.length;
  press(colors[sequence[length - 1]]);
  chosenPattern = [];
  count = 0;
}

//answer checker
function checkAnswer(count) {
  if (chosenPattern[count] !== colors[sequence[count]]) {
    success = false;
  }
  return success;
}

//color press
function press(name) {
  playSound(name);
  $("." + name).addClass("pressed");
  setTimeout(function() {
    $("." + name).removeClass("pressed");
  }, 100);
}
//play sound
function playSound(name) {
  sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}
//game over
function gameOver(){
  playSound("wrong");
  var currentBackground = $("body").css("background");
  $("body").css("background-color", "red");
  setTimeout(function() {
    $("body").css("background", currentBackground);
  }, 100);
  $("h1").text("you lost");
}
//main
$("body").one("keypress", function() { //if any button is clicked, game will start
  nextSequence();
  $(".btn").click(function(event) {//checks if any box was clicked
    count++;  //counts button clicks
    check = true;
    chosenColor = $(event.target).attr("class").split(" ")[1];
    press(chosenColor);
    chosenPattern.push(chosenColor);
    for (var i = 0; i < chosenPattern.length; i++) {
      if (checkAnswer(i)) { //checks each chosen color and compares to the actual pattern
        continue;
      } else {
        check = false;
        gameOver();
        break;
      }
    }
    if (check) {
      if (level === count) {   //if all the chosen colors match sequence and the number of colors chosen equals to level, the new box will appear
        setTimeout(function() {
          nextSequence();
        }, 1000);
      }
    }
  });
});
