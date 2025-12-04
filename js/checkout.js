const TAX_RATE = 0.07;

document.addEventListener("DOMContentLoaded", () => {
  const subtotalElem = document.getElementById("subtotal-amount");
  const taxRateElem = document.getElementById("tax-rate");
  const taxElem = document.getElementById("tax-amount");
  const orderTotalElem = document.getElementById("order-total");
  const previewList = document.getElementById("cart-preview-list");

  // Set tax %
  if (taxRateElem)
    taxRateElem.textContent = `${(TAX_RATE * 100).toFixed(0)}%`;

  // Load cart items INCLUDING images
  let cartItems = [];

  try {
    const stored = localStorage.getItem("cart_items");
    if (stored) {
      cartItems = JSON.parse(stored);
    }
  } catch (e) {
    console.error("Failed to load cart items", e);
  }

  // Display items with images
  if (previewList) {
    previewList.innerHTML = "";

    cartItems.forEach(item => {
      const li = document.createElement("li");
      li.classList.add("checkout-item");

      li.innerHTML = `
        <img src="assets/images/${item.image}" class="checkout-img" alt="${item.name}">
        <div>
          <strong>${item.name}</strong><br>
          $${item.price.toFixed(2)}
        </div>
      `;

      previewList.appendChild(li);
    });
  }

  // Calculate totals
  let subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  let tax = subtotal * TAX_RATE;
  let total = subtotal + tax;

  subtotalElem.textContent = subtotal.toFixed(2);
  taxElem.textContent = tax.toFixed(2);
  orderTotalElem.textContent = total.toFixed(2);
});
