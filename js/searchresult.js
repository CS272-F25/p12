// ===========================
// PRODUCT LIST (reuse from shop.js)
// ===========================
const ITEMS = [
	{ id: 0, name: "Medium Roast Blend", price: 8, image: "mediumroast.webp" },
	{ id: 1, name: "Espresso Dark Roast Blend", price: 8, image: "espressodark.webp" },
	{ id: 2, name: "Vanilla Blend", price: 8, image: "vanilla.webp" },
	{ id: 3, name: "Light Roast Blend", price: 9, image: "lightroast.webp" },
	{ id: 4, name: "Peppermint Mocha Blend", price: 12, image: "peppermintmocha.webp" },
	{ id: 5, name: "Original Matcha", price: 10, image: "originalmatcha.webp" },
	{ id: 6, name: "Vanilla Matcha", price: 10, image: "vanillamatcha.webp" },
	{ id: 7, name: "Honey Matcha", price: 11, image: "honeymatcha.webp" },
	{ id: 8, name: "Cup and Saucer", price: 12, image: "cupands.webp" },
	{ id: 9, name: "French Press", price: 25, image: "frenchpress.webp" },
	{ id: 10, name: "Tall Glass Cup", price: 18, image: "glass.webp" },
	{ id: 11, name: "Short Glass Cup", price: 14, image: "glasscup.webp" },
	{ id: 12, name: "Reusable Straws", price: 7, image: "straws.webp" },
	{ id: 13, name: "Whisk", price: 16, image: "whisk.webp" },
	{ id: 14, name: "Matcha Candle", price: 20, image: "matchacandle.webp" },
	{ id: 15, name: "Coffee Candle", price: 20, image: "coffeecandle.webp" }
];

// Get search query from URL
function getSearchQuery() {
	const params = new URLSearchParams(window.location.search);
	return params.get('query') ? params.get('query').toLowerCase() : '';
}

// Render filtered products
function renderSearchResults() {
	const grid = document.getElementById("menu-grid");
	const query = getSearchQuery();
	if (!grid) return;

	grid.innerHTML = "";
	const filtered = ITEMS.filter(item =>
		item.name.toLowerCase().includes(query)
	);

	if (filtered.length === 0) {
		grid.innerHTML = `<div class='col-12'><p class='text-center'>No products found for "${query}".</p></div>`;
		return;
	}

	filtered.forEach(item => {
		grid.innerHTML += `
			<div class="col-12 col-sm-6 col-lg-3">
				<div class="card h-100 shadow-sm">
					<img src="assets/images/${item.image}" 
							 class="card-img-top" 
							 alt="${item.name}" 
							 style="height:170px; object-fit:cover;">

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

// Cart functions (reuse from shop.js)
function loadCart() {
	return JSON.parse(localStorage.getItem("cart")) || [];
}
function saveCart(cart) {
	localStorage.setItem("cart", JSON.stringify(cart));
}
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
function removeItem(id) {
	const cart = loadCart().filter(i => i.id !== id);
	saveCart(cart);
	updateCartUI();
}

// Render Cart UI
function updateCartUI() {
	const list = document.getElementById("cart-items");
	const totalBox = document.getElementById("cart-total");
	if (!list || !totalBox) return;
	let cart = loadCart();
	let total = 0;
	list.innerHTML = "";
	cart.forEach(item => {
		total += item.price * item.quantity;
		list.innerHTML += `
			<li class="list-group-item d-flex justify-content-between align-items-center">
				<div class="d-flex gap-3 align-items-center">
					<img src="assets/images/${item.image}" 
							 style="width:45px; height:45px; border-radius:6px; object-fit:cover;">
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

document.addEventListener("DOMContentLoaded", function() {
	renderSearchResults();
	updateCartUI();
	const clearBtn = document.getElementById("clear-cart");
	if (clearBtn) {
		clearBtn.addEventListener("click", () => {
			saveCart([]);
			updateCartUI();
		});
	}
});
