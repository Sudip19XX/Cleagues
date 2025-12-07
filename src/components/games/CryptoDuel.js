// Crypto Duel Game Component

import { fetchTopTokens } from '../../services/priceService.js';
import { submitDuelPrediction } from '../../contracts/gameContract.js';
import { formatCurrency, formatPercentage, getPriceChangeClass } from '../../utils/formatters.js';
import { TIME_PERIODS } from '../../utils/constants.js';
import walletManager from '../../wallet/walletManager.js';

export function createCryptoDuel() {
  const page = document.createElement('div');
  page.className = 'crypto-duel-page';
  page.style.cssText = `
    display: flex;
    align-items: stretch;
    height: calc(100vh - 80px);
    overflow: hidden;
  `;

  // Main content area (left side with tokens)
  const mainContent = document.createElement('div');
  mainContent.id = 'duel-main-content';
  mainContent.style.cssText = `
    flex: 1;
    overflow-y: auto;
    padding: var(--spacing-xl) var(--spacing-lg);
    transition: margin-right 0.3s ease;
  `;

  // Header
  const header = document.createElement('div');
  header.style.marginBottom = 'var(--spacing-xl)';
  header.innerHTML = `
    <h1 style="font-size: 2.5rem; margin-bottom: var(--spacing-sm); display: flex; align-items: center; gap: var(--spacing-md);">
      <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="coin-grad-page" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#09C285"/>
            <stop offset="100%" style="stop-color:#07a371"/>
          </linearGradient>
        </defs>
        <circle cx="18" cy="32" r="14" fill="url(#coin-grad-page)" opacity="0.9"/>
        <circle cx="18" cy="32" r="10" fill="none" stroke="#FFFFFF" stroke-width="2"/>
        <text x="18" y="36" text-anchor="middle" fill="#FFFFFF" font-size="12" font-weight="bold">₿</text>
        <circle cx="32" cy="32" r="8" fill="#FFFFFF" stroke="url(#coin-grad-page)" stroke-width="2"/>
        <text x="32" y="36" text-anchor="middle" fill="#09C285" font-size="10" font-weight="bold">VS</text>
        <circle cx="46" cy="32" r="14" fill="url(#coin-grad-page)" opacity="0.9"/>
        <circle cx="46" cy="32" r="10" fill="none" stroke="#FFFFFF" stroke-width="2"/>
        <text x="46" y="36" text-anchor="middle" fill="#FFFFFF" font-size="12" font-weight="bold">Ξ</text>
      </svg>
      Crypto Duel
    </h1>
    <p style="color: var(--color-text-secondary); font-size: 1.125rem;">
      Select two cryptocurrencies and predict which one will outperform the other
    </p>
  `;
  mainContent.appendChild(header);

  // Token Grid
  const tokenGrid = document.createElement('div');
  tokenGrid.id = 'token-grid';
  tokenGrid.className = 'grid grid-auto';
  tokenGrid.style.marginBottom = 'var(--spacing-xl)';
  mainContent.appendChild(tokenGrid);

  // Selection Panel (Right Sidebar - Fixed position)
  const selectionPanel = document.createElement('div');
  selectionPanel.id = 'selection-panel';
  selectionPanel.style.cssText = `
    position: fixed;
    top: 80px;
    right: 0;
    width: 320px;
    height: calc(100vh - 80px);
    background: var(--glass-bg);
    border-left: 1px solid var(--glass-border);
    padding: var(--spacing-md) var(--spacing-lg);
    display: none;
    flex-direction: column;
    overflow-y: auto;
    z-index: 100;
  `;

  page.appendChild(mainContent);
  page.appendChild(selectionPanel);

  // Load tokens
  loadTokens(tokenGrid, selectionPanel);

  return page;
}

let selectedTokens = { a: null, b: null };
let selectedDuration = 1;

