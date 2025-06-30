const userInput = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const output = document.getElementById("output")


convertBtn.addEventListener("click", ConvertInput)


function Validation(input) 
{
    let inputIsValid = false;
    let onlyNumbers = /^\d+$/.test(input);
    

    if ( (input === "" || !onlyNumbers) && input[0] !== '-') 
    {
        output.innerText = "Please enter a valid number";
        return inputIsValid;
    }

    if (parseInt(input) < 0)
    {
        output.innerText = "Please enter a number greater than or equal to 1";
        return inputIsValid;
    }

    if (parseInt(input) > 3999) 
    {
        output.innerText = "Please enter a number less than or equal to 3999";
        return inputIsValid;
    }

    return !inputIsValid;
}

function ConvertInput()
{
    
    const input = userInput.value.trim();
    const isValid = Validation(input);
    Validation(input);
    let arabicNumber = parseInt(input)

    const romanValues = [
        ['M', 1000],
        ['CM', 900],
        ['D', 500],
        ['CD', 400],
        ['C', 100],
        ['XC', 90],
        ['L', 50],
        ['XL', 40],
        ['X', 10],
        ['IX', 9],
        ['V', 5],
        ['IV', 4],
        ['I', 1]
    ];
    
    const romanNumber = [];

    if (isValid)
    {
        romanValues.forEach(function (arr) {
            while (arabicNumber >= arr[1])
            {
                romanNumber.push(arr[0]);
                arabicNumber -= arr[1];
            }
        });
        
        output.innerText = romanNumber.join('');
    }
}