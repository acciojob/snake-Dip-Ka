//your code here
document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('gameContainer');
    const scoreElement = document.getElementById('score');
    
    let snake = [{ row: 20, col: 1 }];
    let food = getRandomPosition();
    let direction = 'right';
    let score = 0;
    let interval;

    // Render the initial state of the game
    renderGame();

    function renderGame() {
        clearBoard();
        renderFood();
        renderSnake();
    }

    function clearBoard() {
        const pixels = document.querySelectorAll('.food, .snakeBodyPixel');
        pixels.forEach(pixel => pixel.parentNode.removeChild(pixel));
    }

    function renderFood() {
        const foodPixel = document.createElement('div');
        foodPixel.classList.add('food');
        foodPixel.id = `pixel:${food.row}-${food.col}`;
        gameContainer.appendChild(foodPixel);
    }

    function renderSnake() {
        snake.forEach(segment => {
            const snakePixel = document.createElement('div');
            snakePixel.classList.add('snakeBodyPixel');
            snakePixel.id = `pixel:${segment.row}-${segment.col}`;
            gameContainer.appendChild(snakePixel);
        });
    }

    function getRandomPosition() {
        const row = Math.floor(Math.random() * 40);
        const col = Math.floor(Math.random() * 40);
        return { row, col };
    }

    function moveSnake() {
        const head = { ...snake[0] };
        switch (direction) {
            case 'up':
                head.row--;
                break;
            case 'down':
                head.row++;
                break;
            case 'left':
                head.col--;
                break;
            case 'right':
                head.col++;
                break;
        }
        snake.unshift(head);

        if (head.row === food.row && head.col === food.col) {
            score += 10;
            scoreElement.textContent = score;
            food = getRandomPosition();
        } else {
            snake.pop();
        }

        if (isGameOver(head)) {
            clearInterval(interval);
            alert('Game Over! Your score is ' + score);
            window.location.reload();
        }

        renderGame();
    }

    function isGameOver(head) {
        return (
            head.row < 0 ||
            head.col < 0 ||
            head.row >= 40 ||
            head.col >= 40 ||
            snake.slice(1).some(segment => segment.row === head.row && segment.col === head.col)
        );
    }

    document.addEventListener('keydown', event => {
        switch (event.key) {
            case 'ArrowUp':
                if (direction !== 'down') direction = 'up';
                break;
            case 'ArrowDown':
                if (direction !== 'up') direction = 'down';
                break;
            case 'ArrowLeft':
                if (direction !== 'right') direction = 'left';
                break;
            case 'ArrowRight':
                if (direction !== 'left') direction = 'right';
                break;
        }
    });

    interval = setInterval(moveSnake, 100);
});
