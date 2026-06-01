//Global variables
let myCart = [];
let currentDiscount = 0;
let finalTotal = 0;

//Logic of the exercise
function addProduct(cart, newProduct) {
  // Returns a new array by spreading the old one and adding the new product at the end
  return [...cart, newProduct];
}

function removeProduct(cart, id) {
  // Returns a new array, filtering out the product with the matching id
  return cart.filter((product) => product.id !== id);
}

function cartTotal(cart) {
  // Calculates the total cost of the cart
  return cart.reduce(
    (initial, product) => initial + product.price * product.quantity,
    0,
  );
}

function discount(cart, percentage) {
  //Apply discount with the total of the cart
  return cartTotal(cart) * (percentage / 100);
}

function finalPrice(cart, discountPercentage) {
  //Calculate the final price by subtracting the discount to the total of the cart
  return cartTotal(cart) - discount(cart, discountPercentage);
}

// Validators
const validateEmptyStrings = (inputValue) => inputValue.trim() === "";

const noNumber = (inputValue) => isNaN(inputValue);

const theIdAlreadyExist = (cart, id) =>
  cart.some((product) => product.id === Number(id));

const validateNegativeValues = (inputValue) => inputValue <= 0;

const discountGreatherThan100 = (inputValue) => inputValue > 100;

// Messages and functionalities
const showErrorMessages = (output, message) =>
  (document.querySelector(output).textContent = message);

const getElementValue = (selector) => document.querySelector(selector).value;

const emptyInputSlots = (...inputValues) => {
  inputValues.forEach(
    (selector) => (document.querySelector(selector).value = ""),
  );
};

const emptyTextSlots = (...textValues) => {
  textValues.forEach(
    (selector) => (document.querySelector(selector).textContent = ""),
  );
};

// HTML functions
function returnInformation(product) {
  return `
    <div class="product-card">
      <h3>${product.name}</h3>

      <p><b>ID:</b> ${product.id}</p>
      <p><b>Price:</b> $${product.price}</p>
      <p><b>Quantity:</b> ${product.quantity}</p>
    </div>
  `;
}

function printHTML(cart, output) {
  document.querySelector(output).innerHTML = cart
    .map(returnInformation)
    .join("");
}

//Local Storage

function saveToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(myCart)); //Convert the object in text ""
  localStorage.setItem("discount", currentDiscount);
}

function loadFromLocalStorage() {
  const savedCart = localStorage.getItem("cart");
  const savedDiscount = localStorage.getItem("discount");

  if (savedCart !== null) {
    myCart = JSON.parse(savedCart);
  }

  if (savedDiscount !== null) {
    currentDiscount = Number(savedDiscount);
  }
}

function initializeApp() {
  // Load the data in the local Storage
  loadFromLocalStorage();

  // Print the data in the HTML again
  printHTML(myCart, "#cartOutput");

  const initialTotal = cartTotal(myCart);
  document.querySelector("#totalOutput").textContent = initialTotal.toFixed(2);

  const initialDiscount = discount(myCart, currentDiscount);
  document.querySelector("#totalDiscount").textContent =
    `${currentDiscount}% / $${initialDiscount.toFixed(2)}`;

  const initialFinalTotal = finalPrice(myCart, currentDiscount);
  document.querySelector("#finalTotal").textContent =
    initialFinalTotal.toFixed(2);
}

// Add products and show results

