const toDoArray3 = JSON.parse(localStorage.getItem('toDoList')) || [];
renderToDoList();

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
    localStorage.setItem('toDoList', JSON.stringify(toDoArray3));
    nameInputElement.value = dateInputElement.value = '';
    renderToDoList();
}
function removeFromList(index) {
    toDoArray3.splice(index, 1);
    localStorage.setItem('toDoList', JSON.stringify(toDoArray3));
    renderToDoList();
}