let gameBoard;
let freshBoard = [
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', 'body0', 'head', '', '', '', '', '', '', '', 'apple', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],        
];
let snake = "";
let score = "";
let debugDisplay = ""
let debug = false;
let playerScore = 0;
let firstMovement = true;
let autoMovementInterval = "";
let boardDrawInterval = "";
let playAgain = false;
let isPlayerDead = false;
let gameSpeed = 60 / 1000;
let movementSpeed = 1000 / 5;
let nextSnakeMovement = "";

Array.prototype.clone = function(){
    return this.map(e => Array.isArray(e) ? e.clone() : e);
};

window.addEventListener('load', () => {
    gameBoard = freshBoard.clone();
    snake = createSnakeHead(gameBoard);
    snake.body.push(createSnakeBody(0, snake.head.x, snake.head.y - 1));
    const game = document.querySelector('.game');
    const board = document.querySelector('.board');
    score = document.querySelector('.score');
    let randomValue = 5;
    

    // Add the movement
    document.addEventListener('keydown', (e) => moveSnake(e, gameBoard, score));

    // Randomize the initial animation transition values
    document.documentElement.style.setProperty('--random-x', getRandomInt(randomValue) + '%');
    document.documentElement.style.setProperty('--random-y', getRandomInt(randomValue) + '%');

    // // Reset the animation on end
    // game.onanimationend = () => {
    //     document.documentElement.style.setProperty('--random-x', getRandomInt(randomValue) + '%');
    //     document.documentElement.style.setProperty('--random-y', getRandomInt(randomValue) + '%');

    //     let x = document.documentElement.style.getPropertyValue('--random-x');
    //     let y = document.documentElement.style.getPropertyValue('--random-y');

    //     while (x == '0%' && y == '0%') {
    //         if (Math.random()) {
    //             document.documentElement.style.setProperty('--random-x', getRandomInt(randomValue) + '%');
    //         } else {
    //             document.documentElement.style.setProperty('--random-y', getRandomInt(randomValue) + '%');
    //         }

    //         x = document.documentElement.style.getPropertyValue('--random-x');
    //         y = document.documentElement.style.getPropertyValue('--random-y');
    //     }

    //     // Change animation speed
    //     document.documentElement.style.setProperty('--animation-speed', Math.floor(Math.random() * 5) + 1 + 's')

    //     board.classList.remove('board-animation');
    //     setTimeout(() => {
    //         board.classList.add('board-animation');
    //     },1);   
    // }

    boardDrawInterval = setInterval(() => {
        clearBoard(board);
        drawBoard(gameBoard, board);
    }, gameSpeed);

}, false);
    
/*
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
*/
function getRandomInt(max) {
    let sign = Math.random() > 0.5 ? 1 : -1;
    let value = Math.random() * max;
    return (Math.floor(value) * (Math.random() + 0.25)) * sign;
}

