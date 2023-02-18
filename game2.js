var buttonColors = ["green","red","yellow", "blue"]
var boxGen = [];
var playGen = [];

// var 100 = 100;
// var 100 = 100;

var start = false;
var level = 1;
var grybButtons = document.querySelectorAll(".btn");

// Initial keypress starts game, then disables keypress
$(document).on("keydown", () => {
    $(document).off("keydown")   
    if (!start){
        start = true;
        generate();
    }}
);

// Title & Information about current stage
function titles(msgVal){    
    switch (msgVal) {
        case 1:
            $("h1").text("Press any key to Start");
            break;
        case 2:
            $("h1").html("Level: "+level+"<br/>Wait for pattern...");
            break;
        case 3:
            $("h1").html("Level: "+level+"<br/>Your turn...");
            break;
        case 4:
            $("h1").html("WRONG!!");
            break;
        case 5:
            $("h1").text("Game Over (´･_･`)");
            break;
        case 6:
            $("h1").text("Restart? Y / N");
            break;
        case 7:
            $("h1").text("Goodbye... (┛°益°) ┛彡┻━┻ ");
            break;
        default:
            break;
    }
}

// Generates a sequence of colors
async function generate(){   
    playGen = [];
    titles(2);
    let newbox = Math.floor(Math.random()*4);
    boxGen.push(buttonColors[newbox]);

    // Animate full sequence
    for(let i = 0; i<level; i++){
        var activeButton = (boxGen[i]);        
        await pause (500);
        animate(activeButton);
    }
    await pause(50);
    titles(3);   
}

// Animates the sequence generated and pressed
async function animate(activeButton) {
    if(activeButton != "wrong"){
        $("#" + activeButton).addClass("pressed");
        makeSound(activeButton);
        await pause(50);
        $("#" + activeButton).removeClass("pressed");
    }else{
        $("body").addClass("game-over");
        titles(5);
        await pause(1500);
        titles(6);
        await pause(1500);
    }
}

// Makes sounds
function makeSound(activeButton){
    var audio = new Audio("sounds/"+activeButton+".mp3")
    audio.play();
}

//Check user's clicks
$(grybButtons).click(function () {
    if(start){
        var clicked = $(this).attr("id");
        animate(clicked);
        playGen.push(this.id);
        checkAnswer(playGen.length-1);
    }
})

async function checkAnswer(currentClick){
    if(playGen[currentClick] === boxGen[currentClick] ){    
        if(playGen.length === boxGen.length){
            level++;
            generate();
        }        
    }
    else{
        start = 0;
        animate("wrong");
        makeSound("wrong");        
        restart();
    }
}

function restart(){
    document.addEventListener("keydown", (event)=> {
        if(event.code === "KeyY"){
            start = 1;
            $("body").removeClass("game-over");            
            boxGen = [];
            level = 1;
            generate();
        }else{
            titles(7);
            $(document).off("keydown")
        }
        
    })
}

// Pauses execution
function pause(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}