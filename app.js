
const beginnerBtn = document.getElementById('beginner-button')
const smileyReset = document.getElementById('smiley')

beginnerBtn.addEventListener('click', createGrid)
beginnerBtn.addEventListener('click', minesRemaining)
smileyReset.addEventListener('click', resetGrid)


const grid = document.getElementById('gridM')
let width = 9
let squares = []
let bombs = 20
let isGamerOver = false 
let flags = 0
let checked = 0
let mines = document.getElementById('mines')
let timer = document.getElementById('timer')
let totalSeconds = 0
let timeStarted = false
let matches = 0
let timerVar = 0
let smiley = document.getElementById('smiley')



function createGrid() {

    //add Flag with right click
    function addFlag(square) {
    if(isGamerOver) return
    if(!square.classList.contains('checked') && (flags < bombs)) {
        if(!square.classList.contains('flag')) {
            square.classList.add('flag')
            square.innerHTML = '🚩'
            flags ++
            minesRemaining()
            checkForWin()
        } else {
            square.classList.remove('flag')
            square.innerHTML = ''
            flags --
            minesRemaining()
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
        const square = document.createElement('div')
        square.setAttribute('id', i)
        square.classList.add(shuffledArr[i])
        grid.appendChild(square)
        squares.push(square)

        //normal click
        square.addEventListener('click', function(e) {
            click(square)
        })

        //control and left click
        square.oncontextmenu = function(e) {
            e.preventDefault()
            addFlag(square)
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





function click(square) {
   
    //Start timer
    if(timeStarted === false) {
        timerVar = setInterval(timerStart, 1000);
        timeStarted = true
    }
    

    let currentId = square.id
    if(isGamerOver) return
    if(square.classList.contains('checked') || square.classList.contains('flag')) return
    if(square.classList.contains('bomb')) {
        gameOver(square)
    } else {
        minesRemaining()
        let total = square.getAttribute('data')
        if(total !=0) {
            square.classList.add('checked')
            checked ++
            square.innerHTML = total
            checkForWin()
            return
        }
        checkSquare(square, currentId)
    }
    square.classList.add('checked')
}

//Checking surrounding squares after square is clicked
function checkSquare(square, currentId) {
    const isLeftEdge = (currentId % width === 0)
    const isRightEdge = (currentId % width === width -1)
    checked ++
    checkForWin()

    setTimeout(() => {
        if(currentId > 0 && !isLeftEdge) {
            const newId = squares[parseInt(currentId) - 1].id
            const newSquare = document.getElementById(newId)
            click(newSquare)
            
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
        if(currentId > 10 && !isLeftEdge) {
            const newId = squares[parseInt(currentId) - 1 - width].id
            const newSquare = document.getElementById(newId)
            click(newSquare)
        }
        if(currentId < 80 && !isRightEdge) {
            const newId = squares[parseInt(currentId) + 1].id
            const newSquare = document.getElementById(newId)
            click(newSquare)
        }
        if(currentId < 72 && !isLeftEdge) {
            const newId = squares[parseInt(currentId) - 1 + width].id
            const newSquare = document.getElementById(newId)
            click(newSquare)
        }
        if(currentId < 70 && !isRightEdge) {
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
function gameOver(square) {
    console.log("Game Over Loser!")
    isGamerOver = true

    //show All bombs
    squares.forEach(square => {
        if(square.classList.contains('bomb')) {
            square.innerHTML = '💣'
        }
    })
    smiley.textContent = "😵"
    clearInterval(timerVar)
}

//Check for Win Function
function checkForWin() {
    //let matches = 0

    for(let i = 0; i < squares.length; i++) {
        if(squares[i].classList.contains('flag') && squares[i].classList.contains('bomb')) {
            matches ++
        }
        if(matches === bombs || checked === width * width - bombs) {
            //console.log('You won')
            alert("You Won!")
              //Flag all bombs
            squares.forEach(square => {
                if(square.classList.contains('bomb')) {
                    square.innerHTML = '🚩'
                }
            })
            isGamerOver = true
            smiley.innerText = "😎"
        }
   
    }
}

//Mine Counter Initialization
function minesRemaining() {
     mines.textContent = bombs - flags
}

//Timer Initialization
function timerStart() {
    
    ++totalSeconds
    var seconds = totalSeconds 

    if(seconds < 10)
       seconds = "00"+seconds
    timer.innerHTML = seconds
    timestarted = true
    
}


function resetGrid() {
    for(let i = 0; i < width * width; i++) {
       let deleteSquare = document.getElementById(i)
       deleteSquare.parentNode.removeChild(deleteSquare) 
    }
    squares = []
    matches = 0
    checked = 0
    timeStarted = false
    totalSeconds = 0
    clearInterval(timerVar)
    timer.innerHTML = "000"
    flags = 0
    smiley.innerText = "🙂"
    isGamerOver = false
    createGrid()
}

