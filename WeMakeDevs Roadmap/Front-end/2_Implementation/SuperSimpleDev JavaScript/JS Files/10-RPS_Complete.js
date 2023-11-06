let scoreBoard = JSON.parse(localStorage.getItem('scoreBoard')) || {
    wins: 0,
    losses: 0,
    ties: 0
};
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
function scoreReset() {
    scoreBoard.wins = scoreBoard.losses = scoreBoard.ties = 0;
    displayScore();
    localStorage.removeItem('scoreBoard');
}