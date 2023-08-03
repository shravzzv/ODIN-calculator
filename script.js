/* Understand the problem:
    Write an operate function which has access to user input variable which is a string containing operands and operators such as "1+1" or "2*4+5".The function needs to compute the result of the all operations one at a time starting from the left and update the displayElement.innerText with the result.

    Plan:
      Input: none
      Ouput: none

    Pseudocode:
      split the user input into an array of operands
      make an array of operators from the user input
      loop through the operands performing an operation using the operators
  */

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

function populateDisplay(e) {
  displayElement.innerText += e.target.innerText
}

const clearDisplay = () => {
  displayElement.textContent = null
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
    /* 
    start of loop:
    i = 0
    operators = ["+", "+"]
    operands = ["1", "2", "3"]
    computed = [1, 2, 3] 

    result = 1 + 2 = 3
    can use splice: computed.splice(0, 2, result)
    // next
    computed = [3, 3]
    result = 3 + 3 = 6

    computed.splice(0, 2, result); will be []
    but i = 1
    // end of loop
    computed = [6]
    result = 6
    */
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
