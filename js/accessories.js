const ITEMS = [
  { id: 0, name: 'Cup and Saucer', price: 12, image: 'cupands.webp' },
  { id: 1, name: 'French Press', price: 25, image: 'frenchpress.webp' },
  { id: 2, name: 'Tall Glass Cup', price: 18, image: 'glass.webp' },
  { id: 3, name: 'Short Glass Cup', price: 14, image: 'glasscup.webp' },
  { id: 4, name: 'Reusable Straws', price: 7, image: 'straws.webp' },
  { id: 5, name: 'Whisk', price: 16, image: 'whisk.webp' },
  { id: 6, name: 'Matcha Candle', price: 20, image: 'matchacandle.webp' },
  { id: 7, name: 'Coffee Candle', price: 20, image: 'coffeecandle.webp' },
];


function renderMenuItems() {
  const grid = document.getElementById("menu-grid");
  if (!grid) return;

  grid.innerHTML = "";

  ITEMS.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="assets/images/${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>$${item.price.toFixed(2)}</p>
      <button 
        class="add-cart" 
        data-name="${item.name}" 
        data-price="${item.price}" 
        data-image="${item.image}">
          Add to Cart
      </button>
    `;

    grid.appendChild(card);
  });

  // Add event listeners
  document.querySelectorAll(".add-cart").forEach(btn => {
    btn.addEventListener("click", () => {
      const name = btn.dataset.name;
      const price = Number(btn.dataset.price);
      const image = btn.dataset.image;

      addToCart(name, price, image);
    });
  });
}

document.addEventListener("DOMContentLoaded", renderMenuItems);


let cartItems = [];

// Load existing cart
try {
  const storedCart = localStorage.getItem("cart_items");
  if (storedCart) cartItems = JSON.parse(storedCart);
} catch (e) {
  console.error("Error loading cart:", e);
}

// DOM
const cartList = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const clearBtn = document.getElementById("clear-cart");


// Add to cart (now includes image)
function addToCart(name, price, image) {
  cartItems.push({ name, price, image });
  saveCart();
  updateCartUI();
}


// Save cart + total
function saveCart() {
  localStorage.setItem("cart_items", JSON.stringify(cartItems));

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);
  localStorage.setItem("cart_total", total.toFixed(2));
}


// Update cart UI
function updateCartUI() {
  if (!cartList || !cartTotal) return;

  cartList.innerHTML = "";
  let total = 0;

  cartItems.forEach((item, index) => {
    total += item.price;

    const li = document.createElement("li");

    li.innerHTML = `
      <img src="assets/images/${item.image}" class="cart-thumb">
      ${item.name} - $${item.price.toFixed(2)}
      <button class="remove-item" data-index="${index}">✖</button>
    `;

    cartList.appendChild(li);
  });

  cartTotal.textContent = total.toFixed(2);

  // Remove item listeners
  document.querySelectorAll(".remove-item").forEach(btn => {
    btn.addEventListener("click", e => {
      const i = Number(e.target.dataset.index);
      cartItems.splice(i, 1);
      saveCart();
      updateCartUI();
    });
  });
}


// Clear cart
if (clearBtn) {
  clearBtn.addEventListener("click", () => {
    cartItems = [];
    saveCart();
    updateCartUI();
  });
}


// Initial load
updateCartUI();