function toggleDebug() {
    debug=!debug;

    if (debug) {
        debugDisplay = document.createElement('div');
        debugDisplay.classList.add("debug-board");

        let bodyContent = document.querySelector('.body-content');
        bodyContent.appendChild(debugDisplay);
        debugDisplay = document.querySelector('.debug-board');
    } else {
        let bodyContent = document.querySelector('.body-content');
        bodyContent.removeChild(debugDisplay);
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
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
                    let snakeHeadElement = snakeHead.querySelector(".snake-head");

                    for (let child in snakeHeadElement.childNodes) {
                        if (snakeHeadElement.childNodes.hasOwnProperty(child)) {
                            child = snakeHeadElement.childNodes[child];
                            if (child.nodeType != 1  && child != undefined) {
                                snakeHeadElement.removeChild(child);
                            }
                        }
                    }
                    let textNode = document.createTextNode("x: " + i + ", y: " + j);
                    snakeHeadElement.prepend(textNode);
                } else {
                    let snakeHeadElement = snakeHead.querySelector(".snake-head");
                    for (let child in snakeHeadElement.childNodes) {
                        if (snakeHeadElement.childNodes.hasOwnProperty(child)) {
                            child = snakeHeadElement.childNodes[child];
                            if (child.nodeType != 1  && child != undefined) {
                                snakeHeadElement.removeChild(child);
                            }
                        }
                    }
                }

                snakeHead.style.top = (32 * i) + 'px'
                snakeHead.style.left = (32 * j) + 'px'
                board.append(snakeHead);
            } else if (currentBoardState[i][j].includes('body')) {
                let snakeBody = snake.body[currentBoardState[i][j].substring(4)].element;
                
                if (debug) {
                    let snakeBodyElement = snakeBody.querySelector(".snake-body");

                    for (let child in snakeBodyElement.childNodes) {
                        if (snakeBodyElement.childNodes.hasOwnProperty(child)) {
                            child = snakeBodyElement.childNodes[child];
                            if (child.nodeType != 1  && child != undefined) {
                                snakeBodyElement.removeChild(child);
                            }
                        }
                    }
                    let textNode = document.createTextNode("x: " + i + ", y: " + j);
                    snakeBodyElement.prepend(textNode);
                } else {
                    let snakeBodyElement = snakeBody.querySelector(".snake-body");
                    for (let child in snakeBodyElement.childNodes) {
                        if (snakeBodyElement.childNodes.hasOwnProperty(child)) {
                            child = snakeBodyElement.childNodes[child];
                            if (child.nodeType != 1  && child != undefined) {
                                snakeBodyElement.removeChild(child);
                            }
                        }
                    }
                }

                snakeBody.style.top = (32 * i) + 'px'
                snakeBody.style.left = (32 * j) + 'px'
                board.append(snakeBody);
            } else if (currentBoardState[i][j] == 'apple') {
                let apple = createApple();

                if (debug) {
                    let appleElement = apple.element.querySelector(".apple");

                    for (let child in appleElement.childNodes) {
                        if (appleElement.childNodes.hasOwnProperty(child)) {
                            child = appleElement.childNodes[child];
                            if (child.nodeType != 1  && child != undefined) {
                                appleElement.removeChild(child);
                            }
                        }
                    }
                    let textNode = document.createTextNode("x: " + i + ", y: " + j);
                    appleElement.prepend(textNode);
                }

                apple.x = i;
                apple.y = j;
                apple.element.style.top = (32 * i) + 'px'
                apple.element.style.left = (32 * j) + 'px'
                board.append(apple.element);
            }
        }
    }
}

function clearBoard(board) {
    while (board.lastElementChild) {
        board.removeChild(board.lastElementChild);
    }
}

