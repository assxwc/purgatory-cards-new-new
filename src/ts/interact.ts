export function initInteractions() {
	const cursor = document.getElementById('custom-cursor');

	if (cursor) {
		document.addEventListener('mousemove', (e) => {
			cursor.style.left = `${e.clientX - 10}px`;
			cursor.style.top = `${e.clientY - 10}px`;
		});

		document.addEventListener('mousedown', () => {
			cursor.style.transform = 'scale(0.8)';
		});

		document.addEventListener('mouseup', () => {
			cursor.style.transform = 'scale(1)';
		});
	}

	// Smooth scroll handling (already handled by CSS, but can add JS logic here for complexity)
	const navLinks = document.querySelectorAll('nav a');
	navLinks.forEach((link) => {
		link.addEventListener('click', () => {
			// Optional: close mobile menu
		});
	});
}
