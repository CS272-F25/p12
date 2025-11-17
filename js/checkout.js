
const TAX_RATE = 0.07;

document.addEventListener('DOMContentLoaded', () => {
  const subtotalElem = document.getElementById('subtotal-amount');
  const taxRateElem = document.getElementById('tax-rate');
  const taxElem = document.getElementById('tax-amount');
  const orderTotalElem = document.getElementById('order-total');

  if (!subtotalElem || !taxElem || !orderTotalElem) return;

  if (taxRateElem) taxRateElem.textContent = `${(TAX_RATE * 100).toFixed(2).replace(/\.00$/, '')}%`;

  try {
    const stored = localStorage.getItem('cart_total');
    const subtotal = stored !== null ? Number(stored) : 0;
    const safeSubtotal = Number.isFinite(subtotal) ? subtotal : 0;

    const tax = (safeSubtotal * TAX_RATE);
    const total = (safeSubtotal + tax);

    subtotalElem.textContent = safeSubtotal.toFixed(2);
    taxElem.textContent = tax.toFixed(2);
    orderTotalElem.textContent = total.toFixed(2);
  } catch (err) {
    console.error('Failed to read cart_total or compute totals', err);
    subtotalElem.textContent = '0.00';
    taxElem.textContent = '0.00';
    orderTotalElem.textContent = '0.00';
  }
});
