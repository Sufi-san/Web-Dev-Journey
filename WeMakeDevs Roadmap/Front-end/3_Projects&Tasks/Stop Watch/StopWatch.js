let milliSec = 0, seconds = 0, minutes = 0, hours = 0;

const darkModeBtn = document.querySelector('.js-dark-mode');

darkModeBtn.addEventListener('click', () => {
    if (darkModeBtn.innerText === 'Dark Mode: OFF') {
        darkModeBtn.innerHTML = 'Dark Mode: ON';
        enableDarkMode();
        return;
    }
    darkModeBtn.innerHTML = 'Dark Mode: OFF';
    disableDarkMode();
})

function enableDarkMode() {
    document.body.style = "background-color: black;";
    document.querySelector('.js-header').style = 'background-color: rgb(66, 87, 66);';
    document.querySelector('.js-main').style = "background-color: rgb(40, 40, 40);";
    document.querySelector('.clock-display').style = "color: white;";
}

function disableDarkMode() {
    document.body.style = '';
    document.querySelector('.js-header').style = 'rgb(177, 240, 177);';
    document.querySelector('.js-main').style = '';
    document.querySelector('.clock-display').style = "color: black;"
}

const startStopBtn = document.querySelector('.js-start-stop-btn');

startStopBtn.addEventListener('click', () => {
    if (startStopBtn.innerText === 'Start') {
        startStopBtn.innerHTML = 'Stop';
        runStopWatch();
        return;
    }
    startStopBtn.innerHTML = 'Start';
    haltStopWatch();
});

document.querySelector('.js-reset-btn').addEventListener('click', resetStopWatch);

let runInterval = 0;

function runStopWatch() {
    runInterval = setInterval(() => {
        if (milliSec == 100) {
            milliSec = 0;
            seconds++;
        }
        else {
            milliSec++;
        }
        if (seconds == 60) {
            seconds = 0;
            minutes++;
        }
        if (minutes == 60) {
            minutes = 0;
            hours++;
        }
        renderStopWatch();
    }, 10);
}

function haltStopWatch() {
    clearInterval(runInterval);
    renderStopWatch();
}

function resetStopWatch() {
    milliSec = seconds = minutes = hours = 0;
    renderStopWatch();
}

function renderStopWatch() {
    const secString = (seconds / 10 < 1) ? '0' + seconds : seconds;
    const minString = (minutes / 10 < 1) ? '0' + minutes : minutes;
    const hrString = (hours / 10 < 1) ? '0' + hours : hours;
    document.querySelector('.js-clock-display').innerHTML = `${hrString} : ${minString} : ${secString}.${parseInt(milliSec / 10)}`;
}