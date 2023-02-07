let gameBoard = "";
let snake = "";
let debugDisplay = ""
let debug = false;
let playerScore = 0;

window.addEventListener('load', () => {
    snake = createSnakeHead();
    gameBoard = [
        ['head', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '', '', 'apple', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', 'apple', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],        
    ]
    const game = document.querySelector('.game');
    const board = document.querySelector('.board');
    let score = document.querySelector('.score');
    debugDisplay = document.querySelector('.debug-board');
    let randomValue = 5;

    // Add the movement
    document.addEventListener('keydown', (e) => moveSnake(e, gameBoard, score));

    // Randomize the initial animation transition values
    document.documentElement.style.setProperty('--random-x', getRandomInt(randomValue) + '%');
    document.documentElement.style.setProperty('--random-y', getRandomInt(randomValue) + '%');

    // Reset the animation on end
    game.onanimationend = () => {
        document.documentElement.style.setProperty('--random-x', getRandomInt(randomValue) + '%');
        document.documentElement.style.setProperty('--random-y', getRandomInt(randomValue) + '%');

        let x = document.documentElement.style.getPropertyValue('--random-x');
        let y = document.documentElement.style.getPropertyValue('--random-y');

        while (x == '0%' && y == '0%') {
            if (Math.random()) {
                document.documentElement.style.setProperty('--random-x', getRandomInt(randomValue) + '%');
            } else {
                document.documentElement.style.setProperty('--random-y', getRandomInt(randomValue) + '%');
            }

            x = document.documentElement.style.getPropertyValue('--random-x');
            y = document.documentElement.style.getPropertyValue('--random-y');
        }

        // Change animation speed
        document.documentElement.style.setProperty('--animation-speed', Math.floor(Math.random() * 5) + 1 + 's')

        board.classList.remove('board-animation');
        setTimeout(() => {
            board.classList.add('board-animation');
        },1);   
    }

    setInterval(() => {
        clearBoard(board);
        drawBoard(gameBoard, board);
    }, (1 / 60) * 1000);

    
}, false);
    
/*
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
*/
function getRandomInt(max) {
    let sign = Math.random() > 0.5 ? 1 : -1;
    let value = Math.random() * max;
    return (Math.floor(value) * (Math.random() + 0.25)) * sign;
}

function drawBoard(currentBoardState, board) {
    if (debug) {
        while (debugDisplay.firstChild) {
            debugDisplay.removeChild(debugDisplay.lastChild);
        }
    }
    // Iterate through the board
    for (let i = 0; i < 15; i++) {
        if (debug) {
            let p = document.createElement('p');
            let textNode = JSON.stringify(currentBoardState[i]);
            p.append(textNode);
            debugDisplay.append(p); 
        }
        
        for (let j = 0; j < 15; j++) {
            // Draw each of the elements to the screen
            if (currentBoardState[i][j] == 'head') {
                let snakeHead = snake.head.element;
                
                if (debug) {
                    snakeHead.innerText = "x: " + i + ", y: " + j;
                }

                snakeHead.style.top = (32 * i) + 'px'
                snakeHead.style.left = (32 * j) + 'px'
                board.append(snakeHead);
            } else if (currentBoardState[i][j].includes('body')) {
                let snakeBody = snake.body[currentBoardState[i][j].charAt(4)].element;
                
                if (debug) {
                    snakeBody.innerText = "x: " + i + ", y: " + j;
                }

                snakeBody.style.top = (32 * i) + 'px'
                snakeBody.style.left = (32 * j) + 'px'
                board.append(snakeBody);
            } else if (currentBoardState[i][j] == 'apple') {
                let apple = createApple();
                apple.style.top = (32 * i) + 'px'
                apple.style.left = (32 * j) + 'px'
                board.append(apple);
            }
        }
    }
}

function clearBoard(board) {
    while (board.lastElementChild) {
        board.removeChild(board.lastElementChild);
    }
}

function moveSnake(event, currentBoardState, scoreElement) {
    let nextMovement = {
        x: 0,
        y: 0
    };
    let movementKeyTouched = false;

    // https://stackoverflow.com/a/5597114
    switch(event.key) {
        case 'ArrowLeft': 
            // left
            nextMovement.x = snake.head.x;
            nextMovement.y = snake.head.y - 1;
            snake.head.direction = "left";
            movementKeyTouched = true;
        break;
        case 'ArrowRight': 
            // right
            nextMovement.x = snake.head.x;
            nextMovement.y = snake.head.y + 1;
            snake.head.direction = "right";
            movementKeyTouched = true;
        break;
        case 'ArrowUp': 
            // up
            nextMovement.x = snake.head.x - 1;
            nextMovement.y = snake.head.y;
            snake.head.direction = "up";
            movementKeyTouched = true;
        break;
        case 'ArrowDown': 
            // down
            nextMovement.x = snake.head.x + 1;
            nextMovement.y = snake.head.y;
            snake.head.direction = "down";
            movementKeyTouched = true;
        break;
    }

    if(checkInBounds(nextMovement.x, nextMovement.y) && movementKeyTouched) {
        if (checkIfApple(nextMovement.x, nextMovement.y, currentBoardState)) {
            // Gobbling an apple
            playerScore += 1;
            scoreElement.innerText = "score: " + playerScore;
            playerGrowth();
        }

        // Update the board to clear the head of its previous position
        currentBoardState = updateBoard(snake.head.x, snake.head.y, "", currentBoardState);
        currentBoardState = updateBoard(nextMovement.x, nextMovement.y, "head", currentBoardState);

        currentBoardState = updateSnakeLocation(currentBoardState, nextMovement);
    } else {
        console.log("Not in bounds")
    }
}

function updateSnakeLocation(currentBoardState, nextMovement) {
    let currentSankeX = snake.head.x;
    let currentSnakeY = snake.head.y;
    let previousBodyX;
    let previousBodyY;

    snake.head.x = nextMovement.x;
    snake.head.y = nextMovement.y;
   
    if (snake.body.length > 0) {
        // Iterate through the body and pass the x / y to each of the elements
        for (let i = 0; i < snake.body.length; i++) {
            let bodyElement = snake.body[i];
            
            // Remove body node from board
            currentBoardState = updateBoard(bodyElement.x, bodyElement.y, "", currentBoardState);

            // Store the values
            let currentBodyX = bodyElement.x;
            let currentBodyY = bodyElement.y;

            // Override the values
            if (i == 0) {
                bodyElement.x = currentSankeX;
                bodyElement.y = currentSnakeY;
            } else {
                bodyElement.x = previousBodyX;
                bodyElement.y = previousBodyY;
            }

            // Add back body node with updated value         
            currentBoardState = updateBoard(bodyElement.x, bodyElement.y, bodyElement.id, currentBoardState);
            
            // Update the previous values
            previousBodyX = currentBodyX;
            previousBodyY = currentBodyY;
        }
    }
    

    return currentBoardState;
}

function checkInBounds(x, y) {
    if (x < 0 || x > 14) {
        return false;
    } 

    if (y < 0 || y > 14) {
        return false;
    } 

    return true;
}

function checkIfApple(x, y, currentBoardState) {
    if (currentBoardState[x][y] == "apple") return true;

    return false;
}

function updateBoard(x, y, type, currentBoardState) {
    currentBoardState[x][y] = type;
    this.board = currentBoardState;
    return this.board;
}

function playerGrowth() {
    snake.body.push(createSnakeBody(snake.body.length));
}

function createSnakeHead() {
    let snake = {
        head: {
            element: document.createElement('div'),
            direction: "",
            x: 0,
            y: 0
        },
        body: []
    };

    let snakeHeadElement = document.createElement('div');
    snakeHeadElement.classList.add("snake-head");

    snake.head.element.classList.add("box-shadow");
    snake.head.element.append(snakeHeadElement);

    return snake;
}

function createSnakeBody(len) {
    let snakeBody = {
        id: "body" + len,
        element: document.createElement('div'),
        direction: "",
        x: 0,
        y: 0
    };

    let snakeBodyElement = document.createElement('div');
    snakeBodyElement.classList.add("snake-body");

    snakeBody.element.classList.add("box-shadow");
    snakeBody.element.append(snakeBodyElement);

    return snakeBody;
}

function createApple() {
    let apple = document.createElement('div');
    
    let appleElement = document.createElement('div');
    appleElement.classList.add("apple");

    apple.classList.add("box-shadow");
    apple.append(appleElement);

    return apple;
}