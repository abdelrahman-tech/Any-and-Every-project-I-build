const resultElement = document.getElementById("result");
const inputElement = document.getElementById("search-input");
const searchBtnElement = document.getElementById("search-button");
const creatureNameElement = document.getElementById("creature-name");
const creatureIdElement = document.getElementById("creature-id");
const weightElement = document.getElementById("weight")
const heightElement = document.getElementById("height");
const typesElement = document.getElementById("types");
const tableElement = document.getElementById("table");


/*
Needed functions for the program:

1. class to store the creatures data.

2. validate the input: letters & numbers, no special characters.

3. deal with the input and search for the data

4. save it in the class element.

5. update the HTML & UI.
*/

class Creature {
    constructor(name, id, weight, height, hp, attack, defense, specialAttack, specialDefense, speed, types) {
        this.name = name;
        this. id = id;
        this.weight = weight;
        this.height = height;
        this.hp = hp;
        this.attack = attack;
        this.defense = defense;
        this.specialAttack = specialAttack;
        this.specialDefense = specialDefense;
        this.speed = speed;
        this.types = types;
    }
}

const Valid = input => {
    const regex = /[\W_]/g;
    return !(regex.test(input))
}


async function FetchAndDeliverData(input) {
    // The input must be lower case
    try {
        //array of objects
        const validNameOrIdObject = await fetch("https://rpg-creature-api.freecodecamp.rocks/api/creatures").then(value => value.json());
        //create IF statement
        //if input is name => search using the name
        // else if it was a number => search using the ID
        if (isNaN(input)) {
            //check if the name is in the array of objects
            let valid = false;
            for(object in validNameOrIdObject) {
                if (input.toLowerCase() === validNameOrIdObject[object].name.toLowerCase()) {
                    valid = true;
                    break;
                }
            }

            if(valid){
                const creatureDataUsingName = await fetch(`https://rpg-creature-api.freecodecamp.rocks/api/creature/${input.toLowerCase()}`).then(value => value.json());
                const {height, id, name, stats, types, weight} = creatureDataUsingName;
                //stats and types are arrays of objects.
                return {
                    name: name,
                    id: id,
                    height: height,
                    weight: weight,
                    stats: stats,
                    types: types
                };
            } else {
                alert("Creature not found");
                resultElement.style.display = "none";
                return;
            }
        } else if (Number(input) > 0) {
            //check if the id is in the array of objects
            let valid = false;
            for(object in validNameOrIdObject) {
                if (Number(input) === Number(object) + 1) {
                    valid = true;
                    break;
                }
            }

            if(valid){
                const creatureDataUsingId = await fetch(`https://rpg-creature-api.freecodecamp.rocks/api/creature/${Number(input)}`).then(value => value.json());
                const {height, id, name, stats, types, weight} = creatureDataUsingId;
                //stats and types are arrays of objects.
                
                return {
                    name: name,
                    id: id,
                    height: height,
                    weight: weight,
                    stats: stats,
                    types: types
                };
            } else {
                alert("Creature not found");
                resultElement.style.display = "none";
                return;
            }
        
        } else {
            alert("Creature not found");
            resultElement.style.display = "none";
            return;
        }
    } catch (error) {
        console.log(error);
    }
}

const Update = async (input, valid) => {
    if(valid) {
        const data = await FetchAndDeliverData(input);
        const creature = new Creature(data.name, data.id, data.weight, data.height, data.stats['0'].base_stat, data.stats['1'].base_stat, data.stats['2'].base_stat, data.stats['3'].base_stat, data.stats['4'].base_stat, data.stats['5'].base_stat, data.types);
        let HTMLElementForTypes = ``;
        for(object in data.types){
            HTMLElementForTypes += `<p>${data.types[object].name.toUpperCase()}</p>`;
        }
        resultElement.style.display = "block";
        tableElement.style.display = "block";
        resultElement.innerHTML = 
        `
            <div id="info">
                <div id="name-and-id">
                    <h3 id="creature-name">Name: ${creature.name.toUpperCase()}</h3>
                    <h4 id="creature-id">ID: ${creature.id}</h4>
                </div>
                <h4 id="weight">Weight: ${creature.weight}</h4>
                <h4 id="height">Height: ${creature.height}</h4>
                <div id="types">${HTMLElementForTypes}</div>
            </div>
            <div id="perks">
                <table>
                <tr id="perk">
                    <td id=>Perk</td>
                    <td>Stats</td>
                </tr>
                <tr>
                    <td>HP:</td>
                    <td id="hp">${creature.hp}</td>
                </tr>
                <tr>
                    <td>Attack:</td>
                    <td id="attack">${creature.attack}</td>
                </tr>
                <tr>
                    <td>Defense:</td>
                    <td id="defense">${creature.defense}</td>
                </tr>
                <tr>
                    <td>Sp. Attack:</td>
                    <td id="special-attack">${creature.specialAttack}</td>
                </tr>
                <tr>
                    <td>Sp. Defense:</td>
                    <td id="special-defense">${creature.specialDefense}</td>
                </tr>
                <tr>
                    <td>Speed:</td>
                    <td id="speed">${creature.speed}</td>
                </tr>
                </table>
            </div>`;

    } else {
        alert("Creature not found");
        return;
    }
}

searchBtnElement.addEventListener("click", () => {
    const input = inputElement.value.trim();
    const isValid = Valid(input);
    Update(input.toLowerCase(), isValid);
})