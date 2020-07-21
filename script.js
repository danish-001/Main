// To store all the information about operations and input/output
class Calculator{ 
  constructor(historyValue, outputValue){ 
    this.historyValue = historyValue;
    this.outputValue = outputValue;
    this.clear();
  }

  clear() { 
    this.historyValue = "";
    this.outputValue = "";
    this.operation = undefined;
  }

  delete() { 
  }

  // To add a number to the screen everytime you click in the numbers
  appendNumber(number) { 
  }

  // Yeah you guessed it right
  chooseOperations(operation) { 
  }

  // Take values and compute a single value
  compute() { 
  }

  // To let us update the display
  updateDisplay() { 
  }
}

// Get all the data and asign it to a constant
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");

const equalsButton = document.getElementById("#=");
const deleteButton = document.getElementById("#delete");
const allClearButton = document.getElementById("#allclear");

const historyValue = document.getElementById("#history-value");
const outputValue = document.getElementById("#output-value");

// Creating an object for the class
const calculator = new Calculator()

// To append text of every number and updating the display at the same time
numberButtons.forEach(button => { 
  button.addEventListener("click", () => { 
    calculator.appendNumber(number.innerText);
    calculator.updateDisplay();
  })
})
