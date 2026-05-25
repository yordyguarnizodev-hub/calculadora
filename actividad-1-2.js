const getTheElementValue = (id) => document.getElementById(id).value;

const addition = (value1, value2) => value1 + value2;
const substraction = (value1, value2) => value1 - value2;
const multiplication = (value1, value2) => value1 * value2;
const division = (value1, value2) => value1 / value2;

const findEmptyValues = (value1, value2) => value1.trim() === "" || value2.trim() === "";

const findNotNumbers = (value1, value2) => isNaN(value1) || isNaN(value2);

const printErrorMessages = (id, message) => (document.getElementById(id).innerHTML = message);

const printValues = (id, value1, operationSign, value3, finalResult) =>
  (document.getElementById(id).innerHTML = `El resultado de ${value1} ${operationSign} ${value3} es igual a ${finalResult}`);

function calculate() {
  const rawNumberOne = getTheElementValue("numberOne");
  const rawNumberTwo = getTheElementValue("numberTwo");

  if (findEmptyValues(rawNumberOne, rawNumberTwo)) {
    return printErrorMessages(
      "result",
      "Por favor, llena ambos campos numéricos",
    );
  }

  const numberOne = parseInt(rawNumberOne);
  const numberTwo = parseInt(rawNumberTwo);
  const operator = getTheElementValue("operation");
  let results;

  if (findNotNumbers(numberOne, numberTwo)) {
    return printErrorMessages(
      "result",
      "Revisa los datos por favor, no se incluyeron numeros",
    );
  }

  if (operator === "/" && numberTwo === 0) {
    return printErrorMessages("result", "No se puede dividir entre 0");
  }

  if (operator === "+") {
    results = addition(numberOne, numberTwo);
  } else if (operator === "-") {
    results = substraction(numberOne, numberTwo);
  } else if (operator === "*") {
    results = multiplication(numberOne, numberTwo);
  } else if (operator === "/") {
    results = division(numberOne, numberTwo);
  }

  return printValues("result", numberOne, operator, numberTwo, results);
}
