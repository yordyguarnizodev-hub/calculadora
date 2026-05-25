//Obtener los valores de los inputs
const getValues = (id) => document.querySelector(id).value;

//Imprimir mensajes
const printMessages = (id, message) =>
  (document.querySelector(id).textContent = message);

//Convertidor de Celsius a Farenheit
const celsiusAFahrenheit = (celsiusTemperature) =>
  (celsiusTemperature * (9 / 5) + 32).toFixed(2);

//Convertidor de Farenheit a Celsius
const farenheitACelsius = (farenheitTemperature) =>
  ((farenheitTemperature - 32) * (5 / 9)).toFixed(2);

//Validadores
const validateEmptyString = (value) => value.trim() === "";
const validateNotNumber = (value) => isNaN(value);

//Funcion general
function convertTemperatures() {
  const rawTemperature = getValues("#numberOne");
  const converter = getValues("#operation");

  console.log("Input original:", rawTemperature);

  // Validar Empty Strings
  if (validateEmptyString(rawTemperature)) {
    return printMessages(
      "#output",
      `Por favor, ingresa un valor de temperatura válido.`,
    );
  }

  const temperatureValue = Number(rawTemperature);

  // Validar NaN
  if (validateNotNumber(temperatureValue)) {
    return printMessages(
      "#output",
      `Error: El valor ingresado no es numérico.`,
    );
  }

  // Conversor
  if (converter === "C") {
    return printMessages(
      "#output",
      `En grados Fahrenheit: ${celsiusAFahrenheit(temperatureValue)}`,
    );
  }

  if (converter === "F") {
    return printMessages(
      "#output",
      `En grados Celsius: ${farenheitACelsius(temperatureValue)}`,
    );
  }
}

/*
function celsiusAFahrenheit(celsiusTemperature) {

  // De Celsius a Fahrenheit: (C * 9/5) + 32
  return (celsiusTemperature * (9 / 5) + 32).toFixed(2);
}

function farenheitACelsius(farenheitTemperature) {
  // De Fahrenheit a Celsius: (F - 32) * 5/9
  return ((farenheitTemperature - 32) * (5 / 9)).toFixed(2);
}
*/
