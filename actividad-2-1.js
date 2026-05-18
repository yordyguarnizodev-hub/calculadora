const writeYourPassword = prompt("Introduzca su contraseña por favor");

//Revisa que no se le diera a cancelar, en dado caso dara un valor el cual es null
function validateNull(password) {
  if (password === null) return true;
}

//Si se le dio OK, nos retornara un string vacio "", esta funcion valida que se diera este resultado
function validateEmptyValue(password) {
  if (password === "") return true;
}

function validatePassword(password) {
  //Las funciones validan que sea un null o ""
  if (validateNull(password))
    return console.log("No se introdujo ningun valor");

  if (validateEmptyValue(password))
    return console.log("Se dejo el prompt vacio");

  //Si no son null o "" siguen con los operadores logicos. Todas las comparaciones arrojan true o false
  let minimumPasswordLength = password.length >= 8;
  let itHasUpperCase = password !== password.toLowerCase();
  let itHasANumber = password
    .split("")
    .some((letter) => !isNaN(letter) && letter !== " ");
  let itHasSpecialCharacters = password
    .split("")
    .some((letter) => "!@#$%&".includes(letter));
  let validationsAreTrue =
    minimumPasswordLength &&
    itHasUpperCase &&
    itHasANumber &&
    itHasSpecialCharacters;

  //Devolvemos el objeto con los resultados de arriba
  return {
    longitudValida: minimumPasswordLength,
    tieneMayuscula: itHasUpperCase,
    tieneNumero: itHasANumber,
    tieneEspecial: itHasSpecialCharacters,
    esValida: validationsAreTrue,
  };
}

const password = validatePassword(writeYourPassword);
console.log(password);

/*
let password = "";
let lenght = password.length >= 8; //Compara que la contraseña sea mayor o igual a 8
let upperCase = password !== password.toLowerCase(); //Compara si hay diferencia en cuanto al password que se tiene y si lo ejecutaramos en minusculas
let number = password.split("").some((letra) => !isNaN(letra) && letra !== " "); //Primero dividimos el password, queda algo asi como ['h', 'o' ...], luego el some busca en cada item si habia un numero, por ejemplo si el !isNaN('1') no es un numero, la otra parte es para que no coja un espacio vacio como si fuera un 0
let especial = password.split("").some((letra) => "!@#$%&".includes(letra)); //Dividimos el password, ahora la letra, por ejemplo el ['h'], buscara dentro del texto, es decir la computadora busca 'h' dentro de "!@#$%&", si no lo encuentra devuelve false, luego busca '#', dentro de ese texto, si lo encuentra devuelve true
let valida = password && upperCase && number && especial;

console.log(password.length, lenght);
console.log(upperCase);
console.log(number);
console.log(especial);
console.log(valida);
*/
