//Game Vars
let min = 1
let max = 10
let winningNum = getRandomNum(min, max)
let guessesLeft = 3


//UI Elements
const game = document.querySelector('#game')
const minNum = document.querySelector('.min-num')
const maxNum = document.querySelector('.max-num')
const guessBtn = document.querySelector('#guess-btn')
const guessInput = document.querySelector('#guess-input')
const message = document.querySelector('.message')

//Assign UI Min and Max
minNum.textContent = min
maxNum.textContent = max

//Listerners
//playagain listerner - using mouseDown because it doesnt reload autpmatically change it click and trail 
game.addEventListener('mousedown', function(e){
    if (e.target.className === 'play-again'){
        window.location.reload()
    }
})

//
guessBtn.addEventListener('click', function(){
    //this gives a string so have to parse and convert into number
    let guess = parseInt(guessInput.value)
    console.log(guessInput.value)
    //using ifNaN to check if the input value is Not a Number
    if (isNaN(guess) || guess < min || guess > max){
        setmessage(`Please enter a value between ${min} and ${max}`, 'red')
    }

    //check IF WON or NOT and Validate the reaming count 
    if (guess === winningNum){
        //IF WON
        gameOver(true, `${winningNum} is Correct... YOU WIN.`)
        // guessInput.disabled = true
        // guessInput.style.borderColor = 'green'
        // //set message
        // setmessage(`${winningNum} is Correct... You WIN.`, 'green')
    } else {
        //IF LOSS
        guessesLeft -= 1
        if (guessesLeft === 0) {
            gameOver(false, `Game Over, you Lost. The correct numb was ${winningNum}`)
            // guessInput.disabled = true
            // guessInput.style.borderColor = 'red'
            // setmessage(`Game Over, you lost. The Correct numb was ${winningNum}`, 'red')
        } else {
            guessInput.style.borderColor = 'red'
            //clear input
            guessInput.value = ''
            setmessage(`Guess is NOT Correct, ${guessesLeft} guesses remaining`, 'red')
        }
    }

})

//Game Over Function
 function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';
    //
    guessInput.disabled = true
    guessInput.style.borderColor = color
    message.style.color = color
    //set message
    setmessage(msg)

    //PLAY AGAIN BTN
    guessBtn.value = 'Play Again'
    guessBtn.className += 'play-again'

 }

//Get WinningNum
function getRandomNum(min, max){
    return Math.floor(Math.random()*(max-min+1)+min)
}

//msg in parameter is above function 
function setmessage(msg, color) {
    message.style.color = color
    message.textContent = msg
}