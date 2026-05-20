function estadisticas(...numeros) {
  //console.log(numeros);
  //Validamos que en caso de no introducir nada, retorne null
  if (numeros.length === 0) return null;

  //Establecemos las variables con las cuales buscaremos los resultados
  let minimumNumber = numeros.reduce((minimo, numero) => {
    //Aca lo que hara sera coger el primer resultado como minimo, luego ira haciendo comparaciones para ver si el siguiente es menor, hasta encontrar al ganador
    if (numero < minimo) {
      return numero;
    } else {
      return minimo;
    }
  });

  let maximumNumber = numeros.reduce((maximo, numero) => {
    //Lo mismo que arriba pero con el maximo, cogera el maximo numero como el primero y luego ira comparandolos hasta encontrar el mayor
    if (numero > maximo) {
      return numero;
    } else {
      return maximo;
    }
  });

  let sumNumbers = numeros.reduce((inicial, numero) => {
    //El valor inicial es 0, se ira sumando
    return inicial + numero;
  }, 0);

  //Con la suma ya hecha, dividimos en el largo del array
  let averageNumbers = sumNumbers / numeros.length;

  return {
    minimo: minimumNumber,
    maximo: maximumNumber,
    suma: sumNumbers,
    promedio: averageNumbers,
  };
}

console.log(estadisticas(2, 8, 7, 9, 15, 22, 78, 1));
console.log(estadisticas(5, 1, 17, 22));
console.log(estadisticas());
