// Predict the Candle Game Component
// Uses real-time Binance candlestick data

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
      Predict if the next candle will be green (up) or red (down)
    </p>
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

    <!-- Amount Input with Balance inside -->
    <div style="margin-bottom: var(--spacing-md);">
      <div style="display: flex; gap: 8px; align-items: center;">
        <div style="position: relative; flex: 1;">
          <span style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); font-size: 0.9rem; font-weight: 700; color: var(--color-text-muted);">$</span>
          <input 
            type="number" 
            class="wager-input" 
            data-token="${token.symbol}"
            placeholder="0" 
            min="1" 
            step="1"
            value=""
            style="
              width: 100%;
              padding: 10px 55px 10px 26px;
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
          <span class="balance-display" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); font-size: 0.65rem; color: var(--color-text-muted); opacity: 0.7; white-space: nowrap;">${walletManager.getState().connected ? '/ $0.00' : ''}</span>
        </div>
        <div style="display: flex; gap: 6px;">
          <button class="quick-amount-btn" data-amount="5" style="
            width: 32px;
            height: 32px;
            padding: 0;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 50%;
            color: var(--color-text-primary);
            font-weight: 600;
            font-size: 0.65rem;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
          ">+5</button>
          <button class="quick-amount-btn" data-amount="10" style="
            width: 32px;
            height: 32px;
            padding: 0;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 50%;
            color: var(--color-text-primary);
            font-weight: 600;
            font-size: 0.6rem;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
          ">+10</button>
          <button class="quick-amount-btn" data-amount="max" style="
            width: 32px;
            height: 32px;
            padding: 0;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 50%;
            color: var(--color-text-primary);
            font-weight: 600;
            font-size: 0.55rem;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
          ">Max</button>
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
  wagerInput.addEventListener('input', updateSubmitButton);

  // Subscribe to wallet state changes to update balance
  const balanceDisplay = card.querySelector('.balance-display');
  let userBalance = 0; // Will be fetched from wallet in production

  const updateBalance = async (state) => {
    if (state.connected) {
      // In production, fetch actual USDC balance here
      // For now, use mock balance
      userBalance = 0; // Replace with actual balance fetch
      balanceDisplay.textContent = `/ $${userBalance.toFixed(2)}`;
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
      if (amount === 'max') {
        if (!walletManager.getState().connected) {
          alert('Please connect your wallet first!');
          return;
        }
        wagerInput.value = userBalance || 0;
      } else {
        const currentVal = parseFloat(wagerInput.value) || 0;
        wagerInput.value = currentVal + parseInt(amount);
      }
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

  // Log when candle closes and check predictions
  if (candle.isClosed) {
    console.log(`Candle closed for ${symbol}:`, candle.isGreen ? 'GREEN' : 'RED');

    // Check if there's an active prediction for this token
    checkPredictionResult(symbol, candle);
  }
}

async function submitPrediction(tokenSymbol, prediction, tokenName, timeframe, wagerAmount, button) {
  const state = walletManager.getState();
  if (!state.connected) {
    alert('Please connect your wallet first!');
    return;
  }

  // Check if there's already an active prediction for this token
  if (activePredictions.has(tokenSymbol)) {
    alert('You already have an active prediction for this token. Wait for it to settle.');
    return;
  }

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
    const result = await submitCandlePrediction({
      token: tokenSymbol,
      isGreen: prediction === 'green',
      timeframe,
      wagerAmount,
    });

    // Calculate when the next candle will close
    const now = Date.now();
    const timeframeMs = timeframe * 60 * 1000;
    const currentCandleStart = Math.floor(now / timeframeMs) * timeframeMs;
    const nextCandleEnd = currentCandleStart + (timeframeMs * 2); // Next candle's close time

    // Store the prediction
    const predictionData = {
      prediction,
      wagerAmount,
      targetCandleOpenTime: currentCandleStart + timeframeMs, // The candle we're betting on
      button,
      timerInterval: null,
      predictionId: result.predictionId,
    };

    // Start countdown timer
    // Start countdown timer with tracker management
    const updateTimer = () => {
      const remaining = nextCandleEnd - Date.now();

      // Check current page
      const currentPath = window.location.hash.replace('#', '') || '/';
      const isOnPredictPage = currentPath === '/predict-candle';

      if (remaining <= 0) {
        clearInterval(predictionData.timerInterval);
        button.innerHTML = '⏳ Checking...';
        // Remove tracker if exists
        const tracker = document.getElementById(`candle-tracker-${tokenSymbol}`);
        if (tracker) tracker.remove();
        return;
      }

      const minutes = Math.floor(remaining / 60000);
      const seconds = Math.floor((remaining % 60000) / 1000);
      const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;

      // Update inline button if on page
      if (isOnPredictPage) {
        button.innerHTML = `⏱️ ${timeString}`;
        button.style.background = prediction === 'green' ? '#09C285' : '#FF4D4F';

        // Hide floating tracker if present
        const tracker = document.getElementById(`candle-tracker-${tokenSymbol}`);
        if (tracker) tracker.style.display = 'none';
      } else {
        // Show floating tracker if NOT on page
        const tracker = createFloatingTracker(tokenSymbol, prediction, nextCandleEnd);
        tracker.style.display = 'flex';
        updateTrackerContent(tracker, tokenSymbol, prediction, remaining);
      }
    };

    predictionData.timerInterval = setInterval(updateTimer, 1000);
    updateTimer(); // Initial update

    // Add navigation listener to update visibility immediately
    window.addEventListener('hashchange', updateTimer);

    activePredictions.set(tokenSymbol, predictionData);

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

function createFloatingTracker(symbol, prediction, targetTime) {
  const trackerId = `candle-tracker-${symbol}`;
  let tracker = document.getElementById(trackerId);

  if (!tracker) {
    // Inject styles
    addCandleTrackerStyles();

    tracker = document.createElement('div');
    tracker.id = trackerId;
    tracker.className = 'candle-tracker-card pulse';

    // Click to navigate back
    tracker.addEventListener('click', () => {
      window.location.hash = '#/predict-candle';
    });

    document.body.appendChild(tracker);
  }

  return tracker;
}

function updateTrackerContent(tracker, symbol, prediction, remainingMs) {
  const minutes = Math.floor(remainingMs / 60000);
  const seconds = Math.floor((remainingMs % 60000) / 1000);
  const timeDisplay = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  const color = prediction === 'green' ? '#09C285' : '#FF4D4F';
  const arrow = prediction === 'green' ? '↑' : '↓';

  tracker.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 2px;">
            <div style="font-size: 0.75rem; color: rgba(255,255,255,0.7); font-weight: 500;">Predict Candle</div>
            <div style="display: flex; align-items: center; gap: 6px;">
                <span style="font-weight: 700; font-size: 0.95rem;">${symbol}</span>
                <span style="color: ${color}; font-weight: 700; font-size: 0.9rem;">${arrow} ${prediction.toUpperCase()}</span>
            </div>
        </div>
        <div style="font-family: monospace; font-size: 1.25rem; font-weight: 700; color: white;">
            ${timeDisplay}
        </div>
    `;
}

// Check prediction result when candle closes
function checkPredictionResult(symbol, closedCandle) {
  const predictionData = activePredictions.get(symbol);
  if (!predictionData) return;

  // Check if this is the candle we bet on
  if (closedCandle.openTime !== predictionData.targetCandleOpenTime) return;

  // Clear the timer
  if (predictionData.timerInterval) {
    clearInterval(predictionData.timerInterval);
    // Also remove tracker
    const tracker = document.getElementById(`candle-tracker-${symbol}`);
    if (tracker) tracker.remove();
  }

  const button = predictionData.button;
  const isGreen = closedCandle.close > closedCandle.open;
  const userPredictedGreen = predictionData.prediction === 'green';
  const isWinner = isGreen === userPredictedGreen;

  if (isWinner) {
    // User won! 🎉
    button.innerHTML = '🎉 Claim Reward';
    button.style.background = 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)';
    button.style.color = '#000';
    button.disabled = false;

    // Trigger confetti celebration!
    triggerConfetti(button);

    // Add claim handler
    button.onclick = () => claimReward(symbol, predictionData, button);
  } else {
    // User lost
    button.innerHTML = '❌ Lost';
    button.style.background = '#666';
    button.style.opacity = '0.7';

    // Reset after 3 seconds
    setTimeout(() => {
      resetPredictionButton(button);
      activePredictions.delete(symbol);
    }, 3000);
  }
}

// Claim reward function
function claimReward(symbol, predictionData, button) {
  button.disabled = true;
  button.innerHTML = '<div class="loading"></div>';

  // Simulate claim (in production, this would call the smart contract)
  setTimeout(() => {
    const reward = (predictionData.wagerAmount * 1.9).toFixed(2); // 1.9x payout
    alert(`🎉 Congratulations! You won $${reward} USDC!`);
    resetPredictionButton(button);
    activePredictions.delete(symbol);
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
