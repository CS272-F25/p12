/* =========================================
   PRODUCT LIST
========================================= */
const ITEMS = [
  { id: 0, name: "Medium Roast Blend", price: 8, image: "mediumroast.webp" },
  { id: 1, name: "Espresso Dark Roast Blend", price: 8, image: "espressodark.webp" },
  { id: 2, name: "Vanilla Blend", price: 8, image: "vanilla.webp" },
  { id: 3, name: "Light Roast Blend", price: 9, image: "lightroast.webp" },
  { id: 4, name: "Peppermint Mocha Blend", price: 12, image: "peppermintmocha.webp" },
  { id: 5, name: "Original Matcha", price: 10, image: "originalmatcha.webp" },
  { id: 6, name: "Vanilla Matcha", price: 10, image: "vanillamatcha.webp" },
  { id: 7, name: "Honey Matcha", price: 11, image: "honeymatcha.webp" },
];

/* =========================================
   CART STORAGE HELPERS
========================================= */
function loadCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* =========================================
   ADD TO CART  (STACK QUANTITIES)
========================================= */
function addToCart(id) {
  let cart = loadCart();
  const item = ITEMS.find(i => i.id === id);
  if (!item) return;

  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  saveCart(cart);
  updateCartUI();
}

/* =========================================
   CHANGE QUANTITY
========================================= */
function changeQty(id, amount) {
  let cart = loadCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.quantity += amount;
  if (item.quantity <= 0) {
    cart = cart.filter(i => i.id !== id);
  }

  saveCart(cart);
  updateCartUI();
}

/* =========================================
   REMOVE ITEM
========================================= */
function removeItem(id) {
  let cart = loadCart().filter(i => i.id !== id);
  saveCart(cart);
  updateCartUI();
}

/* =========================================
   RENDER SHOP ITEMS
========================================= */
function renderMenuItems() {
  const grid = document.getElementById("menu-grid");
  if (!grid) return;

  grid.innerHTML = "";

  ITEMS.forEach(item => {
    grid.innerHTML += `
      <div class="col-12 col-sm-6 col-lg-3">
        <div class="card h-100 shadow-sm">
          <img src="assets/images/${item.image}" class="card-img-top" alt="${item.name}" style="height:170px; object-fit:cover;">

          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text mb-3">$${item.price.toFixed(2)}</p>

            <button class="btn btn-primary w-100 mt-auto"
                    onclick="addToCart(${item.id})">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    `;
  });
}

document.addEventListener("DOMContentLoaded", renderMenuItems);

/* =========================================
   RENDER CART UI
========================================= */
function updateCartUI() {
  const list = document.getElementById("cart-items");
  const totalBox = document.getElementById("cart-total");

  if (!list || !totalBox) return;

  let cart = loadCart();
  list.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;

    list.innerHTML += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <div class="d-flex gap-3 align-items-center">
          <img src="assets/images/${item.image}" style="width:45px; height:45px; border-radius:6px; object-fit:cover;">
          <div>
            <strong>${item.name}</strong><br>
            <small>${item.quantity} × $${item.price.toFixed(2)}</small>
          </div>
        </div>

        <div class="d-flex gap-2">
          <button class="btn btn-sm btn-outline-secondary" onclick="changeQty(${item.id}, -1)">−</button>
          <button class="btn btn-sm btn-outline-secondary" onclick="changeQty(${item.id}, 1)">+</button>
          <button class="btn btn-sm btn-danger" onclick="removeItem(${item.id})">✖</button>
        </div>
      </li>
    `;
  });

  totalBox.textContent = total.toFixed(2);
}

// Load when page opens
updateCartUI();

/* =========================================
   CLEAR CART
========================================= */
const clearBtn = document.getElementById("clear-cart");
if (clearBtn) {
  clearBtn.addEventListener("click", () => {
    saveCart([]);
    updateCartUI();
  });
}
