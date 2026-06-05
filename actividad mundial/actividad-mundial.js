//Mundial Data
const groupStageMatches = [
  {
    homeTeam: "USA",
    awayTeam: "Colombia",
    stadium: "MetLife Stadium",
    date: "2026-06-12",
    time: "19:00",
    price: 120,
    country: "United States",
  },

  {
    homeTeam: "Mexico",
    awayTeam: "Japan",
    stadium: "Azteca Stadium",
    date: "2026-06-13",
    time: "20:00",
    price: 95,
    country: "Mexico",
  },

  {
    homeTeam: "Argentina",
    awayTeam: "Canada",
    stadium: "BMO Field",
    date: "2026-06-14",
    time: "18:00",
    price: 110,
    country: "Canada",
  },

  {
    homeTeam: "Brazil",
    awayTeam: "Germany",
    stadium: "SoFi Stadium",
    date: "2026-06-15",
    time: "21:00",
    price: 180,
    country: "United States",
  },

  {
    homeTeam: "Spain",
    awayTeam: "France",
    stadium: "AT&T Stadium",
    date: "2026-06-16",
    time: "17:00",
    price: 160,
    country: "United States",
  },

  {
    homeTeam: "England",
    awayTeam: "Uruguay",
    stadium: "BBVA Stadium",
    date: "2026-06-17",
    time: "19:30",
    price: 130,
    country: "Mexico",
  },

  {
    homeTeam: "Portugal",
    awayTeam: "Netherlands",
    stadium: "BC Place",
    date: "2026-06-18",
    time: "16:00",
    price: 125,
    country: "Canada",
  },

  {
    homeTeam: "Italy",
    awayTeam: "Croatia",
    stadium: "Levi's Stadium",
    date: "2026-06-19",
    time: "20:00",
    price: 140,
    country: "United States",
  },

  {
    homeTeam: "Japan",
    awayTeam: "Croatia",
    stadium: "Levi's Stadium",
    date: "2026-07-19",
    time: "20:00",
    price: 140,
    country: "United States",
  },
];

//Global variables
let filteredMatches = [];
let selectedMatch = null;
let cart = [];

//Validators
const validateEmptyValue = (inputValue) => inputValue.trim() === "";

//Messages and functionalities
const showErrorMessage = (output, message) =>
  (document.querySelector(output).textContent = message);

const getElement = (selector) => document.querySelector(selector);

const emptyInputSlots = (...selectors) =>
  selectors.forEach(
    (selector) => (document.querySelector(selector).value = ""),
  );

const emptyTextMessages = (selector) =>
  (document.querySelector(selector).textContent = "");

//Objects and injectHTML

const returnInformation = (name, object, index) => {
  return `
  <div class="product-card" data-index="${index}">
   <h3>${name}</h3>
   <h3>${object.homeTeam} vs ${object.awayTeam} </h3>
   <p><b>Estadio:</b>${object.stadium}</p>
   <p><b>Fecha:</b>${object.date}</p>
   <p><b>Hora:</b>${object.time}</p>
   <p><b>Pais:</b>${object.country}</p>
   <p><b>Precio individual:</b>${object.price}</p>
   <p><b>Cantidad:</b><span class="quantity">1</span></p>
   <div class="actions">
     <button onclick="decreaseQuantity(this)">
       -
     </button>
     <button onclick="increaseQuantity(this)">
       +
     </button>
     <button onclick="deleteCard(this)">
        Delete
     </button>
    </div>
  </div>
  `;
};

const printHTML = (match, output) => (getElement(output).innerHTML += match);

//localStorage

//Save the cart
function saveToLocalStorage() {
  localStorage.setItem("myCart", JSON.stringify(cart));
}

//Load the cart
function loadFromLocalStorage() {
  const savedCart = localStorage.getItem("myCart");
  if (savedCart !== null) cart = JSON.parse(savedCart);
}

//Initialize app
function initializaApp() {
  loadFromLocalStorage();

  cart.forEach((match, index) => {
    const cardHTML = returnInformation(match.username, match, index);
    printHTML(cardHTML, "#cartOutput");
  });

  //Update total
  const totalValue = calculateTotalValue(cart);
  getElement("#finalTotal").textContent = totalValue;
}

