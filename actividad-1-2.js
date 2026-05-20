const numberOne = prompt(
  "Introduzca el primer valor (Recuerda que solo se puede poner numeros)",
);
const numberTwo = prompt(
  "Introduzca el segundo valor (Recuerda que solo se puede poner numeros)",
);

//console.log(numberOne, typeof numberOne);

//Funciones aritmeticas
let addition = (value1, value2) => value1 + value2;
let substraction = (value1, value2) => value1 - value2;
let multiplication = (value1, value2) => value1 * value2;
let division = (value1, value2) => {
  if (value2 === 0) {
    //Validamos que el divisor no sea 0
    return "No se puede dividir en 0";
  } else {
    return value1 / value2;
  }
};

//Validamos que no de null, el prompt si se le da cancelar devuelve este valor
function validateNullValues(value1, value2) {
  if (value1 === null || value2 === null) {
    return true;
  }
}

//Validamos que no se dejen los datos vacios y no se retorne un ""
function validateEmptyValues(value1, value2) {
  if (value1 === "" || value2 === "") {
    return true;
  }
}

//Validamos que sean numeros, si el valor no puede ser convertido en numero, devuelve true, entonces "asd" = true
function validateNumbers(value1, value2) {
  if (isNaN(value1) || isNaN(value2)) {
    return true;
  }
}

function calculator(value1, value2) {
  if (validateNullValues(value1, value2)) {
    return console.log("Alguno de los dos campos no fue llenado");
  }

  if (validateEmptyValues(value1, value2)) {
    return console.log("Se dejo un valor vacio");
  }

  //Pasamos los valores a numeros
  value1 = Number(value1);
  value2 = Number(value2);

  //Llamamos la funcion, esta al validar por ejemplo "asd" = true, enviara el mensaje. De lo contrario seguira
  if (validateNumbers(value1, value2)) {
    return console.log("Por favor introduzca numeros");
  }

  console.log(
    `La suma de ${value1} + ${value2} es igual a: ${addition(value1, value2)}`,
  );
  console.log(
    `La suma de ${value1} - ${value2} es igual a: ${substraction(value1, value2)}`,
  );
  console.log(
    `La suma de ${value1} * ${value2} es igual a: ${multiplication(value1, value2)}`,
  );
  console.log(
    `La suma de ${value1} / ${value2} es igual a: ${division(value1, value2)}`,
  );
}

calculator(numberOne, numberTwo);
