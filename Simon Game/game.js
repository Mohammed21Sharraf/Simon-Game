var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];
var level = 0;

// keeping track of the game has started or not
var started = false;
// Starting the game

$(document).keypress(function() {

  if (!started) {
    $("h1").html("Level " + level);
    nextSequence();
    started = true;
  };
});

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  // playing sound when the user clicks
  playSound(userChosenColour);

  // animating when user clicks the buttons
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});
// checking the answer against user's click
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function(){
          nextSequence();
      }, 1000);
    }
    console.log("Success");
  } else { //Game Over
    console.log("Wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);
    $("h1").html("Game Over, Press Any Key to Restart")

    // restarting the game
    startOver();
  }
}

function nextSequence() {

   // resetting the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  // increasing the level of game
  level += 1;
  $("h1").html("Level " + level);

  var randomNumber = Math.random();
  randomNumber = randomNumber * 4;
  randomNumber = Math.floor(randomNumber);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // animation for buttons selection
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

// Playing Sound in next Sequence
    playSound(randomChosenColour);


}

// Playing sound
function playSound(name) {
  var audio = new Audio("Simon Game Challenge Starting Files/sounds/" + name + ".mp3");
  audio.play();
};

// creating animation for user button clicks
function animatePress(currentColour) {
  $("#" + currentColour ).addClass("pressed");
  setTimeout(function(){
      $("#" + currentColour ).removeClass("pressed");
  }, 100);

};

// Restarting the game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
