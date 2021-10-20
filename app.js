
const beginnerBtn = document.getElementById('beginner-button')

beginnerBtn.addEventListener('click', createGrid)


const grid = document.getElementById('gridM')
let width = 9
let squares = []

function createGrid() {
    for(let i = 0; i < width * width; i++) {
        const gridChild = document.createElement('div')
        gridChild.setAttribute('id', i)
        grid.appendChild(gridChild)
        squares.push(gridChild)
    }
}

function changeColor() {
    beginnerBtn.style.backgroundColor = "black"
}

