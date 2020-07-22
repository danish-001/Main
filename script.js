// 2.
// To store all the information about operations and input/output
class Calculator {
  constructor(previousOperandText, currentOperandText) {
    this.previousOperandText = previousOperandText
    this.currentOperandText = currentOperandText
    this.clear()
  }

  // To clear the screen
  clear() {
    this.previousOperand = 0;
    this.currentOperand = 0;
    this.operation = '';
  }

  // To delete the digits one by one
  delete() {
    this.currentOperand = this.currentOperand.toString().length > 0 ? this.currentOperand.toString().slice(0, -1) : 0 
  }
 
  // To add a number to the screen everytime you click in the numbers
  appendNumber(number) {
    
    if (number === '.' && this.currentOperand.includes('.')) return 0
    if (this.currentOperand == 0) {
      this.currentOperand = `${number}`
      console.log(this.currentOperand)
      return true
    }
    this.currentOperand = `${this.currentOperand}${number}`
    console.log(this.currentOperand)
  }

  // Yeah you guessed it right
  chooseOperations(operation) {
    if (this.currentOperand === "") return ''
    
    if (this.previousOperand !== "") { 
      this.compute();
    }
    this.operation = operation
    this.previousOperand = this.currentOperand // assigning output value to history value
    this.currentOperand = 0
  }

  // Take values and compute a single value
  compute() {

    let computation;

    // Converting both strings to a number
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)

    // If there is nothing in the screen
    if (isNaN(prev) || isNaN(current)) return 0
    
    switch (this.operation) {
      case '+':
        computation = prev + current;
        break
      case '-':
        computation = prev - current;
        break
      case '*':
        computation = prev * current;
        break
      case '%':
        computation = prev / current;
        break
      default:
        return 0
    }

    // To clear out the screen
    this.previousOperand = ''
    this.operation = ''
    this.currentOperand = computation
    
  }

  getDisplayNumber(number) {

    // Converting the number to a string so we can split that string
    const stringNumber = number.toString()

    // To split the number into an array where integer digits 
    // and decimal digits will be separeted by a .
    let integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]

    // To overcome the problem of not having the . in the beginning
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDigits = '';
    } else { 
      integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits : 0})
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  // To let us update the display
  updateDisplay() {

    this.currentOperandText.innerText = this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandText.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
    } else {
      this.previousOperandText.innerText = 0
    }
  }
}

// 1.
// Get all the data and asign it to a constant
const numberButtons = document.querySelectorAll('.number')
const operatorButtons = document.querySelectorAll('.operator');

const equalsButton = document.getElementById('equals');
const deleteButton = document.getElementById('delete');
const allClearButton = document.getElementById('allclear');

const previousOperandText = document.getElementById('history')
const currentOperandText = document.getElementById('output')

// Creating an object for the class
const calculator = new Calculator(previousOperandText, currentOperandText)

// To append text of every number and updating the display at the same time
numberButtons.forEach(button => { 
  button.addEventListener("click", () => { 
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  })
})

// For operations
operatorButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.chooseOperations(button.innerText);
    calculator.updateDisplay();
  })
})

equalsButton.addEventListener('click', button => { 
  calculator.compute();
  calculator.updateDisplay();
})

allClearButton.addEventListener('click', (button) => {
  calculator.clear();
  calculator.updateDisplay();
})

deleteButton.addEventListener('click', (button) => {
  calculator.delete();
  calculator.updateDisplay();
})