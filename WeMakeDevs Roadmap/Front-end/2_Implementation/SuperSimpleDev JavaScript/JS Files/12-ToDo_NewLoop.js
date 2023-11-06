const toDoArray3 = [];

function renderToDoList() {
    let toDoListHTML = '';
    toDoArray3.forEach((value) => {
        const{name, date} = value;
        toDoListHTML += `
        <div>${name}</div>
        <div>${date}</div>
        <button class="delete-btn js-del-btn">Delete</button>`
    });
    document.querySelector('.js-todo-display2').innerHTML = toDoListHTML;

    // As we are now using 'addEventListener' instead of 'onclick' it is necessary to add an event listener to all delete buttons in the update list
    // This has to be done each time the list is renderred.

    // We can select all buttons that contain the class '.js-del-btn' instead of just the first one, using the method 'querySelectorAll().
    // It returns a list of all such elements
    const delBtn = document.querySelectorAll('.js-del-btn');
    
    // Since, delBtn is an Array now, we can use forEach() on it.
    delBtn.forEach((value, index) => value.addEventListener('click', () => removeFromList(index)));
    // console.log(delBtn);
}

const addBtn = document.querySelector('.js-add-btn');
addBtn.addEventListener('click', addInToDoList);

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