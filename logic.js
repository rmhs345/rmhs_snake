let gameBoard = "";
let snake = "";

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
    let randomValue = 5;

    // Create the background shade for the board
    let shade = (() => {
        let shadeElement = document.createElement('div');
        shadeElement.style.width = '540px';
        shadeElement.style.height = '540px';
        shadeElement.style.backgroundColor = '#2b1515';
        shadeElement.style.position = 'absolute';
        shadeElement.style.zIndex = '-1';
        shadeElement.style.borderRadius = '1%'
        return shadeElement;
    })();


    // Add the movement
    document.addEventListener('keydown', (e) => moveSnake(e, gameBoard));

    game.append(shade);

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
        //moveSnake(gameBoard)
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
    // Iterate through the board
    for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 15; j++) {
            // Draw each of the elements to the screen
            switch (currentBoardState[i][j]) {
                case "head":
                    let snakeHead = snake.head.element;
                    snakeHead.style.top = (32 * i) + 'px'
                    snakeHead.style.left = (32 * j) + 'px'
                    board.append(snakeHead);
                break;
                case "body":
                    let snakeBody = createSnakeBody();
                    snakeBody.style.top = (32 * i) + 'px'
                    snakeBody.style.left = (32 * j) + 'px'
                    board.append(snakeBody);
                break;
                case "apple":
                    let apple = createApple();
                    apple.style.top = (32 * i) + 'px'
                    apple.style.left = (32 * j) + 'px'
                    board.append(apple);
                break;
                default:
            }
        }
    }
}

function clearBoard(board) {
    while (board.lastElementChild) {
        board.removeChild(board.lastElementChild);
    }
}

function moveSnake(event, currentBoardState) {
    let snakeHead = snake.head; 
    // https://stackoverflow.com/a/5597114
    switch(event.key) {
        case 'ArrowLeft': 
            // left
            if (checkInBounds(snake.head.x, snake.head.y - 1)) {
                currentBoardState = updateBoard(snake.head.x, snake.head.y, "", currentBoardState);
                currentBoardState = updateBoard(snake.head.x, snake.head.y - 1, "head", currentBoardState);
                updateSnakeHeadLocation(currentBoardState);
            } else {
                console.log("Not in bounds")
            }
        break;
        case 'ArrowRight': 
            // right
            if (checkInBounds(snake.head.x, snake.head.y + 1)) {
                currentBoardState = updateBoard(snake.head.x, snake.head.y, "", currentBoardState);
                currentBoardState = updateBoard(snake.head.x, snake.head.y + 1, "head", currentBoardState);
                updateSnakeHeadLocation(currentBoardState);
            } else {
                console.log("Not in bounds")
            }
        break;
        case 'ArrowUp': 
            // up
            if (checkInBounds(snake.head.x - 1, snake.head.y)) {
                currentBoardState = updateBoard(snake.head.x, snake.head.y, "", currentBoardState);
                currentBoardState = updateBoard(snake.head.x - 1, snake.head.y, "head", currentBoardState);
                updateSnakeHeadLocation(currentBoardState);
            } else {
                console.log("Not in bounds")
            }
        break;
        case 'ArrowDown': 
            // down
            if (checkInBounds(snake.head.x + 1, snake.head.y)) {
                currentBoardState = updateBoard(snake.head.x, snake.head.y, "", currentBoardState);
                currentBoardState = updateBoard(snake.head.x + 1, snake.head.y, "head", currentBoardState);
                updateSnakeHeadLocation(currentBoardState);
            } else {
                console.log("Not in bounds")
            }
        break;
    }
}

function updateSnakeHeadLocation(currentBoardState) {
    for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 15; j++) {
            // Draw each of the elements to the screen
            if (currentBoardState[i][j] == 'head') {
                snake.head.x = i;
                snake.head.y = j;
                snake.head.element.innerText = "x: " + snake.head.x + ", y: " + snake.head.y;
            } 
        }
    }
    return -1;
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

function updateBoard(x, y, type, currentBoardState) {
    currentBoardState[x][y] = type;
    this.board = currentBoardState;
    return this.board;
}

function createSnakeHead() {
    let snake = {
        head: {
            element: "",
            x: 0,
            y: 0
        },
        body: []
    };

    let snakeHead = document.createElement('div');
    snakeHead.style.width = '32px';
    snakeHead.style.height = '32px';
    snakeHead.style.backgroundColor = '#a9fc03';
    snakeHead.style.position = 'absolute';
    snakeHead.style.borderRadius = '1%'

    snake.head.element = snakeHead;

    return snake;
}

function createSnakeBody() {
    let snakeBody = document.createElement('div');
    snakeBody.style.width = '32px';
    snakeBody.style.height = '32px';
    snakeBody.style.backgroundColor = '#96bf36';
    snakeBody.style.position = 'absolute';
    snakeBody.style.borderRadius = '1%'
    return snakeBody;
}

function createApple() {
    let snakeBody = document.createElement('div');
    snakeBody.style.width = '32px';
    snakeBody.style.height = '32px';
    snakeBody.style.backgroundColor = '#e36275';
    snakeBody.style.position = 'absolute';
    snakeBody.style.borderRadius = '30%'
    return snakeBody;
}