async function loadTokens(gridContainer, selectionPanel) {
  gridContainer.innerHTML = '<div class="loading" style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-2xl);"></div>';

  try {
    const tokens = await fetchTopTokens(20);
    renderTokens(tokens, gridContainer, selectionPanel);
  } catch (error) {
    gridContainer.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-2xl); color: var(--color-danger);">
        Failed to load tokens. Please try again later.
      </div>
    `;
  }
}

function renderTokens(tokens, gridContainer, selectionPanel) {
  gridContainer.innerHTML = '';

  tokens.forEach(token => {
    const card = createTokenCard(token);
    card.addEventListener('click', () => selectToken(token, gridContainer, selectionPanel));
    gridContainer.appendChild(card);
  });
}

function createTokenCard(token) {
  const card = document.createElement('div');
  card.className = 'token-card';
  card.dataset.tokenId = token.id;

  const changeClass = getPriceChangeClass(token.priceChange24h);

  card.innerHTML = `
    <div class="token-icon">
      <img src="${token.image}" alt="${token.name}" />
    </div>
    <div class="token-info">
      <div class="token-name">${token.name}</div>
      <div class="token-symbol">${token.symbol.toUpperCase()}</div>
    </div>
    <div class="token-price">
      <div class="token-price-value">${formatCurrency(token.currentPrice)}</div>
      <div class="token-price-change ${changeClass}">
        ${formatPercentage(token.priceChange24h)}
      </div>
    </div>
  `;

  return card;
}

function selectToken(token, gridContainer, selectionPanel) {
  // Check if already selected
  if (selectedTokens.a?.id === token.id) {
    selectedTokens.a = null;
    updateTokenSelection(gridContainer);
    updateSelectionPanel(selectionPanel);
    return;
  }
  if (selectedTokens.b?.id === token.id) {
    selectedTokens.b = null;
    updateTokenSelection(gridContainer);
    updateSelectionPanel(selectionPanel);
    return;
  }

  // Select token
  if (!selectedTokens.a) {
    selectedTokens.a = token;
  } else if (!selectedTokens.b) {
    selectedTokens.b = token;
  } else {
    // Replace first token
    selectedTokens.a = selectedTokens.b;
    selectedTokens.b = token;
  }

  updateTokenSelection(gridContainer);
  updateSelectionPanel(selectionPanel);
}

function updateTokenSelection(gridContainer) {
  const cards = gridContainer.querySelectorAll('.token-card');
  cards.forEach(card => {
    const tokenId = card.dataset.tokenId;
    if (tokenId === selectedTokens.a?.id || tokenId === selectedTokens.b?.id) {
      card.classList.add('selected');
    } else {
      card.classList.remove('selected');
    }
  });
}

function updateSelectionPanel(panel) {
  const selectionCount = (selectedTokens.a ? 1 : 0) + (selectedTokens.b ? 1 : 0);
  const mainContent = document.getElementById('duel-main-content');
  const tokenGrid = document.getElementById('token-grid');
  const tokenCards = document.querySelectorAll('#token-grid .token-card');

  if (selectionCount === 0) {
    panel.style.display = 'none';
    // Reset main content margin when panel is hidden
    if (mainContent) {
      mainContent.style.marginRight = '0';
    }
    // Remove compact mode from token cards and grid
    if (tokenGrid) {
      tokenGrid.classList.remove('compact-grid');
    }
    tokenCards.forEach(card => card.classList.remove('compact-mode'));
    return;
  }

  // Adjust main content to make room for the panel
  if (mainContent) {
    mainContent.style.marginRight = '320px';
  }

  // Make token grid and cards compact when panel is open
  if (tokenGrid) {
    tokenGrid.classList.add('compact-grid');
  }
  tokenCards.forEach(card => card.classList.add('compact-mode'));

  // Set all flex properties together to ensure proper layout
  panel.style.cssText = `
    position: fixed;
    top: 80px;
    right: 0;
    width: 320px;
    height: calc(100vh - 80px);
    background: var(--glass-bg);
    border-left: 1px solid var(--glass-border);
    padding: var(--spacing-md) var(--spacing-lg);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow-y: auto;
    z-index: 100;
    animation: slideInRight 0.3s ease-out;
  `;

  panel.innerHTML = `
    <!-- Top Content -->
    <div>
      <!-- Header -->
      <div style="display: flex; align-items: center; justify-content: space-between; padding-bottom: var(--spacing-md); border-bottom: 1px solid var(--glass-border); margin-bottom: var(--spacing-md);">
        <div style="display: flex; align-items: center; gap: var(--spacing-sm);">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
          </svg>
          <span style="font-weight: 600; font-size: 1.1rem;">Duel Slip</span>
          <span style="background: var(--color-primary); color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 600;">${selectionCount}</span>
        </div>
        <button id="close-panel-btn" style="background: none; border: none; cursor: pointer; padding: 4px; color: var(--color-text-muted);">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <!-- Duel Card -->
      <div style="background: var(--color-bg-secondary); border-radius: var(--radius-lg); padding: var(--spacing-md); border: 1px solid var(--glass-border);">
        <!-- Match Title -->
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--spacing-md); padding-bottom: var(--spacing-sm); border-bottom: 1px solid var(--glass-border);">
          <div style="font-size: 0.85rem; font-weight: 500; color: var(--color-text-primary); flex: 1;">
            ${selectedTokens.a ? selectedTokens.a.symbol.toUpperCase() : '???'} vs ${selectedTokens.b ? selectedTokens.b.symbol.toUpperCase() : '???'}
          </div>
          <button class="remove-selection-btn" style="background: none; border: none; cursor: pointer; padding: 2px; color: var(--color-text-muted); font-size: 1rem;">×</button>
        </div>
        
        <!-- Tokens Display -->
        <div style="display: flex; align-items: center; justify-content: space-between; gap: var(--spacing-sm); margin-bottom: var(--spacing-md);">
          ${createCompactTokenDisplay(selectedTokens.a, 'A')}
          <div style="font-size: 0.9rem; font-weight: 700; color: var(--color-accent-orange); padding: 0 var(--spacing-xs);">VS</div>
          ${createCompactTokenDisplay(selectedTokens.b, 'B')}
        </div>

        <!-- Time Period Selection -->
        <div>
          <div style="font-size: 0.75rem; color: var(--color-text-muted); margin-bottom: var(--spacing-xs);">Duration</div>
          <div style="display: flex; gap: var(--spacing-xs);">
            ${Object.entries(TIME_PERIODS).map(([key, period]) => `
              <button class="time-option ${period.hours === selectedDuration ? 'selected' : ''}" data-hours="${period.hours}" style="flex: 1; padding: 0.5rem; font-size: 0.85rem;">
                ${period.label}
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Section -->
    <div style="border-top: 1px solid var(--glass-border); padding-top: var(--spacing-md);">
      <div style="display: flex; justify-content: space-between; margin-bottom: var(--spacing-xs);">
        <span style="color: var(--color-text-muted); font-size: 0.85rem;">Selected Tokens</span>
        <span style="font-weight: 600; font-size: 0.85rem;">${selectionCount}/2</span>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: var(--spacing-md);">
        <span style="color: var(--color-text-muted); font-size: 0.85rem;">Duration</span>
        <span style="font-weight: 600; font-size: 0.85rem; color: var(--color-primary);">${TIME_PERIODS[Object.keys(TIME_PERIODS).find(k => TIME_PERIODS[k].hours === selectedDuration)].label}</span>
      </div>
      
      <button class="btn btn-primary" style="width: 100%; padding: 0.875rem;" id="start-duel-btn" ${selectionCount < 2 ? 'disabled' : ''}>
        ${selectionCount < 2 ? 'Select 2 Tokens' : 'Start Duel'}
      </button>
    </div>
  `;

  // Add time option listeners
  panel.querySelectorAll('.time-option').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedDuration = parseInt(btn.dataset.hours);
      updateSelectionPanel(panel);
    });
  });

  // Add close panel listener
  const closeBtn = panel.querySelector('#close-panel-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      selectedTokens = { a: null, b: null };
      const gridContainer = document.getElementById('token-grid');
      const mainContent = document.getElementById('duel-main-content');
      const tokenCards = document.querySelectorAll('#token-grid .token-card');

      if (gridContainer) {
        updateTokenSelection(gridContainer);
        gridContainer.classList.remove('compact-grid');
      }
      if (mainContent) {
        mainContent.style.marginRight = '0';
      }
      tokenCards.forEach(card => card.classList.remove('compact-mode'));
      panel.style.display = 'none';
    });
  }

  // Add remove selection listener
  const removeBtn = panel.querySelector('.remove-selection-btn');
  if (removeBtn) {
    removeBtn.addEventListener('click', () => {
      selectedTokens = { a: null, b: null };
      const gridContainer = document.getElementById('token-grid');
      if (gridContainer) updateTokenSelection(gridContainer);
      updateSelectionPanel(panel);
    });
  }

  // Add start duel listener
  const startBtn = panel.querySelector('#start-duel-btn');
  if (startBtn && !startBtn.disabled) {
    startBtn.addEventListener('click', () => showPredictionModal());
  }
}

