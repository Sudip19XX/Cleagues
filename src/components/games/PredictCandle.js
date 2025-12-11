// Predict the Candle Game Component
// Uses real-time Binance candlestick data

// ==========================================
// 🧪 TEST MODE ENABLED
// ==========================================
// For production testing - no real USDC required
// Bets are simulated, winners get mock rewards
// ==========================================
const TEST_MODE = true;

import {
  getAvailableTokens,
  fetchHistoricalCandles,
  subscribeToCandleUpdates,
  cleanupAllConnections,
  KLINE_INTERVALS
} from '../../services/candleService.js';
import { submitCandlePrediction } from '../../contracts/gameContract.js';
import { formatCurrency } from '../../utils/formatters.js';
import walletManager from '../../wallet/walletManager.js';

// Store active subscriptions for cleanup
let activeSubscriptions = [];

// Store candle data for each token (for real-time chart updates)
const candleDataStore = new Map();

// Store active predictions for each token (for checking results)
// Format: { symbol: { prediction: 'green'|'red', wagerAmount, targetCandleOpenTime, button, timerInterval } }
const activePredictions = new Map();

// Map timeframe minutes to Binance interval
const TIMEFRAME_MAP = {
  1: '1m',
  3: '3m',
  5: '5m',
  15: '15m',
  30: '30m',
  60: '1h',
};

export function createPredictCandle() {
  const page = document.createElement('div');
  page.className = 'predict-candle-page';

  const container = document.createElement('div');
  container.className = 'container';
  container.style.padding = 'var(--spacing-md) var(--spacing-lg)';

  // Header
  const header = document.createElement('div');
  header.style.cssText = 'margin-bottom: var(--spacing-lg); text-align: center;';
  header.innerHTML = `
    <h1 style="font-size: 2.5rem; margin-bottom: var(--spacing-sm); display: flex; align-items: center; justify-content: center; gap: var(--spacing-md);">
      <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="green-grad-page" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#09C285"/>
            <stop offset="100%" style="stop-color:#07a371"/>
          </linearGradient>
          <linearGradient id="red-grad-page" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#FF4D4F"/>
            <stop offset="100%" style="stop-color:#ff3336"/>
          </linearGradient>
        </defs>
        <line x1="10" y1="20" x2="10" y2="48" stroke="url(#green-grad-page)" stroke-width="1.5"/>
        <rect x="7" y="28" width="6" height="16" fill="url(#green-grad-page)" rx="1"/>
        <line x1="20" y1="16" x2="20" y2="44" stroke="url(#red-grad-page)" stroke-width="1.5"/>
        <rect x="17" y="24" width="6" height="12" fill="url(#red-grad-page)" rx="1"/>
        <line x1="30" y1="22" x2="30" y2="50" stroke="url(#green-grad-page)" stroke-width="1.5"/>
        <rect x="27" y="30" width="6" height="14" fill="url(#green-grad-page)" rx="1"/>
        <line x1="40" y1="18" x2="40" y2="46" stroke="url(#red-grad-page)" stroke-width="1.5"/>
        <rect x="37" y="26" width="6" height="14" fill="url(#red-grad-page)" rx="1"/>
        <line x1="50" y1="14" x2="50" y2="42" stroke="url(#green-grad-page)" stroke-width="1.5"/>
        <rect x="47" y="22" width="6" height="16" fill="url(#green-grad-page)" rx="1"/>
      </svg>
      Predict the Candle
    </h1>
    <p style="color: var(--color-text-secondary); font-size: 1.125rem;">
      Predict if the next candle will be green (up) or red (down). <span style="color: var(--color-text-primary); font-weight: 600;">Bets are temporarily capped at $10.</span>
    </p>
    ${TEST_MODE ? `
    <div style="
      display: inline-flex;
      align-items: center;
      gap: 8px;
      margin-top: var(--spacing-md);
      padding: 8px 20px;
      background: linear-gradient(135deg, rgba(255, 215, 0, 0.15) 0%, rgba(255, 165, 0, 0.1) 100%);
      border: 1px solid rgba(255, 215, 0, 0.4);
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 600;
      color: #FFD700;
    ">
      🧪 TEST MODE - No real USDC required
    </div>
    ` : ''}
  `;
  container.appendChild(header);

  // Live indicator


  // Timeframe Selector
  const timeframeSelector = document.createElement('div');
  timeframeSelector.style.cssText = `
    display: flex;
    justify-content: center;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-xl);
    flex-wrap: wrap;
  `;
  timeframeSelector.innerHTML = `
    <button class="timeframe-btn" data-minutes="1">1 Min</button>
    <button class="timeframe-btn" data-minutes="3">3 Min</button>
    <button class="timeframe-btn selected" data-minutes="5">5 Min</button>
    <button class="timeframe-btn" data-minutes="15">15 Min</button>
    <button class="timeframe-btn" data-minutes="30">30 Min</button>
    <button class="timeframe-btn" data-minutes="60">1 Hour</button>
  `;
  container.appendChild(timeframeSelector);

  // Token Grid
  const tokenGrid = document.createElement('div');
  tokenGrid.id = 'candle-token-grid';
  tokenGrid.className = 'grid';
  tokenGrid.style.cssText = `
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: var(--spacing-lg);
  `;
  container.appendChild(tokenGrid);

  page.appendChild(container);

  // Setup timeframe selector
  let selectedTimeframe = 5;
  timeframeSelector.querySelectorAll('.timeframe-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      timeframeSelector.querySelectorAll('.timeframe-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedTimeframe = parseInt(btn.dataset.minutes);
      // Reload with new timeframe
      loadTokensWithCandles(tokenGrid, selectedTimeframe);
    });
  });

  // Load tokens
  loadTokensWithCandles(tokenGrid, selectedTimeframe);

  // Cleanup on page navigation
  window.addEventListener('hashchange', () => {
    cleanupSubscriptions();
  });

  return page;
}

function cleanupSubscriptions() {
  activeSubscriptions.forEach(unsub => {
    if (typeof unsub === 'function') unsub();
  });
  activeSubscriptions = [];
  candleDataStore.clear();
}

