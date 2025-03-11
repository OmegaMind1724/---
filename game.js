const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{x:10, y:10}];
let food = {x:15, y:15};
let dx = 1;
let dy = 0;
let score = 0;
let gameSpeed = 100;
let gameLoop;

function resetGame() {
  snake = [{x:10, y:10}];
  food = generateFood();
  dx = 1;
  dy = 0;
  score = 0;
  document.getElementById('score').textContent = score;
  if(gameLoop) clearInterval(gameLoop);
  gameLoop = setInterval(draw, gameSpeed);
}

function draw() {
  // 移动蛇头
  const head = {x: snake[0].x + dx, y: snake[0].y + dy};

  // 碰撞检测
  if(head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount || 
    snake.some(segment => segment.x === head.x && segment.y === head.y)) {
    alert('游戏结束！得分：' + score);
    resetGame();
    return;
  }

  snake.unshift(head);

  // 吃食物检测
  if(head.x === food.x && head.y === food.y) {
    score += 10;
    document.getElementById('score').textContent = score;
    food = generateFood();
    gameSpeed = Math.max(50, gameSpeed - 2);
    clearInterval(gameLoop);
    gameLoop = setInterval(draw, gameSpeed);
  } else {
    snake.pop();
  }

  // 清空画布
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 绘制蛇
  ctx.fillStyle = '#4CAF50';
  snake.forEach(segment => {
    ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize-2, gridSize-2);
  });

  // 绘制食物
  ctx.fillStyle = '#FF0000';
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize-2, gridSize-2);
}

function generateFood() {
  let newFood;
  do {
    newFood = {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount)
    };
  } while(snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
  return newFood;
}

// 键盘控制
document.addEventListener('keydown', (e) => {
  switch(e.key) {
    case 'ArrowUp':
      if(dy === 0) { dx = 0; dy = -1; }
      break;
    case 'ArrowDown':
      if(dy === 0) { dx = 0; dy = 1; }
      break;
    case 'ArrowLeft':
      if(dx === 0) { dx = -1; dy = 0; }
      break;
    case 'ArrowRight':
      if(dx === 0) { dx = 1; dy = 0; }
      break;
  }
});

// 开始游戏
resetGame();