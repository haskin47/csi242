

var blockSize = 25;
var rows = 21;
var cols = 21;
var board;
var context;


var snakeX = blockSize * 5;
var snakeY = blockSize * 5;
var moveX = 0;
var moveY = 0;
var snakeBody = [];

var foodX;
var foodY; 

var gameover = false;

window.onload = function() {
    gameboard = document.getElementById('game-board');
    gameboard.height = rows * blockSize;
    gameboard.width = cols * blockSize;
    
    context = gameboard.getContext("2d"); 

    Spawn();
    document.addEventListener("keydown", function onPress(press){Movement(press);});

    setInterval(Draw, 1000/10);

}

function Draw() {
    if(gameover == true){ 
        //  Game over screen?    
        return; 
    }

    context.fillStyle = "brown";
    context.fillRect(0, 0, gameboard.width, gameboard.height);

    context.fillStyle = "yellow";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if(snakeX == foodX && snakeY == foodY){
        console.log("EAT MY CHILD");
        snakeBody.push([foodX, foodY]);
        Spawn();
    }

    for (let i = snakeBody.length-1; i > 0; i--){
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length) snakeBody[0] = [snakeX, snakeY];


    context.fillStyle = "lime";
    snakeX += moveX * blockSize;
    snakeY += moveY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    for(let i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //  GAME OVER
    if(snakeX < 0 || snakeX > cols * blockSize || snakeY < 0 || snakeY > rows*blockSize){
        gameover = true;
        //console.log("I'm here");

        alert("GAME OVER");

    }

    for(let i = 0; i < snakeBody.length; i++){
        
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameover = true;
            console.log("I'm here");
            alert("GAME OVER");
        }
    }


}

function Movement(n){
    if (n.key == "ArrowUp" && moveY != 1) {
        moveX = 0;
        moveY = -1;
    }
    else if (n.key == "ArrowDown" && moveY != -1) {
        moveX = 0;
        moveY = 1;
    }
    else if (n.key == "ArrowLeft" && moveX != 1) {
        moveX = -1;
        moveY = 0;
    }
    else if (n.key == "ArrowRight" && moveX != -1) {
        moveX = 1;
        moveY = 0;
    }
}


function Spawn() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}