async function loadTokensWithCandles(gridContainer, timeframeMinutes) {
  // Cleanup previous subscriptions
  cleanupSubscriptions();

  gridContainer.innerHTML = '<div class="loading" style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-2xl);"></div>';

  try {
    const tokens = getAvailableTokens(12);
    const interval = TIMEFRAME_MAP[timeframeMinutes] || '5m';

    gridContainer.innerHTML = '';

    for (const token of tokens) {
      const card = await createCandleCard(token, interval, timeframeMinutes);
      gridContainer.appendChild(card);
    }
  } catch (error) {
    console.error('Error loading tokens:', error);
    gridContainer.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-2xl); color: var(--color-danger);">
        Failed to load tokens. Please try again later.
      </div>
    `;
  }
}

async function createCandleCard(token, interval, timeframeMinutes) {
  const card = document.createElement('div');
  card.className = 'card candle-card';
  card.id = `candle-card-${token.symbol}`;
  card.style.cssText = `
    display: flex;
    flex-direction: column;
    animation: fadeIn 0.6s ease-out;
    min-height: 300px;
  `;

  // Fetch historical candles
  let candles = [];
  let currentPrice = 0;
  let priceChange = 0;

  try {
    candles = await fetchHistoricalCandles(token.symbol, interval, 15);
    // Store candles for real-time updates
    candleDataStore.set(token.symbol, [...candles]);

    if (candles.length > 0) {
      currentPrice = candles[candles.length - 1].close;
      const firstPrice = candles[0].open;
      priceChange = ((currentPrice - firstPrice) / firstPrice) * 100;
    }
  } catch (error) {
    console.error(`Error fetching candles for ${token.symbol}:`, error);
  }

  // Calculate odds based on historical candle patterns
  let greenOdds = 50; // Default to 50% if no data
  let redOdds = 50;

  if (candles.length > 0) {
    const greenCount = candles.filter(c => c.isGreen).length;
    const totalCandles = candles.length;

    // Calculate probability as percentage (inverted for betting odds)
    // If 60% of candles were green historically, green has lower payout odds
    greenOdds = Math.round((greenCount / totalCandles) * 100);
    redOdds = 100 - greenOdds;

    // Clamp to reasonable range (10-90)
    greenOdds = Math.max(10, Math.min(90, greenOdds));
    redOdds = Math.max(10, Math.min(90, redOdds));
  }

  // --- Persistence Helpers ---

  function saveActiveBets() {
    const bets = [];
    activePredictions.forEach((data, key) => {
      // Only save essential data (no DOM refs, no functions)
      const { prediction, wagerAmount, targetCandleOpenTime, entryPriceRef, symbol, timeframe, key: storedKey, customStatus } = data;
      // Don't save if it's already lost and cleaning up (but customStatus might indicate won/claimable)
      bets.push({ key: storedKey || key, prediction, wagerAmount, targetCandleOpenTime, entryPriceRef, symbol, timeframe, customStatus });
    });
    localStorage.setItem('predict_candle_bets', JSON.stringify(bets));
  }

  function restoreActiveBets() {
    const saved = localStorage.getItem('predict_candle_bets');
    if (!saved) return;

    try {
      const bets = JSON.parse(saved);
      bets.forEach(bet => {
        const { key, symbol, timeframe, targetCandleOpenTime } = bet;
        const intervalMs = timeframe * 60 * 1000;
        const candleEndTime = targetCandleOpenTime + intervalMs;
        const now = Date.now();

        if (now >= candleEndTime) {
          // Ended while away/refreshing
          checkPastBet(bet);
        } else {
          // Still active
          resurrectActiveBet(bet);
        }
      });
    } catch (e) {
      console.error('Failed to restore bets:', e);
    }
  }

  async function checkPastBet(bet) {
    const { symbol, timeframe, targetCandleOpenTime, key } = bet;
    const interval = TIMEFRAME_MAP[timeframe] || '5m';

    // We need to fetch history and find the candle
    try {
      // Fetch last 50 to be safe
      const history = await fetchHistoricalCandles(symbol, interval, 50);
      const candle = history.find(c => c.openTime === targetCandleOpenTime);

      // Reconstruct basic predictionData for resolveBet
      const predictionData = {
        ...bet,
        button: null, // No button ref on resurrection
        unsub: null,
        timerInterval: null
      };
      activePredictions.set(key, predictionData); // Set temporarily for resolve

      if (candle && candle.isClosed) {
        resolveBet(key, symbol, candle, predictionData);
      } else {
        // If not found or not close, maybe API delay? Or very old?
        // If very old, expire.
        const age = Date.now() - (targetCandleOpenTime + timeframe * 60000);
        if (age > 3600000) { // 1 hour old
          activePredictions.delete(key);
          saveActiveBets();
        } else {
          // Try subscribing just in case it's just finishing
          resurrectActiveBet(bet);
        }
      }
    } catch (e) {
      console.error('Error checking past bet:', e);
    }
  }

  function resurrectActiveBet(bet) {
    const { symbol, timeframe, targetCandleOpenTime, key } = bet;
    const interval = TIMEFRAME_MAP[timeframe];
    const timeframeMs = timeframe * 60 * 1000;

    // Reconstruct predictionObj
    const predictionData = {
      ...bet,
      button: null, // UI will bind when card is created
      timerInterval: null
    };

    // Define updateTimer (Copy of logic in submitPrediction - ideally helper)
    // For brevity, we'll re-implement the timer logic minimal version or refactor
    // BUT updateTimer depends on predictionData closure.
    // To Avoid DRY violation and complexity, maybe better to abstract `startBetTracking(data)`?
    // Given constraints, I will duplicate validity check logic primarily.

    const updateTimer = () => {
      // Logic from submitPrediction (simplified for tracker)
      const now = Date.now();
      const candleStartTime = targetCandleOpenTime;
      const candleEndTime = candleStartTime + timeframeMs;
      const currentPath = window.location.hash.replace('#', '') || '/';
      const isOnPredictPage = currentPath === '/predict-candle';

      if (now >= candleEndTime) {
        clearInterval(predictionData.timerInterval);
        return; // Subscription will handle close
      }

      const isPending = now < candleStartTime;
      const targetTime = isPending ? candleStartTime : candleEndTime;
      const remaining = Math.max(0, targetTime - now);

      if (isOnPredictPage) {
        // Try to find button if we don't have a valid ref
        if (!predictionData.button || !document.body.contains(predictionData.button)) {
          const card = document.getElementById(`candle-card-${symbol}`);
          if (card) {
            const btn = card.querySelector('.submit-prediction-btn');
            if (btn) {
              predictionData.button = btn;
              // Force disable state since we found it late
              btn.disabled = true;
              // We could also disable inputs here if selectable
            }
          }
        }

        const btn = predictionData.button;
        if (btn && document.body.contains(btn)) {
          // ... UI Update logic duplicates submitPrediction ...
          // We let UI update itself via createCandleCard restore logic?
          // Actually createCandleCard restore logic sets static text.
          // We need THIS timer to update the button text!
          // So we need to query button again or use reference.
          // predictionData.button is updated by createCandleCard.

          const hours = Math.floor(remaining / 3600000);
          const minutes = Math.floor((remaining % 3600000) / 60000);
          const seconds = Math.floor((remaining % 60000) / 1000);
          const timeString = minutes + ':' + seconds.toString().padStart(2, '0');

          const stored = candleDataStore.get(symbol);
          const currentPrice = (stored && stored.length > 0) ? formatCurrency(stored[stored.length - 1].close) : '';

          if (isPending) {
            btn.innerHTML = `<span style="opacity:0.8;">Starts in</span> ${timeString}`;
            btn.style.background = '#3B82F6';
          } else {
            btn.innerHTML = `
                      <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
                        <span>Live: ${timeString}</span>
                        <span style="opacity: 0.6;">|</span>
                        <span>${currentPrice}</span>
                      </div>
                    `;
            btn.style.background = bet.prediction === 'green' ? '#09C285' : '#FF4D4F';
          }
        }

        // Ensure no tracker on page
        const item = document.getElementById(`tracker-item-${symbol}`);
        if (item) item.remove();
      } else {
        // Off page tracker
        const container = getTrackerContainer();
        const label = isPending ? 'Starting in...' : 'Your candle prediction is Live';
        updateTrackerItem(container, symbol, bet.prediction, remaining, label, 'compact', predictionData);
      }
    };

    predictionData.timerInterval = setInterval(updateTimer, 1000);
    // Bind subscription
    const unsub = subscribeToCandleUpdates(symbol, interval, (candle) => {
      // Also update store for price display
      const current = candleDataStore.get(symbol) || [];
      if (candle.isClosed || !current.length || candle.close !== current[current.length - 1].close) {
        candleDataStore.set(symbol, [...current, candle]);
      }

      if (candle.isClosed) {
        resolveBet(key, symbol, candle, predictionData);
      }
    });
    predictionData.unsub = unsub;

    // Add hash listener
    window.addEventListener('hashchange', updateTimer);

    activePredictions.set(key, predictionData);
    updateTimer();
  }

  // Initialize persistence immediately (Sync)
  restoreActiveBets();

  // Helper to remove item
  function removeTracker(symbol) {
    const item = document.getElementById(`tracker-item-${symbol}`);
    if (item) item.remove();
  }
  card.innerHTML = `
    <!-- Token Header -->
    <div style="display: flex; align-items: center; gap: var(--spacing-md); margin-bottom: var(--spacing-lg);">
      <img src="${token.image}" alt="${token.name}" style="width: 52px; height: 52px; border-radius: 12px; background: rgba(255,255,255,0.1); padding: 4px;" onerror="this.src='https://via.placeholder.com/52'" />
      <div style="flex: 1;">
        <div style="font-weight: 700; font-size: 1.1rem;">${token.symbol}</div>
      </div>
      <div style="text-align: right;">
        <div class="live-price" style="font-size: 1.1rem; font-weight: 700;">${formatCurrency(currentPrice)}</div>
        <div style="display: flex; align-items: center; justify-content: flex-end; gap: 4px;">
          <div class="candle-pulse-dot" style="width: 6px; height: 6px; background: ${candles.length > 0 && candles[candles.length - 1].isGreen ? '#09C285' : '#FF4D4F'}; border-radius: 50%; animation: pulse 2s infinite;"></div>
          <span class="current-candle-status" style="font-size: 0.7rem; font-weight: 600; color: ${candles.length > 0 && candles[candles.length - 1].isGreen ? '#09C285' : '#FF4D4F'};">
            ${candles.length > 0 && candles[candles.length - 1].isGreen ? 'GREEN' : 'RED'}
          </span>
        </div>
      </div>
    </div>

    <!-- Candlestick Chart -->
    <div class="candle-chart-container" style="
      height: 140px; 
      background: linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.15) 100%); 
      border-radius: 12px; 
      margin-bottom: var(--spacing-lg); 
      padding: var(--spacing-md); 
      position: relative;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.08);
    ">
      <div class="chart-grid" style="
        position: absolute;
        inset: 12px;
        pointer-events: none;
        background: 
          repeating-linear-gradient(to bottom, transparent 0px, transparent 22px, rgba(255, 255, 255, 0.05) 22px, rgba(255, 255, 255, 0.05) 23px),
          repeating-linear-gradient(to right, transparent 0px, transparent 22px, rgba(255, 255, 255, 0.05) 22px, rgba(255, 255, 255, 0.05) 23px);
      "></div>
      <div class="candle-chart" style="display: flex; align-items: flex-end; justify-content: space-around; height: 100%; gap: 4px; position: relative; z-index: 1;">
        ${generateRealCandleChart(candles)}
      </div>
    </div>

    <!-- Prediction Buttons (Yes/No style) -->
    <div style="display: flex; gap: var(--spacing-sm); margin-bottom: var(--spacing-md);">
      <button class="prediction-option green-option" data-prediction="green" style="
        flex: 1;
        padding: 14px 16px;
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(9, 194, 133, 0.4);
        border-radius: 12px;
        color: var(--color-text-primary);
        font-weight: 700;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
      ">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#09C285" stroke-width="3">
          <path d="M12 19V5M5 12l7-7 7 7"></path>
        </svg>
        <span style="color: #09C285;">Green</span> <span style="opacity: 0.6;">${greenOdds}%</span>
      </button>
      <button class="prediction-option red-option" data-prediction="red" style="
        flex: 1;
        padding: 14px 16px;
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 77, 79, 0.4);
        border-radius: 12px;
        color: var(--color-text-primary);
        font-weight: 700;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
      ">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF4D4F" stroke-width="3">
          <path d="M12 5v14M5 12l7 7 7-7"></path>
        </svg>
        <span style="color: #FF4D4F;">Red</span> <span style="opacity: 0.6;">${redOdds}%</span>
      </button>
    </div>

    <!-- Amount Input with Balance Label -->
    <div style="margin-bottom: var(--spacing-md);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <span style="font-size: 0.85rem; font-weight: 600; color: var(--color-text-secondary);">Bet Amount (USDC)</span>
        <span class="balance-display" style="font-size: 0.85rem; font-weight: 600; color: ${TEST_MODE ? '#FFD700' : 'var(--color-text-primary)'}; text-align: right;">${TEST_MODE ? '🧪 Test Mode' : (walletManager.getState().connected ? 'Bal: $0.00' : '')}</span>
      </div>

      <div style="display: flex; gap: 8px; align-items: center;">
        <div style="position: relative; flex: 1;">
          <span style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); font-size: 0.9rem; font-weight: 700; color: var(--color-text-muted);">$</span>
          <input 
            type="number" 
            class="wager-input" 
            data-token="${token.symbol}"
            placeholder="0" 
            min="1" 
            max="10"
            step="1"
            value=""
            style="
              width: 100%;
              padding: 10px 12px 10px 26px;
              background: rgba(255, 255, 255, 0.08);
              border: 1px solid rgba(255, 255, 255, 0.15);
              border-radius: 10px;
              color: var(--color-text-primary);
              font-size: 0.95rem;
              font-weight: 700;
              font-family: var(--font-primary);
              text-align: left;
              -webkit-appearance: none;
              -moz-appearance: textfield;
            "
          />
        </div>
        <div style="display: flex; gap: 6px;">
          <button class="quick-amount-btn" data-amount="5" style="
            padding: 8px 12px;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 8px;
            color: var(--color-text-primary);
            font-weight: 600;
            font-size: 0.75rem;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            white-space: nowrap;
          ">$5</button>
          <button class="quick-amount-btn" data-amount="10" style="
            padding: 8px 12px;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 8px;
            color: var(--color-text-primary);
            font-weight: 600;
            font-size: 0.75rem;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            white-space: nowrap;
          ">$10</button>
        </div>
      </div>
    </div>

    <!-- Submit Button -->
    <button class="submit-prediction-btn" data-token="${token.symbol}" style="
      width: 100%;
      padding: 16px;
      background: #3B82F6;
      border: none;
      border-radius: 12px;
      color: white;
      font-weight: 700;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.2s ease;
      opacity: 0.5;
    " disabled>
      Select Green or Red
    </button>

    <!-- Prediction Info (footnote) -->
    <div style="text-align: center; margin-top: var(--spacing-sm);">
      <span style="font-size: 0.7rem; color: var(--color-text-muted); font-style: italic;">* Your prediction is for the next candle</span>
    </div>
  `;

  // Track selected prediction for this card
  let selectedPrediction = null;

  // Subscribe to real-time updates
  const unsubscribe = subscribeToCandleUpdates(token.symbol, interval, (candle) => {
    updateCardWithCandle(card, candle, token.symbol);
  });
  activeSubscriptions.push(unsubscribe);

  // Prediction option buttons (Green/Red selection)
  const greenBtn = card.querySelector('.green-option');
  const redBtn = card.querySelector('.red-option');
  const submitBtn = card.querySelector('.submit-prediction-btn');
  const wagerInput = card.querySelector('.wager-input');

  function updateSubmitButton() {
    if (selectedPrediction && parseFloat(wagerInput.value) > 0) {
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
      submitBtn.textContent = selectedPrediction === 'green' ? 'Buy Green' : 'Buy Red';
      submitBtn.style.background = selectedPrediction === 'green' ? '#09C285' : '#FF4D4F';
    } else if (selectedPrediction) {
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';
      submitBtn.textContent = 'Enter amount';
      submitBtn.style.background = '#3B82F6';
    } else {
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.5';
      submitBtn.textContent = 'Select Green or Red';
      submitBtn.style.background = '#3B82F6';
    }
  }

  greenBtn.addEventListener('click', () => {
    selectedPrediction = 'green';
    // Update button styles
    greenBtn.style.background = '#09C285';
    greenBtn.style.border = 'none';
    greenBtn.style.color = 'white';
    greenBtn.querySelector('svg').setAttribute('stroke', 'white');
    greenBtn.querySelector('span').style.color = 'white';
    // Reset red button
    redBtn.style.background = 'rgba(255, 255, 255, 0.08)';
    redBtn.style.border = '1px solid rgba(255, 77, 79, 0.4)';
    redBtn.style.color = 'var(--color-text-primary)';
    redBtn.querySelector('svg').setAttribute('stroke', '#FF4D4F');
    redBtn.querySelector('span').style.color = '#FF4D4F';
    updateSubmitButton();
  });

  redBtn.addEventListener('click', () => {
    selectedPrediction = 'red';
    // Update button styles
    redBtn.style.background = '#FF4D4F';
    redBtn.style.border = 'none';
    redBtn.style.color = 'white';
    redBtn.querySelector('svg').setAttribute('stroke', 'white');
    redBtn.querySelector('span').style.color = 'white';
    // Reset green button
    greenBtn.style.background = 'rgba(255, 255, 255, 0.08)';
    greenBtn.style.border = '1px solid rgba(9, 194, 133, 0.4)';
    greenBtn.style.color = 'var(--color-text-primary)';
    greenBtn.querySelector('svg').setAttribute('stroke', '#09C285');
    greenBtn.querySelector('span').style.color = '#09C285';
    updateSubmitButton();
  });

  // Wager input change
  wagerInput.addEventListener('input', () => {
    const val = parseFloat(wagerInput.value);
    if (val > 10) {
      wagerInput.value = 10;
    }
    updateSubmitButton();
  });

  // Subscribe to wallet state changes to update balance
  const balanceDisplay = card.querySelector('.balance-display');
  let userBalance = 0; // Will be fetched from wallet in production

  const updateBalance = async (state) => {
    // In test mode, always show test mode indicator
    if (TEST_MODE) {
      balanceDisplay.textContent = '🧪 Test Mode';
      balanceDisplay.style.color = '#FFD700';
      return;
    }

    if (state.connected) {
      try {
        const balance = await walletManager.getUSDCBalance();
        userBalance = parseFloat(balance);
        balanceDisplay.textContent = `Bal: $${balance}`;
      } catch (e) {
        console.error('Failed to update balance', e);
        balanceDisplay.textContent = 'Bal: $0.00';
      }
    } else {
      userBalance = 0;
      balanceDisplay.textContent = '';
    }
  };

  // Initial balance update
  updateBalance(walletManager.getState());

  // Subscribe to wallet changes
  const unsubscribeWallet = walletManager.subscribe(updateBalance);

  // Store unsubscribe for cleanup
  activeSubscriptions.push(unsubscribeWallet);

  // Quick amount buttons
  card.querySelectorAll('.quick-amount-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const amount = btn.dataset.amount;
      wagerInput.value = amount;
      updateSubmitButton();
    });
  });

  // Submit button
  submitBtn.addEventListener('click', () => {
    if (selectedPrediction && parseFloat(wagerInput.value) > 0) {
      const wagerAmount = parseFloat(wagerInput.value);
      submitPrediction(token.symbol, selectedPrediction, token.name, timeframeMinutes, wagerAmount, submitBtn);
    }
  });

  // RESTORE ACTIVE BET STATE (If returning to page)
  const predictionKey = `${token.symbol}-${timeframeMinutes}`;
  if (activePredictions.has(predictionKey)) {
    const existingBet = activePredictions.get(predictionKey);
    // Bind new button to existing bet
    existingBet.button = submitBtn;

    // Disable inputs
    submitBtn.disabled = true;
    greenBtn.style.opacity = '0.5';
    redBtn.style.opacity = '0.5';
    greenBtn.style.pointerEvents = 'none';
    redBtn.style.pointerEvents = 'none';
    wagerInput.disabled = true;

    // Determine state
    // If timer is running -> Active
    if (existingBet.timerInterval) {
      // Button style will be updated by next tick of updateTimer
      // But set immediate placeholder
      submitBtn.innerHTML = 'Restoring...';
    }
    // If timer cleared but in map -> Likely Won (waiting for claim)
    else {
      // Re-run resolve check logic or force Claim state?
      // Since resolveBet clears timer and sets button styles, we need to re-apply "Claim" style if winner
      // We can infer Winner from stored data? Or just check if we can "re-resolve"?
      // resolveBet requires candle. We don't have it handy here easily.
      // But we can store "status" in predictionData.
      if (existingBet.customStatus === 'won') {
        submitBtn.innerHTML = '🎉 Claim Reward';
        submitBtn.style.background = 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)';
        submitBtn.style.color = '#000';
        submitBtn.disabled = false;
        submitBtn.onclick = () => claimReward(token.symbol, existingBet, submitBtn, predictionKey);
      } else if (existingBet.customStatus === 'lost') {
        submitBtn.innerHTML = '❌ Lost';
        submitBtn.style.background = '#666';
      }
    }
  }

  return card;
}

function generateRealCandleChart(candles) {
  if (!candles || candles.length === 0) {
    return '<div style="color: var(--color-text-muted); font-size: 0.875rem; width: 100%; text-align: center; display: flex; align-items: center; justify-content: center;">Loading candles...</div>';
  }

  // Find price range for scaling
  const allPrices = candles.flatMap(c => [c.high, c.low]);
  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);
  const priceRange = maxPrice - minPrice || 1;

  const chartHeight = 110; // pixels (for prominent chart)
  const candleWidth = Math.max(4, Math.floor(120 / candles.length));

  return candles.map((candle, index) => {
    const isGreen = candle.isGreen;
    const color = isGreen ? '#09C285' : '#FF4D4F';

    // Calculate positions (inverted because CSS starts from top)
    const highY = chartHeight - ((candle.high - minPrice) / priceRange * chartHeight);
    const lowY = chartHeight - ((candle.low - minPrice) / priceRange * chartHeight);
    const openY = chartHeight - ((candle.open - minPrice) / priceRange * chartHeight);
    const closeY = chartHeight - ((candle.close - minPrice) / priceRange * chartHeight);

    const wickTop = Math.min(highY, Math.min(openY, closeY));
    const wickBottom = lowY;
    const wickHeight = wickBottom - wickTop;

    const bodyTop = Math.min(openY, closeY);
    const bodyHeight = Math.max(2, Math.abs(closeY - openY));

    const isLast = index === candles.length - 1;
    const opacity = 0.5 + (index / candles.length * 0.5);

    return `
      <div class="candle" data-index="${index}" style="
        position: relative;
        width: ${candleWidth}px;
        height: 100%;
        ${isLast ? 'animation: candlePulse 1s infinite;' : ''}
      ">
        <!-- Wick -->
        <div style="
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: ${wickTop}px;
          width: 1px;
          height: ${wickHeight}px;
          background: ${color};
          opacity: ${opacity};
        "></div>
        <!-- Body -->
        <div style="
          position: absolute;
          left: 0;
          top: ${bodyTop}px;
          width: 100%;
          height: ${bodyHeight}px;
          background: ${color};
          border-radius: 1px;
          opacity: ${opacity};
          ${isLast ? 'box-shadow: 0 0 8px ' + color + ';' : ''}
        "></div>
      </div>
    `;
  }).join('');
}

function updateCardWithCandle(card, candle, symbol) {
  // Update live price
  const priceEl = card.querySelector('.live-price');
  if (priceEl) {
    const oldPrice = parseFloat(priceEl.textContent.replace(/[^0-9.-]/g, ''));
    const newPrice = candle.close;

    priceEl.textContent = formatCurrency(newPrice);

    // Flash animation on price change
    if (oldPrice !== newPrice) {
      priceEl.style.transition = 'color 0.3s';
      priceEl.style.color = newPrice > oldPrice ? '#09C285' : '#FF4D4F';
      setTimeout(() => {
        priceEl.style.color = '';
      }, 500);
    }
  }

  // Update current candle indicator (pulsing dot + text)
  const statusEl = card.querySelector('.current-candle-status');
  const indicatorEl = card.querySelector('.current-candle-indicator');
  const dotEl = card.querySelector('.candle-pulse-dot');

  if (statusEl) {
    statusEl.textContent = candle.isGreen ? 'GREEN' : 'RED';
    statusEl.style.color = candle.isGreen ? '#09C285' : '#FF4D4F';
  }
  if (indicatorEl) {
    indicatorEl.style.background = candle.isGreen
      ? 'rgba(9, 194, 133, 0.15)'
      : 'rgba(255, 77, 79, 0.15)';
  }
  if (dotEl) {
    dotEl.style.background = candle.isGreen ? '#09C285' : '#FF4D4F';
  }

  // Update the candle chart in real-time
  const storedCandles = candleDataStore.get(symbol);
  if (storedCandles && storedCandles.length > 0) {
    // Find if this candle already exists (by openTime) or is a new one
    const lastStoredCandle = storedCandles[storedCandles.length - 1];

    if (candle.openTime === lastStoredCandle.openTime) {
      // Update the existing last candle with new data
      storedCandles[storedCandles.length - 1] = {
        ...lastStoredCandle,
        high: Math.max(lastStoredCandle.high, candle.high),
        low: Math.min(lastStoredCandle.low, candle.low),
        close: candle.close,
        isGreen: candle.isGreen,
        isClosed: candle.isClosed,
      };
    } else if (candle.isClosed || candle.openTime > lastStoredCandle.openTime) {
      // New candle started - add it and remove the oldest
      storedCandles.push({
        openTime: candle.openTime,
        open: candle.open,
        high: candle.high,
        low: candle.low,
        close: candle.close,
        closeTime: candle.closeTime,
        isGreen: candle.isGreen,
        isClosed: candle.isClosed,
      });

      // Keep only last 15 candles
      if (storedCandles.length > 15) {
        storedCandles.shift();
      }
    }

    // Re-render the chart with updated candles
    const chartEl = card.querySelector('.candle-chart');
    if (chartEl) {
      chartEl.innerHTML = generateRealCandleChart(storedCandles);
    }
  }

  // Log when candle closes
  if (candle.isClosed) {
    console.log(`Candle closed for ${symbol}:`, candle.isGreen ? 'GREEN' : 'RED');
  }
}

// Helper to check bet result (called by dedicated subscription)
function resolveBet(key, symbol, closedCandle, predictionData) {
  const { prediction, targetCandleOpenTime, unsub } = predictionData;

  // Use dynamic button ref
  const button = predictionData.button;

  // Check if this is the candle we bet on
  if (closedCandle.openTime !== targetCandleOpenTime) return;

  // Cleanup subscription
  if (unsub) unsub();

  // Clear timer
  if (predictionData.timerInterval) {
    clearInterval(predictionData.timerInterval);
    predictionData.timerInterval = null; // Mark as stopped
    const tracker = document.getElementById(`candle-tracker-${symbol}`);
    if (tracker) tracker.remove();
  }

  const isGreen = closedCandle.close > closedCandle.open;
  const userPredictedGreen = prediction === 'green';
  const isWinner = isGreen === userPredictedGreen;

  // Store status for reconnection
  predictionData.customStatus = isWinner ? 'won' : 'lost';

  // Check if button is still in DOM (user might have navigated)
  const isButtonActive = button && document.body.contains(button);

  if (isWinner) {
    if (isButtonActive) {
      button.innerHTML = '🎉 Claim Reward';
      button.style.background = 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)';
      button.style.color = '#000';
      button.disabled = false;
      button.onclick = () => claimReward(symbol, predictionData, button, key);
      triggerConfetti(button);
    } else {
      // Fallback notification?
      console.log("User won but button missing - waiting for reconnect");
    }
  } else {
    if (isButtonActive) {
      button.innerHTML = '❌ Lost';
      button.style.background = '#666';
      button.style.opacity = '0.7';
      setTimeout(() => {
        // Only reset if still showing lost (user didn't leave)
        if (document.body.contains(button)) {
          resetPredictionButton(button);
          activePredictions.delete(key);
          saveActiveBets();
        }
      }, 3000);
    } else {
      activePredictions.delete(key);
      saveActiveBets(); // Save removal
    }
  }
}

async function submitPrediction(tokenSymbol, prediction, tokenName, timeframe, wagerAmount, button) {
  const state = walletManager.getState();
  if (!state.connected) {
    alert('Please connect your wallet first!');
    return;
  }

  // Check if there's any active prediction for this token (regardless of timeframe)
  // "once the bet starts the user should not be able to place bets on the same coin"
  for (const key of activePredictions.keys()) {
    if (key.startsWith(`${tokenSymbol}-`)) {
      alert(`You already have an active prediction for ${tokenSymbol}. Please wait for it to settle.`);
      return;
    }
  }

  // Construct key for this specific prediction
  const predictionKey = `${tokenSymbol}-${timeframe}`;

  // Validate wager amount
  if (!wagerAmount || wagerAmount <= 0) {
    alert('Please enter a valid wager amount!');
    return;
  }

  if (wagerAmount < 0.01) {
    alert('Minimum wager is 0.01 USDT');
    return;
  }

  button.disabled = true;
  button.innerHTML = '<div class="loading"></div>';

  try {
    if (TEST_MODE) {
      console.log(`🧪 [TEST MODE] Placing ${prediction.toUpperCase()} prediction for ${tokenSymbol} - $${wagerAmount} USDC`);
    }

    const result = await submitCandlePrediction({
      token: tokenSymbol,
      isGreen: prediction === 'green',
      timeframe,
      wagerAmount,
    });

    // Calculate when the next candle will close
    const timeframeMs = timeframe * 60 * 1000;
    let currentCandleStart;

    // Use actual latest candle time from store to avoid local clock drift
    const storedCandles = candleDataStore.get(tokenSymbol);
    if (storedCandles && storedCandles.length > 0) {
      currentCandleStart = storedCandles[storedCandles.length - 1].openTime;
    } else {
      const now = Date.now();
      currentCandleStart = Math.floor(now / timeframeMs) * timeframeMs;
    }
    const nextCandleEnd = currentCandleStart + (timeframeMs * 2); // Next candle's close time

    // Store the prediction
    const predictionData = {
      prediction,
      wagerAmount,
      targetCandleOpenTime: currentCandleStart + timeframeMs, // The candle we're betting on
      button,
      timerInterval: null,
      predictionId: result.predictionId,
      // Capture rough entry price reference (last known close) for display
      entryPriceRef: storedCandles && storedCandles.length > 0 ? storedCandles[storedCandles.length - 1].close : 0,
      symbol: tokenSymbol,    // Store for persistence
      timeframe: timeframe,   // Store for persistence
      key: predictionKey      // Store for persistence
    };

    // Start countdown timer
    // Start countdown timer with tracker management
    const updateTimer = () => {
      // Always get FRESH button ref from data object (in case replaced by restore)
      const currentBtn = predictionData.button;

      const now = Date.now();
      const candleStartTime = predictionData.targetCandleOpenTime;
      const candleEndTime = candleStartTime + timeframeMs;

      // Check current page
      const currentPath = window.location.hash.replace('#', '') || '/';
      const isOnPredictPage = currentPath === '/predict-candle';

      if (now >= candleEndTime) {
        clearInterval(predictionData.timerInterval);
        if (currentBtn && document.body.contains(currentBtn)) currentBtn.innerHTML = '⏳ Checking...';
        // Remove tracker if exists
        const tracker = document.getElementById(`candle-tracker-${tokenSymbol}`);
        if (tracker) tracker.remove();

        // Final logic is handled by subscription/checkPastBet, but if subs fail, timer ending is just visual
        return;
      }

      // Determine phase
      const isPending = now < candleStartTime;
      const targetTime = isPending ? candleStartTime : candleEndTime;
      const remaining = Math.max(0, targetTime - now);

      const hours = Math.floor(remaining / 3600000);
      const minutes = Math.floor((remaining % 3600000) / 60000);
      const seconds = Math.floor((remaining % 60000) / 1000);

      let timeString = '';
      if (hours > 0) {
        timeString = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      } else {
        timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
      }

      // Update inline button
      if (isOnPredictPage && currentBtn && document.body.contains(currentBtn)) {
        // Fetch current price for detailed button
        const stored = candleDataStore.get(tokenSymbol);
        const currentPrice = (stored && stored.length > 0) ? formatCurrency(stored[stored.length - 1].close) : '';

        if (isPending) {
          currentBtn.innerHTML = `<span style="opacity:0.8;">Starts in</span> ${timeString}`;
          currentBtn.style.background = '#3B82F6';
        } else {
          // Detailed Live Status
          currentBtn.innerHTML = `
              <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
                <span>Live: ${timeString}</span>
                <span style="opacity: 0.6;">|</span>
                <span>${currentPrice}</span>
              </div>
            `;
          currentBtn.style.background = prediction === 'green' ? '#09C285' : '#FF4D4F';
        }
      }

      // Render shared tracker (Detailed OFF on page, Compact off page)
      // User requested "I don't want this" regarding the detailed window on main page.
      // So on Main Page: Show NOTHING extra (just inline button).
      // On Off Page: Show Compact Widget.

      if (!isOnPredictPage) {
        const container = getTrackerContainer();
        const trackerMode = 'compact';

        // Off-page customized text
        const label = isPending ? 'Starting in...' : 'Your candle prediction is Live';

        updateTrackerItem(container, tokenSymbol, prediction, remaining, label, trackerMode, predictionData);
      } else {
        // If on page, ensure no tracker item exists for this token
        const item = document.getElementById(`tracker-item-${tokenSymbol}`);
        if (item) item.remove();
      }
    };

    predictionData.timerInterval = setInterval(updateTimer, 1000);
    updateTimer(); // Initial update

    // Add navigation listener to update visibility immediately
    window.addEventListener('hashchange', updateTimer);

    // Subscribe to updates for this specific timeframe to track result
    const interval = TIMEFRAME_MAP[timeframe];
    const unsub = subscribeToCandleUpdates(tokenSymbol, interval, (candle) => {
      if (candle.isClosed) {
        resolveBet(predictionKey, tokenSymbol, candle, predictionData);
      }
    });
    predictionData.unsub = unsub;

    activePredictions.set(predictionKey, predictionData);
    saveActiveBets(); // Save to LS

  } catch (error) {
    button.disabled = false;
    button.innerHTML = 'Select Green or Red';
    button.style.background = '#3B82F6';
    alert(`❌ Error: ${error.message}`);
  }
}

function addCandleTrackerStyles() {
  const styleId = 'candle-tracker-styles';
  if (document.getElementById(styleId)) return;

  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = `
        .candle-tracker-card {
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

        .candle-tracker-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
            border-color: var(--color-primary);
        }

        .candle-tracker-card.pulse {
            animation: candleTrackerPulse 2s infinite;
        }

        @keyframes candleTrackerPulse {
          0% {
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
          }
          50% {
            box-shadow: 0 4px 25px rgba(9, 194, 133, 0.4);
          }
          100% {
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
          }
        }
    `;
  document.head.appendChild(style);
}

// Shared Tracker Container
function getTrackerContainer() {
  let container = document.getElementById('active-bets-tracker-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'active-bets-tracker-container';
    container.style.cssText = `
            position: fixed;
            bottom: 24px;
            right: 24px;
            z-index: 10000;
            display: flex;
            flex-direction: column;
            gap: 12px;
            pointer-events: none; /* Let clicks pass through gaps */
        `;
    document.body.appendChild(container);
  }
  return container;
}

function updateTrackerItem(container, symbol, prediction, remainingMs, statusLabel, mode, predictionData) {
  const itemId = `tracker-item-${symbol}`;
  let item = document.getElementById(itemId);

  // Create if missing
  if (!item) {
    item = document.createElement('div');
    item.id = itemId;
    item.style.cssText = `
            background: rgba(15, 23, 42, 0.95);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.4);
            color: white;
            font-family: var(--font-primary);
            overflow: hidden;
            pointer-events: auto;
            transition: all 0.3s ease;
            animation: slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            min-width: 260px;
        `;
    // Navigate on click
    item.addEventListener('click', () => {
      if (window.location.hash !== '#/predict-candle') {
        window.location.hash = '#/predict-candle';
      }
    });

    // Inject keyframes if generic (assuming common CSS or add here)
    // ...

    container.appendChild(item);
  }

  const hours = Math.floor(remainingMs / 3600000);
  const minutes = Math.floor((remainingMs % 3600000) / 60000);
  const seconds = Math.floor((remainingMs % 60000) / 1000);

  let timeDisplay = '';
  if (hours > 0) {
    timeDisplay = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  } else {
    timeDisplay = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  const color = prediction === 'green' ? '#09C285' : '#FF4D4F';
  const arrow = prediction === 'green' ? '↑' : '↓';

  // Get latest price for detailed view
  let currentPrice = '...';
  let pnlClass = '';
  if (mode === 'detailed') {
    const stored = candleDataStore.get(symbol);
    if (stored && stored.length > 0) {
      const price = stored[stored.length - 1].close;
      currentPrice = formatCurrency(price);
      // Rough PnL color
      // If Green prediction, Price > Entry? Wait, entry entryPriceRef is OLD close.
      // Real entry is Open of target candle. If we are Live, we might retrieve it?
      // But let's just use current candle color from store?
      // If stored[last].isGreen && prediction=='green' -> Winning?
      const isWinning = (prediction === 'green' && stored[stored.length - 1].isGreen) ||
        (prediction === 'red' && !stored[stored.length - 1].isGreen);
      pnlClass = isWinning ? 'text-green-400' : 'text-red-400';
    }
  }

  if (mode === 'detailed') {
    item.innerHTML = `
            <div style="padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center;">
                <div style="font-weight: 700; display: flex; align-items: center; gap: 8px;">
                    ${symbol} <span style="font-size: 0.8rem; background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px;">${statusLabel}</span>
                </div>
                <div style="font-family: monospace; font-weight: 700;">${timeDisplay}</div>
            </div>
            <div style="padding: 12px 16px; display: flex; justify-content: space-between; align-items: center; font-size: 0.9rem;">
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="color: rgba(255,255,255,0.6); font-size: 0.75rem;">Prediction</span>
                    <span style="color: ${color}; font-weight: 700;">${arrow} ${prediction.toUpperCase()}</span>
                </div>
                <div style="display: flex; flex-direction: column; gap: 4px; text-align: right;">
                    <span style="color: rgba(255,255,255,0.6); font-size: 0.75rem;">Current Price</span>
                    <span style="font-weight: 700;">${currentPrice}</span>
                </div>
            </div>
        `;
    item.style.padding = '0'; // Reset padding for detailed card layout
    item.style.minWidth = '260px';
  } else {
    // Compact Mode (Notification Style - Matching Pending Dream Team Widget)
    item.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; color: ${color}; margin-right: 12px;">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                 <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                 <polyline points="16 7 22 7 22 13"></polyline>
               </svg>
            </div>
            <span style="font-family: var(--font-primary); font-weight: 600; font-size: 0.95rem; color: #fff; margin-right: 12px; white-space: nowrap;">${statusLabel}</span>
            <span style="
                display: flex; align-items: center; justify-content: center;
                min-width: 54px; height: 26px; padding: 0 8px;
                background: ${prediction === 'green' ? '#09C285' : '#FF4D4F'};
                color: white; border-radius: 6px;
                font-size: 0.85rem; font-weight: 700;
                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                font-family: monospace;
            ">${timeDisplay}</span>
        `;
    // Override styling to match widget
    item.style.padding = '12px 20px';
    item.style.minWidth = 'auto';
    item.style.display = 'flex';
    item.style.alignItems = 'center';
    item.style.flexDirection = 'row';
  }
}

