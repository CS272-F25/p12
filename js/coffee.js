const ITEMS = [ // TODO: Move this to a JSON file and fetch it
  { id: 0, name: 'Latte', price: 4.5, image: 'gallery1.jpg' },
  { id: 1, name: 'Cappuccino', price: 4.0, image: 'gallery2.jpg' },
  { id: 2, name: 'Americano', price: 3.75, image: 'gallery3.jpg' },
  { id: 3, name: 'Blueberry Muffin', price: 3.25, image: 'gallery4.jpg' },
  { id: 4, name: 'Chocolate Chip Cookie', price: 2.75, image: 'gallery1.jpg' },
  { id: 5, name: 'Chai Tea', price: 3.5, image: 'gallery2.jpg' },
];

function renderMenuItems() {
  const grid = document.getElementById('menu-grid');
  if (!grid) return;

  grid.innerHTML = '';

  ITEMS.forEach(item => {
    const cardWrapper = document.createElement('div');
    cardWrapper.classList.add('col-4', 'p-3');

    const card = document.createElement('div');
    card.classList.add('card', 'p-3');

    const img = document.createElement('img');
    img.src = `assets/images/${item.image}`;
    img.alt = item.name;
    card.appendChild(img);

    const h3 = document.createElement('h3');
    h3.textContent = item.name;
    card.appendChild(h3);

    const p = document.createElement('p');
    p.textContent = `$${item.price.toFixed(2)}`;
    card.appendChild(p);

    const btn = document.createElement('button');
    btn.className = 'add-cart';
    btn.setAttribute('data-name', item.name);
    btn.setAttribute('data-price', item.price.toString());
    btn.textContent = 'Add to Cart';
    card.appendChild(btn);

    cardWrapper.appendChild(card);
    grid.appendChild(cardWrapper);
  });

  document.querySelectorAll(".add-cart").forEach(button => {
    button.addEventListener("click", () => {
      const name = button.getAttribute("data-name");
      const price = parseFloat(button.getAttribute("data-price"));
      addToCart(name, price);
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderMenuItems);
} else {
  renderMenuItems();
}

const cartItems = [];
const cartList = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const clearBtn = document.getElementById("clear-cart");

try {
  const storedTotal = localStorage.getItem('cart_total');
  if (cartTotal && storedTotal !== null) {
    cartTotal.textContent = Number(storedTotal).toFixed(2);
  }
} catch (e) {
  console.error('Failed to read cart_total from localStorage', e);
}


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
  if (cartTotal) cartTotal.textContent = total.toFixed(2);

  try {
    localStorage.setItem('cart_total', total.toFixed(2));
  } catch (err) {
    console.error('Failed to save cart total to localStorage', err);
  }


  document.querySelectorAll(".remove-item").forEach(btn => {
    btn.addEventListener("click", e => {
      const i = e.target.getAttribute("data-index");
      cartItems.splice(i, 1);
      updateCart();
    });
  });
}

if (clearBtn) {
  clearBtn.addEventListener("click", () => {
    cartItems.length = 0;
    updateCart();
  });
}