//Main functions
function showMatches() {
  const monthElement = getElement("#monthHolder");
  const matchElement = getElement("#matchHolder");

  //Clear the select before we choose another option,
  matchElement.innerHTML = "";
  matchElement.hidden = false;
  matchElement.innerHTML = `
   <option value=""> Select a match </option>
  `;

  if (monthElement.value === "June") {
    filteredMatches = groupStageMatches.filter(
      (monthDate) => monthDate.date.split("-")[1] === "06",
    );
  }

  if (monthElement.value === "July") {
    filteredMatches = groupStageMatches.filter(
      (monthDate) => monthDate.date.split("-")[1] === "07",
    );
  }

  filteredMatches.forEach(
    (matchInformation, index) =>
      (matchElement.innerHTML += `
   <option value="${index}">
    ${matchInformation.date}:
    ${matchInformation.stadium}
    ${matchInformation.homeTeam}
    vs
    ${matchInformation.awayTeam},
    Individual price:
    ${matchInformation.price}
   </option>
  `),
  );

  //console.log(filteredMatches);
}

//Save the selected match
const showMatchInformation = (index) => {
  selectedMatch = filteredMatches[index.value];
  //console.log(selectedMatch);
};

const calculateTotalValue = (matches) =>
  matches.reduce((initial, match) => initial + match.price * match.quantity, 0);

//Increase Quantity
function increaseQuantity(button) {
  const card = button.closest(".product-card");
  const quantityValue = card.querySelector(".quantity");
  const cardIndex = Number(card.dataset.index);

  //Re print the number in HTML
  let quantityAmount = Number(quantityValue.textContent);
  quantityAmount++;
  quantityValue.textContent = quantityAmount;

  //Update cart
  cart = cart.map((match, index) => {
    if (index === cardIndex) {
      return {
        ...match,
        quantity: quantityAmount,
      };
    }
    return match;
  });

  //Update total
  const totalValue = calculateTotalValue(cart);
  getElement("#finalTotal").textContent = totalValue;

  //Save information to local storage
  saveToLocalStorage();
}

//Decrease Quantity
function decreaseQuantity(button) {
  //Get values
  const card = button.closest(".product-card");
  const quantityValue = card.querySelector(".quantity");
  const cardIndex = Number(card.dataset.index);

  //Re print the number in HTML
  let quantityAmount = Number(quantityValue.textContent);
  quantityAmount--;
  quantityValue.textContent = quantityAmount;

  //Delete card if quantity is 0
  if (quantityAmount === 0) {
    deleteCard(button);
    return;
  }

  //Update cart
  cart = cart.map((match, index) => {
    if (index === cardIndex) {
      return {
        ...match,
        quantity: quantityAmount,
      };
    }
    return match;
  });

  //Update total
  const totalValue = calculateTotalValue(cart);
  getElement("#finalTotal").textContent = totalValue;

  //Save information to local storage
  saveToLocalStorage();
}

//Delete Card
function deleteCard(button) {
  const card = button.closest(".product-card");
  const cardIndex = Number(card.dataset.index);
  card.remove();

  //Delete last cart item
  cart = cart.filter((_, index) => index !== cardIndex);

  //Update total
  const totalValue = calculateTotalValue(cart);
  getElement("#finalTotal").textContent = totalValue;

  const cartOutput = getElement("#cartOutput");
  cartOutput.innerHTML = "";

  cart.forEach((match, index) => {
    const cardHTML = returnInformation(match.username, match, index);
    printHTML(cardHTML, "#cartOutput");
  });

  //Save information to local storage
  saveToLocalStorage();
}

function addToCart() {
  //Get Values
  const userName = getElement("#productName").value;
  const monthValue = getElement("#monthHolder").value;
  const matchValue = getElement("#matchHolder").value;

  //Validate the data
  if (validateEmptyValue(userName))
    return showErrorMessage("#messageArea", "The name slot was not filled");

  if (validateEmptyValue(monthValue))
    return showErrorMessage("#messageArea", "Please choose a month");

  if (validateEmptyValue(matchValue))
    return showErrorMessage("#messageArea", "Please choose a match");

  //Collect the object information
  const cardInformation = returnInformation(
    userName,
    selectedMatch,
    cart.length,
  );

  //Cart update
  cart = [
    ...cart,
    {
      ...selectedMatch,
      quantity: 1,
      username: userName,
    },
  ];
  //console.log(cart);

  //Print the information in HTML
  printHTML(cardInformation, "#cartOutput");

  //Print total
  const totalValue = calculateTotalValue(cart);
  getElement("#finalTotal").textContent = totalValue;

  //Clear inputs and text content
  emptyInputSlots("#productName", "#monthHolder", "#matchHolder");
  emptyTextMessages("#messageArea");

  //Save information to local storage
  saveToLocalStorage();
}

initializaApp();