// Compact token display for bet slip style
function createCompactTokenDisplay(token, label) {
  if (!token) {
    return `
      <div style="display: flex; align-items: center; gap: var(--spacing-xs); flex: 1;">
        <div style="width: 32px; height: 32px; border-radius: 50%; background: var(--color-bg-tertiary); display: flex; align-items: center; justify-content: center; font-size: 0.9rem; color: var(--color-text-muted);">?</div>
        <div>
          <div style="font-size: 0.75rem; color: var(--color-text-muted);">Token ${label}</div>
          <div style="font-size: 0.85rem; font-weight: 600; color: var(--color-text-muted);">Select</div>
        </div>
      </div>
    `;
  }

  // Determine font size based on price length
  const priceStr = formatCurrency(token.currentPrice);
  let priceFontSize = '0.75rem';
  if (priceStr.length > 10) {
    priceFontSize = '0.6rem';
  } else if (priceStr.length > 8) {
    priceFontSize = '0.65rem';
  } else if (priceStr.length > 6) {
    priceFontSize = '0.7rem';
  }

  return `
    <div style="display: flex; align-items: center; gap: var(--spacing-xs); flex: 1; min-width: 0; overflow: hidden;">
      <img src="${token.image}" alt="${token.symbol}" style="width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0;" />
      <div style="min-width: 0; overflow: hidden;">
        <div style="font-size: 0.7rem; color: var(--color-text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${token.name.length > 8 ? token.symbol.toUpperCase() : token.name}</div>
        <div style="font-size: ${priceFontSize}; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${priceStr}</div>
      </div>
    </div>
  `;
}

