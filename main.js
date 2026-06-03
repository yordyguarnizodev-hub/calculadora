let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let emptyArray = [];

console.log(array[1]);

function getTheElementValue(id) {
  return document.getElementById(id).value;
}

function addition(value1, value2) {
  return value1 + value2;
}

function substraction(value1, value2) {
  return value1 - value2;
}

function multiplication(value1, value2) {
  return value1 * value2;
}

function division(value1, value2) {
  return value1 / value2;
}

function findNotNumbers(value1, value2) {
  if (isNaN(value1) || isNaN(value2)) {
    return true;
  }
}

function printErrorMessages(id, message) {
  return (document.getElementById(id).innerHTML = message);
}

function printValues(id, value1, operationSign, value3, finalResult) {
  return (document.getElementById(id).innerHTML =
    `El resultado de ${value1} ${operationSign} ${value3} es igual a ${finalResult}`);
}

function calculate() {
  let numberOne = parseInt(getTheElementValue("numberOne"));
  let numberTwo = parseInt(getTheElementValue("numberTwo"));
  let operator = getTheElementValue("operation");
  let results;

  if (findNotNumbers(numberOne, numberTwo)) {
    printErrorMessages(
      "result",
      "Revisa los datos por favor, no se incluyeron numeros",
    );
  } else if (operator === "+") {
    results = addition(numberOne, numberTwo);
    printValues("result", numberOne, operator, numberTwo, results);
  } else if (operator === "-") {
    results = substraction(numberOne, numberTwo);
    printValues("result", numberOne, operator, numberTwo, results);
  } else if (operator === "*") {
    results = multiplication(numberOne, numberTwo);
    printValues("result", numberOne, operator, numberTwo, results);
  } else if (operator === "/" && numberTwo !== 0) {
    results = division(numberOne, numberTwo);
    printValues("result", numberOne, operator, numberTwo, results);
  } else {
    printErrorMessages("result", "No se puede dividir entre 0");
  }
}

/*
function calculate() {
  let firstNumber = parseInt(document.getElementById("numberOne").value);
  let secondNumber = parseInt(document.getElementById("numberTwo").value);
  const operator = document.getElementById("options").value;
  let result;

  if (operator === "*") {
    result = firstNumber * secondNumber;
  } else if (operator === "+") {
    result = firstNumber + secondNumber;
  } else if (operator === "-") {
    result = firstNumber - secondNumber;
  } else if (operator === "/" && secondNumber != 0) {
    result = firstNumber / secondNumber;
  } else {
    result = "Revisa los datos por favor";
  }

  document.getElementById("result").innerHTML =
    `El resultado de ${firstNumber} ${operator} ${secondNumber} es igual a = ${result}`;
}
*/
/*
function calculateSwitch() {
  let firstNumber = parseInt(document.getElementById("numberOne").value);
  let secondNumber = parseInt(document.getElementById("numberTwo").value);
  let operator = document.getElementById("options").value;
  let result;

  switch (operator) {
    case "*":
      result = firstNumber * secondNumber;
      break;
    case "+":
      result = firstNumber + secondNumber;
      break;
    case "-":
      result = firstNumber - secondNumber;
      break;
    case "/":
      result = firstNumber / secondNumber;
      break;
  }

  document.getElementById("result").innerHTML =
    `El resultado de ${firstNumber} ${operator} ${secondNumber} es igual a = ${result}`;
}
*/
