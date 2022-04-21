//Example fetch using DnD5eAPI - place subclasses in ul
const url = `https://www.dnd5eapi.co/api/monsters`
const indexEl = document.getElementById('index-list')

fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
        data.results.forEach(element => {
            let li = document.createElement('li')
            li.textContent = element.name
            indexEl.appendChild(li)
        })
    })
    .catch(err => {
        console.log(`error ${err}`)
    });


