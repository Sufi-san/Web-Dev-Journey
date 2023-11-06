function showCost() {
    const finalCostBtn = document.querySelector('.js-final-cost');
    if(finalCostBtn.classList.contains('error-txt')){
        finalCostBtn.classList.remove('error-txt');
    }
    // Found the reason for buggy long float prints for some inputs
    // It is due to complications of storing decimals using IEEE754 format in JS
    // For better accuracy there are frameworks like BigDecimal.js
    // Here, we can just multiply both figures by power of 10 based on string length before adding
    // After that, when we divide by the same power of 10 we get the required result
    let cost = Number(document.querySelector('.js-order-cost').value);
    if(cost) { // Meaning if cost is not NaN then run the following...
        if(cost < 0){
            finalCostBtn.innerHTML = `Error: cost cannot be less than $0`;
            finalCostBtn.classList.add('error-txt');
            return;
        }
        const powerOf10 = Math.pow(10, String(cost).length);
        console.log(cost);
        if(cost < 40){
            cost = (cost * powerOf10 + 10 * powerOf10) / powerOf10;
        }
    }
    else {
        cost += 10;
    }
    finalCostBtn.innerHTML = `$${cost}`;
}
function showCostOnEnter(event) {
    if(event.key === 'Enter') showCost();
}