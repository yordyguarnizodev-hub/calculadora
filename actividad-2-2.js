const aprendices = [
  { nombre: "Carlos", edad: 22, nota: 4.5 },
  { nombre: "Laura", edad: 19, nota: 3.8 },
  { nombre: "Andrés", edad: 25, nota: 4.9 },
  { nombre: "María", edad: 21, nota: 3.2 },
  { nombre: "Diego", edad: 23, nota: 4.1 },
];

let names = aprendices.map((aprendiz) => aprendiz.nombre); //Crea un nuevo array con los nombres, basicamente va uno por uno y coge los nombres

let notesGreatherOrEqualThanFour = aprendices.filter((note) => note.nota >= 4); //Simplemente filtra el valor, si es mayor o igual a 4 lo devuelve como true, si no, lo pasa

let averageAges = //El reduce siempre arranca por un valor inicial, en este caso es 0, el que definimos al final, luego coge ese 0 y lo empieza a sumar hasta que se completa todo el cilo con las edades, por ulitmo se dividi en el numero de objetos dentro del array
  aprendices.reduce(
    (initialValue, aprendiz) => initialValue + aprendiz.edad,
    0,
  ) / aprendices.length;

let theBest = aprendices.reduce((bestGrade, aprendiz) => {
  //A diferencia de arriba no hay un valor inicial, entonces lo que hace es coger el primer valor, que es Carlos, y empieza la comparacion, el siguiente es Laura, la nota de Laura es mayor a la de Carlos? No, entonce cae en el else, y asi hasta que complete el ciclo
  if (aprendiz.nota > bestGrade.nota) {
    return aprendiz;
  } else {
    return bestGrade;
  }
});

console.log(`6. Nombres de todos los aprendices: ${names.join(", ")}`); //Los une y los saca del array para volverlos texto

console.log(
  `7. Aprendices con nota mayor o igual a 4.0: ${notesGreatherOrEqualThanFour.map((aprendiz) => aprendiz.nombre).join(", ")}`, //Toca utilizar un map, sino quedaria todo como [object]
);

console.log(`8. Promedio de edad del grupo: ${averageAges}`);

console.log(
  `9. Aprendiz con la nota más alta: ${theBest.nombre} con una nota de ${theBest.nota}`, //Nos arroja el resultado final
);
