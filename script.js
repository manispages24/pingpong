var canvas;
var context;
var ballX = 50;
var ballY = 100;
var ballSpeedX = 10;
var ballSpeedY = 4;
var ballWidth = 10;
var paddle1Y = 100;
var paddle1X = 0;
var paddle2Y = 100;
var paddle2X;
var playerOneScore = 0;
var playerTwoScore = 0;
var gameOver = false;
var win = false;
const paddleWidth = 10;
const paddleHeight = 100;
const winingScore = 10;


window.onload = () => {
  canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');
  // set X position of paddle2
  paddle2X = canvas.width - paddleWidth;
  // render the objects over set interval of time
  setInterval(() => {
    drawEverything();
    moveBall();
  }, 1000/30);

  // set the mouse position when the mouse is moved
  document.addEventListener('mousemove', function(event){
    var mousePosition = calculateMousePosition(event);
    paddle1Y = mousePosition.y - paddleHeight/2;
  });

  // start game again
  document.addEventListener('mousedown', () => {
    if (gameOver) {
      gameOver = false;
    }
  })
}
// draw objects
function drawEverything() {
  // set canvas background
  createRectangle(0, 0, canvas.width, canvas.height, 'rgb(40, 40, 40)');
  // set white paddle1Y
  createRectangle(paddle1X, paddle1Y, paddleWidth, paddleHeight, 'rgb(0,255,0)');
  // set white paddle2Y
  createRectangle(paddle2X, paddle2Y, paddleWidth, paddleHeight, 'rgb(0,255,0)');
  // set red ball
  createCircle(ballX, ballY, ballWidth, 'rgb(128,0,128)');
  // set score text Player 1
  drawText("Player 1", 100, 100, "20px sans-serif", playerOneScore);
  // set score text Player 2
  drawText("Computer", 600, 100, "20px sans-serif", playerTwoScore);

  if (gameOver) {
    if (win) {
      displayMessage("YOU WIN");
    } else {
      displayMessage("GAME OVER");
    }
  }

  for (var i = 0; i < canvas.height; i += 40) {
    createRectangle(canvas.width/2 - 1, i, 2, 20, 'rgb(0,255,0)');
  }
}

// move ball
function moveBall() {
  if (gameOver) {
    return;
  }
  chaseTheBall();
  ballX += ballSpeedX;
  ballY += ballSpeedY;
  // right side
  if(ballX > canvas.width - (ballWidth*2 + paddleWidth)) {
    if (ballY > paddle2Y && ballY < paddle2Y + paddleHeight ) {
      ballSpeedX = -ballSpeedX;
      // increase speed based on position hit
      var newSpeed = ballY - (paddle2Y + paddleHeight/2);
      ballSpeedY = newSpeed * 0.35;
    } else {
      playerOneScore += 1;
      resetBall(playerOneScore);
    }
  }
  // left side
  if(ballX < ballWidth*2 + paddleWidth){
    if (ballY > paddle1Y && ballY < paddle1Y + paddleHeight ) {
      ballSpeedX = -ballSpeedX;
      // increase speed based on position hit
      var newSpeed = ballY - (paddle1Y + paddleHeight/2);
      ballSpeedY = newSpeed * 0.35;
    } else {
      playerTwoScore += 1;
      resetBall(playerTwoScore);
    }
  }
  if(ballY > canvas.height - ballWidth) {
    ballSpeedY = -ballSpeedY;
  }
  if(ballY < ballWidth){
    ballSpeedY = -ballSpeedY;
  }
}

// create rectangles
function createRectangle(posX,posY,width,height,color){
  context.fillStyle = color;
  context.fillRect(posX, posY, width, height);
}

// create circles
function createCircle(posX, posY, radius, color) {
  context.fillStyle = color;
  context.beginPath();
  context.arc(posX, posY, radius, 0, Math.PI * 2, true);
  context.fill();
}

// calculate mouse position inside the canvas
function calculateMousePosition(event){
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  var mouseX = event.clientX - rect.left - root.scrollLeft;
  var mouseY = event.clientY - rect.top - root.scrollTop;
  return {
    x : mouseX,
    y : mouseY
  }
}

// calculate paddle2Y position for AI
function chaseTheBall(){
  var paddle2YCenter = paddle2Y + paddleHeight/2;
  if(paddle2YCenter < ballY - 35) {
    paddle2Y += 10;
  } else if(paddle2YCenter > ballY + 35) {
    paddle2Y -= 10;
  }
}

// reset ball position
function resetBall(player){
  if (player >= winingScore) {
    if (player > playerTwoScore) {
      win = true;
    }
    playerOneScore = 0;
    playerTwoScore = 0;
    gameOver = true;
  }
  ballSpeedX = -ballSpeedX
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
}

// draw text
function drawText(name, x, y, font, counter){
  context.font = font;
  context.fillText(name, x, y);
  context.fillText(counter, x, y + 20);
}

// display end of game message
function displayMessage(message){
  context.font = "50px sans-serif";
  context.fillText(message, 250, 250);
  context.font = "25px sans-serif";
  context.fillText("Click to continue", 250, 350)
}