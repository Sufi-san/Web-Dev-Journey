const objArray = [];

for(let i = 0; i < 16; i++) {
    objArray[i] = {found: false};
}

console.log(objArray);
for(let i = 0; i < objArray.length; i++){
    const display = objArray[i].found? 'True': '?';
    console.log(display);
}