function handleAddProduct() {
  // Get values
  const idValue = getElementValue("#productId");
  const nameValue = getElementValue("#productName");
  const priceValue = getElementValue("#productPrice");
  const quantityValue = getElementValue("#productQuantity");

  // Validators
  if (
    validateEmptyStrings(idValue) ||
    validateEmptyStrings(nameValue) ||
    validateEmptyStrings(priceValue) ||
    validateEmptyStrings(quantityValue)
  )
    return showErrorMessages("#messageArea", "No se llenaron todos los campos");

  if (
    validateNegativeValues(idValue) ||
    validateNegativeValues(priceValue) ||
    validateNegativeValues(quantityValue)
  )
    return showErrorMessages(
      "#messageArea",
      "Se llenaron los campos con valores negativos o con 0",
    );

  if (noNumber(idValue) || noNumber(priceValue) || noNumber(quantityValue))
    return showErrorMessages(
      "#messageArea",
      "Los valores introducidos no son numeros",
    );

  if (theIdAlreadyExist(myCart, idValue))
    return showErrorMessages("#messageArea", "El ID introducido ya existe");

  // Main logic
  const newProduct = {
    id: Number(idValue),
    name: nameValue.trim(),
    price: Number(priceValue),
    quantity: Number(quantityValue),
  };

  myCart = addProduct(myCart, newProduct);

  // Print the object in HTML
  printHTML(myCart, "#cartOutput");

  //Calculate the total and print the text in the HTML
  const total = cartTotal(myCart);
  document.querySelector("#totalOutput").textContent = total.toFixed(2);

  //Re calculate the discount
  const currentTotalDiscount = discount(myCart, currentDiscount);
  document.querySelector("#totalDiscount").textContent =
    `${currentDiscount}% / $${currentTotalDiscount.toFixed(2)}`;

  // Re calculate the final price
  finalTotal = finalPrice(myCart, currentDiscount);
  document.querySelector("#finalTotal").textContent = finalTotal.toFixed(2);

  // Clean the text in the inputs
  emptyInputSlots(
    "#productId",
    "#productName",
    "#productPrice",
    "#productQuantity",
    "#messageArea",
  );
  emptyTextSlots("#messageArea");

  //Save results
  saveToLocalStorage();
}

// Remove products

function handleRemoveProducts() {
  // Get the value
  const removeIdValue = getElementValue("#removeId");

  // Validators
  if (validateEmptyStrings(removeIdValue))
    return showErrorMessages(
      "#messageArea",
      "El campo de ID a eliminar no fue llenado",
    );

  if (noNumber(removeIdValue))
    return showErrorMessages(
      "#messageArea",
      "El campo a eliminar debe contener un numero",
    );

  if (validateNegativeValues(removeIdValue))
    return showErrorMessages(
      "#messageArea",
      "El valor a eliminar no puede ser negativo o 0",
    );

  if (!theIdAlreadyExist(myCart, removeIdValue))
    // We use the ! to invert the value.
    return showErrorMessages(
      "#messageArea",
      `El ID ${removeIdValue} no fue encontrado en el carrito`,
    );

  // Create the new array without the value we removed
  myCart = removeProduct(myCart, Number(removeIdValue));

  // Re print the HTML without the product
  printHTML(myCart, "#cartOutput");

  // Re calculate the subtotal
  const total = cartTotal(myCart);
  document.querySelector("#totalOutput").textContent = total.toFixed(2);

  //Re calculate the discount
  const currentTotalDiscount = discount(myCart, currentDiscount);
  document.querySelector("#totalDiscount").textContent =
    `${currentDiscount}% / $${currentTotalDiscount.toFixed(2)}`;

  // Re calculate the final price
  finalTotal = finalPrice(myCart, currentDiscount);
  document.querySelector("#finalTotal").textContent = finalTotal.toFixed(2);

  // Clean the input field
  emptyInputSlots("#removeId");
  emptyTextSlots("#messageArea");

  //Save results
  saveToLocalStorage();
}

// Apply discount

function handleApplyDiscount() {
  // Get value
  const discountValue = getElementValue("#discountPercent");

  // Validators
  if (validateEmptyStrings(discountValue))
    return showErrorMessages(
      "#messageArea",
      "El campo de descuento no fue llenado",
    );

  if (noNumber(discountValue))
    return showErrorMessages(
      "#messageArea",
      "El campo de descuento debe contener un numero",
    );

  if (validateNegativeValues(discountValue))
    return showErrorMessages(
      "#messageArea",
      "El valor a eliminar no puede ser negativo o 0",
    );

  if (discountGreatherThan100(discountValue))
    return showErrorMessages(
      "#messageArea",
      `El valor del descuento ${discountValue}% es mayor a 100%`,
    );

  // Main logic

  currentDiscount = Number(discountValue);

  const totalDiscount = discount(myCart, currentDiscount);
  document.querySelector("#totalDiscount").textContent =
    `${currentDiscount}% / $${totalDiscount.toFixed(2)}`;

  finalTotal = finalPrice(myCart, currentDiscount);
  document.querySelector("#finalTotal").textContent = finalTotal.toFixed(2);

  // Clean the input field
  emptyInputSlots("#discountPercent");
  emptyTextSlots("#messageArea");

  //Save results
  saveToLocalStorage();
}

//Initialize app
initializeApp();