function createSelectedTokenDisplay(token, label) {
  if (!token) {
    return `
      <div style="text-align: center; padding: var(--spacing-sm); background: var(--color-bg-secondary); border-radius: var(--radius-lg); width: 100%;">
        <div style="width: 60px; height: 60px; border-radius: 50%; background: var(--color-bg-tertiary); display: flex; align-items: center; justify-content: center; margin: 0 auto var(--spacing-sm); font-size: 1.5rem; color: var(--color-text-muted);">
          ?
        </div>
        <div style="color: var(--color-text-muted); font-size: 0.85rem;">Select Token ${label}</div>
      </div>
    `;
  }

  const changeClass = getPriceChangeClass(token.priceChange24h);

  return `
    <div style="text-align: center; padding: var(--spacing-sm); background: var(--color-bg-secondary); border-radius: var(--radius-lg); width: 100%;">
      <div style="width: 60px; height: 60px; border-radius: 50%; overflow: hidden; margin: 0 auto var(--spacing-sm); border: 3px solid var(--color-primary);">
        <img src="${token.image}" alt="${token.name}" style="width: 100%; height: 100%; object-fit: cover;" />
      </div>
      <div style="font-weight: 600; font-size: 0.95rem; margin-bottom: 2px;">${token.name}</div>
      <div style="font-size: 0.8rem; color: var(--color-text-muted); margin-bottom: 2px;">${token.symbol.toUpperCase()}</div>
      <div style="font-weight: 600; font-size: 0.9rem;">${formatCurrency(token.currentPrice)}</div>
      <div class="token-price-change ${changeClass}" style="font-size: 0.8rem;">
        ${formatPercentage(token.priceChange24h)}
      </div>
    </div>
  `;
}

