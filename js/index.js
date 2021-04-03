let page = 1

document.addEventListener('DOMContentLoaded', () => {
    loadMonsters()
    createMonster()
    loadFiftyNew()
    backFifty()
})

function loadMonsters() {
    let container = document.getElementById('monster-container')
    container.innerHTML=''
    fetch(`http://localhost:3000/monsters?_limit=50&_page=${page}`)
        .then(resp => resp.json())
        .then(data => {

            let newDiv = document.createElement('div')
            data.forEach(monster => {

                let hOne = document.createElement('h2')
                let hTwo = document.createElement('h4')
                let paragraph = document.createElement('p')

                hOne.innerHTML = monster.name
                hTwo.innerHTML = monster.age
                paragraph.innerHTML = monster.description

                newDiv.append(hOne)
                newDiv.append(hTwo)
                newDiv.append(paragraph)

                container.appendChild(newDiv)
            })

        });

}

function createMonster() {
    let mainCreate = document.getElementById('create-monster')
    let newForm = document.createElement('form')
    let firstInput = document.createElement('input')
    let secondInput = document.createElement('input')
    let thirdInput = document.createElement('input')
    let fourthInput = document.createElement('input')


    firstInput.type = 'text'
    firstInput.placeholder = 'name...'

    secondInput.type = 'number'
    secondInput.placeholder = 'age...'

    fourthInput.type = 'text'
    fourthInput.placeholder = 'description...'

    thirdInput.type = 'submit'
    thirdInput.value = 'Create'





    newForm.append(firstInput)
    newForm.append(secondInput)
    newForm.append(fourthInput)
    newForm.append(thirdInput)

    mainCreate.appendChild(newForm)
    newForm.addEventListener('submit', addNewMonster)

    function addNewMonster(event) {
        event.preventDefault()
        console.log(firstInput.value)
        console.log(secondInput.value)
        console.log(fourthInput.value)

        fetch('http://localhost:3000/monsters', {
            method: 'POST',
            headers:
            {
                "Content-Type": "application/json",
                Accept: "application/json"
            },

            body: JSON.stringify({
                "name": firstInput.value,
                "age": parseInt(secondInput.value),
                "description": fourthInput.value

            })
        })

            .then(() => {
                loadMonsters()

            })
    }

}

function loadFiftyNew() {
    
    let forwardButton = document.getElementById('forward')

    forwardButton.addEventListener('click', nextFifty)
    function nextFifty() {
        page++
        loadMonsters()

    }
}

function backFifty() {
    let backButton = document.getElementById('back')
    backButton.addEventListener('click',back)
    function back() {

        if(page!==1){
            page--
            loadMonsters()
        }
        
    }
}