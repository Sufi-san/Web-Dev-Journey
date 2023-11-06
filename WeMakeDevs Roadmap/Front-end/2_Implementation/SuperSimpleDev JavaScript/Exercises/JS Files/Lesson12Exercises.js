const add = function() {
    console.log(2 + 3);
}
add();
add();

function runTwice(fun) {
    fun();
    fun();
}
runTwice(function() {console.log('12b')});
runTwice(add);

function changeBtnTxt1() {
    document.querySelector('.js-finish-btn1').innerHTML = 'Finished!'
}
document.querySelector('.js-finish-btn1').addEventListener('click', () => setTimeout(changeBtnTxt1, 1000));

function changeBtnTxt2() {
    const button = document.querySelector('.js-finish-btn2');
    button.innerHTML = 'Finished!';
}
function modifyBtnTxt() {
    const button = document.querySelector('.js-finish-btn2');
    setTimeout(() => changeBtnTxt2(), 1000);
    button.innerHTML = 'Loading...'
}
document.querySelector('.js-finish-btn2').addEventListener('click', () => modifyBtnTxt());

function showRemove() {
    const msgText = document.querySelector('.js-msg');
    setTimeout(() => msgText.innerHTML = '', 2000);
    msgText.innerHTML = 'Added'
}
document.querySelector('.js-add-to-cart-btn').addEventListener('click', showRemove);

let timeoutID = '';
function showRemove2() {
    clearTimeout(timeoutID);
    const msgText = document.querySelector('.js-msg2');
    timeoutID = setTimeout(() => msgText.innerHTML = '', 2000);
    msgText.innerHTML = 'Added'
}
document.querySelector('.js-add-to-cart-btn2').addEventListener('click', showRemove2);

let msgCount = 0;
document.querySelector('.js-add-btn').addEventListener('click', () => msgCount++);
document.querySelector('.js-remove-btn').addEventListener('click', () => msgCount = msgCount > 0? msgCount - 1: msgCount);
function changePageTitle() {
    if(document.title === 'Lesson 12 Exercises' && msgCount > 0) {
        document.title = `(${msgCount}) New messages`;
        return;
    }
    document.title = 'Lesson 12 Exercises';
}
setInterval(() => changePageTitle(), 1000);

const multiply = (num1, num2) => num1 * num2;
console.log(multiply(2, 3));
console.log(multiply(7, 10));

function countPositive(nums) {
    let count = 0;
    nums.forEach(value => {
        if(value > 0) count++;
    })
    return count;
}
console.log(countPositive([1, -3, 5]));
console.log(countPositive([-2, 3, -5, 7, 10]));

function addNum(array, num) {
    const newArr = array.map(value => value + num);
    return newArr;
}
console.log(addNum([1, 2, 3], 2));
console.log(addNum([-2, -1, 0, 99], 2));

function removeEggs(foods) {
    const newArr = foods.filter(food => food !== 'egg');
    return newArr;
}
console.log(removeEggs(['egg', 'apple', 'egg', 'egg', 'ham']));

function removeEggs2(foods) {
    let eggCount = 0;
    const newArr = foods.filter(food => {
        if(food === 'egg' && eggCount < 2) {
            eggCount++;
            return false;
        }
        return true;
    });
    return newArr;
}
console.log(removeEggs2(['egg', 'apple', 'egg', 'egg', 'ham']));