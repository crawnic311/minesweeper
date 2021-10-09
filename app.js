//Timer

//Beginner Grid
const beginnerGrid = document.querySelector('.beginner-grid')
let width = 9
let window = []

//create window 
function createWindow(event) {
    for(let i = 0; i < width*width; i++) {
        const square = document.createElement('div')
        square.setAttribute('id', i)
        beginnerGrid.appendChild(square)
        window.push(square)
    }
}

const beginnerButton = document.getElementById('#beginner-button')
beginnerButton.addEventListener('click', testColor())

 


















