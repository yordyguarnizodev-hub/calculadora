function crearMultiplicador(factor) {
  //Primera funcion que contiene el factor
  return function (numero) {
    //Segunda funcion que contiene el numero
    return numero * factor;
  };
}

const duplicar = crearMultiplicador(2); //Ponemos en la variable duplicar la siguiente funcion
const triplicar = crearMultiplicador(3);

console.log(duplicar(5)); //Agregamos el argumento numero, ya con los datos procedemos al siguiente return, numero*factor
console.log(triplicar(5));
