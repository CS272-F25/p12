const header = document.querySelector('#siteHeader');
const menuBtn = document.querySelector('#menuToggle');
const mobileMenu = document.querySelector('#mobileMenu');
const mobileDropdownBtn = document.querySelector('.dropdown-btn-mobile');
const mobileDropdownMenu = document.querySelector('.dropdown-menu-mobile');

function onScroll() {
	header.classList.toggle('scrolled', window.scrollY > 8);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Toggle mobile menu
menuBtn.addEventListener('click', () => {
	const isOpen = menuBtn.getAttribute('aria-expanded') === 'true';
	menuBtn.setAttribute('aria-expanded', !isOpen);
	mobileMenu.hidden = isOpen;
	mobileMenu.classList.toggle('open', !isOpen);
});

// Toggle mobile dropdown inside menu
mobileDropdownBtn.addEventListener('click', () => {
	mobileDropdownMenu.classList.toggle('open');
});
