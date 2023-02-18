var buttonColors = ["green","red","yellow", "blue"]
var boxGen = [];
var playGen = [];

var genDelay = 500;
var aniDelay = 50;

var start = 0;
var level = 1;
var grybButtons = document.querySelectorAll(".btn");

// Initial keypress starts game, then disables keypress
$(document).on("keydown", () => {
    $(document).off("keydown")
    generate();
    }
);

// Title & Information about current stage
async function titles(msgVal, level){    
    switch (msgVal) {
        case 1:
            $("h1").text("Press any key to Start");
            break;
        case 2:
            $("h1").html("Level: "+level+"<br/>Wait for pattern...");
            await sleep(2000);
        break;
        case 3:
            $("h1").html("Level: "+level+"<br/>Your turn...");
        break;
        case 4:
            $("h1").html("WRONG!!");
        break;
        case 5:
            $("h1").text("Game Over (┛°益°) ┛彡┻━┻ ");
        break;
        case 6:
            $("h1").text("Restart? Y / N");
        break;
        default:
            break;
    }
}

// Generates a sequence of colors
async function generate(){
    playGen = [];
    titles(2,level);
    let newbox = Math.floor(Math.random()*4);
    boxGen.push(buttonColors[newbox]);

    // Animate full sequence
    for(let i = 0; i<level; i++){
        var activeButton = document.querySelector("."+boxGen[i]);
        
        await sleep (900);
        animate(activeButton);
    }

    await sleep(1000);
    titles(3, level);
    // await sleep(100);
}

// Animates the sequence generated and pressed
async function animate(activeButton) {
    if(activeButton != "wrong"){
        activeButton.classList.add("pressed");
        makeSound(activeButton);
        await sleep(aniDelay);
        activeButton.classList.remove("pressed");
    }else{
        document.body.className="game-over";
        titles(5,1);
        await sleep(2500);
        titles(6, 0);
    }
}

// Makes sound for every box -- wrong not implemented
function makeSound(activeButton){
    if(activeButton != "wrong"){
        color = activeButton.id;
    }else{
        color = activeButton
    }
    var audio = new Audio("sounds/"+color+".mp3")
    audio.play();
}



//Check user's clicks
$(grybButtons).click(function () {
    var clicked = document.querySelector("."+this.id);
    animate(clicked);
    playGen.push(this.id);   
    checkAnswer(playGen.length-1);
})

async function checkAnswer(currentClick){
    if(playGen[currentClick] === boxGen[currentClick] ){    
        if(playGen.length === boxGen.length){
            level++;
            generate();
        }        
    }
    else{
        makeSound("wrong");
        animate("wrong");
        start = 1
    }
}

// Pauses execution
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
