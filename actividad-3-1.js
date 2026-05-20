function crearMultiplicador(factor) {
  //Primera funcion que contiene el factor
  return function (numero) {
    //Segunda funcion que contiene el numero
    return numero * factor;
  };
}

//El primer return, nos pone el factor, pero nos devuelve toda la segunda funcion.
//El segundo return si nos devuelve lo que buscamos, el resultado de la operacion
const duplicar = crearMultiplicador(2)(5);
const triplicar = crearMultiplicador(3)(5);
console.log(duplicar);
console.log(triplicar);
