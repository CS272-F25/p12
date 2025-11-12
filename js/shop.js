const ITEMS = [
  { id: 0, name: 'Latte', price: 4.5, image: 'latte.jpg' },
  { id: 1, name: 'Cappuccino', price: 4.0, image: 'cappuccino.jpg' },
  { id: 2, name: 'Americano', price: 3.75, image: 'americano.jpg' },
  { id: 3, name: 'Blueberry Muffin', price: 3.25, image: 'muffin.jpg' },
  { id: 4, name: 'Chocolate Chip Cookie', price: 2.75, image: 'cookie.jpg' },
  { id: 5, name: 'Chai Tea', price: 3.5, image: 'tea.jpg' },
];

function renderMenuItems() {
  const grid = document.getElementById('menu-grid');
  if (!grid) return;

  // Clear any existing content
  grid.innerHTML = '';

  ITEMS.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';

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

    grid.appendChild(card);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderMenuItems);
} else {
  renderMenuItems();
}
