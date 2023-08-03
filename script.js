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

// eventHandlers

const populateDisplay = (e) => {
  displayElement.innerText += e.target.innerText
}

const clearDisplay = () => {
  displayElement.textContent = null
}

const deleteCharacter = () => {
  displayElement.innerText = displayElement.innerText.slice(0, -1)
}

const operate = () => {
  const userInput = displayElement.innerText
  const operands = userInput.split(/[+\-*\/]/)
  const operators = userInput
    .split('')
    .filter((el) => el === '+' || el === '-' || el === '*' || el === '/')
  console.log(userInput, operands, operators)

  let i = 0
  let computed = [...operands]

  while (i < operators.length) {
    const result = compute(computed[0], computed[1], operators[i])
    computed.splice(0, 2, result)
    i++
  }

  displayElement.innerText = computed[0]
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

deleteButtonElement.addEventListener('click', deleteCharacter)
