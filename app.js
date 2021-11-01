
const beginnerBtn = document.getElementById('beginner-button')

beginnerBtn.addEventListener('click', createGrid)


const grid = document.getElementById('gridM')
let width = 9
let squares = []
let bombs = 20
let isGamerOver = false
let flags = 0


function createGrid() {

    //add Flag with right click
    function addFlag(gridChild) {
    if(isGamerOver) return
    if(!gridChild.classList.contains('checked') && (flags < bombs)) {
        if(gridChild.classList.contains('flag')) {
            gridChild.classList.add('flag')
            gridChild.innerHTML = '🚩'
            flags ++
        } else {
            gridChild.classList.remove('flag')
            gridChild.innerHTML = ''
            flags --
        }
    }
}
    beginnerBtn.disabled = true
    const bombsArr = Array(bombs).fill('bomb')
    const emptyArr = Array(width * width - bombs).fill('valid')
    const gamesArr = emptyArr.concat(bombsArr)
    const shuffledArr = gamesArr.sort(() => Math.random() - 0.5)
    console.log(shuffledArr)

    for(let i = 0; i < width * width; i++) {
        const gridChild = document.createElement('div')
        gridChild.setAttribute('id', i)
        gridChild.classList.add(shuffledArr[i])
        grid.appendChild(gridChild)
        squares.push(gridChild)

        //normal click
        gridChild.addEventListener('click', function(e) {
            click(gridChild)
        })

        //control and left click
        gridChild.oncontextmenu = function(e) {
            e.preventDefault()
            addFlag(gridChild)
        }
    }

// add numbers
    for(let i = 0; i < squares.length; i++) {
        let total = 0
        const isLeftEdge = (i % width === 0) 
        const isRightEdge = (i % width === width - 1)

        if(squares[i].classList.contains('valid')) {
            //Left
            if(i > 0 && !isLeftEdge && squares[i - 1].classList.contains('bomb')) total ++
            //Up/Right
            if(i > 8 && !isRightEdge && squares[i + 1 - width].classList.contains('bomb')) total ++
            //Up
            if(i > 9 && squares[i - width].classList.contains('bomb')) total ++
            //Up/Left
            if(i > 10 && !isLeftEdge && squares[i - 1 - width].classList.contains('bomb')) total ++
            //Right
            if(i < 80 && !isRightEdge && squares[i + 1].classList.contains('bomb')) total ++
            //Bottom/Left
            if(i < 72 && !isLeftEdge && squares[i - 1 + width].classList.contains('bomb')) total ++
            //Bottom/Right
            if(i < 70 && !isRightEdge && squares[i + 1 + width].classList.contains('bomb')) total ++
            //Bottom
            if(i < 71 && squares[i + width].classList.contains('bomb')) total ++
            squares[i].setAttribute('data', total)
            
        }
    }
    
}





function click(gridChild) {
    let currentId = gridChild.id
    if(isGamerOver) return
    if(gridChild.classList.contains('checked') || gridChild.classList.contains('flag')) return
    if(gridChild.classList.contains('bomb')) {
        gameOver(gridChild)
    } else {
        let total = gridChild.getAttribute('data')
        if(total !=0) {
            gridChild.classList.add('checked')
            gridChild.innerHTML = total
            return
        }
        checkGridChild(gridChild, currentId)
    }
    gridChild.classList.add('checked')
}

//Checking surrounding squares after square is clicked
function checkGridChild(gridChild, currentId) {
    const isLeftEdge = (currentId % width === 0)
    const isRightEdge = (currentId % width === width -1)

    setTimeout(() => {
        if(currentId > 0 && !isLeftEdge) {
            const newId = squares[parseInt(currentId) - 1].id
            const newSquare = document.getElementById(newId)
            click(newSquare, newId)
        }
        if(currentId > 8 && !isRightEdge) {
            const newId = squares[parseInt(currentId) + 1 - width].id
            const newSquare = document.getElementById(newId)
            click(newSquare)
        }
        if(currentId > 9) {
            const newId = squares[parseInt(currentId -width)].id
            const newSquare = document.getElementById(newId)
            click(newSquare)
        }
        if(currentId > 10) {
            const newId = squares[parseInt(currentId) - 1 - width].id
            const newSquare = document.getElementById(newId)
            click(newSquare)
        }
        if(currentId < 80 && !isRightEdge) {
            const newId = squares[parseInt(currentId) + 1].id
            const newSquare = document.getElementById(newId)
            click(newSquare)
        }
        if(currentId < 72 && isLeftEdge) {
            const newId = squares[parseInt(currentId) - 1 + width].id
            const newSquare = document.getElementById(newId)
            click(newSquare)
        }
        if(currentId < 70 && isRightEdge) {
           const newId = squares[parseInt(currentId) + 1 + width].id
           const newSquare = document.getElementById(newId)
           click(newSquare)
        }
        if(currentId < 71) {
            const newId = squares[parseInt(currentId) + width].id
            const newSquare = document.getElementById(newId)
            click(newSquare)
        }

    }, 10)
}

//game over
function gameOver(gridChild) {
    console.log("Game Over Loser!")
    isGamerOver = true

    //show All bombs
    squares.forEach(square => {
        if(square.classList.contains('bomb')) {
            square.innerHTML = '💣'
        }
    })
}