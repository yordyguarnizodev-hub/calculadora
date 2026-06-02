const partidosMundial = [
  {
    id: 1,
    equipoLocal: "Francia",
    equipoVisitante: "Senegal",
    grupo: "I",
    fecha: "2026-06-16",
    horaEstandar: "15:00 EST",
    estadio: "MetLife Stadium (New York New Jersey Stadium)",
    ciudad: "East Rutherford, EE. UU.",
    precioPromedioUSD: 165,
  },
  {
    id: 2,
    equipoLocal: "Países Bajos",
    equipoVisitante: "Japón",
    grupo: "F",
    fecha: "2026-06-14",
    horaEstandar: "15:00 CST",
    estadio: "AT&T Stadium (Dallas Stadium)",
    ciudad: "Arlington, Texas, EE. UU.",
    precioPromedioUSD: 140,
  },
  {
    id: 3,
    equipoLocal: "Brasil",
    equipoVisitante: "Marruecos",
    grupo: "C",
    fecha: "2026-06-13",
    horaEstandar: "18:00 EST",
    estadio: "MetLife Stadium (New York New Jersey Stadium)",
    ciudad: "East Rutherford, EE. UU.",
    precioPromedioUSD: 180,
  },
  {
    id: 4,
    equipoLocal: "Inglaterra",
    equipoVisitante: "Croacia",
    grupo: "L",
    fecha: "2026-06-17",
    horaEstandar: "15:00 CST",
    estadio: "AT&T Stadium (Dallas Stadium)",
    ciudad: "Arlington, Texas, EE. UU.",
    precioPromedioUSD: 170,
  },
  {
    id: 5,
    equipoLocal: "Argentina",
    equipoVisitante: "Argelia",
    grupo: "J",
    fecha: "2026-06-16",
    horaEstandar: "21:00 EST",
    estadio: "GEHA Field at Arrowhead Stadium",
    ciudad: "Kansas City, EE. UU.",
    precioPromedioUSD: 195,
  },
  {
    id: 6,
    equipoLocal: "España",
    equipoVisitante: "Cabo Verde",
    grupo: "H",
    fecha: "2026-06-15",
    horaEstandar: "12:00 EST",
    estadio: "Mercedes-Benz Stadium",
    ciudad: "Atlanta, Georgia, EE. UU.",
    precioPromedioUSD: 135,
  },
];

function returnValue(game, index) {
  return `
     <a href="mundialShopCart/mundialShopCart.html" class="gameCard" onclick="guardarPartido(${index})">
       <div class="teamsContainer">
          <span>${game.equipoLocal}</span>
          <span>vs</span>
          <span>${game.equipoVisitante}</span>
        </div>
        <div class="datesContainer">
          <span>${game.fecha}</span>
          <span>${game.horaEstandar}</span>
        </div>
        <div class="stadiumContainer">
          <span>${game.estadio}</span>
        </div>
        <div class="priceContainer">
          <span>Precio: $${game.precioPromedioUSD}</span>
        </div>
      </a>`;
}

function printHTML(game, output) {
  document.querySelector(output).innerHTML = game
    .map((card, index) => returnValue(card, index))
    .join("");
}

function guardarPartido(index) {
  const partidoSeleccionado = partidosMundial[index];

  localStorage.setItem("partidoGuardado", JSON.stringify(partidoSeleccionado));
}

// Ejecutas tu renderizado normal
printHTML(partidosMundial, ".container");
