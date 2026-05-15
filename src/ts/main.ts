import { initCardSystem } from './cards';
import { initInteractions } from './interact';

document.addEventListener('DOMContentLoaded', () => {
	console.log('Purgatory Card System Initialized');

	// Initialize systems
	initInteractions();
	initCardSystem();

	// Basic Intersection Observer for section reveals
	const observerOptions = {
		threshold: 0.1,
	};

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add('active');
			}
		});
	}, observerOptions);

	document.querySelectorAll('.section-reveal').forEach((el) => {
		observer.observe(el);
	});
});
