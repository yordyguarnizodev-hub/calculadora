function getTheElementValue(id) {
  return document.getElementById(id).value;
}

let addition = (value1, value2) => value1 + value2;

let substraction = (value1, value2) => value1 - value2;

let multiplication = (value1, value2) => value1 * value2;

let division = (value1, value2) => value1 / value2;

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
