var level = 0;
var chosenPattern = [];
var sequence = [];
var colors = ["green", "red", "yellow", "blue"];
var count = 0;

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  level++;
  $("h1").text("level " + level);
  sequence.push(randomNumber);
  var length = sequence.length;
  sound = new Audio("sounds/" + colors[sequence[length - 1]] + ".mp3");
  sound.play();
  $("." + colors[sequence[length - 1]]).addClass("pressed");
  setTimeout(function() {
    $("." + colors[sequence[length - 1]]).removeClass("pressed");
  }, 100);
  chosenPattern = [];
  count = 0;
}
function checkAnswer(count) {
  var success = true;
  if (chosenPattern[count] !== colors[sequence[count]]) {
    success = false;
  }
  return success;
}

$("body").one("keypress", function() {
  nextSequence();
  $(".btn").click(function(event) {
    count++;
    check = true;
    clickedColor = $(event.target).attr("class").split(" ")[1];
    sound = new Audio("sounds/" + clickedColor + ".mp3");
    sound.play();
    $("." + clickedColor).addClass("pressed");
    setTimeout(function() {
      $("." + clickedColor).removeClass("pressed");
    }, 100);
    chosenPattern.push(clickedColor);
    for (var i = 0; i < chosenPattern.length; i++) {
      if (checkAnswer(i)) {
        continue;
      } else {
        check = false;
        sound = new Audio("sounds/wrong.mp3");
        sound.play();
        var currentBackground = $("body").css("background");
        $("body").css("background-color", "red");
        setTimeout(function() {
          $("body").css("background", currentBackground);
        }, 100);
        $("h1").text("you lost");
        break;
      }
    }
    if (check) {
      if (level === count) {
        setTimeout(function() {
          nextSequence();
        }, 1000);
      }
    }
  });
});
