
const beginnerBtn = document.getElementById('beginner-button')

beginnerBtn.addEventListener('click', createGrid)


const grid = document.getElementById('gridM')
let width = 9
let squares = []
let bombs = 20

function createGrid() {
    for(let i = 0; i < width * width; i++) {
        const gridChild = document.createElement('div')
        gridChild.setAttribute('id', i)
        gridChild.classList.add(shuffledArray[i])
        grid.appendChild(gridChild)
        squares.push(gridChild)
    }
    bombPopulate()
}

function changeColor() {
    beginnerBtn.style.backgroundColor = "black"
}


function bombPopulate() {
    const bombsArr = Array(bombs).fill('bomb')
    const emptyArr = Array(width * width - bombs).fill('valid')
    const gamesArr = emptyArr.concat(bombsArr)
    const shuffledArr = gamesArr.sort(() => Math.random() - 0.5)
    
   
}
