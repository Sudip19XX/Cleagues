// Predict the Candle Game Component

import { fetchTopTokens } from '../../services/priceService.js';
import { submitCandlePrediction } from '../../contracts/gameContract.js';
import { formatCurrency, formatPercentage, getPriceChangeClass } from '../../utils/formatters.js';
import walletManager from '../../wallet/walletManager.js';

export function createPredictCandle() {
  const page = document.createElement('div');
  page.className = 'predict-candle-page';

  const container = document.createElement('div');
  container.className = 'container';
  container.style.padding = 'var(--spacing-xl) var(--spacing-lg)';

  // Header
  const header = document.createElement('div');
  header.style.marginBottom = 'var(--spacing-xl)';
  header.innerHTML = `
    <h1 style="font-size: 2.5rem; margin-bottom: var(--spacing-sm); display: flex; align-items: center; gap: var(--spacing-md);">
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
    <button class="timeframe-btn selected" data-minutes="5">5 Min</button>
    <button class="timeframe-btn" data-minutes="15">15 Min</button>
    <button class="timeframe-btn" data-minutes="30">30 Min</button>
    <button class="timeframe-btn" data-minutes="60">1 Hour</button>
  `;
  container.appendChild(timeframeSelector);

  // Token Grid
  const tokenGrid = document.createElement('div');
  tokenGrid.id = 'token-grid';
  tokenGrid.className = 'grid grid-auto';
  container.appendChild(tokenGrid);

  page.appendChild(container);

  // Setup timeframe selector
  let selectedTimeframe = 5;
  timeframeSelector.querySelectorAll('.timeframe-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      timeframeSelector.querySelectorAll('.timeframe-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedTimeframe = parseInt(btn.dataset.minutes);
    });
  });

  // Load tokens
  loadTokens(tokenGrid, () => selectedTimeframe);

  return page;
}

async function loadTokens(gridContainer, getTimeframe) {
  gridContainer.innerHTML = '<div class="loading" style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-2xl);"></div>';

  try {
    const tokens = await fetchTopTokens(12);
    renderTokens(tokens, gridContainer, getTimeframe);
  } catch (error) {
    gridContainer.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-2xl); color: var(--color-danger);">
        Failed to load tokens. Please try again later.
      </div>
    `;
  }
}

function renderTokens(tokens, gridContainer, getTimeframe) {
  gridContainer.innerHTML = '';

  tokens.forEach(token => {
    const card = createCandleCard(token, getTimeframe);
    gridContainer.appendChild(card);
  });
}

function createCandleCard(token, getTimeframe) {
  const card = document.createElement('div');
  card.className = 'card';
  card.style.cssText = `
    display: flex;
    flex-direction: column;
    animation: fadeIn 0.6s ease-out;
  `;

  const changeClass = getPriceChangeClass(token.priceChange24h);

  card.innerHTML = `
    <div style="display: flex; align-items: center; gap: var(--spacing-md); margin-bottom: var(--spacing-md);">
      <img src="${token.image}" alt="${token.name}" style="width: 48px; height: 48px; border-radius: 50%;" />
      <div style="flex: 1;">
        <div style="font-weight: 600; margin-bottom: 4px;">${token.name}</div>
        <div style="font-size: 0.875rem; color: var(--color-text-muted);">${token.symbol.toUpperCase()}</div>
      </div>
    </div>

    <div style="margin-bottom: var(--spacing-md);">
      <div style="font-size: 1.5rem; font-weight: 700; margin-bottom: 4px;">${formatCurrency(token.currentPrice)}</div>
      <div class="token-price-change ${changeClass}">
        ${formatPercentage(token.priceChange24h)} (24h)
      </div>
    </div>

    <!-- Simple Candle Chart Visualization -->
    <div style="height: 100px; background: var(--color-bg-secondary); border-radius: var(--radius-md); margin-bottom: var(--spacing-md); display: flex; align-items: flex-end; justify-content: space-around; padding: var(--spacing-sm);">
      ${generateMiniChart(token.priceChange24h)}
    </div>

    <div style="display: flex; gap: var(--spacing-sm); margin-top: auto;">
      <button class="candle-btn green-btn" data-token="${token.id}" data-prediction="green">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <path d="M12 19V5M5 12l7-7 7 7"></path>
        </svg>
        Green
      </button>
      <button class="candle-btn red-btn" data-token="${token.id}" data-prediction="red">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <path d="M12 5v14M5 12l7 7 7-7"></path>
        </svg>
        Red
      </button>
    </div>
  `;

  // Add event listeners
  card.querySelectorAll('.candle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const prediction = btn.dataset.prediction;
      const tokenId = btn.dataset.token;
      const timeframe = getTimeframe();
      submitPrediction(tokenId, prediction, token.name, timeframe, btn);
    });
  });

  return card;
}

function generateMiniChart(priceChange) {
  // Generate 7 random candles with a trend based on price change
  const candles = [];
  const trend = priceChange > 0 ? 1 : -1;

  for (let i = 0; i < 7; i++) {
    const isGreen = Math.random() > 0.4 + (trend * -0.1);
    const height = 30 + Math.random() * 40;
    const color = isGreen ? 'var(--color-success)' : 'var(--color-danger)';

    candles.push(`
      <div style="width: 8px; height: ${height}px; background: ${color}; border-radius: 2px; opacity: ${0.5 + (i * 0.07)};"></div>
    `);
  }

  return candles.join('');
}

async function submitPrediction(tokenId, prediction, tokenName, timeframe, button) {
  const state = walletManager.getState();
  if (!state.connected) {
    alert('Please connect your wallet first!');
    return;
  }

  const originalHTML = button.innerHTML;
  button.disabled = true;
  button.innerHTML = '<div class="loading"></div>';

  try {
    const result = await submitCandlePrediction({
      token: tokenId,
      isGreen: prediction === 'green',
      timeframe,
    });

    alert(`✅ ${result.message}\n\nPrediction: ${prediction.toUpperCase()} candle for ${tokenName}\nTimeframe: ${timeframe} minutes\nPrediction ID: ${result.predictionId}\nTransaction: ${result.txHash.slice(0, 10)}...`);

    button.innerHTML = '✓ Predicted';
    button.style.opacity = '0.6';
  } catch (error) {
    button.disabled = false;
    button.innerHTML = originalHTML;
    alert(`❌ Error: ${error.message}`);
  }
}

// Add candle button styles
const style = document.createElement('style');
style.textContent = `
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
    box-shadow: 0 6px 16px rgba(56, 239, 125, 0.4);
  }

  .red-btn {
    background: var(--gradient-orange);
    color: white;
  }

  .red-btn:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(254, 81, 150, 0.4);
  }
`;
document.head.appendChild(style);
