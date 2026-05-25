const getUserInput = (selector) => document.querySelector(selector).value;

//Si se dejan los espacios vacios, devuelve null
/*
function validateNullValues(name, hour) {
  if (name === null || hour === null) {
    return true;
  }
}
*/

//Si se dejan los espacios vacios, devuelve ""
function validateEmptyValues(name, hour) {
  if (name.trim() === "" || hour.trim() === "") {
    return true;
  }
}

//Se valida si el numero es un entero
function validateIntengerNumber(hour) {
  if (!Number.isInteger(hour)) {
    return true;
  }
}

//Validar que el dato introducido no sea texto convertido a NaN
function validateIsNumber(hour) {
  if (isNaN(hour)) {
    return true;
  }
}

//Se creo para validar un rango horario, se tienen que poner valores de 0 a 23, numeros enteros
function validateHourRange(hour) {
  if (hour < 0 || hour > 23) {
    return true;
  }
}

//Imprime el mensaje
function printMessages(selector, message) {
  return (document.querySelector(selector).textContent = message);
}

//ejecurtar la funcion principal
function personalizedGreeting(name, hour) {
  //Getting values
  name = getUserInput(".textName");
  hour = getUserInput(".inputHour");

  /*
  if (validateNullValues(name, hour)) {
    return printMessages("#output", `El nombre u hora se dejo vacio`);
  }
  */

  if (validateEmptyValues(name, hour)) {
    return printMessages("#output", `El nombre u hora se dejo vacio`);
  }

  //Pasamos el string a numero, esto para que el validateHourRange y validateIntengerNumber funcione bien con los numeros alli puestos
  hour = Number(hour);

  if (validateIsNumber(hour)) {
    return printMessages(
      "#output",
      `Por favor digita un número válido para la hora, no letras`,
    );
  }

  if (validateIntengerNumber(hour)) {
    return printMessages("#output", `Los numeros introducidos no son enteros`);
  }

  if (validateHourRange(hour)) {
    return printMessages(
      "#output",
      `La hora introducida no esta dentro del rango horario`,
    );
  }

  //Se ejecuta la funcion principal
  if (hour >= 5 && hour <= 11) {
    return printMessages("#output", `Buenos dias, ${name}`);
  } else if (hour >= 12 && hour <= 18) {
    return printMessages("#output", `Buenas tardes, ${name}`);
  } else if (hour >= 19 || hour <= 4) {
    return printMessages("#output", `Buenas noches, ${name}`);
  }
}
