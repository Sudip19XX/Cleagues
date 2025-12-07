// Home Page Component

import { navigate } from '../App.js';
import { GAME_MODES } from '../utils/constants.js';

export function createHomePage() {
  const page = document.createElement('div');
  page.className = 'home-page';

  // Hero Section
  const hero = createHeroSection();
  page.appendChild(hero);

  // Games Section
  const games = createGamesSection();
  page.appendChild(games);

  // Stats Section
  const stats = createStatsSection();
  page.appendChild(stats);

  return page;
}

function createHeroSection() {
  const section = document.createElement('section');
  section.style.cssText = `
    padding: var(--spacing-3xl) 0;
    text-align: center;
  `;

  const container = document.createElement('div');
  container.className = 'container';

  container.innerHTML = `
    <h1 style="font-size: 4rem; margin-bottom: var(--spacing-lg); animation: fadeIn 0.8s ease-out; color: #000000;">
      CRYPTO LEAGUES
    </h1>
    <p style="font-size: 1.5rem; color: var(--color-text-secondary); margin-bottom: var(--spacing-2xl); max-width: 700px; margin-left: auto; margin-right: auto; animation: fadeIn 0.8s ease-out 0.2s both;">
      The future of crypto fantasy trading
    </p>
    <div style="display: flex; gap: var(--spacing-md); justify-content: center; flex-wrap: wrap; animation: fadeIn 0.8s ease-out 0.4s both;">
      <button class="btn btn-primary btn-lg" id="get-started">
        Get Started
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7"></path>
        </svg>
      </button>
      <button class="btn btn-secondary btn-lg" id="learn-more">
        Learn More
      </button>
    </div>
  `;

  section.appendChild(container);

  // Add event listeners after appending
  setTimeout(() => {
    const getStartedBtn = section.querySelector('#get-started');
    const learnMoreBtn = section.querySelector('#learn-more');

    getStartedBtn?.addEventListener('click', () => {
      const gamesSection = document.getElementById('games');
      gamesSection?.scrollIntoView({ behavior: 'smooth' });
    });

    learnMoreBtn?.addEventListener('click', () => {
      alert('Crypto Leagues is a Web3 fantasy trading platform where you can compete with other players by predicting crypto price movements!');
    });
  }, 0);

  return section;
}

function createGamesSection() {
  const section = document.createElement('section');
  section.id = 'games';
  section.style.cssText = `
    padding: var(--spacing-3xl) 0;
    background: var(--color-bg-secondary);
  `;

  const container = document.createElement('div');
  container.className = 'container';

  const title = document.createElement('h2');
  title.textContent = 'Game Modes';
  title.style.cssText = `
    text-align: center;
    margin-bottom: var(--spacing-2xl);
    font-size: 2.5rem;
  `;
  container.appendChild(title);

  const grid = document.createElement('div');
  grid.className = 'grid';
  grid.style.cssText = `
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: var(--spacing-xl);
    max-width: 1200px;
    margin: 0 auto;
    justify-items: center;
    animation: fadeIn 0.8s ease-out;
  `;

  // Reorder games: Dream Team, Crypto Duel, Time-Based, Predict Candle
  const orderedModes = [
    GAME_MODES.DREAM_TEAM,
    GAME_MODES.CRYPTO_DUEL,
    GAME_MODES.TIME_BASED,
    GAME_MODES.PREDICT_CANDLE,
  ];

  orderedModes.forEach((mode, index) => {
    const card = createGameCard(mode, index);
    grid.appendChild(card);
  });

  // Add "Coming Soon" card
  const comingSoonCard = createComingSoonCard(orderedModes.length);
  grid.appendChild(comingSoonCard);

  container.appendChild(grid);
  section.appendChild(container);

  return section;
}

function createGameCard(mode, index) {
  const card = document.createElement('div');
  card.className = 'card game-mode-card';
  card.style.cssText = `
    cursor: pointer;
    width: 100%;
    max-width: 320px;
    animation: fadeIn 0.6s ease-out ${index * 0.1}s both;
  `;

  card.innerHTML = `
    <div style="font-size: 3rem; margin-bottom: var(--spacing-md); text-align: center;">
      ${mode.icon}
    </div>
    <h3 style="margin-bottom: var(--spacing-md); text-align: center;">
      ${mode.name}
    </h3>
    <p style="color: var(--color-text-secondary); text-align: center; margin-bottom: var(--spacing-lg);">
      ${mode.description}
    </p>
    <button class="btn btn-primary" style="width: 100%;">
      Play Now
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M5 12h14M12 5l7 7-7 7"></path>
      </svg>
    </button>
  `;

  card.addEventListener('click', () => {
    navigate(mode.path);
  });

  return card;
}

function createComingSoonCard(index) {
  const card = document.createElement('div');
  card.className = 'card coming-soon-card';
  card.style.cssText = `
    width: 100%;
    max-width: 320px;
    animation: fadeIn 0.6s ease-out ${index * 0.1}s both;
    opacity: 0.7;
    cursor: not-allowed;
    position: relative;
    overflow: hidden;
  `;

  card.innerHTML = `
    <div style="position: absolute; top: 10px; right: 10px;">
      <span class="badge badge-warning" style="font-size: 0.75rem;">Soon</span>
    </div>
    <div style="font-size: 3rem; margin-bottom: var(--spacing-md); text-align: center; filter: grayscale(0.3);">
      🎯
    </div>
    <h3 style="margin-bottom: var(--spacing-md); text-align: center;">
      More Game Modes
    </h3>
    <p style="color: var(--color-text-secondary); text-align: center; margin-bottom: var(--spacing-lg);">
      Exciting new game modes are coming soon! Stay tuned for updates.
    </p>
    <button class="btn btn-secondary" style="width: 100%; opacity: 0.5; cursor: not-allowed;" disabled>
      Coming Soon
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
    </button>
  `;

  return card;
}

function createStatsSection() {
  const section = document.createElement('section');
  section.id = 'stats';
  section.style.cssText = `
    padding: var(--spacing-3xl) 0;
  `;

  const container = document.createElement('div');
  container.className = 'container';

  const title = document.createElement('h2');
  title.textContent = 'Platform Stats';
  title.style.cssText = `
    text-align: center;
    margin-bottom: var(--spacing-2xl);
    font-size: 2.5rem;
  `;
  container.appendChild(title);

  const statsGrid = document.createElement('div');
  statsGrid.className = 'grid grid-4';
  statsGrid.style.animation = 'fadeIn 0.8s ease-out';

  const stats = [
    { label: 'Total Players', value: '10,234', icon: '👥' },
    { label: 'Active Games', value: '1,456', icon: '🎮' },
    { label: 'Total Volume', value: '$2.4M', icon: '💰' },
    { label: 'Rewards Paid', value: '$156K', icon: '🏆' },
  ];

  stats.forEach((stat, index) => {
    const statCard = document.createElement('div');
    statCard.className = 'card';
    statCard.style.cssText = `
      text-align: center;
      animation: scaleIn 0.6s ease-out ${index * 0.1}s both;
    `;

    statCard.innerHTML = `
      <div style="font-size: 2.5rem; margin-bottom: var(--spacing-sm);">
        ${stat.icon}
      </div>
      <div style="font-size: 2rem; font-weight: 700; margin-bottom: var(--spacing-sm); background: var(--gradient-primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
        ${stat.value}
      </div>
      <div style="color: var(--color-text-secondary); font-size: 0.875rem;">
        ${stat.label}
      </div>
    `;

    statsGrid.appendChild(statCard);
  });

  container.appendChild(statsGrid);
  section.appendChild(container);

  return section;
}