function autoMovement(currentBoardState) {
    let nextMovement = {
        x: 0,
        y: 0
    };

    snake.head.direction = nextSnakeMovement;

    switch(snake.head.direction) {
        case 'LEFT': 
            // left
            if (snake.head.direction != "RIGHT") {
                nextMovement.x = snake.head.x;
                nextMovement.y = snake.head.y - 1;

                if (debug)
                    console.log("RENDERED MOVEMENT: " + snake.head.direction);
            }
            
        break;
        case 'RIGHT': 
            // right
            if (snake.head.direction != "LEFT") {
                nextMovement.x = snake.head.x;
                nextMovement.y = snake.head.y + 1;

                if (debug)
                    console.log("RENDERED MOVEMENT: " + snake.head.direction);
            }
        break;
        case 'UP': 
            // up
            if (snake.head.direction != "DOWN") {
                nextMovement.x = snake.head.x - 1;
                nextMovement.y = snake.head.y;

                if (debug)
                    console.log("RENDERED MOVEMENT: " + snake.head.direction);
            }
        break;
        case 'DOWN': 
            // down
            if (snake.head.direction != "UP") {
                nextMovement.x = snake.head.x + 1;
                nextMovement.y = snake.head.y;

                if (debug)
                    console.log("RENDERED MOVEMENT: " + snake.head.direction);
            }
        break;
    }

    if(checkInBounds(nextMovement.x, nextMovement.y) && isNotBodyCollision(nextMovement.x, nextMovement.y)) {
        if (checkIfApple(nextMovement.x, nextMovement.y, currentBoardState)) {
            // Gobbling an apple
            playerScore += 1;
            score.innerText = "score: " + playerScore;
            playerGrowth(currentBoardState, snake.body[snake.body.length - 1]);
            spawnApple();
        }

        // Update the board to clear the head of its previous position
        currentBoardState = updateBoard(snake.head.x, snake.head.y, "", currentBoardState);
        currentBoardState = updateBoard(nextMovement.x, nextMovement.y, "head", currentBoardState);

        currentBoardState = updateSnakeLocation(currentBoardState, nextMovement);
    } else {
        // Player dead
        //clearInterval(boardDrawInterval); 
        if (!isPlayerDead) {
            clearInterval(autoMovementInterval);

            // Open Game over dialog
            let gameOverDialog = document.createElement("div"); 
            gameOverDialog.classList.add("game-over");

            let scoreContent = document.createElement("div"); 
            scoreContent.classList.add("game-over-score");

            let apple = document.createElement("div");
            apple.classList.add("score-apple");

            let scoreElement = document.createElement("div"); 
            scoreElement.classList.add("score-text");
            scoreElement.innerText = "Score: " + playerScore;

            scoreContent.append(apple, scoreElement); 

            let replayButtonContainer = document.createElement("div");
            replayButtonContainer.classList.add("game-over-replay");

            let replayButton = document.createElement("button"); 
            replayButton.classList.add("snake-button");
            replayButton.innerText = "Play Again"
            replayButton.onclick = restartGame;

            replayButtonContainer.append(replayButton); 

            gameOverDialog.append(scoreContent, replayButtonContainer); 

            let bodyContent = document.querySelector('.game');
            bodyContent.append(gameOverDialog); 

            if (debug) {
                console.log("Collision")
            }
            
            isPlayerDead = true;
        }
        
    }
}

function moveSnake(event) {
    let movement = false;

    if (playAgain) {
        playAgain = false;
        firstMovement = true;
    }

    // https://stackoverflow.com/a/5597114 -> Keypress values
    switch(event.key) {
        case 'ArrowLeft': 
            // left
            if (snake.head.direction != "RIGHT") {
                nextSnakeMovement = "LEFT";
                movement = true;
            }
            
        break;
        case 'ArrowRight': 
            // right
            if (snake.head.direction != "LEFT") {
                nextSnakeMovement = "RIGHT";
                movement = true;
            }
        break;
        case 'ArrowUp': 
            // up
            if (snake.head.direction != "DOWN") {
                nextSnakeMovement = "UP";
                movement = true;
            }

        break;
        case 'ArrowDown': 
            // down
            if (snake.head.direction != "UP") {
                nextSnakeMovement = "DOWN";
                movement = true;
            }
        break;
    }

    if (firstMovement && movement) {
        firstMovement = false;
        // Trigger the movement on first call, then have calls on a interval
        autoMovement(gameBoard);
        autoMovementInterval = setInterval(() => {
            autoMovement(gameBoard);
        }, movementSpeed);
    }       
}

