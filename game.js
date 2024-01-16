window.onload = function() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const backgroundMusic = document.getElementById('backgroundMusic');
  
    // Sheep object
    const sheep = {
      x: 50,
      y: canvas.height / 2,
      width: 50,
      height: 50,
      image: new Image(),
    };
  
    sheep.image.src = 'images/sheep.png'; // Replace 'sheep.png' with the path to your sheep image
  
    // Wolf object
    const wolf = {
      x: 0,
      y: canvas.height / 2,
      width: 50,
      height: 50,
      image: new Image(),
      speed: 2,
    };
  
    wolf.image.src = 'images/wolf.png'; // Replace 'wolf.png' with the path to your wolf image
  
    // Wall object
    const wall = {
      x: canvas.width,
      y: 0,
      width: 20,
      height: canvas.height,
      color: 'gray',
      gap: 150,
      spawned: false,
    };

  
    let score = 0;
    let gameRunning = false;
  
    // Move the sheep
    function moveSheep() {
      sheep.x += 1;
      score += 1;
      checkScore();
    }
  
    // Move the wolf towards the sheep
    function moveWolf() {
      if (sheep.x < wolf.x) {
        wolf.x -= wolf.speed;
      } else {
        wolf.x += wolf.speed;
      }
    }
  
    // Check if the sheep hits the wall
    function checkCollision() {
      if (
        sheep.x + sheep.width >= wall.x &&
        sheep.x <= wall.x + wall.width &&
        (sheep.y <= wall.y || sheep.y + sheep.height >= wall.y + wall.gap)
      ) {
        gameRunning = false;
      }
    }
    
    function playBackgroundMusic() {
      backgroundMusic.src = 'sound/bah.mp3'; // Replace 'bah.mp3' with the path to your MP3 file
      backgroundMusic.play();
    }
  
    function checkScore() {
      if (score >= 65 && backgroundMusic.paused) {
        playBackgroundMusic();
      }
    }
  
    // Draw the sheep character
    function drawSheep() {
      ctx.drawImage(sheep.image, sheep.x, sheep.y, sheep.width, sheep.height);
    }
  
    // Draw the wolf character
    function drawWolf() {
      ctx.drawImage(wolf.image, wolf.x, wolf.y, wolf.width, wolf.height);
    }
  
    // Draw the wall
    function drawWall() {
      ctx.fillStyle = wall.color;
      ctx.fillRect(wall.x, wall.y, wall.width, wall.y + wall.gap);
    }
  
    // Draw the score
    function drawScore() {
        ctx.font = '20px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText(`امتیاز: ${score}`, 10, 30);
      }
    
      // Clear the canvas
      function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    
      // Game loop
      function gameLoop() {
        if (gameRunning) {
          clearCanvas();
          moveSheep();
          moveWolf();
          checkCollision();
          drawWall();
          drawSheep();
          drawWolf();
          drawScore();
          requestAnimationFrame(gameLoop);
        }
      }
    
      // Start the game
      function startGame() {
        gameRunning = true;
        score = 0;
        wall.spawned = false;
        sheep.x = 50;
        wolf.x = 0;
        backgroundMusic.pause();
        clearCanvas();
        gameLoop();
      }
    
      // Event listener for the start button
      const startButton = document.getElementById('startButton');
      startButton.addEventListener('click', startGame);
    };
     