function showPredictionModal() {
  const state = walletManager.getState();
  if (!state.connected) {
    alert('Please connect your wallet first!');
    return;
  }

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';

  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.style.maxWidth = '500px';

  modal.innerHTML = `
    <button class="modal-close">×</button>
    <h2 class="modal-title">Make Your Prediction</h2>
    
    <div class="modal-body">
      <p style="text-align: center; color: var(--color-text-secondary); margin-bottom: var(--spacing-lg);">
        Which token will perform better in the next ${TIME_PERIODS[Object.keys(TIME_PERIODS).find(k => TIME_PERIODS[k].hours === selectedDuration)].label.toLowerCase()}?
      </p>

      <div style="display: flex; flex-direction: column; gap: var(--spacing-md);">
        <button class="btn btn-success btn-lg" id="predict-a">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 19V5M5 12l7-7 7 7"></path>
          </svg>
          ${selectedTokens.a.name} will outperform ${selectedTokens.b.name}
        </button>
        
        <button class="btn btn-success btn-lg" id="predict-b">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 19V5M5 12l7-7 7 7"></path>
          </svg>
          ${selectedTokens.b.name} will outperform ${selectedTokens.a.name}
        </button>
      </div>
    </div>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Close button
  modal.querySelector('.modal-close').addEventListener('click', () => overlay.remove());
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.remove();
  });

  // Prediction buttons
  modal.querySelector('#predict-a').addEventListener('click', () => makePrediction('A', overlay));
  modal.querySelector('#predict-b').addEventListener('click', () => makePrediction('B', overlay));
}

// Store active duels for tracking
let activeDuels = [];

async function makePrediction(winner, overlay) {
  const btn = overlay.querySelector(winner === 'A' ? '#predict-a' : '#predict-b');
  btn.disabled = true;
  btn.innerHTML = '<div class="loading"></div> Submitting...';

  try {
    // Record starting prices
    const startPriceA = selectedTokens.a.currentPrice;
    const startPriceB = selectedTokens.b.currentPrice;
    const predictedWinner = winner;
    const durationHours = selectedDuration;
    const durationMs = durationHours * 60 * 60 * 1000; // Convert hours to milliseconds

    // For demo purposes, use 10 seconds instead of hours to show the feature works
    const demoDurationMs = 10000; // 10 seconds for demo

    const result = await submitDuelPrediction({
      tokenA: selectedTokens.a.id,
      tokenB: selectedTokens.b.id,
      predictedWinner: winner,
      duration: selectedDuration,
    });

    overlay.remove();

    // Store duel info for tracking
    const duelInfo = {
      id: result.predictionId,
      tokenA: { ...selectedTokens.a, startPrice: startPriceA },
      tokenB: { ...selectedTokens.b, startPrice: startPriceB },
      predictedWinner,
      duration: durationHours,
      startTime: Date.now(),
    };

    activeDuels.push(duelInfo);

    // Show countdown notification
    showDuelCountdown(duelInfo, demoDurationMs);

    // Reset selection
    selectedTokens = { a: null, b: null };

  } catch (error) {
    btn.disabled = false;
    btn.innerHTML = winner === 'A' ? `${selectedTokens.a.name} will win` : `${selectedTokens.b.name} will win`;
    alert(`❌ Error: ${error.message}`);
  }
}

// Show countdown and then determine winner
function showDuelCountdown(duelInfo, durationMs) {
  // Create countdown overlay
  const countdownOverlay = document.createElement('div');
  countdownOverlay.id = `duel-countdown-${duelInfo.id}`;
  countdownOverlay.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-xl);
    padding: var(--spacing-md);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    z-index: 1000;
    min-width: 280px;
    backdrop-filter: blur(10px);
  `;

  const updateCountdown = (remainingMs) => {
    const seconds = Math.ceil(remainingMs / 1000);
    countdownOverlay.innerHTML = `
      <div style="display: flex; align-items: center; gap: var(--spacing-sm); margin-bottom: var(--spacing-sm);">
        <div class="loading" style="width: 16px; height: 16px;"></div>
        <span style="font-weight: 600; color: var(--color-primary);">Duel in Progress</span>
      </div>
      <div style="font-size: 0.85rem; margin-bottom: var(--spacing-xs);">
        ${duelInfo.tokenA.symbol.toUpperCase()} vs ${duelInfo.tokenB.symbol.toUpperCase()}
      </div>
      <div style="font-size: 0.8rem; color: var(--color-text-muted);">
        Your pick: <strong>${duelInfo.predictedWinner === 'A' ? duelInfo.tokenA.name : duelInfo.tokenB.name}</strong>
      </div>
      <div style="font-size: 1.5rem; font-weight: 700; text-align: center; margin-top: var(--spacing-sm); color: var(--color-primary);">
        ${seconds}s remaining
      </div>
    `;
  };

  document.body.appendChild(countdownOverlay);

  // Update countdown every second
  let remaining = durationMs;
  updateCountdown(remaining);

  const countdownInterval = setInterval(() => {
    remaining -= 1000;
    if (remaining <= 0) {
      clearInterval(countdownInterval);
      determineDuelWinner(duelInfo, countdownOverlay);
    } else {
      updateCountdown(remaining);
    }
  }, 1000);
}

