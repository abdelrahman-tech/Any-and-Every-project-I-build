const userInput = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const resultArea = document.getElementById("results-div");
const inputValidationRegex = /^(?:1\s|1)?(?:[(][0-9]{3}[)]|[0-9]{3})(?:\s|-|)[0-9]{3}(?:\s|-|)[0-9]{4}/; //I CRAFTED IT BY MYSELF

checkBtn.addEventListener("click", update);
clearBtn.addEventListener("click", clear);

//validate that the input: not empty, a valid US number
function Validation (input, regex)
{
    const empty = isEmpty(input);
    console.log(input); 
    if(empty)
    {
        alert("Please provide a phone number");
        clear();
        return false;
    } else {
        //temp is array
        let temp = input.split("").map(el => {
        const digits = [0,1,2,3,4,5,6,7,8,9];
        
        return digits.includes(Number(el)) && !(/\s+/.test(el)) ? el : "";
        });

        if(temp.join('').length < 10)
            return false;
        if (temp.join('')[0] === '1' && temp.join('').length === 11)
        {
            console.log(temp);
            console.log(temp.join(''));
            //american phone number starts with country code
            let temp2 = temp.splice(1, temp.length - 1);
            console.log(temp2);
            if(temp2.length > 10){
                //temp2 becomes a string
                temp2 = temp2.join('');
                console.log(typeof(temp2))
                temp = temp2;
                console.log(typeof(temp2));
                console.log(temp);
            }
        } else {
            temp = temp.join('');
            console.log(temp);
        }
        
        if (temp.length === 10)
        {
            console.log(regex.test(input))
            console.log(temp);
            console.log(input);
            return regex.test(input) ? true : false;
        }
        else {
            return false;
        }
    }
}

//check if input is empty
function isEmpty (input)
{
    if (input === '') 
    {
        return true;
    }
    return false;
}

//update HTML
function update()
{
    const empty = isEmpty(userInput.value);
    if (Validation(userInput.value, inputValidationRegex))
    {
        resultArea.innerText = `Valid US number: ${userInput.value}`;
    } else if (!Validation(userInput.value, inputValidationRegex) && !empty) {
        resultArea.innerText = `Invalid US number: ${userInput.value}`;
    }
}

//clear button function
function clear()
{
    resultArea.innerText = "";
    userInput.value = "";
}