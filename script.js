const numbersNodeList = document.querySelectorAll('.number')
const operatorsNodeList = document.querySelectorAll('.operator')
const displayElement = document.querySelector('.display')
const clearButtonElement = document.querySelector('.button__clear')
const equalsButtonElement = document.querySelector('.button__equals')
const deleteButtonElement = document.querySelector('.button__delete')

displayElement.innerText = null

const add = (a, b) => a + b
const subtract = (a, b) => a - b
const multiply = (a, b) => a * b
const divide = (a, b) => a / b

const compute = (num1, num2, operator) => {
  switch (operator) {
    case '+':
      return add(+num1, +num2)

    case '-':
      return subtract(num1, num2)

    case '*':
      return multiply(num1, num2)

    case '/':
      return num2 == 0 ? 'cannot divide by zero' : divide(num1, num2)

    default:
      return 'invalid operator'
  }
}

function updateFontSize() {
  const text = displayElement.innerText
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  context.font =
    getComputedStyle(displayElement).fontSize +
    ' ' +
    getComputedStyle(displayElement).fontFamily
  const textWidth = context.measureText(text).width

  const maxTextWidth =
    5.5 * parseFloat(getComputedStyle(displayElement).fontSize) // Maximum width for 6 characters
  const fontSize =
    textWidth <= maxTextWidth ? '2rem' : `${(2 * maxTextWidth) / textWidth}rem`

  displayElement.style.fontSize = fontSize
}

// eventHandlers

const populateDisplay = (e) => {
  if (typeof e === 'object') {
    displayElement.innerText += e.target.innerText
  } else {
    displayElement.innerText += e
  }
  updateFontSize()
}

const clearDisplay = () => (displayElement.textContent = null)

const deleteCharacter = () => {
  displayElement.innerText = displayElement.innerText.slice(0, -1)
  updateFontSize()
}

const operate = () => {
  const userInput = displayElement.innerText
  const operands = userInput.split(/[+\-*\/]/)
  const operators = userInput
    .split('')
    .filter((el) => el === '+' || el === '-' || el === '*' || el === '/')

  let i = 0
  let computed = [...operands]

  while (i < operators.length) {
    const result = compute(computed[0], computed[1], operators[i])
    computed.splice(0, 2, result)
    i++
  }

  displayElement.innerText = computed[0]
  updateFontSize()
}

const handleKeyPress = (e) => {
  const dataKeys = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
    '+',
    '-',
    '*',
    '/',
    '.',
  ]

  if (dataKeys.includes(e.key)) {
    populateDisplay(dataKeys.find((key) => key === e.key))
  }

  if (e.key === 'Enter') {
    operate()
  }

  if (e.key === 'c' || e.key === 'C' || e.key === 'Escape') {
    clearDisplay()
  }

  if (e.key === 'Backspace' || e.key === 'Delete') {
    deleteCharacter()
  }
}

// eventListeners

numbersNodeList.forEach((number) =>
  number.addEventListener('click', populateDisplay)
)
operatorsNodeList.forEach((operator) =>
  operator.addEventListener('click', populateDisplay)
)

clearButtonElement.addEventListener('click', clearDisplay)

deleteButtonElement.addEventListener('click', deleteCharacter)

equalsButtonElement.addEventListener('click', operate)

document.addEventListener('keydown', handleKeyPress)
