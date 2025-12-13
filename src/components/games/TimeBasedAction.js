// Time-Based Action Game Component
// Players predict if price will go UP or DOWN in exactly 1 minute

import { fetchTopTokens } from '../../services/priceService.js';
import { submitTimeAction } from '../../contracts/gameContract.js';
import { fetchTickerData, subscribeToTickerUpdates, fetchMultipleTickers } from '../../services/candleService.js';
import { formatCurrency, formatPercentage, getPriceChangeClass } from '../../utils/formatters.js';
import walletManager from '../../wallet/walletManager.js';

// Store active predictions
// Key: tokenSymbol, Value: { type: 'UP'|'DOWN', startPrice, startTime, timerInterval }
const activePredictions = new Map();

export function createTimeBasedAction() {
  const page = document.createElement('div');
  page.className = 'time-based-page';
  page.style.height = 'calc(100vh - 64px)'; // Adjust for header
  page.style.overflowY = 'auto';

  const container = document.createElement('div');
  container.className = 'container';
  container.style.padding = 'var(--spacing-xl) var(--spacing-lg)';

  // Header
  const header = document.createElement('div');
  header.style.marginBottom = 'var(--spacing-xl)';

  // Custom gradient for the header icon
  const iconGradient = `
    <defs>
      <linearGradient id="time-grad-page" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#3B82F6"/>
        <stop offset="100%" style="stop-color:#2563EB"/>
      </linearGradient>
    </defs>
  `;

  header.innerHTML = `
    <h1 style="font-size: 2.5rem; margin-bottom: var(--spacing-sm); display: flex; align-items: center; justify-content: center; gap: var(--spacing-md);">
      <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        ${iconGradient}
        <style>
          @keyframes tick {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .stopwatch-hand {
            transform-origin: 32px 34px;
            animation: tick 2s steps(60) infinite;
          }
        </style>
        <!-- Stopwatch Body -->
        <circle cx="32" cy="34" r="24" stroke="url(#time-grad-page)" stroke-width="3" fill="none"/>
        <circle cx="32" cy="34" r="24" stroke="url(#time-grad-page)" stroke-width="3" fill="url(#time-grad-page)" opacity="0.1"/>
        
        <!-- Top Button -->
        <path d="M26 6H38V10H26V6Z" fill="url(#time-grad-page)"/>
        <rect x="30" y="2" width="4" height="4" fill="url(#time-grad-page)"/>
        
        <!-- Ticks -->
        <path d="M32 14V17" stroke="url(#time-grad-page)" stroke-width="2" stroke-linecap="round"/>
        <path d="M32 51V54" stroke="url(#time-grad-page)" stroke-width="2" stroke-linecap="round"/>
        <path d="M52 34H49" stroke="url(#time-grad-page)" stroke-width="2" stroke-linecap="round"/>
        <path d="M15 34H12" stroke="url(#time-grad-page)" stroke-width="2" stroke-linecap="round"/>
        
        <!-- Hand -->
        <line x1="32" y1="34" x2="32" y2="18" stroke="#FF4D4F" stroke-width="2" stroke-linecap="round" class="stopwatch-hand"/>
        
        <!-- Center Dot -->
        <circle cx="32" cy="34" r="3" fill="#3B82F6"/>
      </svg>
      60 Sec Sprint
    </h1>
    <p style="text-align: center; color: var(--color-text-secondary); font-size: 1.125rem;">
      Predict if the price will go UP or DOWN in 1 minute.
    </p>
  `;
  container.appendChild(header);

  // Token Grid
  const tokenGrid = document.createElement('div');
  tokenGrid.id = 'token-grid';
  tokenGrid.className = 'grid';
  tokenGrid.style.cssText = `
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: var(--spacing-lg);
  `;
  container.appendChild(tokenGrid);

  page.appendChild(container);

  // Load tokens
  loadTokens(tokenGrid);

  // Cleanup on leave
  window.addEventListener('hashchange', () => {
    // Clear all intervals
    activePredictions.forEach(pred => {
      if (pred.timerInterval) clearInterval(pred.timerInterval);
    });
    activePredictions.clear();
  }, { once: true });

  return page;
}

