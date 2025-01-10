
//board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

//snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

//ability to change direction

var directionChangeTrueFalse = true;
var lastPressedKey;
var e;

//food
var foodX;
var foodY;
window.onload = function () {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); ///used for drawing on the board


    placeFood();

    document.addEventListener("keydown", saveKeyPress);
    setInterval(update, 1000 / 100);

}

function update() {
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "lime";
    snakeX += velocityX;
    snakeY += velocityY;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);
    conditionsMet();


}
//changing direction based on the keypress input
function changeDirection(lastPressedKey) {
    if (lastPressedKey == "ArrowUp" && directionChangeTrueFalse == true) {
        velocityX = 0;
        velocityY = -1;
        lastPressedKey = null;
        
    }
    else if (lastPressedKey == "ArrowDown" && directionChangeTrueFalse == true) {
        velocityX = 0;
        velocityY = 1;
        lastPressedKey = null;
        
    }
    else if (lastPressedKey == "ArrowRight" && directionChangeTrueFalse == true) {
        velocityX = 1;
        velocityY = 0;
        lastPressedKey = null;
        
    }
    else if (lastPressedKey == "ArrowLeft" && directionChangeTrueFalse == true) {
        velocityX = -1;
        velocityY = 0;
        lastPressedKey = null;
    }
}
//placing food within the canvas
function placeFood() {
    //(0-1) *cols -> (0-19.99999999) -> (0-19) *25
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}
//checking if condition is met (the snake is on the grid)
function conditionsMet() {
        if  (snakeX % blockSize == 0 && snakeY % blockSize == 0) {
            directionChangeTrueFalse = true;
            changeDirection(lastPressedKey);
            
        }
        else {
            directionChangeTrueFalse = false;
            
            //next time the condition is true, then execute command
        }

}
//saving key presss
function saveKeyPress(event) {
    lastPressedKey = event.key
    changeDirection(lastPressedKey);
}