// Determine the winner after timeframe ends
async function determineDuelWinner(duelInfo, countdownOverlay) {
  countdownOverlay.innerHTML = `
    <div style="display: flex; align-items: center; gap: var(--spacing-sm); padding: var(--spacing-sm);">
      <div class="loading" style="width: 20px; height: 20px;"></div>
      <span>Calculating results...</span>
    </div>
  `;

  try {
    // Fetch current prices
    const { fetchTokenPrices } = await import('../../services/priceService.js');
    const prices = await fetchTokenPrices([duelInfo.tokenA.id, duelInfo.tokenB.id]);

    // Calculate price changes
    const endPriceA = prices[duelInfo.tokenA.id]?.usd || duelInfo.tokenA.startPrice;
    const endPriceB = prices[duelInfo.tokenB.id]?.usd || duelInfo.tokenB.startPrice;

    const changeA = ((endPriceA - duelInfo.tokenA.startPrice) / duelInfo.tokenA.startPrice) * 100;
    const changeB = ((endPriceB - duelInfo.tokenB.startPrice) / duelInfo.tokenB.startPrice) * 100;

    // Determine actual winner
    let actualWinner;
    if (Math.abs(changeA - changeB) < 0.001) {
      actualWinner = 'TIE';
    } else {
      actualWinner = changeA > changeB ? 'A' : 'B';
    }

    // Check if user won
    const userWon = actualWinner === 'TIE' ? null : (duelInfo.predictedWinner === actualWinner);

    // Show result
    showDuelResult(duelInfo, countdownOverlay, {
      changeA,
      changeB,
      actualWinner,
      userWon,
      endPriceA,
      endPriceB,
    });

    // Remove from active duels
    activeDuels = activeDuels.filter(d => d.id !== duelInfo.id);

  } catch (error) {
    console.error('Error determining winner:', error);
    countdownOverlay.innerHTML = `
      <div style="color: var(--color-danger); text-align: center; padding: var(--spacing-md);">
        ❌ Error fetching results
        <button onclick="this.parentElement.parentElement.remove()" style="display: block; margin: var(--spacing-sm) auto 0; padding: 0.5rem 1rem; cursor: pointer;">Dismiss</button>
      </div>
    `;
  }
}

