// Home Page Component
import { navigate } from '../App.js';
import { GAME_MODES } from '../utils/constants.js';

export function createHomePage() {

  const page = document.createElement('div');
  page.className = 'home-page';

  // Add futuristic grid background
  const bg = createBackgroundLines();
  page.appendChild(bg);

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
    <p style="font-size: 1.2rem; line-height: 1.6; color: var(--color-text-secondary); margin-bottom: var(--spacing-2xl); max-width: 800px; margin-left: auto; margin-right: auto; animation: fadeIn 0.8s ease-out 0.2s both;">
      Experience the future of crypto fantasy trading. Compete in high-stakes leagues, predict market movements with precision, and build your dream portfolio.
      Master the markets, climb the global leaderboards, and earn real rewards in a decentralized, skill-based ecosystem.
    </p>
    <div style="display: flex; gap: var(--spacing-md); justify-content: center; flex-wrap: wrap; animation: fadeIn 0.8s ease-out 0.4s both;">
      <button class="btn btn-primary btn-lg" id="get-started">
        Get Started
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
      navigate('/dream-team');
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
    background: transparent;
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
  grid.className = 'grid'; // Keeping class name for consistency, though it's flex now
  grid.style.cssText = `
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    justify-items: center;
    gap: var(--spacing-md);
    max-width: 1400px;
    padding: 0 var(--spacing-md);
    margin: 0 auto;
    animation: fadeIn 0.8s ease-out;
  `;

  // Reorder games: Dream Team, Crypto Duel, Time-Based, Predict Candle
  const orderedModes = [
    GAME_MODES.DREAM_TEAM,
    GAME_MODES.TIME_BASED,
    GAME_MODES.PREDICT_CANDLE,
    GAME_MODES.PVP_MODE,
    GAME_MODES.CRYPTO_DUEL,
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
    max-width: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: var(--spacing-xl);
    animation: fadeIn 0.6s ease-out ${index * 0.1}s both;
  `;

  card.innerHTML = `
    <div style="height: 80px; display: flex; align-items: center; justify-content: center; margin-bottom: var(--spacing-md);">
      <div style="transform: scale(1.2);">
        ${mode.icon}
      </div>
    </div>
    <h3 style="margin-bottom: var(--spacing-md); text-align: center; min-height: 1.2em; display: flex; align-items: center;">
      ${mode.name}
    </h3>
    <p style="color: var(--color-text-secondary); text-align: center; margin-bottom: var(--spacing-lg); flex-grow: 1;">
      ${mode.description}
    </p>
    <button class="btn btn-primary" style="width: max-content; margin: 0 auto; padding-left: var(--spacing-xl); padding-right: var(--spacing-xl);">
      ${getButtonText(mode.name)}
    </button>
  `;

  card.addEventListener('click', () => {
    navigate(mode.path);
  });

  return card;
}

function getButtonText(name) {
  switch (name) {
    case 'Dream Team': return 'Build Now';
    case 'Crypto Duel': return 'Find Duel';
    case 'Predict Candle': return 'Predict';
    case 'PvP Battle': return 'Compete';
    default: return 'Play Now';
  }
}

function createComingSoonCard(index) {
  const card = document.createElement('div');
  card.className = 'card coming-soon-card';
  card.style.cssText = `
    width: 100%;
    max-width: 350px;
    animation: fadeIn 0.6s ease-out ${Object.keys(GAME_MODES).length * 0.1}s both;
    opacity: 0.7;
    cursor: not-allowed;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: var(--spacing-xl);
  `;

  card.innerHTML = `
    <div style="height: 80px; display: flex; align-items: center; justify-content: center; margin-bottom: var(--spacing-md);">
      <style>
        @keyframes gradient-spin { 
          to { transform: rotate(360deg); } 
        }
        .gradient-ring {
          position: relative;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: transparent;
        }
        .gradient-ring::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: conic-gradient(from 0deg, #09C285, #666666, #333333, #333333, #09C285);
          -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 6px), #000 calc(100% - 6px));
          mask: radial-gradient(farthest-side, transparent calc(100% - 6px), #000 calc(100% - 6px));
          animation: gradient-spin 1.2s linear infinite;
        }
      </style>
      <div class="gradient-ring"></div>
    </div>
    <p style="color: var(--color-text-secondary); text-align: center; margin-bottom: var(--spacing-lg);">
      Exciting and competitive modes are coming soon stay tuned for updates!
    </p>

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

function createBackgroundLines() {
  const bg = document.createElement('div');
  bg.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    overflow: hidden;
    pointer-events: none;
    opacity: 0.8;
  `;

  // Grid Lines
  bg.innerHTML = `
    <div style="
      position: absolute;
      width: 200%;
      height: 200%;
      top: -50%;
      left: -50%;
      background-image: 
        linear-gradient(rgba(9, 194, 133, 0.4) 1px, transparent 1px),
        linear-gradient(90deg, rgba(9, 194, 133, 0.4) 1px, transparent 1px);
      background-size: 40px 40px;
      transform: perspective(500px) rotateX(60deg);
      animation: gridMove 20s linear infinite;
    "></div>
    <div style="
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at center, transparent 0%, var(--color-bg-primary) 70%);
    "></div>
    <style>
      @keyframes gridMove {
        0% { transform: perspective(500px) rotateX(60deg) translateY(0); }
        100% { transform: perspective(500px) rotateX(60deg) translateY(40px); }
      }
    </style>
  `;

  return bg;
}
