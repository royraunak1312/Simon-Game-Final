var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

$(document).keydown(function(){
  if (!started){
    $("h1").text("Level "+level);
    nextSequence();
    started = true;
  }
});

function nextSequence () {
  userClickedPattern = [];
  level++;
  $("h1").text("Level "+level);
  var randomNumber = Math.floor(4 * Math.random());
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

$(".btn").click(function(){
  if (started){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
  }
});

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    if (currentLevel == gamePattern.length-1){
      setTimeout(nextSequence , 1000);
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}

function playSound(name){
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColor) {
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
      $("#"+currentColor).removeClass("pressed");
    }, 100);
}
