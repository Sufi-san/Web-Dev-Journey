let calculation = localStorage.getItem('expression') || "";
displayCalc();
function updateCalculation(appendItem) {
    calculation += appendItem;
    localStorage.setItem('expression', calculation);
    displayCalc();
}
function displayCalc(useClass = true) {
    if(useClass){
        document.querySelector('.js-answer-field').classList.add('ans-field');
    }
    document.querySelector('.js-answer-field').innerHTML = calculation;
}
function clearCalc() {
    calculation = '';
    localStorage.removeItem('expression');
    document.querySelector('.js-answer-field').classList.remove('ans-field');
    displayCalc(false);
}