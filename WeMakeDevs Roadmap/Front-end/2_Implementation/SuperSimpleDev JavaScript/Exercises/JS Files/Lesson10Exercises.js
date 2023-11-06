const hasClassName = document.querySelector('.js-button1').classList.contains('js-button1');
console.log(hasClassName);
function switchOnOff(buttonClass) {
    const selectedButton = document.querySelector(buttonClass);
    const isToggled = selectedButton.classList.contains('isToggled');
    if (isToggled) {
        classHandler(selectedButton, 'isToggled', 'off-btn');
        return;
    }
    classHandler(selectedButton, 'off-btn', 'isToggled');
}
function switchOnOff2(buttonClass) {
    switchOnOff(buttonClass);
    if (buttonClass === '.js-button6') {
        const btn1 = document.querySelector('.js-button7');
        const btn2 = document.querySelector('.js-button8');
        classHandler(btn1, 'isToggled', 'off-btn');
        classHandler(btn2, 'isToggled', 'off-btn');
        return;
    }
    else if (buttonClass === '.js-button7') {
        const btn1 = document.querySelector('.js-button6');
        const btn2 = document.querySelector('.js-button8');
        classHandler(btn1, 'isToggled', 'off-btn');
        classHandler(btn2, 'isToggled', 'off-btn');
        return;
    }
    const btn1 = document.querySelector('.js-button6');
    const btn2 = document.querySelector('.js-button7');
    classHandler(btn1, 'isToggled', 'off-btn');
    classHandler(btn2, 'isToggled', 'off-btn');
}
function classHandler(object, classA, classB) {
    object.classList.remove(classA);
    object.classList.add(classB);
}