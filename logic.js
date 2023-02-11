let gameBoard = "";
let snake = "";
let score = "";
let debugDisplay = ""
let debug = false;
let playerScore = 0;
let firstMovement = false;
let autoMovementInterval = "";
let boardDrawInterval = "";

window.addEventListener('load', () => {
    snake = createSnakeHead();
    gameBoard = [
        ['head', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', 'apple', '', '', '', '', '', '', ''],
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

    switch(snake.head.direction) {
        case 'LEFT': 
            // left
            if (snake.head.direction != "RIGHT") {
                nextMovement.x = snake.head.x;
                nextMovement.y = snake.head.y - 1;
                snake.head.direction = "LEFT";
            }
            
        break;
        case 'RIGHT': 
            // right
            if (snake.head.direction != "LEFT") {
                nextMovement.x = snake.head.x;
                nextMovement.y = snake.head.y + 1;
                snake.head.direction = "RIGHT";
            }
        break;
        case 'UP': 
            // up
            if (snake.head.direction != "DOWN") {
                nextMovement.x = snake.head.x - 1;
                nextMovement.y = snake.head.y;
                snake.head.direction = "UP";
            }
        break;
        case 'DOWN': 
            // down
            if (snake.head.direction != "UP") {
                nextMovement.x = snake.head.x + 1;
                nextMovement.y = snake.head.y;
                snake.head.direction = "DOWN";
            }
        break;
    }

    if(checkInBounds(nextMovement.x, nextMovement.y) && isNotBodyCollision(nextMovement.x, nextMovement.y)) {
        if (checkIfApple(nextMovement.x, nextMovement.y, currentBoardState)) {
            // Gobbling an apple
            playerScore += 1;
            score.innerText = "score: " + playerScore;
            playerGrowth();
            spawnApple();
        }

        // Update the board to clear the head of its previous position
        currentBoardState = updateBoard(snake.head.x, snake.head.y, "", currentBoardState);
        currentBoardState = updateBoard(nextMovement.x, nextMovement.y, "head", currentBoardState);

        currentBoardState = updateSnakeLocation(currentBoardState, nextMovement);
    } else {
        // Player dead
        //clearInterval(boardDrawInterval); 
        clearInterval(autoMovementInterval);
        console.log("Not in bounds")
    }
}

function moveSnake(event) {
    let movementKeyTouched = false;

    // https://stackoverflow.com/a/5597114 -> Keypress values
    switch(event.key) {
        case 'ArrowLeft': 
            // left
            if (snake.head.direction != "RIGHT") {
                snake.head.direction = "LEFT";
                movementKeyTouched = true;
            }
            
        break;
        case 'ArrowRight': 
            // right
            if (snake.head.direction != "LEFT") {
                snake.head.direction = "RIGHT";
                movementKeyTouched = true;
            }
        break;
        case 'ArrowUp': 
            // up
            if (snake.head.direction != "DOWN") {
                snake.head.direction = "UP";
                movementKeyTouched = true;
            }
        break;
        case 'ArrowDown': 
            // down
            if (snake.head.direction != "UP") {
                snake.head.direction = "DOWN";
                movementKeyTouched = true;
            }
        break;
    }

    if (movementKeyTouched && !firstMovement) {
        firstMovement = true;

        // Trigger the movement on first call, then have calls on a interval
        autoMovement(gameBoard);
        autoMovementInterval = setInterval(() => {
            autoMovement(gameBoard);
        }, 1 * 200);
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

function isNotBodyCollision(x, y) {
    if (gameBoard[x][y].includes('body')) {
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

    snake.head.element.classList.add("node-container");
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