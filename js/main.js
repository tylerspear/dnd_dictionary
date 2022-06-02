//DND API URL
const url = `https://www.dnd5eapi.co/api/monsters`

//UL to append monster names to
const indexEl = document.getElementById('index-list')

//monster data elements
const monsterName = document.getElementById('monster-name')
const monsterSize = document.getElementById('size')
const monsterType = document.getElementById('type')
const monsterAlign = document.getElementById('alignment')
const monsterArmor = document.getElementById('armor-class')
const monsterHP = document.getElementById('hit-points')
const monsterHD = document.getElementById('hit-dice')
const monsterSpeed = document.getElementById('speed')
const monsterProficiencies = document.getElementById('proficiencies')
const monsterSenses = document.getElementById('senses')
const monsterLangs = document.getElementById('languages')
const monsterCR = document.getElementById('challenge-rating')
const monsterXP = document.getElementById('xp')
const monsterSpecials = document.getElementById('specials')
const monsterActions = document.getElementById('actions')

fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
        //loop through each monster, create an LI for each and append to the UL
        data.results.forEach(element => {
            let li = document.createElement('li')
            li.classList.add('index-item')
            li.dataset.index = element.index
            li.textContent = element.name
            indexEl.appendChild(li)
        })
    })
    //add listers to the LI's that will retreive the data-index attribute 
    //and pass that into the API to retreive a singular monster
    .then(addClickListeners)
    .catch(err => {
        console.log(`error ${err}`)
    });


function addClickListeners(){
    //get all the li's in the monster list
    let listItems = document.querySelectorAll('.index-item')

    //add a click listener to each
    listItems.forEach(el => el.addEventListener('click', () => {
        //get the data-index attribute
        let index = el.getAttribute('data-index')
        //pass that index into the API call
        fetch(`https://www.dnd5eapi.co/api/monsters/${index}`)
            .then(res => res.json())
            .then(data => {
                getMonster(data)
            })
            .catch(err => {
                console.log(`error ${err}`)
            })
    }))
}

function getMonster(obj){
    console.log(obj)
    monsterName.textContent = obj.name
    monsterSize.textContent = obj.size.toLowerCase()
    monsterType.textContent = obj.type
    monsterAlign.textContent = obj.alignment
    monsterArmor.textContent = obj.armor_class
    monsterHP.textContent = obj.hit_points
    monsterHD.textContent = ` (${obj.hit_dice})`
    monsterSpeed.textContent = ''
    createAttributeList(obj.speed, monsterSpeed)

    //update proficiencies by looping over array of objects
    monsterProficiencies.textContent = ''
    obj.proficiencies.forEach(el => {
        let li = document.createElement('li')
        li.textContent = `${el.proficiency.name} +${el.value}`
        monsterProficiencies.appendChild(li)
    })
    createAttributeList(obj.senses, monsterSenses)
    monsterLangs.textContent = obj.languages
    monsterCR.textContent = obj.challenge_rating
    monsterXP.textContent = obj.xp

    //update specials by looping over array of objects
    monsterSpecials.textContent = ''
    obj.special_abilities.forEach(el => {
        let li = document.createElement('li')
        li.textContent = `${el.name}: ${el.desc}`
        monsterSpecials.appendChild(li)
    })

    //update actions by looping over array of objects
    monsterActions.textContent = ''
    obj.actions.forEach(el => {
        let li = document.createElement('li')
        li.textContent = `${el.name}: ${el.desc}`
        monsterActions.appendChild(li)
    })

}

function createAttributeList(obj, parent){
    parent.textContent = ''
    for(el in obj){
        let li = document.createElement('li')
        li.textContent = `${el}: ${obj[el]}`
        parent.appendChild(li)
    }
}