const textInputElement = document.querySelector("#text-input");
const checkBtnElement = document.querySelector("#check-btn");
const resultElement = document.querySelector("#result");
let isEmpty = false;
let isPalindrome = false;
const regexFilter = /[a-z0-9]+/ig;
///[\d\s\+-=!@#$%^&*(){}:]/g;

//let goodCharsArray = textInputElement.value.match(regexFilter);




function inputNotEmpty() 
{
    const arrayOfInputChars = textInputElement.value.split("");
    if (arrayOfInputChars.length > 0)
        return true;
    else
        return false;

}

function emptyInput(bool) {
    if (!bool)
        alert("Please input a value");
}

function isTheStringPalindrome() 
{
    const matchedLetters = textInputElement.value.match(regexFilter);
    let placeholder = "";
    for (let name of matchedLetters) {
        placeholder += name;
        console.log(placeholder);
    }
    const goodCharsArray = placeholder.split("");
    let i = goodCharsArray.length - 1;
    for(let j = 0 ; j < goodCharsArray.length ; j++)
    {
        if (goodCharsArray[i].toLowerCase() === goodCharsArray[j].toLowerCase())
        {
            isPalindrome = true;
            i--;
        }
        else
        {
            isPalindrome = false;
            return isPalindrome;
        }
    }
    return isPalindrome;
}

const update = () => {
    
        //the string is not empty!
        
        if (isTheStringPalindrome()) 
        {
            resultElement.innerText = `${textInputElement.value} is a palindrome`;
        } else {
            resultElement.innerText = `${textInputElement.value} is not a palindrome`;
        }
}

const collector = () => {
    if (inputNotEmpty()) {
        update();
    } else {
        emptyInput(inputNotEmpty());
    }
}