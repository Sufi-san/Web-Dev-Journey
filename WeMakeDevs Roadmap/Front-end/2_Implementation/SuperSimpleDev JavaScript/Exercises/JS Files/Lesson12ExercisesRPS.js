let scoreBoard = JSON.parse(localStorage.getItem('scoreBoard')) || {
    wins: 0,
    losses: 0,
    ties: 0
};
const rockBtn = document.querySelector('.js-rock-btn');
const paperBtn = document.querySelector('.js-paper-btn');
const scissorsBtn = document.querySelector('.js-scissors-btn');
const resetBtn = document.querySelector('.js-reset-btn');
const autoPlayBtn = document.querySelector('.js-auto-play');

displayScore();
function displayScore() {
    const { wins, losses, ties } = scoreBoard;
    document.querySelector('.js-score').innerHTML = `Wins: ${wins}, Losses: ${losses}, Ties: ${ties}`;
}
function moveToImgAddress(move){
    if(move === 'Rock') return "https://supersimple.dev/projects/rock-paper-scissors/images/rock-emoji.png";
    else if(move === 'Paper') return "https://supersimple.dev/projects/rock-paper-scissors/images/paper-emoji.png"
    else return "https://supersimple.dev/projects/rock-paper-scissors/images/scissors-emoji.png"
} 
function displayMessage(result, userMove, compMove) {
    const textImg1 = moveToImgAddress(userMove), textImg2 = moveToImgAddress(compMove);
    const messageElement = document.querySelector('.js-result-message');
    messageElement.classList.add('game-result');
    messageElement.innerHTML = `<h2>${result}.</h2>\n<p>You <img class="game-button-img" src="${textImg1}" alt="${userMove}"> <img class="game-button-img" src="${textImg2}" alt="${compMove}"> Computer`;
}
function pickCompMove() {
    const movePicker = Math.random();
    if (movePicker < 1 / 3) {
        return 'Rock';
    }
    else if (movePicker > 1 / 3 && movePicker < 2 / 3) {
        return 'Paper';
    }
    else {
        return 'Scissors';
    }
}

function playRPS(userMove) {
    const compMove = pickCompMove();
    let result = '';
    if (compMove == userMove) {
        scoreBoard.ties++;
        result = 'Tie';
    }
    else if (userMove == 'Rock' && compMove == 'Scissors' || userMove == 'Scissors' && compMove == 'Paper' || userMove == 'Paper' && compMove == 'Rock') {
        scoreBoard.wins++;
        result = 'You Win';
    }
    else {
        scoreBoard.losses++;
        result = 'You Lose';
    }
    displayMessage(result, userMove, compMove);
    displayScore();
    localStorage.setItem('scoreBoard', JSON.stringify(scoreBoard));
}

resetBtn.addEventListener('click', confirmReset);
document.body.addEventListener('keydown', (event) => {
    if(event.key === 'Backspace') confirmReset();
})

function confirmReset() {
    const confirmation = document.querySelector('.js-confirmation');
    confirmation.innerHTML = 'Are you sure you want to reset? <button class="yes-no-btn js-yes-btn">Yes</button> <button class="yes-no-btn js-no-btn">No</button>';
    document.querySelector('.js-yes-btn').addEventListener('click', () => scoreReset(confirmation));
    document.querySelector('.js-no-btn').addEventListener('click', () => confirmation.innerHTML = '');
}

function scoreReset(confirmation) {
    confirmation.innerHTML = '';
    scoreBoard.wins = scoreBoard.losses = scoreBoard.ties = 0;
    displayScore();
    localStorage.removeItem('scoreBoard');
}

rockBtn.addEventListener('click', () => {
    playRPS('Rock');
});
paperBtn.addEventListener('click', () => {
    playRPS('Paper');
});
scissorsBtn.addEventListener('click', () => {
    playRPS('Scissors');
});

/*
    setInterval() returns an event ID which can also be later used to stop the interval loop
*/
let intervalID = ''; // as we get a different ID each time autoplay is called, we store interval ID in a global variable

autoPlayBtn.addEventListener('click', () => autoplay(autoPlayBtn));
document.body.addEventListener('keydown', (event) => {
    if(event.key === 'a') autoplay(autoPlayBtn);
});

function autoplay(autoplayButton) {
    if(autoplayButton.innerText === 'Auto Play') {
        autoplayButton.innerHTML = 'Stop Playing';
        intervalID = setInterval(() => {
            playRPS(pickCompMove());
        }, 1000);
        return;
    }
    clearInterval(intervalID);
    autoplayButton.innerHTML = 'Auto Play';
}

/*
    addEventListener also provides options to execute code on keyboard clicks
    These can be used insted of 'onkeydown/onkeyup' in HTML
    It also provides parameters to check which key was pressed
*/

document.body.addEventListener('keydown', (event) => {
    if(event.key === 'r') playRPS('Rock');
});
document.body.addEventListener('keydown', (event) => {
    if(event.key === 'p') playRPS('Paper');
});
document.body.addEventListener('keydown', (event) => {
    if(event.key === 's') playRPS('Scissors');
});