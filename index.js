var gamePattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

var level = 0;

var start = false;

$(document).keypress(function() {
    if (!start) {
        $("#level-title").text("Level " + level);
        nextSequence();
        start = true;
    }
});



$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkanswer(userClickedPattern.length-1);

});

function checkanswer(currentLevel){

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");

        if (gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else {
        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        starOver();
    
    }

}

function nextSequence(){

    userClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level);    

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColour);

}

function playSound(name){

    var audio = new Audio("sounds/"+ name +".mp3");
    audio.play();   

}

function animatePress(currentColour){

    $("#" + currentColour).addClass("pressed");

    setTimeout(function (){
        $("#" + currentColour).removeClass("pressed");
    }, 100)
}

function starOver(){

    level = 0;

    gamePattern = [];

    start = false;

}



