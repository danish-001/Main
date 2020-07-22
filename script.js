// To store all the information about operations and input/output
class Calculator {
  constructor(previousOperandText, currentOperandText) {
    this.previousOperandText = previousOperandText
    this.currentOperandText = currentOperandText
    this.clear()
  }

  clear() {
    this.previousOperand = '';
    this.currentOperand = '';
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }
 
  // To add a number to the screen everytime you click in the numbers
  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  // Yeah you guessed it right
  chooseOperations(operation) {
    if (this.currentOperand === "") return
    if (this.previousOperand !== "") { 
      this.compute();
    }
    this.operation = operation
    this.previousOperand = this.currentOperand // assigning output value to history value
    this.currentOperand = ''
  }

  // Take values and compute a single value
  compute() {
    let computation;

    // Converting string to number
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);

    // If there is nothing in the screen
    if (isNaN(prev) || isNaN(current)) return
    
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
        return
    }

    // To clear out the screen
    this.currentOperand = computation
    this.previousOperand = ''
    this.operation = undefined
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()

    // To split the number into an array where integer digits 
    // and decimal digits will be separeted by a.
    const integerDigits = parseFloat(stringNumber.split('.'), [0])
    const decimalDigits = stringNumber.split('.')[1]

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
      this.previousOperandText.innerText = `${this.thisgetDisplayNumber(this.previousOperand)} ${this.operation}`;
    } else {
      this.previousOperandText.innerText = ''
    }
  }
}

// Get all the data and asign it to a constant
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");

const equalsButton = document.getElementById("#=");
const deleteButton = document.getElementById('#delete')
const allClearButton = document.getElementById("#allclear");

const previousOperandText = document.getElementById("#history-value");
const currentOperandText = document.getElementById("#output-value");

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

equalsButton.addEventListener("click", button => { 
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