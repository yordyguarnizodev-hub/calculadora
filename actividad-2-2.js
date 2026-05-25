const aprendices = [
  { nombre: "Carlos", edad: 22, nota: 4.5 },
  { nombre: "Laura", edad: 19, nota: 3.8 },
  { nombre: "Andrés", edad: 25, nota: 4.9 },
  { nombre: "María", edad: 21, nota: 3.2 },
  { nombre: "Diego", edad: 23, nota: 4.1 },
];

// Obtener resultados
const getValues = (id) => document.querySelector(id).value;

const printMessages = (id, message) => {
  document.querySelector(id).innerHTML = message;
};

// Validadores
const validateEmptyValue = (value) => value.trim() === "";
const validateNotNumber = (value) => isNaN(value);
const validateGradeRange = (grade) => grade < 0 || grade > 5;
const validateAgeRange = (age) => age <= 0;

// Función para procesar y mostrar la info
function calculateStats() {
  // Se traen los nombres de los aprendices
  const names = aprendices.map((aprendiz) => aprendiz.nombre);

  // Se filtran las notas mayores o iguales a 4
  const notesGreatherOrEqualThanFour = aprendices.filter(
    (note) => note.nota >= 4,
  );

  // Se calcula el promedio de edad de todos los aprendices
  const averageAges =
    aprendices.reduce(
      (initialValue, aprendiz) => initialValue + aprendiz.edad,
      0,
    ) / aprendices.length;

  // Se revisa cual es el mayor puntaje entre los aprendices
  const theBest = aprendices.reduce((bestGrade, aprendiz) => {
    if (aprendiz.nota > bestGrade.nota) return aprendiz;
    return bestGrade;
  });

  // Imprimir mensaje de usuarios actuales,s
  const statsHTML = `
   6. Nombres de todos los aprendices: ${names.join(", ")}<br>
   <br>
   7. Aprendices con nota >= 4.0:> ${notesGreatherOrEqualThanFour.map((note) => note.nombre).join(", ")}<br>
   <br>
   8. Promedio de edad del grupo: ${averageAges.toFixed(1)}<br>
   <br>
   9. El mejor aprendiz: ${theBest.nombre} con una nota de ${theBest.nota}
  `;

  printMessages("#statsOutput", statsHTML);
}

// Mostrar lo que ya se encuentra hecho.
calculateStats();

function addStudent() {
  // Limpiamos mensajes de error previos
  printMessages("#errorOutput", "");

  const name = getValues("#nameInput");
  const rawAge = getValues("#ageInput");
  const rawGrade = getValues("#gradeInput");

  // Validar que ningun campo este vacio
  if (
    validateEmptyValue(name) ||
    validateEmptyValue(rawAge) ||
    validateEmptyValue(rawGrade)
  ) {
    return printMessages(
      "#errorOutput",
      "Error: Todos los campos son obligatorios.",
    );
  }

  //Convertimos en numeros las notas y edad
  const age = Number(rawAge);
  const grade = Number(rawGrade);

  // Se valida que estos no sean unos NaN
  if (validateNotNumber(age) || validateNotNumber(grade)) {
    return printMessages(
      "#errorOutput",
      "Error: La edad y la nota deben ser valores numéricos.",
    );
  }

  // Se valida que la edad sea mayor a 0
  if (validateAgeRange(age)) {
    return printMessages(
      "#errorOutput",
      "Error: La edad debe ser mayor a cero.",
    );
  }

  // Se valida que las notas no sean menores a 0 o mayores a 5
  if (validateGradeRange(grade)) {
    return printMessages(
      "#errorOutput",
      "Error: La nota debe estar entre 0.0 y 5.0.",
    );
  }

  // Si todos son datos a utilizar le hacemos push con el nuevo dato al array ya existente
  aprendices.push({ nombre: name.trim(), edad: age, nota: grade });

  // Eliminamos el texto de los inputs, ya la informacion quedo en el array
  document.querySelector("#nameInput").value = "";
  document.querySelector("#ageInput").value = "";
  document.querySelector("#gradeInput").value = "";

  // Volvemos a calcular e imprimir las estadisticas con el nuevo aprendiz
  calculateStats();
}