// Show the final duel result
function showDuelResult(duelInfo, overlay, result) {
  const winnerToken = result.actualWinner === 'A' ? duelInfo.tokenA : duelInfo.tokenB;
  const loserToken = result.actualWinner === 'A' ? duelInfo.tokenB : duelInfo.tokenA;

  overlay.style.minWidth = '320px';
  overlay.innerHTML = `
    <div style="text-align: center;">
      <div style="font-size: 3rem; margin-bottom: var(--spacing-sm);">
        ${result.userWon === null ? '🤝' : result.userWon ? '🎉' : '😔'}
      </div>
      <div style="font-size: 1.25rem; font-weight: 700; margin-bottom: var(--spacing-sm); color: ${result.userWon === null ? 'var(--color-warning)' : result.userWon ? 'var(--color-success)' : 'var(--color-danger)'};">
        ${result.userWon === null ? "It's a Tie!" : result.userWon ? 'You Won!' : 'You Lost'}
      </div>
      
      <div style="background: var(--color-bg-secondary); border-radius: var(--radius-md); padding: var(--spacing-sm); margin-bottom: var(--spacing-md);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-xs);">
          <div style="display: flex; align-items: center; gap: var(--spacing-xs);">
            <img src="${duelInfo.tokenA.image}" style="width: 20px; height: 20px; border-radius: 50%;" />
            <span style="font-weight: 600;">${duelInfo.tokenA.symbol.toUpperCase()}</span>
          </div>
          <span style="color: ${result.changeA >= 0 ? 'var(--color-success)' : 'var(--color-danger)'}; font-weight: 600;">
            ${result.changeA >= 0 ? '+' : ''}${result.changeA.toFixed(4)}%
          </span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; align-items: center; gap: var(--spacing-xs);">
            <img src="${duelInfo.tokenB.image}" style="width: 20px; height: 20px; border-radius: 50%;" />
            <span style="font-weight: 600;">${duelInfo.tokenB.symbol.toUpperCase()}</span>
          </div>
          <span style="color: ${result.changeB >= 0 ? 'var(--color-success)' : 'var(--color-danger)'}; font-weight: 600;">
            ${result.changeB >= 0 ? '+' : ''}${result.changeB.toFixed(4)}%
          </span>
        </div>
      </div>
      
      <div style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: var(--spacing-sm);">
        ${result.actualWinner === 'TIE' ? 'Both tokens performed equally!' : `${winnerToken.name} outperformed ${loserToken.name}`}
      </div>
      
      <button onclick="this.closest('[id^=duel-countdown]').remove()" class="btn btn-primary" style="width: 100%;">
        Got it!
      </button>
    </div>
  `;

  // Auto-remove after 30 seconds
  setTimeout(() => {
    if (overlay.parentElement) {
      overlay.remove();
    }
  }, 30000);
}

// Add time option styles
const style = document.createElement('style');
style.textContent = `
  .time-option {
    padding: 0.5rem 1rem;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-md);
    color: var(--color-text-primary);
    cursor: pointer;
    transition: all var(--transition-fast);
    font-family: var(--font-primary);
    font-size: 0.875rem;
  }

  .time-option:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .time-option.selected {
    background: var(--gradient-green);
    border-color: transparent;
  }

  /* Torn Paper Effect for Duel Slip */
  #selection-panel::before {
    content: '';
    position: absolute;
    top: -8px;
    left: 0;
    right: 0;
    height: 16px;
    background: inherit;
    clip-path: polygon(
      0% 50%, 3% 70%, 6% 45%, 9% 65%, 12% 50%, 15% 75%, 18% 55%, 21% 70%, 
      24% 45%, 27% 65%, 30% 50%, 33% 75%, 36% 55%, 39% 70%, 42% 45%, 45% 65%, 
      48% 50%, 51% 75%, 54% 55%, 57% 70%, 60% 45%, 63% 65%, 66% 50%, 69% 75%, 
      72% 55%, 75% 70%, 78% 45%, 81% 65%, 84% 50%, 87% 75%, 90% 55%, 93% 70%, 
      96% 45%, 100% 60%, 100% 100%, 0% 100%
    );
    z-index: 1;
  }

  #selection-panel {
    position: relative;
  }

  /* Compact mode for token cards when duel slip is open */
  #token-grid.compact-grid {
    grid-template-columns: repeat(4, 1fr) !important;
    gap: var(--spacing-sm) !important;
  }

  .token-card.compact-mode {
    padding: var(--spacing-md);
    gap: var(--spacing-sm);
    min-height: unset;
  }

  .token-card.compact-mode .token-icon {
    width: 48px;
    height: 48px;
  }

  .token-card.compact-mode .token-icon img {
    width: 48px;
    height: 48px;
  }

  .token-card.compact-mode .token-info {
    flex: 0 0 auto;
  }

  .token-card.compact-mode .token-name {
    display: none;
  }

  .token-card.compact-mode .token-symbol {
    font-size: 1.1rem;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 0;
  }

  .token-card.compact-mode .token-price {
    flex: 1;
    text-align: right;
  }

  .token-card.compact-mode .token-price-value {
    font-size: 1rem;
    margin-bottom: 2px;
  }

  .token-card.compact-mode .token-price-change {
    font-size: 0.9rem;
  }
`;
document.head.appendChild(style);
