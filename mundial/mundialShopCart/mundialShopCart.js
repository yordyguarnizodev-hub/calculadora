// TEMPORARY CART ARRAY
const cartItems = [];

// SHOW MESSAGE
function showMessage(message) {
  document.querySelector("#messageArea").textContent = message;
}

// RENDER CART
function renderCart() {
  // EMPTY CART
  if (cartItems.length === 0) {
    document.querySelector("#cartContainer").innerHTML = `
      <div class="product-card">
        <h2>Cart Empty</h2>
      </div>
    `;

    return;
  }

  // RENDER PRODUCTS
  document.querySelector("#cartContainer").innerHTML = `
    ${cartItems
      .map(
        (cartItem) => `
        <div class="product-card">

          <h2>Purchase Summary</h2>

          <p>
            <b>Customer:</b>
            ${cartItem.cliente}
          </p>

          <hr><br>

          <h3>
            ${cartItem.partido.equipoLocal}
            vs
            ${cartItem.partido.equipoVisitante}
          </h3>

          <p>
            <b>Match ID:</b>
            ${cartItem.partido.id}
          </p>

          <p>
            <b>Group:</b>
            ${cartItem.partido.grupo}
          </p>

          <p>
            <b>Date:</b>
            ${cartItem.partido.fecha}
          </p>

          <p>
            <b>Hour:</b>
            ${cartItem.partido.horaEstandar}
          </p>

          <p>
            <b>Stadium:</b>
            ${cartItem.partido.estadio}
          </p>

          <p>
            <b>City:</b>
            ${cartItem.partido.ciudad}
          </p>

          <br>

          <div class="totals">

            <h3>
              Quantity:
              ${cartItem.cantidad}
            </h3>

            <h3>
              Unit Price:
              $${cartItem.partido.precioPromedioUSD}
            </h3>

            <h2>
              Total:
              $${cartItem.total}
            </h2>

          </div>

          <div class="cart-buttons">

            <button onclick="increaseQuantity(${cartItem.id})">
              Add Ticket
            </button>

            <button onclick="decreaseQuantity(${cartItem.id})">
              Remove Ticket
            </button>

            <button onclick="removeCart(${cartItem.id})">
              Delete Purchase
            </button>

          </div>

        </div>
      `,
      )
      .join("")}

      <button onclick="buyTickets()">
        Buy Tickets
      </button>
  `;
}

// ADD TO CART
function addToCart() {
  // INPUT VALUES
  const fullName = document.querySelector("#fullName").value;

  const quantity = Number(document.querySelector("#productQuantity").value);

  // VALIDATION
  if (!fullName || quantity <= 0) {
    showMessage("Complete all fields");

    return;
  }

  showMessage("");

  // GET MATCH
  const partidoGuardado = JSON.parse(localStorage.getItem("partidoGuardado"));

  // CALCULATE TOTAL
  const total = partidoGuardado.precioPromedioUSD * quantity;

  // CREATE OBJECT
  const cartItem = {
    id: Date.now(),

    cliente: fullName,

    cantidad: quantity,

    total: total,

    partido: partidoGuardado,
  };

  // ADD TO ARRAY
  cartItems.push(cartItem);

  // RENDER
  renderCart();

  // CLEAN INPUTS
  document.querySelector("#fullName").value = "";

  document.querySelector("#productQuantity").value = "";
}

// INCREASE QUANTITY
function increaseQuantity(id) {
  const item = cartItems.find((item) => item.id === id);

  item.cantidad++;

  item.total = item.cantidad * item.partido.precioPromedioUSD;

  renderCart();
}

// DECREASE QUANTITY
function decreaseQuantity(id) {
  const item = cartItems.find((item) => item.id === id);

  if (item.cantidad > 1) {
    item.cantidad--;

    item.total = item.cantidad * item.partido.precioPromedioUSD;

    renderCart();
  }
}

// DELETE PURCHASE
function removeCart(id) {
  const index = cartItems.findIndex((item) => item.id === id);

  cartItems.splice(index, 1);

  renderCart();
}

// FINAL PURCHASE
function buyTickets() {
  // VALIDATION
  if (cartItems.length === 0) {
    showMessage("Your cart is empty");

    return;
  }

  // GET OLD PURCHASES
  const purchaseHistory =
    JSON.parse(localStorage.getItem("finalPurchase")) || [];

  // ADD CURRENT PURCHASE
  purchaseHistory.push([...cartItems]);

  // SAVE HISTORY
  localStorage.setItem("finalPurchase", JSON.stringify(purchaseHistory));

  // SUCCESS
  showMessage("Purchase completed successfully");

  // SHOW HISTORY
  console.log(JSON.parse(localStorage.getItem("finalPurchase")));

  // EMPTY CURRENT CART
  cartItems.length = 0;

  // RENDER EMPTY CART
  renderCart();
}

// INITIAL RENDER
renderCart();
