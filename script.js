const numbersNodeList = document.querySelectorAll('.number')
const operatorsNodeList = document.querySelectorAll('.operator')
const displayElement = document.querySelector('.display')
const clearButtonElement = document.querySelector('.button__clear')
const equalsButtonElement = document.querySelector('.button__equals')

displayElement.innerText = null

const add = (a, b) => a + b
const subtract = (a, b) => a - b
const multiply = (a, b) => a * b
const divide = (a, b) => a / b

// eventHandlers

function populateDisplay(e) {
  displayElement.innerText += e.target.innerText
}

const clearDisplay = () => {
  displayElement.textContent = null
}

const operate = () => {
  let operand1, operator, operand2
  const userInput = displayElement.innerText
  const operatorIndex = userInput.search(/[+\-*\/]/gi)

  operand1 = parseInt(userInput.slice(0, operatorIndex))
  operand2 = parseInt(userInput.slice(operatorIndex + 1))
  operator = userInput.slice(operatorIndex, operatorIndex + 1)

  displayElement.innerText =
    operator === '+'
      ? add(operand1, operand2)
      : operator === '-'
      ? subtract(operand1, operand2)
      : operator === '*'
      ? multiply(operand1, operand2)
      : operator === '/'
      ? divide(operand1, operand2)
      : 'invalid operator'
}

// eventListeners

numbersNodeList.forEach((number) =>
  number.addEventListener('click', populateDisplay)
)
operatorsNodeList.forEach((operator) =>
  operator.addEventListener('click', populateDisplay)
)

clearButtonElement.addEventListener('click', clearDisplay)

equalsButtonElement.addEventListener('click', operate)
