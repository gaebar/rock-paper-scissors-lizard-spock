window.addEventListener('DOMContentLoaded', () => {

  let userScore = 0
  let computerScore = 0
  const userScoreSpan = document.getElementById('user-score')
  const computerScoreSpan = document.getElementById('computer-score')
  const resultParagraph = document.querySelector('.result > p')

  const initialAudio = document.querySelector('#audio')
  const playBtn = document.querySelector('#play')

  const instructionsAudio = document.querySelector('#audio-instructions')
  const instructionsBtn = document.querySelector('#play-instructions')

  const resetBtn = document.querySelector('#reset')

  const sectionElement = document.querySelector('section')

  const rockDiv = document.getElementById('r')
  const paperDiv = document.getElementById('p')
  const scissorsDiv = document.getElementById('s')
  const lizardDiv = document.getElementById('l')
  const spockDiv = document.getElementById('sp')

  //select one random option from the array of choices
  function getComputerChoice() {
    const choices = ['r', 'p', 's', 'l', 'sp']
    const randomNumber = Math.floor(Math.random() * choices.length)
    return choices[randomNumber]
  }
  // translate letter choice to word
  function convertToWord(letter) {
    if (letter === 'r') return 'Rock'
    if (letter === 'p') return 'Paper'
    if (letter === 's') return 'Scissors'
    if (letter === 'l') return 'Lizard'
    return 'Spock'
  }

  // adds classes when button is clicked, and plays initial audio
  playBtn.addEventListener('click', () => {
    sectionElement.classList.add('animated')
    sectionElement.classList.add('started-playing')
    initialAudio.play()
    setTimeout(() => {
      sectionElement.classList.remove('animated')
    }, 2000)
    instructionsAudio.pause()
  })

  instructionsBtn.addEventListener('click', () => {
    instructionsAudio.load()
    instructionsAudio.play()

  })

  // When the reset button is clicked we reset the user and computer scores and restart the game
  resetBtn.addEventListener('click', () => {
    computerScore = 0
    userScore = 0
    userScoreSpan.innerHTML = userScore
    computerScoreSpan.innerHTML = computerScore
    resultParagraph.innerHTML = 'Press Play to start a new game'
    sectionElement.classList.remove('started-playing')
    instructionsAudio.pause()
  })

  // increases score and update result when the user wins
  function win(userChoice, computerChoice) {
    userScore++
    userScoreSpan.innerHTML = userScore
    computerScoreSpan.innerHTML = computerScore
    resultParagraph.innerHTML = `${convertToWord(userChoice)} beats ${convertToWord(computerChoice)}. You win!`

  }

  // increases the computer score and update the interface accordingly when the computer wins
  function lose(userChoice, computerChoice) {
    computerScore++
    computerScoreSpan.innerHTML = computerScore
    computerScoreSpan.innerHTML = computerScore
    resultParagraph.innerHTML = `${convertToWord(userChoice)} loses to ${convertToWord(computerChoice)}. You lost!`
  }

  // updates the interface when there is a draw
  function draw(userChoice, computerChoice) {
    resultParagraph.innerHTML = `${convertToWord(userChoice)} equals ${convertToWord(computerChoice)}. It's a draw!`
  }

  // maps the user and computer choices to a result
  function game(userChoice) {
    const computerChoice = getComputerChoice()
    switch (userChoice + computerChoice) {
      case 'rs':
      case 'rl':
      case 'pr':
      case 'psp':
      case 'sp':
      case 'pl':
      case 'lp':
      case 'lsp':
      case 'sps':
      case 'spr':
        win(userChoice, computerChoice)
        break

      case 'rr':
      case 'pp':
      case 'ss':
      case 'll':
      case 'spsp':
        draw(userChoice, computerChoice)
        break

      default:
        lose(userChoice, computerChoice)

    }
  }

  // initialize the game

  function main() {
    rockDiv.addEventListener('click', () => {
      game('r')
    })
    paperDiv.addEventListener('click', () => {
      game('p')
    })
    scissorsDiv.addEventListener('click', () => {
      game('s')
    })
    lizardDiv.addEventListener('click', () => {
      game('l')
    })
    spockDiv.addEventListener('click', () => {
      game('sp')
    })
  }

  main()
})
