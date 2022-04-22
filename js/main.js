//DND API URL
const url = `https://www.dnd5eapi.co/api/monsters`
//UL to append monster names to
const indexEl = document.getElementById('index-list')
//monster data elements
const monsterName = document.getElementById('monster-name')

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
    let listItems = document.querySelectorAll('.index-item')

    listItems.forEach(el => el.addEventListener('click', () => {
        let index = el.getAttribute('data-index')
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
    monsterName.textContent = obj.name
}
