let price = 19.5;
let cid = [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]];

const purchaseBtn = document.getElementById("purchase-btn");
const changeDue = document.getElementById("change-due");
const priceElement = document.getElementById('price');
const userInputElement = document.getElementById("cash");
priceElement.textContent = "Price = " + price;

/*
the needed functions:
1. vlidate the input : 
    if input <= 0 ==> alert messege
    return false
2. calculate the required change from each coin type:
    start from big units to low units
3. update the innerHTML 
*/

purchaseBtn.addEventListener('click', () => {
    const isValid = Validation(Number(userInputElement.value));
    update(isValid);
});

const Validation = input => {
    if(isNaN(input) || input < price) {
        alert("Customer does not have enough money to purchase the item");
        return false;
    }
    return true;
}

const calculateChangeAndStatue = (input, price, cid) => {
    //return object of 2 elements: status & change array
    const cidReversed = cid.reverse();
    let currencyUnit = {
    'PENNY': 0.01,
    'NICKEL': 0.05,
    'DIME': 0.1,
    'QUARTER': 0.25,
    'ONE': 1,
    'FIVE': 5,
    'TEN': 10,
    'TWENTY': 20,
    'ONE HUNDRED': 100
    };

    const countOfCurrency = {
        'PENNY': 0,
        'NICKEL': 0,
        'DIME': 0,
        'QUARTER': 0,
        'ONE': 0,
        'FIVE': 0,
        'TWENTY': 0,
        'ONE HUNDRED': 0
    }
    let totalCID = 0.00;
    for(let i = 0; i < cid.length; i++) {
        totalCID += cid[i][1];
        totalCID.toFixed(2);
        totalCID = Number(totalCID);
    }
    
    let changeValue = Number((input - price).toFixed(2));
    if (changeValue == 0) {
        userInputElement.value = '';
        return {status: "No change due - customer paid with exact cash", change: []};
    }
    
    if(totalCID === changeValue) {
        userInputElement.value = '';
        return {status: "Status: CLOSED", change: cid}
    } else if (totalCID < changeValue) {
        userInputElement.value = '';
        return {status: "Status: INSUFFICIENT_FUNDS\n", change: []}
    }
    
    const changeArr = []
    for(let [unit, availablChange] of cidReversed) {
        const value = currencyUnit[unit]; //currency unit value
        let totalValue = 0.00; // total value
        
        while (changeValue >= value && availablChange > 0) {
            changeValue = Number((changeValue - value).toFixed(2));
            availablChange = Number((availablChange - value).toFixed(2));
            totalValue += value;
        }
        
        if (totalValue > 0) {
            changeArr.push([unit, totalValue]);
        }
    }
    
    if(changeValue > 0) {
        userInputElement.value = '';
        return {status: "Status: INSUFFICIENT_FUNDS\n", change: []}
    }

    return {status: "Status: OPEN\n", change: changeArr}
}

const update = (ValidInput) => {
    const userCash = Number(userInputElement.value);
    if(ValidInput) {
        const statusAndChangeObject = calculateChangeAndStatue(userCash, price, cid);
        const theStatus = statusAndChangeObject.status;
        const changeArr = statusAndChangeObject.change;
        changeDue.style.display = 'block';
        changeDue.innerHTML = `<p>${theStatus}</p>`;
        changeArr.map(([unit, value]) => {
            if(value > 0) {
                changeDue.innerHTML += `<p>${unit}: $${value}</p> `;
            }
        });
    }
}