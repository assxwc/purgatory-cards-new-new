interface CardData {
	id: string;
	name: string;
	title: string;
	image: string;
	description: string;
	stats: {
		power: number;
		soul: number;
		speed: number;
	};
	ability: string;
}

export async function initCardSystem() {
	console.log('Attempting to initialize card system...');
	try {
		const response = await fetch('/data/cards.json');
		if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
		const cards: CardData[] = await response.json();
		console.log('Cards data loaded:', cards);

		const roster = document.getElementById('character-roster');
		const grid = document.getElementById('card-grid');
		const modal = document.getElementById('card-modal');
		const modalContent = document.getElementById('modal-body');

		if (!grid || !modal || !modalContent || !roster) {
			console.error('Required DOM elements not found:', {
				grid: !!grid,
				modal: !!modal,
				modalContent: !!modalContent,
				roster: !!roster,
			});
			return;
		}

		// Clear existing content to avoid duplicates
		roster.innerHTML = '';
		grid.innerHTML = '';

		cards.forEach((card) => {
			// Create Roster Item (Circle Image Button)
			const rosterItem = document.createElement('div');
			rosterItem.className = 'roster-item';
			rosterItem.title = `點擊查看 ${card.name}`;
			rosterItem.innerHTML = `<img src="${card.image}" alt="${card.name}">`;
			rosterItem.addEventListener('click', () =>
				showCardDetails(card, modal, modalContent),
			);
			roster.appendChild(rosterItem);

			// Create Full Card
			const cardEl = document.createElement('div');
			cardEl.className = 'hell-card section-reveal';
			cardEl.innerHTML = `
			<div class="card-image-container">
				<img src="${card.image}" alt="${card.name}">
			</div>
			<div class="card-overlay">
				<h3 class="card-name">${card.name}</h3>
				<p class="card-title">${card.title}</p>
				<div class="card-action">
					<span class="view-btn">查看詳情 <i class="icon-eye">👁️</i></span>
				</div>
			</div>
		`;

			cardEl.addEventListener('click', () =>
				showCardDetails(card, modal, modalContent),
			);
			grid.appendChild(cardEl);
		});
	} catch (error) {
		console.error('Failed to initialize card system:', error);
	}
}

function showCardDetails(
	card: CardData,
	modal: HTMLElement,
	content: HTMLElement,
) {
	content.innerHTML = `
		<div class="modal-image">
			<img src="${card.image}" alt="${card.name}">
		</div>
		<div class="modal-info">
			<button class="modal-close" id="close-modal">&times;</button>
			<h2 class="card-name" style="font-size: 2.5rem;">${card.name}</h2>
			<p class="card-title">${card.title}</p>
			<p class="card-desc" style="margin: 1.5rem 0; color: #CCD6F6;">${card.description}</p>
			
			<div class="stats-container">
				<div class="stat-item">
					<span class="stat-value">${card.stats.power}</span>
					<span class="stat-label">Power</span>
				</div>
				<div class="stat-item">
					<span class="stat-value">${card.stats.soul}</span>
					<span class="stat-label">Soul</span>
				</div>
				<div class="stat-item">
					<span class="stat-value">${card.stats.speed}</span>
					<span class="stat-label">Speed</span>
				</div>
			</div>

			<div class="ability-box">
				<h4 style="color: #e63946; margin-bottom: 0.5rem;">特殊能力</h4>
				<p style="font-size: 0.9rem;">${card.ability}</p>
			</div>
		</div>
	`;

	modal.classList.add('active');

	document.getElementById('close-modal')?.addEventListener('click', () => {
		modal.classList.remove('active');
	});

	modal.addEventListener('click', (e) => {
		if (e.target === modal) modal.classList.remove('active');
	});
}