// Check prediction result when candle closes
// function checkPredictionResult(symbol, closedCandle) { ... } removed in favor of resolveBet

// Claim reward function
function claimReward(symbol, predictionData, button, key) {
  button.disabled = true;
  button.innerHTML = '<div class="loading"></div>';

  // Simulate claim (in production, this would call the smart contract)
  setTimeout(() => {
    const reward = (predictionData.wagerAmount * 1.9).toFixed(2); // 1.9x payout
    alert(`🎉 Congratulations! You won $${reward} USDC!`);
    resetPredictionButton(button);
    if (key) activePredictions.delete(key);
  }, 1500);
}

// Reset button to initial state
function resetPredictionButton(button) {
  button.innerHTML = 'Select Green or Red';
  button.style.background = '#3B82F6';
  button.style.color = 'white';
  button.style.opacity = '0.5';
  button.disabled = true;
  button.onclick = null;
}

// Confetti celebration effect
function triggerConfetti(button) {
  const card = button.closest('.card');
  if (!card) return;

  // Create confetti container
  const confettiContainer = document.createElement('div');
  confettiContainer.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    pointer-events: none;
    z-index: 100;
  `;
  card.style.position = 'relative';
  card.appendChild(confettiContainer);

  // Confetti colors
  const colors = ['#FFD700', '#FFA500', '#09C285', '#FF4D4F', '#3B82F6', '#FF69B4', '#00FFFF'];

  // Create confetti particles
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 8 + 4;
    const left = Math.random() * 100;
    const delay = Math.random() * 0.5;
    const duration = Math.random() * 1 + 1.5;
    const rotation = Math.random() * 360;
    const xOffset = (Math.random() - 0.5) * 200;

    confetti.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      left: ${left}%;
      bottom: 20%;
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
      opacity: 1;
      transform: rotate(${rotation}deg);
      animation: confettiFall ${duration}s ease-out ${delay}s forwards;
      --x-offset: ${xOffset}px;
    `;
    confettiContainer.appendChild(confetti);
  }

  // Remove confetti after animation
  setTimeout(() => {
    confettiContainer.remove();
  }, 3000);
}

