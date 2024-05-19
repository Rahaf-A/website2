const startBtn = document.getElementById('start-btn');
const startScreen = document.getElementById('start-screen');
const rulesBtn = document.getElementById('rules-btn');
const rules = document.getElementById('rules');
const closeBtn = document.getElementById('close-btn');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let isGameRunning = false;

let score = 0;
const brickRowCount = 9;
const brickColumnCount = 5;

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 4,
    dx: 4,
    dy: -4,
};

const paddle = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 20,
    w: 80,
    h: 10,
    speed: 8,
    dx: 0,
};

const brickInfo = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true,
};

let bricks = [];
function createBricks() {
    bricks = [];
    for (let i = 0; i < brickRowCount; i++) {
        bricks[i] = [];
        for (let j = 0; j < brickColumnCount; j++) {
            const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
            const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
            bricks[i][j] = { x, y, ...brickInfo };
        }
    }
}
createBricks();

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    ctx.fillStyle = '#FF7D7D';
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
    ctx.fillStyle = '#DC2020';
    ctx.fill();
    ctx.closePath();
}

function drawScore() {
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

function drawBricks() {
    bricks.forEach(column => {
        column.forEach(brick => {
            ctx.beginPath();
            ctx.rect(brick.x, brick.y, brick.w, brick.h);
            ctx.fillStyle = brick.visible ? '#FF1515' : 'transparent';
            ctx.fill();
            ctx.closePath();
        });
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle();
    drawBall();
    drawScore();
    drawBricks();
}

function movePaddle() {
    paddle.x += paddle.dx;
    if (paddle.x < 0) {
        paddle.x = 0;
    }
    if (paddle.x + paddle.w > canvas.width) {
        paddle.x = canvas.width - paddle.w;
    }
}

function keyDown(e) {
    if (e.key === 'ArrowRight' || e.key === 'Right') {
        paddle.dx = paddle.speed;
    }
    if (e.key === 'ArrowLeft' || e.key === 'Left') {
        paddle.dx = -paddle.speed;
    }
}

function keyUp(e) {
    if (e.key === 'ArrowRight' || e.key === 'Right' || e.key === 'ArrowLeft' || e.key === 'Left') {
        paddle.dx = 0;
    }
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.y - ball.size < 0) {
        ball.dy *= -1;
    }
    if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
        ball.dx *= -1;
    }
    if (ball.y + ball.size > canvas.height) {
        stopGame();
    }
    if (ball.x - ball.size > paddle.x && ball.x + ball.size < paddle.x + paddle.w && ball.y + ball.size > paddle.y) {
        ball.dy = -ball.speed;
    }

    bricks.forEach(column => {
        column.forEach(brick => {
            if (brick.visible) {
                if (ball.x - ball.size > brick.x && ball.x + ball.size < brick.x + brick.w && ball.y + ball.size > brick.y && ball.y - ball.size < brick.y + brick.h) {
                    ball.dy *= -1;
                    brick.visible = false;
                    increaseScore();
                }
            }
        });
    });
}

function increaseScore() {
    score++;
    if (score === brickRowCount * brickColumnCount) {
        stopGame();
    }
}

function showAllBricks() {
    bricks.forEach(column => {
        column.forEach(brick => {
            brick.visible = true;
        });
    });
}

function resetGame() {
    score = 0;
    showAllBricks();
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = 4;
    ball.dy = -4;
    paddle.x = canvas.width / 2 - paddle.w / 2;
}

function startGame() {
    resetGame();
    startScreen.classList.add('up');
    isGameRunning = true;
    update();
}

function stopGame() {
    isGameRunning = false;
}

function update() {
    if (isGameRunning) {
        moveBall();
        movePaddle();
        draw();
        requestAnimationFrame(update);
    }
}

startBtn.addEventListener('click', startGame);

rulesBtn.addEventListener('click', () => {
    rules.classList.add('show');
});

closeBtn.addEventListener('click', () => {
    rules.classList.remove('show');
});

const themeBtn = document.getElementById('theme-btn');
let isDarkMode = false;

themeBtn.addEventListener('click', toggleTheme);

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    isDarkMode = !isDarkMode;

    if (isDarkMode) {
        document.documentElement.style.setProperty('--background-color', '#901212');
        document.documentElement.style.setProperty('--ball-color', '#aa1f1f');
        document.documentElement.style.setProperty('--paddle-color', '#aa1f1f');
        document.documentElement.style.setProperty('--brick-color', '#aa1f1f');
        document.documentElement.style.setProperty('--rules-background', '#901212');
    } else {
        document.documentElement.style.removeProperty('--background-color');
        document.documentElement.style.removeProperty('--ball-color');
        document.documentElement.style.removeProperty('--paddle-color');
        document.documentElement.style.removeProperty('--brick-color');
        document.documentElement.style.removeProperty('--rules-background');
    }
}

const playAgainBtn = document.getElementById('play-again-btn');

function showPlayAgainButton() {
    playAgainBtn.style.display = 'block';
}

function hidePlayAgainButton() {
    playAgainBtn.style.display = 'none';
}

function startGame() {
    resetGame();
    startScreen.classList.add('up');
    isGameRunning = true;
    hidePlayAgainButton();
    update();
}

function stopGame() {
    isGameRunning = false;
    showPlayAgainButton();
}

playAgainBtn.addEventListener('click', startGame);

startBtn.addEventListener('click', startGame);


draw();

