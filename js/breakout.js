ruleBtb = document.getElementById('rules-btn')
rules = document.getElementById('rules')
closeBtn = document.getElementById('close-btn')


ctx = canvas_getContext('2d')


score = 0


brickRowCount = 9
brickColumnCount = 5


// Create ball properties
ball = {
    x: canvas.width / 2,
    y: canvas.height /2,
    size: 10,
    speed: 4,
    dx: 4,
    dy: -4,
}


// Create Paddle properties
paddle = {
    x: canvas.wedith / 2 - 40,
    y: canvas.height - 20,
    w: 80,
    h: 10,
    speed: 8,
    dx: 0,
}


//Create brick properties
brickInfo = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true,
}


// Draw ball on canvas
function drawBall() {
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2)
    ctx.fillStyle = '#009599'
    ctx.fill()
    ctx.closePath()
}


// Draw paddle on canvas
function drawPaddle() {
    ctx.beginPath()
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h)
    ctx.fillStyle = '#009599'
    ctx.fill()
    ctx.closePath()
}




// Draw score on canvas
function drawScore() {
    ctx.font = '20px Arial'
    ctx.fillText('Score: ${score}, canvas.width-100, 30')
}


//Create Bricks


// Draw everything
function draw(){
    drawPaddle()
    drawBall()
    drawScore()
}


draw()


// Rules open and close event handles
rulesBtn.addEventListener('click', () => {
    rules.classList.add('show')
})


