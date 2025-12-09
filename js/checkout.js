const TAX_RATE = 0.07;

document.addEventListener("DOMContentLoaded", () => {
  const subtotalElem = document.getElementById("subtotal-amount");
  const taxRateElem = document.getElementById("tax-rate");
  const taxElem = document.getElementById("tax-amount");
  const orderTotalElem = document.getElementById("order-total");
  const previewList = document.getElementById("cart-preview-list");


  // Load + save helpers (same as coffee.js)
  function loadCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Change quantity on checkout
  function changeQty(id, amount) {
    let cart = loadCart();
    const item = cart.find(i => i.id === id);
    if (!item) return;

    item.quantity += amount;
    if (item.quantity <= 0) {
      // Remove item if quantity hits zero
      cart = cart.filter(i => i.id !== id);
    }

    saveCart(cart);
    renderCheckout();
  }

  // Remove item entirely
  function removeItem(id) {
    let cart = loadCart().filter(i => i.id !== id);
    saveCart(cart);
    renderCheckout();
  }

  // Render checkout page
  function renderCheckout() {
    const cartItems = loadCart();

    previewList.innerHTML = "";

    cartItems.forEach(item => {
      const li = document.createElement("li");
      li.classList.add("checkout-item");

      li.innerHTML = `
        <img src="assets/images/${item.image}" class="checkout-img" alt="${item.name}">

        <div class="checkout-info">
          <strong>${item.name}</strong><br>
          ${item.quantity} × $${item.price.toFixed(2)}
        </div>

        <div class="checkout-controls">
          <button class="btn btn-sm btn-outline-secondary change-qty" data-id="${item.id}" data-amt="-1">−</button>
          <button class="btn btn-sm btn-outline-secondary change-qty" data-id="${item.id}" data-amt="1">+</button>
          <button class="btn btn-sm btn-danger delete-item" data-id="${item.id}">✖</button>
        </div>
      `;

      previewList.appendChild(li);
    });

    // Activate quantity buttons
    document.querySelectorAll(".change-qty").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = parseInt(btn.getAttribute("data-id"));
        const amt = parseInt(btn.getAttribute("data-amt"));
        changeQty(id, amt);
      });
    });

    // Activate delete buttons
    document.querySelectorAll(".delete-item").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = parseInt(btn.getAttribute("data-id"));
        removeItem(id);
      });
    });

    // Totals
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;

    subtotalElem.textContent = subtotal.toFixed(2);
    taxElem.textContent = tax.toFixed(2);
    orderTotalElem.textContent = total.toFixed(2);
  }

  // Set tax display
  if (taxRateElem) {
    taxRateElem.textContent = `${(TAX_RATE * 100).toFixed(0)}%`;
  }

  // Initial load
  renderCheckout();
});
