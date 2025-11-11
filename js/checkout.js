<div class="cart">
  <h3>Your Cart</h3>
  <ul id="cart-items"></ul>
  <p>Total: $<span id="cart-total">0.00</span></p>
</div>


// Example of a basic in-browser cart
const cartItems = [];
const cartList = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

function addToCart(itemName, price) {
  cartItems.push({ itemName, price });
  updateCart();
}

function updateCart() {
  cartList.innerHTML = "";
  let total = 0;
  cartItems.forEach(item => {
    total += item.price;
    const li = document.createElement("li");
    li.textContent = `${item.itemName} — $${item.price.toFixed(2)}`;
    cartList.appendChild(li);
  });
  cartTotal.textContent = total.toFixed(2);
}

// Example usage:
addToCart("Latte", 4.5);
addToCart("Blueberry Muffin", 3.25);


<div class="cart">
  <h3>Your Cart</h3>
  <ul id="cart-items"></ul>
  <p>Total: $<span id="cart-total">0.00</span></p>
</div>

