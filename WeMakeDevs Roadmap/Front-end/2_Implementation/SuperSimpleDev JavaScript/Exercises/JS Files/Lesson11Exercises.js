const nums = [10, 20, 30];
console.log(nums);
nums[2] = 99;
console.log(nums);

function getLastValue(array) {
    return array[array.length - 1];
}
console.log(getLastValue(nums));

function arraySwap(array) {
    let temp = array[0];
    array[0] = array[array.length - 1];
    array[array.length - 1] = temp;
    return array;
}
console.log(arraySwap(nums));

let countArray = [];
for (let i = 0; i < 11; i += 2) {
    countArray.push(i);
}
console.log(countArray);

countArray = [];
for (let i = 5; i >= 0; i--) {
    countArray.push(i);
}
console.log(countArray);

countArray = [];
let i = 0;
while (i < 11) {
    countArray.push(i);
    i += 2;
}
console.log("Using while() loop: " + `[${countArray}]`);
countArray = [];
i = 5;
while (i >= 0) {
    countArray.push(i);
    i--;
}
console.log("Using while() loop: " + `[${countArray}]`);

const oldArr = [1, 2, 3];
function createNewArray(old) {
    const newArr = [];
    for (let i = 0; i < old.length; i++) {
        newArr[i] = old[i] + 1;
    }
    return newArr;
}
console.log(createNewArray(oldArr));

function increaseByNum(array, num) {
    for (let i = 0; i < array.length; i++) {
        array[i] += num;
    }
    return array;
}
console.log(increaseByNum(oldArr, 10));

const newArr = [50, 60, 70];
console.log('newArr = ' + newArr);
function addArrays(new_arr, old_arr) {
    for (let i = 0; i < new_arr.length; i++) {
        new_arr[i] += old_arr[i];
    }
}
addArrays(newArr, oldArr);
console.log('newArr + oldArr = ' + newArr);

const arr1 = [-1, 2, -2, 5, 9, -5, 5, 9.2, -8, 9.5, -22.5];
function countPositive(array) {
    let count = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i] > 0) count++;
    }
    return count;
}
console.log(arr1);
console.log('Positive Numbers in arr1: ' + countPositive(arr1));

function minMax(nums) {
    const obj = {
        min: null,
        max: null
    }
    if (nums.length < 1) {
        return obj;
    }
    obj.min = obj.max = nums[0];
    for (let i = 1; i < nums.length; i++) {
        obj.min = (nums[i] < obj.min) ? nums[i] : obj.min;
        obj.max = (nums[i] > obj.max) ? nums[i] : obj.max;
    }
    return obj;
}
console.log(minMax(arr1));

console.log(minMax([]));
console.log(minMax([3]));

const words = ['apple', 'grape', 'apple', 'apple'];
function countWords(words) {
    const obj = {};
    for (let i = 0; i < words.length; i++) {
        obj[words[i]] = (obj[words[i]]) ? obj[words[i]] + 1 : 1;
    }
    return obj;
}
console.log(countWords(words));

const arr2 = ['hello', 'world', 'search', 'good'], arr3 = ['not', 'found'];
const arr4 = arr2.slice();
arr4.push('search');
function searchFirstIndex1(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            console.log(i);
            continue;
        }
        console.log(-1);
    }
}
searchFirstIndex1(arr2, 'search');
searchFirstIndex1(arr3, 'search');

function searchFirstWithBreak(arr, target) {
    let i = 0;
    for (i = 0; i < arr.length; i++) {
        if (arr[i] === target) break;
    }
    console.log(i);
}
searchFirstWithBreak(arr4, 'search');

function searchFirstIndex2(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) return i;
    }
    return -1;
}
console.log(searchFirstIndex2(['green', 'red', 'blue', 'red'], 'red'));
console.log(searchFirstIndex2(['green', 'red', 'blue', 'red'], 'yellow'));

function removeEggs(arr) {
    const newArr = []
    for(let i = 0; i < arr.length; i++){
        if(arr[i] === 'egg') continue;
        newArr.push(arr[i]);
    }
    return newArr;
}
const itemList = ['egg', 'apple', 'egg', 'egg', 'ham'];
console.log(removeEggs(itemList.slice()));

function remove2Eggs(arr) {
    const newArr = [];
    let eggCount = 0;
    for(let i = 0; i < arr.length; i++){
        if(arr[i] === 'egg' && eggCount < 2){
            eggCount++;
            continue;
        }
        newArr.push(arr[i]);
    }
    return newArr;
}
console.log(remove2Eggs(itemList.slice()));

function removeLast2Eggs(arr) {
    const newArr = [];
    let eggCount = 0;
    for(let i = 0; i < arr.length; i++){
        if(arr[i] === 'egg' && eggCount < 2){
            eggCount++;
            continue;
        }
        newArr.push(arr[i]);
    }
    return newArr.reverse();
}
console.log(removeLast2Eggs(itemList.slice().reverse()));
console.log('Original List was: ' + itemList);

for(let i = 1; i <= 20; i++){
    let output = '';
    if(i % 3 == 0) output += 'Fizz';
    if(i % 5 == 0) output += 'Buzz';
    if(!output) output = i;
    console.log(output);
}

function unique(array) {
    const newArr = [];
    for(let i = 0; i < array.length; i++){
        if(i == array.length - 1){
            newArr.push(array[i]);
            break;
        }
        const searchArray = array.slice().splice(i + 1, array.length - (i + 1));
        if(searchFirstIndex2(searchArray, array[i]) >= 0) continue;
        newArr.push(array[i]);
    }
    return newArr;
}
console.log(unique(['green', 'red', 'blue', 'red']));
console.log(unique(['red', 'green', 'red', 'green']));
