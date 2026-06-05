let cart = [];

function returnInformation(object) {
  return `
    <div class="card">
        <h3>${object.username}</h3>
        <h3>${object.homeTeam} vs ${object.awayTeam}</h3>
        <p>${object.stadium}</p>
        <p>${object.date}</p>
        <p>${object.time}</p>
        <p>Cantidad de boletas: ${object.quantity}</p>
      </div>
    `;
}

function loadSavedCart() {
  const savedCart = localStorage.getItem("myCart");

  if (savedCart !== null) {
    cart = JSON.parse(savedCart);
  }
}

function initializeApp() {
  loadSavedCart();

  cart.forEach((match) => {
    const cardHTML = returnInformation(match);
    document.querySelector(".cards-container").innerHTML += cardHTML;
  });
}

initializeApp();
