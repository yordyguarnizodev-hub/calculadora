//Obtener los valores de los inputs
let getValues = (id) => document.querySelector(id).value;

//Convertidor de Celsius a Farenheit
let celsiusAFahrenheit = (celsiusTemperature) =>
  (celsiusTemperature * (9 / 5) + 32).toFixed(2);

//Convertidor de Farenheit a Celsius
let farenheitACelsius = (farenheitTemperature) =>
  ((farenheitTemperature - 32) * (5 / 9)).toFixed(2);

//Validador de string vacio
function validateEmptyString(value) {
  if (value === "") {
    return true;
  }
}
//Funcion general
function convertTemperatures() {
  let temperatureValue = getValues("#numberOne");
  let converter = getValues("#operation");

  console.log(temperatureValue);

  if (validateEmptyString(temperatureValue)) {
    return (document.querySelector("#output").textContent =
      `El valor de temperatura se dejo vacio`);
  }

  if (converter === "C") {
    return (document.querySelector("#output").textContent =
      `En grados Fahrenheit: ${celsiusAFahrenheit(temperatureValue)}`);
  } else if (converter === "F") {
    return (document.querySelector("#output").textContent =
      `En grados Celsius: ${farenheitACelsius(temperatureValue)}`);
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
