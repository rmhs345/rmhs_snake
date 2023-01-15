window.addEventListener('load', () => {
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
}, false);
    
/*
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
*/
function getRandomInt(max) {
    let sign = Math.random() > 0.5 ? 1 : -1;
    let value = Math.random() * max;
    console.log(sign);
    return (Math.floor(value) * (Math.random() + 0.25)) * sign;
}