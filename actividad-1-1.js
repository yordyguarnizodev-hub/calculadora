const fullName = prompt("Deme su nombre (Sin numeros u otros caracteres)");
const hour = prompt("Que hora es? (Introduzca numeros enteros de 0 a 23");

//El prompt devuelve valores en strings, si se le da a cancelar, devuelve null
function validateNullValues(name, hour) {
  if (name === null || hour === null) {
    return true;
  }
}

//Por su parte si se le da ok, y no se puso nada, devuelve un string vacio ""
function validateEmptyValues(name, hour) {
  if (name === "" || hour === "") {
    return true;
  }
}

//Se valida si el numero es un entero
function validateIntengerNumber(hour) {
  if (!Number.isInteger(hour)) {
    return true;
  }
}

//Se creo para validar un rango horario, se tienen que poner valores de 0 a 23, numeros enteros
function validateHourRange(hour) {
  if (hour < 0 || hour > 23) {
    return true;
  }
}

function personalizedGreeting(name, hour) {
  if (validateNullValues(name, hour)) {
    return "El nombre u hora se dejo vacio";
  }

  if (validateEmptyValues(name, hour)) {
    return "El nombre u hora se dejo vacio";
  }

  //Pasamos el string a numero, esto para que el validateHourRange y validateIntengerNumber funcione bien con los numeros alli puestos
  hour = Number(hour);

  if (validateIntengerNumber(hour)) {
    return "No se introducio un numero entero";
  }

  if (validateHourRange(hour)) {
    return "La hora introducida no esta dentro del rango horario";
  }

  //Se ejecuta la funcion principal
  if (hour >= 5 && hour <= 11) {
    return `Buenos dias, ${name}`;
  } else if (hour >= 12 && hour <= 18) {
    console.log(`Buenos tardes, ${name}`);
    return `Buenas tardes, ${name}`;
  } else if (hour >= 19 || hour <= 4) {
    console.log(`Buenos noches, ${name}`);
    return `Buenas noches, ${name}`;
  }
}

let finalMessage = personalizedGreeting(fullName, hour);

console.log(finalMessage);
alert(finalMessage);
