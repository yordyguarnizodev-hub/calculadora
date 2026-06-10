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
    price: 180.25,
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

const calculateTotalValue = (matches) =>
  matches.reduce((initial, match) => {
    const quantity = match.quantity ? match.quantity : 1;
    return initial + match.price * quantity;
  }, 0);

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
   <p><b>Cantidad:</b><span class="quantity">${object.quantity ? object.quantity : 1}</span></p>
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

function renderCart(output, totalValueOutput) {
  const cartOutput = getElement(output);

  const allCardsHTML = cart
    .map((match, index) => returnInformation(match.username, match, index))
    .join("");

  //Inject to HTML
  cartOutput.innerHTML = allCardsHTML;

  //Update the total
  const totalValue = calculateTotalValue(cart);
  getElement(totalValueOutput).textContent = totalValue.toFixed(2);

  //Save the information
  saveToLocalStorage();
}

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
  renderCart("#cartOutput", "#finalTotal");
}

//Main functions
function showMatches() {
  const monthElement = getElement("#monthHolder");
  const matchElement = getElement("#matchHolder");
  matchElement.hidden = false;

  //Create an object with the months
  const monthsMap = {
    June: "06",
    July: "07",
  };

  const targetMonthNumber = monthsMap[monthElement.value];

  // 2. Filter the array based on the month selected
  filteredMatches = groupStageMatches.filter(
    (match) => match.date.split("-")[1] === targetMonthNumber,
  );

  // 3. Inject the HTML
  const defaultOption = `<option value=""> Select a match </option>`;

  const optionsHTML = filteredMatches
    .map(
      (matchInformation, index) => `
   <option value="${index}">
    ${matchInformation.date}:
    ${matchInformation.stadium}
    ${matchInformation.homeTeam}
    vs
    ${matchInformation.awayTeam},
    Individual price:
    ${matchInformation.price}
   </option>
  `,
    )
    .join("");

  console.log(filteredMatches);

  // 4. Inject HTML
  matchElement.innerHTML = defaultOption + optionsHTML;
}

//Save the selected match
const showMatchInformation = (index) => {
  selectedMatch = filteredMatches[index.value];
  //console.log(selectedMatch);
};

//Increase Quantity
function increaseQuantity(button) {
  const card = button.closest(".product-card");
  const cardIndex = Number(card.dataset.index);

  //Re print the number in HTML
  cart = cart.map((match, index) => {
    if (index === cardIndex) {
      const currentQuantity = match.quantity ? match.quantity : 1;
      return { ...match, quantity: currentQuantity + 1 };
    }
    return match;
  });

  //Render HTML
  renderCart("#cartOutput", "#finalTotal");
}

//Decrease Quantity
function decreaseQuantity(button) {
  const card = button.closest(".product-card");
  const cardIndex = Number(card.dataset.index);

  //Get the quantity amount
  const currentQuantity = cart[cardIndex].quantity
    ? cart[cardIndex].quantity
    : 1;

  //Remove the item if it is lower than 0
  if (currentQuantity === 1) {
    deleteCard(button);
    return;
  }

  //Update cart
  cart = cart.map((match, index) => {
    if (index === cardIndex) {
      return { ...match, quantity: currentQuantity - 1 };
    }
    return match;
  });

  //Render HTML
  renderCart("#cartOutput", "#finalTotal");
}

//Delete Card
function deleteCard(button) {
  const card = button.closest(".product-card");
  const cardIndex = Number(card.dataset.index);

  //Delete last cart item
  cart = cart.filter((_, index) => index !== cardIndex);

  //Print the HTML
  renderCart("#cartOutput", "#finalTotal");
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

  //Cart update
  cart = [
    ...cart,
    {
      ...selectedMatch,
      quantity: 1,
      username: userName,
    },
  ];

  //Render HTML
  renderCart("#cartOutput", "#finalTotal");

  //Clear inputs and text content
  emptyInputSlots("#productName", "#monthHolder", "#matchHolder");
  emptyTextMessages("#messageArea");
}

function buyTickets() {
  if (cart.length === 0) {
    showErrorMessage(
      "#messageArea",
      "Your cart is empty. Please add a match first.",
    );
    return;
  }
  window.location = "tickets.html";
}

initializaApp();
