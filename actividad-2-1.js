// Sacar los valores del HTML e imprimir el mensaje
const getValues = (id) => document.querySelector(id).value;
const printMessages = (id, message) =>
  (document.querySelector(id).textContent = message);

// Validadores
const validateEmptyValue = (value) => value.trim() === "";

function checkPassword() {
  const password = getValues("#passwordInput");

  // Validar empty strings
  if (validateEmptyValue(password)) {
    return printMessages(
      "#output",
      "Error: Por favor, ingresa una contraseña.",
    );
  }

  // Validaciones
  const minimumPasswordLength = password.length >= 8;
  const itHasUpperCase = password !== password.toLowerCase();
  const itHasANumber = password
    .split("")
    .some((letter) => !isNaN(letter) && letter !== " ");
  const itHasSpecialCharacters = password
    .split("")
    .some((letter) => "!@#$%&".includes(letter));

  const validationsAreTrue =
    minimumPasswordLength &&
    itHasUpperCase &&
    itHasANumber &&
    itHasSpecialCharacters;

  // Objeto y sus resultados
  console.log({
    longitudValida: minimumPasswordLength,
    tieneMayuscula: itHasUpperCase,
    tieneNumero: itHasANumber,
    tieneEspecial: itHasSpecialCharacters,
    esValida: validationsAreTrue,
  });

  // Mostrar mensaje
  if (validationsAreTrue) {
    printMessages("#output", "¡Éxito! Tu contraseña es válida y segura.");
  } else {
    printMessages(
      "#output",
      "Contraseña débil. Revisa la consola para ver qué requisito te falta.",
    );
  }
}

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