// Add candle button styles
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  @keyframes candlePulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }

  @keyframes confettiFall {
    0% {
      transform: translateY(0) translateX(0) rotate(0deg) scale(1);
      opacity: 1;
    }
    20% {
      transform: translateY(-80px) translateX(var(--x-offset, 0)) rotate(180deg) scale(1.2);
      opacity: 1;
    }
    100% {
      transform: translateY(200px) translateX(var(--x-offset, 0)) rotate(720deg) scale(0.5);
      opacity: 0;
    }
  }

  /* Hide number input spinners */
  .wager-input::-webkit-outer-spin-button,
  .wager-input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  .wager-input[type=number] {
    -moz-appearance: textfield;
  }

  .timeframe-btn {
    padding: 0.5rem 1.25rem;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-md);
    color: var(--color-text-primary);
    cursor: pointer;
    transition: all var(--transition-fast);
    font-family: var(--font-primary);
    font-weight: 600;
  }

  .timeframe-btn:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .timeframe-btn.selected {
    background: var(--gradient-blue);
    border-color: transparent;
    color: white;
  }

  .candle-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.875rem;
    border: none;
    border-radius: var(--radius-md);
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
    transition: all var(--transition-base);
    font-family: var(--font-primary);
  }

  .candle-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .green-btn {
    background: var(--gradient-green);
    color: white;
  }

  .green-btn:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(9, 194, 133, 0.4);
  }

  .red-btn {
    background: linear-gradient(135deg, #FF4D4F 0%, #ff3336 100%);
    color: white;
  }

  .red-btn:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(255, 77, 79, 0.4);
  }

  .candle-card {
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  .candle-chart-container {
    position: relative;
    overflow: hidden;
  }

  .candle-chart .candle {
    transition: transform 0.2s ease;
  }

  .candle-chart .candle:last-child {
    animation: candlePulse 1s infinite;
  }

  .token-price-change.positive {
    color: #09C285;
  }

  .token-price-change.negative {
    color: #FF4D4F;
  }
`;
document.head.appendChild(style);