async function loadTokens(gridContainer) {
  gridContainer.innerHTML = '<div class="loading" style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-2xl);"></div>';

  try {
    // Priority tokens for Binance
    const prioritySymbols = ['BTC', 'ETH', 'SOL', 'XRP', 'DOGE', 'PEPE', 'BNB', 'ADA', 'AVAX', 'LINK', 'DOT', 'SHIB', 'LTC', 'UNI', 'NEAR', 'ATOM', 'ARB', 'OP', 'SUI', 'APT'];

    // Fetch tokens from Binance
    const binanceTokens = await fetchMultipleTickers(prioritySymbols);

    if (binanceTokens && binanceTokens.length > 0) {
      // Transform to match expected format (though fetchMultipleTickers returns compatible structure)
      // fetchMultipleTickers returns: { symbol, name, image, price, priceChange24h, ... }
      // createPredictionCard expects: { symbol, name, image, currentPrice: price, priceChange24h }

      const tokens = binanceTokens.map(t => ({
        ...t,
        currentPrice: t.price // changing key for consistency with priceService format if needed
      }));

      renderTokens(tokens, gridContainer);
    } else {
      throw new Error('No Binance tokens found');
    }

  } catch (error) {
    console.error('Error loading tokens:', error);

    // Fallback? Or just show error as user requested Binance specifically
    // Trying fallback to standard fetch if Binance fails might be good but user said "here also use binance" 
    // implying strict usage. I will stick to error reporting or basic fallback if needed but primarily Binance.

    gridContainer.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-2xl); color: var(--color-danger);">
        Failed to load tokens from Binance. Please try again later.
      </div>
    `;
  }
}

function renderTokens(tokens, gridContainer) {
  gridContainer.innerHTML = '';

  tokens.forEach(token => {
    const card = createPredictionCard(token);
    gridContainer.appendChild(card);
  });
}

function createPredictionCard(token) {
  const card = document.createElement('div');
  card.className = 'card prediction-card';
  card.dataset.symbol = token.symbol;
  card.style.cssText = `
    display: flex;
    flex-direction: column;
    animation: fadeIn 0.6s ease-out;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-lg);
    padding: var(--spacing-lg);
    position: relative;
    overflow: hidden;
  `;

  const changeClass = getPriceChangeClass(token.priceChange24h);
  const formattedPrice = formatCurrency(token.currentPrice);

  card.innerHTML = `
    <!-- Header -->
    <div style="display: flex; align-items: center; gap: var(--spacing-md); margin-bottom: var(--spacing-lg);">
      <img src="${token.image}" alt="${token.name}" style="width: 48px; height: 48px; border-radius: 50%;" />
      <div style="flex: 1;">
        <div style="font-weight: 700; font-size: 1.1rem; margin-bottom: 2px;">${token.name}</div>
        <div style="font-size: 0.875rem; color: var(--color-text-muted);">${token.symbol.toUpperCase()}</div>
      </div>
      <div style="text-align: right;">
        <div class="token-price" style="font-size: 1.1rem; font-weight: 700;">${formattedPrice}</div>
        <div class="token-change ${changeClass}" style="font-size: 0.875rem;">${formatPercentage(token.priceChange24h)}</div>
      </div>
    </div>

    <!-- Prediction Area -->
    <div class="prediction-area" style="display: flex; flex-direction: column; gap: var(--spacing-md);">
      <div style="text-align: center; font-size: 0.9rem; color: var(--color-text-secondary); margin-bottom: var(--spacing-xs);">
        Will ${token.symbol.toUpperCase()} go UP or DOWN in 1 min?
        <div style="font-size: 0.85rem; color: #3B82F6; font-weight: 600; margin-top: 4px;">Entry: $5 USDC</div>
      </div>

      <div style="display: flex; gap: var(--spacing-md);">
        <!-- UP Button -->
        <button class="predict-btn up-btn" data-type="UP" style="
          flex: 1;
          padding: 1rem;
          background: rgba(9, 194, 133, 0.1);
          border: 1px solid rgba(9, 194, 133, 0.3);
          border-radius: var(--radius-md);
          color: #09C285;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        ">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
          UP
        </button>

        <!-- DOWN Button -->
        <button class="predict-btn down-btn" data-type="DOWN" style="
          flex: 1;
          padding: 1rem;
          background: rgba(255, 77, 79, 0.1);
          border: 1px solid rgba(255, 77, 79, 0.3);
          border-radius: var(--radius-md);
          color: #FF4D4F;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        ">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
          DOWN
        </button>
      </div>
    </div>

    <!-- Active Timer State (Hidden initially) -->
    <div class="active-state" style="display: none; flex-direction: column; align-items: center; padding: var(--spacing-md); background: var(--color-bg-tertiary); border-radius: var(--radius-md); text-align: center;">
      <div style="font-size: 0.9rem; margin-bottom: var(--spacing-sm); color: var(--color-text-muted);">
        Predicted: <span class="prediction-text" style="font-weight: 700;"></span>
      </div>
      <div class="timer-display" style="font-size: 2rem; font-weight: 700; font-variant-numeric: tabular-nums; margin-bottom: var(--spacing-sm);">
        01:00
      </div>
      <div style="font-size: 0.8rem; color: var(--color-text-muted);">
        Start Price: <span class="start-price">...</span>
      </div>
      <div class="current-price-display" style="font-size: 0.9rem; font-weight: 600; margin-top: 4px;">
        Current: <span class="current-price">...</span>
      </div>
    </div>

    <!-- Result State (Hidden initially) -->
    <div class="result-state" style="display: none; flex-direction: column; align-items: center; padding: var(--spacing-md); background: var(--color-bg-tertiary); border-radius: var(--radius-md); text-align: center;">
    </div>
  `;

  // Real-time price updates for the main card price
  subscribeToTickerUpdates(token.symbol, (ticker) => {
    updateCardPrice(card, ticker);
  });

  // Action listeners
  const upBtn = card.querySelector('.up-btn');
  const downBtn = card.querySelector('.down-btn');

  upBtn.addEventListener('click', () => startPrediction(token, 'UP', card));
  downBtn.addEventListener('click', () => startPrediction(token, 'DOWN', card));

  return card;
}

function updateCardPrice(card, ticker) {
  // Update main header price
  const priceEl = card.querySelector('.token-price');
  const changeEl = card.querySelector('.token-change');

  if (priceEl && changeEl) {
    const oldPrice = parseFloat(priceEl.dataset.rawPrice || 0);
    priceEl.textContent = formatCurrency(ticker.price);
    priceEl.dataset.rawPrice = ticker.price;

    // Flash effect
    if (oldPrice && oldPrice !== ticker.price) {
      priceEl.style.color = ticker.price > oldPrice ? '#09C285' : '#FF4D4F';
      setTimeout(() => { priceEl.style.color = ''; }, 300);
    }

    changeEl.textContent = formatPercentage(ticker.priceChange24h);
    changeEl.className = `token-change ${getPriceChangeClass(ticker.priceChange24h)}`;
  }

  // If active prediction, update current price display
  const activeState = card.querySelector('.active-state');
  if (activeState.style.display !== 'none') {
    const currentPriceEl = activeState.querySelector('.current-price');
    if (currentPriceEl) {
      currentPriceEl.textContent = formatCurrency(ticker.price);
      // Indicate if winning or losing in real-time
      const symbol = card.dataset.symbol;
      const prediction = activePredictions.get(symbol);
      if (prediction) {
        const startPrice = prediction.startPrice;
        const type = prediction.type;
        const isWinning = (type === 'UP' && ticker.price > startPrice) ||
          (type === 'DOWN' && ticker.price < startPrice);

        currentPriceEl.style.color = isWinning ? '#09C285' : '#FF4D4F';
      }
    }
  }
}

async function startPrediction(token, type, card) {
  const state = walletManager.getState();
  if (!state.connected) {
    alert('Please connect your wallet first!');
    return;
  }

  // Check Balance
  const balance = await walletManager.getUSDCBalance();
  if (parseFloat(balance) < 5) {
    alert("Insufficient Balance! Minimum bet is $5 USDC.");
    return;
  }

  if (activePredictions.has(token.symbol)) {
    return; // Already active
  }

  // Get UI elements
  const predictionArea = card.querySelector('.prediction-area');
  const activeState = card.querySelector('.active-state');
  const predictionText = activeState.querySelector('.prediction-text');
  const startPriceEl = activeState.querySelector('.start-price');
  const currentPriceEl = activeState.querySelector('.current-price');
  const timerDisplay = activeState.querySelector('.timer-display');
  const resultState = card.querySelector('.result-state');

  // Hide inputs, show loader
  predictionArea.style.display = 'none';
  activeState.style.display = 'flex';
  activeState.innerHTML = '<div class="loading"></div> Preparing...';

  try {
    // Fetch latest price for start
    // We try to get fresh data
    let startPrice = token.currentPrice;
    try {
      const ticker = await fetchTickerData(token.symbol);
      startPrice = ticker.price;
    } catch (e) {
      console.log('Using cached price for start');
    }

    // Reset Active State HTML
    activeState.innerHTML = `
      <div style="font-size: 0.9rem; margin-bottom: var(--spacing-sm); color: var(--color-text-muted);">
        Predicted: <span class="prediction-text" style="font-weight: 700; color: ${type === 'UP' ? '#09C285' : '#FF4D4F'}">${type}</span>
      </div>
      <div class="timer-display" style="font-size: 2.5rem; font-weight: 700; font-variant-numeric: tabular-nums; margin-bottom: var(--spacing-sm);">
        01:00
      </div>
      <div style="display: flex; justify-content: space-between; width: 100%; font-size: 0.85rem; padding: 0 var(--spacing-md);">
        <div>Start: <span class="start-price">${formatCurrency(startPrice)}</span></div>
        <div>Current: <span class="current-price">${formatCurrency(startPrice)}</span></div>
      </div>
    `;

    // Start Timer
    const durationSec = 60;
    const startTime = Date.now();
    const endTime = startTime + (durationSec * 1000);

    const prediction = {
      type,
      startPrice,
      startTime,
      timerInterval: null
    };

    // Store prediction
    activePredictions.set(token.symbol, prediction);

    // Update function with tracker support
    const updateTimer = () => {
      const now = Date.now();
      const remainingMs = endTime - now;

      // Check current page
      const currentPath = window.location.hash.replace('#', '') || '/';
      const isOnFrenzyPage = currentPath === '/time-based';

      if (remainingMs <= 0) {
        clearInterval(prediction.timerInterval);
        finishPrediction(token, card, prediction);
        // Remove floating tracker
        const tracker = document.getElementById(`frenzy-tracker-${token.symbol}`);
        if (tracker) tracker.remove();
        return;
      }

      const seconds = Math.ceil(remainingMs / 1000);

      if (isOnFrenzyPage) {
        // On page: Update inline text
        const displayEl = activeState.querySelector('.timer-display');
        if (displayEl) {
          displayEl.textContent = `00:${seconds.toString().padStart(2, '0')}`;
          // Color urgency
          if (seconds <= 10) displayEl.style.color = '#FF4D4F';
          else displayEl.style.color = '';
        }

        // Hide floating tracker
        const tracker = document.getElementById(`frenzy-tracker-${token.symbol}`);
        if (tracker) tracker.style.display = 'none';

      } else {
        // Off page: Show floating tracker
        const tracker = createFrenzyFloatingTracker(token.symbol, type, endTime);
        tracker.style.display = 'flex';
        updateFrenzyTrackerContent(tracker, token.symbol, type, remainingMs);
      }
    };

    prediction.timerInterval = setInterval(updateTimer, 1000);
    updateTimer(); // Initial call

    // Add navigation listener
    window.addEventListener('hashchange', updateTimer);

  } catch (error) {
    console.error(error);
    alert('Failed to start prediction');
    predictionArea.style.display = 'flex';
    activeState.style.display = 'none';
  }
}

async function finishPrediction(token, card, prediction) {
  const activeState = card.querySelector('.active-state');
  const resultState = card.querySelector('.result-state');

  activeState.style.display = 'none';
  resultState.style.display = 'flex';
  resultState.innerHTML = '<div class="loading"></div> Calculating...';

  try {
    // Fetch final price
    let endPrice = prediction.startPrice;
    try {
      const ticker = await fetchTickerData(token.symbol);
      endPrice = ticker.price;
    } catch (e) {
      console.error('Error fetching final price', e);
      // Fallback: use whatever current price we have or can get
      // For now, assume stored price update loop caught it? No, need explicit fetch for safety.
      // If fail, maybe reuse last known.
    }

    const isUp = endPrice > prediction.startPrice;
    const isDown = endPrice < prediction.startPrice;
    const isTie = endPrice === prediction.startPrice;

    // Determine win/loss
    let won = false;
    if (prediction.type === 'UP' && isUp) won = true;
    if (prediction.type === 'DOWN' && isDown) won = true;

    // UI Update
    resultState.innerHTML = `
      <div style="font-size: 3rem; margin-bottom: var(--spacing-sm); animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);">
        ${won ? '🎉' : '😔'}
      </div>
      <div style="font-size: 1.25rem; font-weight: 700; margin-bottom: var(--spacing-xs); color: ${won ? 'var(--color-success)' : 'var(--color-danger)'};">
        ${won ? 'You Won!' : 'You Lost'}
      </div>
      <div style="font-size: 0.9rem; color: var(--color-text-secondary); margin-bottom: var(--spacing-md);">
        Price went ${isUp ? 'UP' : isDown ? 'DOWN' : 'NOWHERE'} (${formatCurrency(prediction.startPrice)} → ${formatCurrency(endPrice)})
      </div>
      <button class="reset-btn" style="
        background: ${won ? 'var(--color-primary)' : 'var(--color-bg-secondary)'};
        color: ${won ? 'white' : 'var(--color-text-primary)'};
        border: 1px solid ${won ? 'transparent' : 'var(--glass-border)'};
        padding: 0.75rem 1.5rem;
        border-radius: var(--radius-md);
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
      ">
        ${won ? 'Claim Reward' : 'Close'}
      </button>
    `;

    const resetBtn = resultState.querySelector('.reset-btn');
    resetBtn.onclick = () => {
      // Reset card state
      activePredictions.delete(token.symbol);
      resultState.style.display = 'none';
      card.querySelector('.prediction-area').style.display = 'flex';

      if (won) {
        // Maybe trigger confetti or balance update here
      }
    };

  } catch (error) {
    console.error(error);
    resultState.innerHTML = `
      <div style="color: var(--color-danger);">Error calculating results.</div>
      <button class="reset-btn">Close</button>
    `;
    resultState.querySelector('.reset-btn').onclick = () => {
      activePredictions.delete(token.symbol);
      resultState.style.display = 'none';
      card.querySelector('.prediction-area').style.display = 'flex';
    };
  }
}

function addFrenzyTrackerStyles() {
  const styleId = 'frenzy-tracker-styles';
  if (document.getElementById(styleId)) return;

  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = `
        .frenzy-tracker-card {
            position: fixed;
            bottom: 24px;
            right: 24px;
            z-index: 1000;
            
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            
            min-width: 220px;
            padding: 12px 20px;
            
            background: rgba(15, 23, 42, 0.9);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
            
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            animation: fadeIn 0.3s ease-out;
            color: white;
            font-family: var(--font-primary);
        }

        .frenzy-tracker-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
            border-color: var(--color-primary);
        }

        .frenzy-tracker-card.pulse {
            animation: frenzyTrackerPulse 2s infinite;
        }

        @keyframes frenzyTrackerPulse {
          0% {
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
          }
          50% {
            box-shadow: 0 4px 25px rgba(59, 130, 246, 0.4);
          }
          100% {
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
          }
        }
    `;
  document.head.appendChild(style);
}

function createFrenzyFloatingTracker(symbol, type, endTime) {
  const trackerId = `frenzy-tracker-${symbol}`;
  let tracker = document.getElementById(trackerId);

  if (!tracker) {
    addFrenzyTrackerStyles();

    tracker = document.createElement('div');
    tracker.id = trackerId;
    tracker.className = 'frenzy-tracker-card pulse';

    tracker.addEventListener('click', () => {
      window.location.hash = '#/time-based';
    });

    document.body.appendChild(tracker);
  }

  return tracker;
}

function updateFrenzyTrackerContent(tracker, symbol, type, remainingMs) {
  const hours = Math.floor(remainingMs / 3600000);
  const minutes = Math.floor((remainingMs % 3600000) / 60000);
  const seconds = Math.floor((remainingMs % 60000) / 1000);

  const timeDisplay = minutes > 0
    ? `${minutes}:${seconds.toString().padStart(2, '0')}`
    : `00:${seconds.toString().padStart(2, '0')}`;

  const color = type === 'UP' ? '#09C285' : '#FF4D4F';
  const arrow = type === 'UP' ? '↑' : '↓';

  tracker.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 2px;">
            <div style="font-size: 0.75rem; color: rgba(255,255,255,0.7); font-weight: 500;">60 Sec Sprint</div>
            <div style="display: flex; align-items: center; gap: 6px;">
                <span style="font-weight: 700; font-size: 0.95rem;">${symbol}</span>
                <span style="color: ${color}; font-weight: 700; font-size: 0.9rem;">${arrow} ${type}</span>
            </div>
        </div>
        <div style="font-family: monospace; font-size: 1.25rem; font-weight: 700; color: ${seconds <= 10 ? '#FF4D4F' : 'white'};">
            ${timeDisplay}
        </div>
    `;
}
