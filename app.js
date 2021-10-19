let beginnerBtn = document.getElementById('#beginner-button')
console.log(beginnerBtn)
beginnerBtn.addEventListener('click', changeColor)

function changeColor(event) {
    let intBtn = document.getElementById('#intermediate-button')
    intBtn.style.backgroundColor = 'black'
}

changeColor()