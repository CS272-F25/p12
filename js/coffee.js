// Simple JavaScript Cart for Coffee Shop

const cartItems = [];
const cartList = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const clearBtn = document.getElementById("clear-cart");

// Add to cart buttons
document.querySelectorAll(".add-cart").forEach(button => {
  button.addEventListener("click", () => {
    const name = button.getAttribute("data-name");
    const price = parseFloat(button.getAttribute("data-price"));
    addToCart(name, price);
  });
});

function addToCart(name, price) {
  cartItems.push({ name, price });
  updateCart();
}

function updateCart() {
  cartList.innerHTML = "";
  let total = 0;
  cartItems.forEach((item, index) => {
    total += item.price;
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - $${item.price.toFixed(2)}
      <button class="remove-item" data-index="${index}">✖</button>
    `;
    cartList.appendChild(li);
  });
  cartTotal.textContent = total.toFixed(2);

  // Remove item listener
  document.querySelectorAll(".remove-item").forEach(btn => {
    btn.addEventListener("click", e => {
      const i = e.target.getAttribute("data-index");
      cartItems.splice(i, 1);
      updateCart();
    });
  });
}

// Clear entire cart
clearBtn.addEventListener("click", () => {
  cartItems.length = 0;
  updateCart();
});

