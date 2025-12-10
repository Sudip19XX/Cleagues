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

  // Social Sticky Bar
  const socialBar = createSocialBar();
  page.appendChild(socialBar);

  // Mouse glow effect
  const mouseGlow = createMouseGlow();
  page.appendChild(mouseGlow);

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
  `;

  // Grid Lines - smoother animation with reduced opacity and larger grid
  bg.innerHTML = `
    <div class="grid-container" style="
      position: absolute;
      width: 400%;
      height: 400%;
      top: -150%;
      left: -150%;
      background-image: 
        linear-gradient(rgba(9, 194, 133, 0.12) 1px, transparent 1px),
        linear-gradient(90deg, rgba(9, 194, 133, 0.12) 1px, transparent 1px);
      background-size: 50px 50px;
      transform: perspective(1000px) rotateX(70deg);
      animation: gridMove 50s linear infinite;
      will-change: transform;
    "></div>
    
    <!-- Subtle fade at edges only -->
    <div style="
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: 
        radial-gradient(ellipse 120% 100% at center 100%, transparent 0%, transparent 60%, var(--color-bg-primary) 90%),
        linear-gradient(to bottom, var(--color-bg-primary) 0%, transparent 5%, transparent 95%, var(--color-bg-primary) 100%),
        linear-gradient(to right, var(--color-bg-primary) 0%, transparent 5%, transparent 95%, var(--color-bg-primary) 100%);
      pointer-events: none;
    "></div>
    
    <style>
      @keyframes gridMove {
        0% { transform: perspective(1000px) rotateX(70deg) translateY(0); }
        100% { transform: perspective(1000px) rotateX(70deg) translateY(50px); }
      }
    </style>
  `;

  return bg;
}

function createSocialBar() {
  const bar = document.createElement('div');
  bar.className = 'social-sticky-bar';
  bar.style.cssText = `
    position: fixed;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
    z-index: 100;
    padding: 16px 12px;
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-right: none;
    border-radius: 16px 0 0 16px;
  `;

  const socials = [
    {
      name: 'X (Twitter)',
      url: 'https://x.com/leaguesdotfun',
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 4l11.733 16h4.267l-11.733 -16z"/>
        <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/>
      </svg>`
    },
    {
      name: 'Discord',
      url: 'https://discord.gg/cryptoleagues',
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M8 12a1 1 0 1 0 2 0a1 1 0 0 0 -2 0"/>
        <path d="M14 12a1 1 0 1 0 2 0a1 1 0 0 0 -2 0"/>
        <path d="M15.5 17c0 1 1.5 3 2 3c1.5 0 2.833 -1.667 3.5 -3c.667 -1.667 .5 -5.833 -1.5 -11.5c-1.457 -1.015 -3 -1.34 -4.5 -1.5l-.972 1.923a11.913 11.913 0 0 0 -4.053 0l-.975 -1.923c-1.5 .16 -3.043 .485 -4.5 1.5c-2 5.667 -2.167 9.833 -1.5 11.5c.667 1.333 2 3 3.5 3c.5 0 2 -2 2 -3"/>
        <path d="M7 16.5c3.5 1 6.5 1 10 0"/>
      </svg>`
    },
    {
      name: 'Telegram',
      url: 'https://t.me/cryptoleagues',
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4"/>
      </svg>`
    },
    {
      name: 'Docs',
      url: 'https://docs.cryptoleagues.io',
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 3v4a1 1 0 0 0 1 1h4"/>
        <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"/>
        <path d="M9 9l1 0"/>
        <path d="M9 13l6 0"/>
        <path d="M9 17l6 0"/>
      </svg>`
    }
  ];

  bar.innerHTML = `
    <style>
      .social-link-item {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .social-link {
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgba(255, 255, 255, 0.5);
        background: transparent;
        transition: all 0.3s ease;
        text-decoration: none;
        position: relative;
      }
      .social-link:hover {
        color: #09C285;
        transform: scale(1.15);
      }
      .social-link svg {
        width: 18px;
        height: 18px;
      }
      .social-divider {
        width: 20px;
        height: 1px;
        background: rgba(255, 255, 255, 0.1);
        margin: 8px 0;
      }
      .social-link::before {
        content: attr(data-tooltip);
        position: absolute;
        right: 44px;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(0, 0, 0, 0.85);
        color: white;
        padding: 6px 10px;
        border-radius: 6px;
        font-size: 0.7rem;
        white-space: nowrap;
        opacity: 0;
        visibility: hidden;
        transition: all 0.2s ease;
        pointer-events: none;
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
      .social-link:hover::before {
        opacity: 1;
        visibility: visible;
        right: 48px;
      }
    </style>
    ${socials.map((social, index) => `
      <div class="social-link-item">
        <a href="${social.url}" target="_blank" rel="noopener noreferrer" class="social-link" data-tooltip="${social.name}">
          ${social.icon}
        </a>
        ${index < socials.length - 1 ? '<div class="social-divider"></div>' : ''}
      </div>
    `).join('')}
  `;

  return bar;
}

function createMouseGlow() {
  const glow = document.createElement('div');
  glow.className = 'mouse-glow';
  glow.style.cssText = `
    position: fixed;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(9, 194, 133, 0.15) 0%, rgba(9, 194, 133, 0.05) 30%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
    opacity: 0;
    will-change: left, top;
  `;

  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;
  let isVisible = false;
  let isAnimating = false;
  let isPageVisible = true;
  let animationId = null;

  // Smooth animation loop - only runs when needed
  function animate() {
    if (!isPageVisible || !isVisible) {
      isAnimating = false;
      return;
    }

    // Smooth interpolation (ease towards mouse position)
    const dx = mouseX - currentX;
    const dy = mouseY - currentY;

    currentX += dx * 0.08;
    currentY += dy * 0.08;

    glow.style.left = currentX + 'px';
    glow.style.top = currentY + 'px';

    // Stop animating if we're very close to target (within 0.5px)
    if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
      isAnimating = false;
      return;
    }

    animationId = requestAnimationFrame(animate);
  }

  // Start animation only if not already running
  function startAnimation() {
    if (!isAnimating && isPageVisible && isVisible) {
      isAnimating = true;
      animate();
    }
  }

  // Track mouse movement
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isVisible) {
      isVisible = true;
      glow.style.opacity = '1';
    }

    // Start animation when mouse moves
    startAnimation();
  });

  // Hide when mouse leaves window
  document.addEventListener('mouseleave', () => {
    isVisible = false;
    glow.style.opacity = '0';
  });

  // Show when mouse enters
  document.addEventListener('mouseenter', () => {
    isVisible = true;
    glow.style.opacity = '1';
    startAnimation();
  });

  // Optimization 2: Pause when page is not visible
  document.addEventListener('visibilitychange', () => {
    isPageVisible = !document.hidden;

    if (isPageVisible && isVisible) {
      // Resume animation when page becomes visible
      startAnimation();
    } else if (animationId) {
      // Cancel animation when page hidden
      cancelAnimationFrame(animationId);
      isAnimating = false;
    }
  });

  return glow;
}
