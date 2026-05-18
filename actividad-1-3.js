function celsiusAFahrenheit(celsiusTemperature) {
  // De Celsius a Fahrenheit: (C * 9/5) + 32
  return (celsiusTemperature * (9 / 5) + 32).toFixed(2);
}

function farenheitACelsius(farenheitTemperature) {
  // De Fahrenheit a Celsius: (F - 32) * 5/9
  return ((farenheitTemperature - 32) * (5 / 9)).toFixed(2);
}

//Al utilizar el .toFixed, quedaron como strings
console.log(celsiusAFahrenheit(5));
console.log(celsiusAFahrenheit(7));
console.log(celsiusAFahrenheit(9));

console.log(farenheitACelsius(5));
console.log(farenheitACelsius(7));
console.log(farenheitACelsius(9));