function updateSnakeLocation(currentBoardState, nextMovement) {
    let currentSankeX = snake.head.x;
    let currentSnakeY = snake.head.y;
    let previousBodyX;
    let previousBodyY;
    let previousDirection;

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
            let currentDirection = bodyElement.direction

            // Override the values
            if (i == 0) {
                bodyElement.x = currentSankeX;
                bodyElement.y = currentSnakeY;
                bodyElement.direction = snake.head.direction;
            } else {
                bodyElement.x = previousBodyX;
                bodyElement.y = previousBodyY;
                bodyElement.direction = previousDirection;
            }

            // Add back body node with updated value         
            currentBoardState = updateBoard(bodyElement.x, bodyElement.y, bodyElement.id, currentBoardState);
            
            // Update the previous values
            previousBodyX = currentBodyX;
            previousBodyY = currentBodyY;
            previousDirection = currentDirection;
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

function isNotBodyCollision(x, y) {
    if (gameBoard[x][y].includes('body')) return false;

    return true;
}

function checkIfApple(x, y, currentBoardState) {
    if (currentBoardState[x][y] == "apple") return true;

    return false;
}

function updateBoard(x, y, type, currentBoardState) {
    currentBoardState[x][y] = type;
    board = currentBoardState;
    return board;
}

function playerGrowth(gameBoard, lastBodyNode) {
    let nextSnakeNodeCoords = calculateBodyPlacement(lastBodyNode.x, lastBodyNode.y, lastBodyNode.direction); 
    snake.body.push(createSnakeBody(snake.body.length, nextSnakeNodeCoords.x, nextSnakeNodeCoords.y));
}

function createSnakeHead(gameBoard) {
    let snakePosition = getSnakeHeadPosition(gameBoard);

    let snake = {
        head: {
            element: document.createElement('div'),
            direction: "",
            x: snakePosition.x,
            y: snakePosition.y
        },
        body: []
    };

    let snakeHeadElement = document.createElement('div');
    snakeHeadElement.classList.add("snake-head");

    snake.head.element.classList.add("node-container");
    snake.head.element.append(snakeHeadElement);

    return snake;
}

function createSnakeBody(len, currentX, currentY) {
    let snakeBodyId = "body" + len;

    let snakeBody = {
        id: snakeBodyId,
        element: document.createElement('div'),
        direction: "",
        x: currentX,
        y: currentY,
    };

    let snakeBodyElement = document.createElement('div');
    snakeBodyElement.classList.add("snake-body", snakeBody.id);

    snakeBody.element.classList.add("node-container");
    snakeBody.element.append(snakeBodyElement);

    return snakeBody;
}

function createApple() {
    let apple = {
        element: document.createElement('div'),
        x: 0,
        y: 0
    }
    
    let appleElement = document.createElement('div');
    appleElement.classList.add("apple");

    apple.element.classList.add("node-container");
    apple.element.append(appleElement);

    return apple;
}

function spawnApple() {
    // generate a random number for x / y
    // check to see if the location is taken by an element
    // if not, place the apple
    let noPlacement = true;
    let x = "";
    let y = ""

    while (noPlacement) {
        x = getRandomInt(15);
        y = getRandomInt(15);

        if(gameBoard[x][y] == "") {
            gameBoard[x][y] = "apple";
            noPlacement = false;
        }
    }
}

function restartGame() {
    // Remove the dialog

    playAgain = true;
    let game = document.querySelector('.game');
    let gameOverDialog = document.querySelector('.game-over');
    game.removeChild(gameOverDialog);

    // Reset the board
    gameBoard = freshBoard.clone();
    
    snake = createSnakeHead(gameBoard);
    snake.body.push(createSnakeBody(0, snake.head.x, snake.head.y - 1));

    // Reset the score
    playerScore = 0;
    score.innerText = "score: " + playerScore;
    isPlayerDead = false;
}

function getSnakeHeadPosition(gameBoard) {
    for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 15; j++) {
            if (gameBoard[i][j] == 'head') {
                return {
                    x: i,
                    y: j
                }
            }
        }
    }

    return null;
}

function calculateBodyPlacement(lastX, lastY, direction) {
    switch(direction) {
        case "UP":
            return {
                x: lastX + 1,
                y: lastY 
            }
        break;
        case "DOWN":
            return {
                x: lastX - 1,
                y: lastY 
            }
        break;
        case "RIGHT":
            return {
                x: lastX,
                y: lastY - 1
            }
        break;
        case "LEFT":
            return {
                x: lastX,
                y: lastY + 1
            }
        break;
    }
}