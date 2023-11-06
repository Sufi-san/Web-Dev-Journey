const toDoArray = [], toDoArray2 = [], toDoArray3 = [];
function takeInputOnEnter(event, caller = 0) {
    if (event.key !== 'Enter') {
        return;
    }
    if (caller == 1) {
        addInList();
        return;
    }
    addInList2();
}
function addInList() {
    const inpBox = document.querySelector('.js-input1');
    toDoArray.push(inpBox.value);
    inpBox.value = '';
    console.log(toDoArray);
}
function addInList2() {
    const inpBox = document.querySelector('.js-input2');
    let newHTML = "";
    toDoArray2.push(inpBox.value);
    inpBox.value = '';
    for (let i = 0; i < toDoArray2.length; i++) {
        newHTML += `<p>${toDoArray2[i]}</p>`;
    }
    document.querySelector('.js-todo-display').innerHTML = newHTML;
}
function renderToDoList() {
    let toDoListHTML = '';
    for(let i = 0; i < toDoArray3.length; i++){
        const {name, date} = toDoArray3[i];
        toDoListHTML += `
        <div>${name}</div>
        <div>${date}</div>
        <button class="delete-btn" onclick="removeFromList(${i});">Delete</button>`
    }
    document.querySelector('.js-todo-display2').innerHTML = toDoListHTML;
}
function addInToDoList() {
    const nameInputElement = document.querySelector('.js-input3a'), name = nameInputElement.value;
    const dateInputElement = document.querySelector('.js-input3b'), date = dateInputElement.value;
    toDoArray3.push({
        name,
        date
    });
    nameInputElement.value = dateInputElement.value = '';
    renderToDoList();
}
function removeFromList(index) {
    toDoArray3.splice(index, 1);
    renderToDoList();
}