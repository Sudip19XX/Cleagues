// Crypto Duel Game Component

import { fetchTopTokens } from '../../services/priceService.js';
import { supabase } from '../../services/supabaseClient.js';
import { formatCurrency, formatPercentage, getPriceChangeClass } from '../../utils/formatters.js';
import { TIME_PERIODS } from '../../utils/constants.js';
import walletManager from '../../wallet/walletManager.js';
import { updatePoints, getPoints } from '../../server/playerStore.js';
import {
  BINANCE_TOKENS,
  fetchMultipleTickers,
  subscribeToTickerUpdates,
  cleanupAllConnections
} from '../../services/candleService.js';

// Store active ticker subscriptions
let activeTickerSubscriptions = [];

export function createCryptoDuel() {
  // Reset selection state on load
  selectedTokens = { a: null, b: null };

  const page = document.createElement('div');
  page.className = 'crypto-duel-page';
  page.style.cssText = `
    display: flex;
    align-items: stretch;
    height: calc(100vh - 64px);
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
  header.style.cssText = 'margin-bottom: var(--spacing-xl); text-align: center;';
  header.innerHTML = `
    <h1 style="font-size: 2.5rem; margin-bottom: var(--spacing-sm); display: flex; align-items: center; justify-content: center; gap: var(--spacing-md);">
      <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="vs-grad-page" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#09C285"/>
            <stop offset="100%" style="stop-color:#07a371"/>
          </linearGradient>
        </defs>
        <!-- Outer circle with gradient -->
        <circle cx="32" cy="32" r="28" fill="url(#vs-grad-page)"/>
        <!-- Inner circle -->
        <circle cx="32" cy="32" r="22" fill="none" stroke="#FFFFFF" stroke-width="2" opacity="0.3"/>
        <!-- VS Text -->
        <text x="32" y="40" text-anchor="middle" fill="#FFFFFF" font-size="22" font-weight="bold" font-family="Arial, sans-serif">VS</text>
      </svg>
      Crypto Duel
    </h1>
    <p style="color: var(--color-text-secondary); font-size: 1.125rem;">
      Select two cryptocurrencies and predict which one will outperform the other
    </p>
    <div id="user-points-display" style="
        background: rgba(9, 194, 133, 0.1); 
        color: #09C285; 
        padding: 8px 16px; 
        border-radius: 20px; 
        display: inline-flex; 
        align-items: center;
        gap: 8px;
        margin-top: var(--spacing-md);
        font-weight: 600;
        border: 1px solid rgba(9, 194, 133, 0.2);
        cursor: help;
    " title="Win: +5 Points | Lose: -10 Points | Entry: 20 Points">
        <span>Connect Wallet</span>
    </div>
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
    top: 64px;
    right: 0;
    width: 320px;
    height: calc(100vh - 64px);
    background: var(--glass-bg);
    border-left: 1px solid var(--glass-border);
    padding: var(--spacing-md);
    display: none;
    flex-direction: column;
    overflow-y: auto;
    z-index: 100;
  `;

  page.appendChild(mainContent);
  page.appendChild(selectionPanel);

  // Points updater logic
  const updateBalance = async () => {
    const state = walletManager.getState();
    const el = document.getElementById('user-points-display');
    if (el) {
      if (state.connected && state.address) {
        const p = await getPoints(state.address);
        el.innerHTML = `💎 Balance: ${p} Points`;
      } else {
        el.innerHTML = '🔌 Connect Wallet';
      }
    }
  };

  // Subscribe to updates
  walletManager.subscribe(updateBalance);

  // Initial update
  setTimeout(updateBalance, 100);

  // Load tokens
  loadTokens(tokenGrid, selectionPanel);

  return page;
}

let selectedTokens = { a: null, b: null };
let selectedDuration = 1;

async function loadTokens(gridContainer, selectionPanel) {
  gridContainer.innerHTML = '<div class="loading" style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-2xl);"></div>';

  // Cleanup previous subscriptions
  activeTickerSubscriptions.forEach(unsub => unsub());
  activeTickerSubscriptions = [];

  try {
    // Try Binance first for priority tokens
    const prioritySymbols = ['BTC', 'ETH', 'SOL', 'XRP', 'DOGE', 'PEPE', 'BNB', 'ADA', 'AVAX', 'LINK', 'DOT', 'SHIB', 'LTC', 'UNI', 'NEAR', 'ATOM', 'ARB', 'OP', 'SUI', 'APT'];

    const binanceTokens = await fetchMultipleTickers(prioritySymbols);

    if (binanceTokens.length > 0) {
      // Transform to match expected format
      const tokens = binanceTokens.map(t => ({
        id: t.symbol.toLowerCase(),
        symbol: t.symbol,
        name: t.name,
        image: t.image,
        currentPrice: t.price,
        priceChange24h: t.priceChange24h,
      }));

      renderTokens(tokens, gridContainer, selectionPanel);

      // Subscribe to real-time updates
      binanceTokens.forEach(token => {
        const unsub = subscribeToTickerUpdates(token.symbol, (ticker) => {
          updateTokenCardPrice(gridContainer, ticker.symbol.toLowerCase(), ticker.price, ticker.priceChange24h);
        });
        activeTickerSubscriptions.push(unsub);
      });

      console.log('🟢 Loaded tokens from Binance with real-time updates');
    } else {
      throw new Error('No Binance tokens loaded');
    }
  } catch (error) {
    console.log('Falling back to CoinGecko:', error.message);
    try {
      const tokens = await fetchTopTokens(20);
      renderTokens(tokens, gridContainer, selectionPanel);
    } catch (fallbackError) {
      gridContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-2xl); color: var(--color-danger);">
          Failed to load tokens. Please try again later.
        </div>
      `;
    }
  }
}

// Update token card price in real-time
function updateTokenCardPrice(gridContainer, tokenId, price, priceChange) {
  const card = gridContainer.querySelector(`.token-card[data-token-id="${tokenId}"]`);
  if (!card) return;

  const priceEl = card.querySelector('.token-price-value');
  const changeEl = card.querySelector('.token-price-change');

  if (priceEl) {
    const oldPrice = priceEl.dataset.price || 0;
    priceEl.textContent = formatCurrency(price);
    priceEl.dataset.price = price;

    // Flash animation
    if (parseFloat(oldPrice) !== price) {
      priceEl.style.transition = 'color 0.3s';
      priceEl.style.color = price > parseFloat(oldPrice) ? '#09C285' : '#FF4D4F';
      setTimeout(() => { priceEl.style.color = ''; }, 500);
    }
  }

  if (changeEl) {
    changeEl.textContent = formatPercentage(priceChange);
    changeEl.className = `token-price-change ${getPriceChangeClass(priceChange)}`;
  }
}

function addDuelTrackerStyles() {
  const styleId = 'duel-tracker-styles';
  if (document.getElementById(styleId)) return;

  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = `
        .duel-tracker-card {
            position: fixed;
            bottom: 24px;
            right: 24px;
            z-index: 1000;
            
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            min-width: 200px;
            
            padding: 12px 20px;
            background: rgba(15, 23, 42, 0.8);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
            
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            animation: fadeIn 0.3s ease-out;
        }

        .duel-tracker-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
            border-color: var(--color-primary);
            background: rgba(15, 23, 42, 0.9);
        }

        /* Pulse animation class */
        .duel-tracker-card.pulse {
            animation: duelPulse 2s infinite;
        }

        @keyframes duelPulse {
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
    top: 64px;
    right: 0;
    width: 320px;
    height: calc(100vh - 64px);
    background: var(--glass-bg);
    border-left: 1px solid var(--glass-border);
    padding: var(--spacing-sm) var(--spacing-md) var(--spacing-md);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: var(--spacing-md);
    overflow-y: auto;
    z-index: 100;
    /* Hide scrollbar */
    -ms-overflow-style: none;
    scrollbar-width: none;
    animation: slideInRight 0.3s ease-out;
  `;

  panel.innerHTML = `
    <!-- Top Content -->
    <div>
      <!-- Header -->
      <div style="display: flex; align-items: center; justify-content: space-between; padding-bottom: var(--spacing-sm); border-bottom: 1px solid var(--glass-border); margin-bottom: var(--spacing-md);">
        <div style="display: flex; align-items: center; gap: var(--spacing-sm);">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
          </svg>
          <span style="font-weight: 600; font-size: 1.1rem;">Duel Slip</span>
          <span style="background: var(--color-primary); color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 600;">${selectionCount}</span>
        </div>
        <button id="close-panel-btn" style="background: none; border: none; cursor: pointer; padding: 2px; color: var(--color-text-muted);">
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

        <!-- Live Performance Comparison -->
        <!-- 24h Performance Comparison (Simplified) -->
        ${selectedTokens.a && selectedTokens.b ? `
        <div style="background: var(--color-bg-tertiary); border-radius: var(--radius-md); padding: var(--spacing-sm); margin-bottom: var(--spacing-md); text-align: center;">
             ${(() => {
        const changeA = selectedTokens.a.priceChange24h || 0;
        const changeB = selectedTokens.b.priceChange24h || 0;
        const diff = Math.abs(changeA - changeB).toFixed(2);

        if (changeA > changeB) {
          return `<span style="font-size: 0.8rem; color: var(--color-text-secondary); line-height: 1.4; display: block;"><b>${selectedTokens.a.symbol.toUpperCase()}</b> currently leads <b>${selectedTokens.b.symbol.toUpperCase()}</b> by <b style="color: #09C285">${diff}%</b></span>`;
        } else if (changeB > changeA) {
          return `<span style="font-size: 0.8rem; color: var(--color-text-secondary); line-height: 1.4; display: block;"><b>${selectedTokens.b.symbol.toUpperCase()}</b> currently leads <b>${selectedTokens.a.symbol.toUpperCase()}</b> by <b style="color: #09C285">${diff}%</b></span>`;
        } else {
          return `<span style="font-size: 0.8rem; color: var(--color-text-muted);">Both tokens have equal performance in last 24H</span>`;
        }
      })()}
        </div>
        ` : ''}

        <!-- Time Period Selection -->
        <div>
          <div style="font-size: 0.75rem; color: var(--color-text-muted); margin-bottom: var(--spacing-xs);">Duration</div>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px;">
            ${Object.entries(TIME_PERIODS).map(([key, period]) => `
              <button class="time-option ${period.hours === selectedDuration ? 'selected' : ''}" data-hours="${period.hours}" style="padding: 0.4rem 0.5rem; font-size: 0.8rem;">
                ${period.label}
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    </div>

<!-- Bottom Section (Centered) -->
<div style="border-top: 1px solid var(--glass-border); padding-top: var(--spacing-md); text-align: center;">
  <div style="margin-bottom: var(--spacing-xs);">
    <div style="color: var(--color-text-muted); font-size: 0.85rem;">Selected Tokens</div>
    <div style="font-weight: 600; font-size: 0.85rem;">${selectionCount}/2</div>
  </div>
  <div style="margin-bottom: var(--spacing-md);">
    <div style="color: var(--color-text-muted); font-size: 0.85rem;">Duration</div>
    <div style="font-weight: 600; font-size: 0.85rem; color: var(--color-primary);">
      ${(() => {
      const found = Object.keys(TIME_PERIODS).find(k => Math.abs(TIME_PERIODS[k].hours - selectedDuration) < 0.001);
      return found ? TIME_PERIODS[found].label : '1H';
    })()}
    </div>
  </div>
  <button class="btn btn-primary" style="width: 100%; padding: 0.875rem;" id="start-duel-btn" ${selectionCount < 2 ? 'disabled' : ''}>
    ${selectionCount < 2 ? 'Select 2 Tokens' : 'Start Duel'}
  </button>
</div>
  `;

  // Add time option listeners
  panel.querySelectorAll('.time-option').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedDuration = parseFloat(btn.dataset.hours);
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

  // Add start duel listener - always attach, check disabled state inside
  const startBtn = panel.querySelector('#start-duel-btn');
  if (startBtn) {
    startBtn.onclick = () => {
      if (!startBtn.disabled) {
        showPredictionModal();
      }
    };
  }
}

// Compact token display for bet slip style
function createCompactTokenDisplay(token, label, priceId = null) {
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
        <div ${priceId ? `id="${priceId}"` : ''} style="font-size: ${priceFontSize}; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${priceStr}</div>
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
        Which token will perform better in the next ${(() => {
      const found = Object.keys(TIME_PERIODS).find(k => Math.abs(TIME_PERIODS[k].hours - selectedDuration) < 0.001);
      return found ? TIME_PERIODS[found].label.toLowerCase() : '1h';
    })()}?
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

  const state = walletManager.getState();
  if (!state.connected || !state.address) {
    alert("Please connect wallet.");
    return;
  }

  // Check Points Balance
  const currentPoints = await getPoints(state.address);
  if (currentPoints < 20) {
    alert(`Insufficient Points! Balance: ${currentPoints}. Cost: 20 Points.`);
    return;
  }

  btn.disabled = true;
  btn.innerHTML = '<div class="loading"></div> Fetching prices...';

  try {
    // Deduct Entry Fee
    await updatePoints(state.address, -20);
    console.log(`Entry fee deducted. New Balance: ${currentPoints - 20}`);

    // Try Binance first for starting prices
    let startPriceA, startPriceB;

    try {
      const { fetchTickerData } = await import('../../services/candleService.js');
      const [tickerA, tickerB] = await Promise.all([
        fetchTickerData(selectedTokens.a.symbol.toUpperCase()),
        fetchTickerData(selectedTokens.b.symbol.toUpperCase())
      ]);
      startPriceA = tickerA.price;
      startPriceB = tickerB.price;
      console.log('🟢 Got starting prices from Binance');
    } catch (binanceError) {
      console.log('Falling back to CoinGecko for starting prices');
      const { fetchTokenPrices } = await import('../../services/priceService.js');
      const prices = await fetchTokenPrices([selectedTokens.a.id, selectedTokens.b.id]);
      startPriceA = prices[selectedTokens.a.id]?.usd || selectedTokens.a.currentPrice;
      startPriceB = prices[selectedTokens.b.id]?.usd || selectedTokens.b.currentPrice;
    }

    console.log(`[Duel Start] ${selectedTokens.a.symbol}: $${startPriceA}`);
    console.log(`[Duel Start] ${selectedTokens.b.symbol}: $${startPriceB}`);

    btn.innerHTML = '<div class="loading"></div> Submitting...';

    const predictedWinner = winner;
    const durationHours = selectedDuration;
    const durationMs = durationHours * 60 * 60 * 1000; // Convert hours to milliseconds
    const endTime = new Date(Date.now() + durationMs).toISOString();

    const { data: duelData, error: duelError } = await supabase
      .from('duels')
      .insert({
        user_address: state.address,
        token_a_id: selectedTokens.a.id,
        token_b_id: selectedTokens.b.id,
        predicted_winner: winner,
        duration: durationHours,
        start_price_a: startPriceA,
        start_price_b: startPriceB,
        end_time: endTime,
        status: 'active'
      })
      .select()
      .single();

    if (duelError) throw new Error(duelError.message);
    const result = { predictionId: duelData.id };

    overlay.remove();

    // Hide the Duel Slip panel
    const selectionPanel = document.getElementById('selection-panel');
    const mainContent = document.getElementById('duel-main-content');
    const tokenGrid = document.getElementById('token-grid');
    const tokenCards = document.querySelectorAll('#token-grid .token-card');

    if (selectionPanel) {
      selectionPanel.style.display = 'none';
    }
    if (mainContent) {
      mainContent.style.marginRight = '0';
    }
    if (tokenGrid) {
      tokenGrid.classList.remove('compact-grid');
    }
    tokenCards.forEach(card => {
      card.classList.remove('compact-mode', 'selected');
    });

    // Store duel info for tracking with fresh prices
    const duelInfo = {
      id: result.predictionId,
      tokenA: { ...selectedTokens.a, startPrice: startPriceA },
      tokenB: { ...selectedTokens.b, startPrice: startPriceB },
      predictedWinner,
      duration: durationHours,
      startTime: Date.now(),
      userAddress: state.address, // Track user
    };

    activeDuels.push(duelInfo);

    // Show countdown notification with actual duration
    showDuelCountdown(duelInfo, durationMs);

    // Reset selection
    selectedTokens = { a: null, b: null };

  } catch (error) {
    // Refund on error?
    await updatePoints(state.address, 20);

    btn.disabled = false;
    btn.innerHTML = winner === 'A' ? `${selectedTokens.a.name} will win` : `${selectedTokens.b.name} will win`;
    alert(`❌ Error: ${error.message}`);
  }
}

// Show countdown and then determine winner
async function showDuelCountdown(duelInfo, durationMs) {
  // Track if showing in panel or as floating
  let isInPanel = true;

  // Track live prices
  let livePriceA = duelInfo.tokenA.startPrice;
  let livePriceB = duelInfo.tokenB.startPrice;
  let tickerUnsubA = null;
  let tickerUnsubB = null;

  // Create countdown element (this will hold the LIVE part)
  const countdownElement = document.createElement('div');
  countdownElement.id = `duel-countdown-${duelInfo.id}`;

  // Styles for panel (inside Duel Slip - at bottom)
  const setPanelStyles = () => {
    // Push to bottom using margin-top: auto
    countdownElement.className = '';
    countdownElement.style.cssText = 'margin-top: auto; border-top: 1px solid var(--glass-border); padding-top: var(--spacing-md);';
  };

  // Styles for floating (bottom right)
  const setFloatingStyles = () => {
    addDuelTrackerStyles();
    countdownElement.className = 'duel-tracker-card pulse';
    // Clear any inline styles that might interfere/remain from previous states
    countdownElement.style.cssText = '';
  };

  // Format currency helper
  const formatPrice = (price) => {
    if (price >= 1000) return '$' + price.toLocaleString('en-US', { maximumFractionDigits: 2 });
    if (price >= 1) return '$' + price.toFixed(2);
    return '$' + price.toFixed(6);
  };

  // Calculate change percentage
  const calcChange = (current, start) => ((current - start) / start * 100);

  // Subscribe to real-time ticker updates
  const startTickerUpdates = async () => {
    try {
      const { subscribeToTickerUpdates } = await import('../../services/candleService.js');

      tickerUnsubA = subscribeToTickerUpdates(duelInfo.tokenA.symbol.toUpperCase(), (ticker) => {
        livePriceA = ticker.price;
      });

      tickerUnsubB = subscribeToTickerUpdates(duelInfo.tokenB.symbol.toUpperCase(), (ticker) => {
        livePriceB = ticker.price;
      });

      console.log('🔴 Started live price tracking for duel');
    } catch (error) {
      console.log('Could not start ticker updates:', error);
    }
  };

  // Cleanup ticker subscriptions
  const stopTickerUpdates = () => {
    if (tickerUnsubA) tickerUnsubA();
    if (tickerUnsubB) tickerUnsubB();
    console.log('⬛ Stopped live price tracking for duel');
  };

  // Render minimized floating version
  const renderFloating = (remainingMs) => {
    const seconds = Math.ceil(remainingMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const timeDisplay = minutes > 0 ? `${minutes}:${secs.toString().padStart(2, '0')}` : `${seconds}s`;

    const changeA = calcChange(livePriceA, duelInfo.tokenA.startPrice);
    const changeB = calcChange(livePriceB, duelInfo.tokenB.startPrice);
    const leadingToken = changeA >= changeB ? duelInfo.tokenA.symbol : duelInfo.tokenB.symbol;

    countdownElement.innerHTML = `
      <div class="loading" style="width: 14px; height: 14px; border-color: white; border-top-color: transparent;"></div>
      <span style="color: white; font-weight: 600; font-size: 0.85rem;">${leadingToken} 🏆</span>
      <span style="color: rgba(255,255,255,0.8); font-weight: 700; font-size: 0.9rem;">${timeDisplay}</span>
    `;
  };

  // Render panel version (Live footer content)
  const renderPanel = (remainingMs) => {
    const seconds = Math.ceil(remainingMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const timeDisplay = minutes > 0 ? `${minutes}m ${secs}s` : `${seconds}s`;

    const changeA = calcChange(livePriceA, duelInfo.tokenA.startPrice);
    const changeB = calcChange(livePriceB, duelInfo.tokenB.startPrice);
    const isALeading = changeA > changeB;
    const isBLeading = changeB > changeA;
    const isTied = Math.abs(changeA - changeB) < 0.001;

    // Update LIVE prices in the "static" top part if they exist
    const priceElA = document.getElementById('live-price-a');
    if (priceElA) priceElA.textContent = formatPrice(livePriceA);

    const priceElB = document.getElementById('live-price-b');
    if (priceElB) priceElB.textContent = formatPrice(livePriceB);

    // Update LIVE performance summary in the top part
    const perfSummaryEl = document.getElementById('live-perf-summary');
    if (perfSummaryEl) {
      const diff = Math.abs(changeA - changeB).toFixed(3);
      if (isALeading) {
        perfSummaryEl.innerHTML = `<span style="font-size: 0.8rem; color: var(--color-text-secondary); line-height: 1.4; display: block;">Token <b>${duelInfo.tokenA.symbol.toUpperCase()}</b> is leading <b>${duelInfo.tokenB.symbol.toUpperCase()}</b> by <b style="color: #09C285">${diff}%</b></span>`;
      } else if (isBLeading) {
        perfSummaryEl.innerHTML = `<span style="font-size: 0.8rem; color: var(--color-text-secondary); line-height: 1.4; display: block;">Token <b>${duelInfo.tokenB.symbol.toUpperCase()}</b> is leading <b>${duelInfo.tokenA.symbol.toUpperCase()}</b> by <b style="color: #09C285">${diff}%</b></span>`;
      } else {
        perfSummaryEl.innerHTML = `<span style="font-size: 0.8rem; color: var(--color-text-muted);">Both tokens have equal performance since start</span>`;
      }
    }

    countdownElement.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--spacing-sm);">
        <div style="display: flex; align-items: center; gap: var(--spacing-xs);">
          <div class="loading" style="width: 12px; height: 12px;"></div>
          <span style="font-weight: 600; font-size: 0.85rem; color: var(--color-primary);">LIVE DUEL</span>
        </div>
        <span style="font-weight: 700; font-size: 0.9rem; color: var(--color-text-primary);">${timeDisplay}</span>
      </div>
      
      <!-- Live Status -->
      <div style="background: rgba(9, 194, 133, 0.1); border: 1px solid rgba(9, 194, 133, 0.3); border-radius: var(--radius-md); padding: var(--spacing-sm); text-align: center;">
         <div style="font-weight: 700; font-size: 0.9rem; margin-bottom: 2px;">
            ${isTied ? '⚖️ Currently Tied' : isALeading ? `🏆 ${duelInfo.tokenA.symbol} LEADING` : `🏆 ${duelInfo.tokenB.symbol} LEADING`}
         </div>
         <div style="font-size: 0.75rem; color: var(--color-text-muted);">
            ${isTied ? 'Both tokens have equal performance' : `Leading by ${Math.abs(changeA - changeB).toFixed(3)}%`}
         </div>
         <div style="display: flex; justify-content: space-between; margin-top: 6px; font-size: 0.75rem;">
            <span style="color: ${changeA >= 0 ? '#09C285' : '#FF4D4F'}">${duelInfo.tokenA.symbol}: ${changeA >= 0 ? '+' : ''}${changeA.toFixed(3)}%</span>
            <span style="color: ${changeB >= 0 ? '#09C285' : '#FF4D4F'}">${duelInfo.tokenB.symbol}: ${changeB >= 0 ? '+' : ''}${changeB.toFixed(3)}%</span>
         </div>
      </div>
      
      <button class="btn" style="width: 100%; margin-top: var(--spacing-md); background: var(--color-bg-tertiary); color: var(--color-text-muted); opacity: 0.7; cursor: not-allowed;">
        Duel in Progress...
      </button>
    `;
  };

  // Helper to build the static part of the panel
  const buildStaticPanel = () => {
    return `
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
            <span style="background: var(--color-primary); color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 600;">2</span>
          </div>
          <button id="close-panel-btn-disabled" style="background: none; border: none; cursor: default; padding: 4px; color: var(--color-text-muted); opacity: 0.5;">
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
              ${duelInfo.tokenA.symbol.toUpperCase()} vs ${duelInfo.tokenB.symbol.toUpperCase()}
            </div>
          </div>
          
          <!-- Tokens Display -->
          <div style="display: flex; align-items: center; justify-content: space-between; gap: var(--spacing-sm); margin-bottom: var(--spacing-md);">
            ${createCompactTokenDisplay(duelInfo.tokenA, 'A', 'live-price-a')}
            <div style="font-size: 0.9rem; font-weight: 700; color: var(--color-accent-orange); padding: 0 var(--spacing-xs);">VS</div>
            ${createCompactTokenDisplay(duelInfo.tokenB, 'B', 'live-price-b')}
          </div>

          <!-- 24h Performance Comparison (Simplified Static Context) -->
          <div id="live-perf-summary" style="background: var(--color-bg-tertiary); border-radius: var(--radius-md); padding: var(--spacing-sm); margin-bottom: var(--spacing-md); text-align: center;">
             ${(() => {
        const changeA = duelInfo.tokenA.priceChange24h || 0;
        const changeB = duelInfo.tokenB.priceChange24h || 0;
        const diff = Math.abs(changeA - changeB).toFixed(2);

        if (changeA > changeB) {
          return `<span style="font-size: 0.8rem; color: var(--color-text-secondary); line-height: 1.4; display: block;">Token <b>${duelInfo.tokenA.symbol.toUpperCase()}</b> is leading <b>${duelInfo.tokenB.symbol.toUpperCase()}</b> by <b style="color: #09C285">${diff}%</b></span>`;
        } else if (changeB > changeA) {
          return `<span style="font-size: 0.8rem; color: var(--color-text-secondary); line-height: 1.4; display: block;">Token <b>${duelInfo.tokenB.symbol.toUpperCase()}</b> is leading <b>${duelInfo.tokenA.symbol.toUpperCase()}</b> by <b style="color: #09C285">${diff}%</b></span>`;
        } else {
          return `<span style="font-size: 0.8rem; color: var(--color-text-muted);">Both tokens have equal performance in last 24H</span>`;
        }
      })()}
          </div>

          <!-- Time Period Selection -->
          <div>
            <div style="font-size: 0.75rem; color: var(--color-text-muted); margin-bottom: var(--spacing-xs);">Duration</div>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px;">
               <div style="padding: 0.4rem 0.5rem; font-size: 0.8rem; background: var(--gradient-green); border-radius: var(--radius-md); text-align: center; font-weight: 600; border: 1px solid transparent;">
                  ${Object.values(TIME_PERIODS).find(p => Math.abs(p.hours - duelInfo.duration) < 0.001)?.label || '1H'}
               </div>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  // Check current page and position element accordingly
  const updatePosition = () => {
    const currentPath = window.location.hash.replace('#', '').replace('/', '');
    const isOnDuelPage = currentPath === 'crypto-duel';
    const selectionPanel = document.getElementById('selection-panel');

    if (isOnDuelPage && selectionPanel) {
      // Show in Duel Slip panel
      if (!isInPanel || countdownElement.parentElement !== selectionPanel) {
        isInPanel = true;

        // Remove from body if there
        if (countdownElement.parentElement === document.body) {
          document.body.removeChild(countdownElement);
        }

        // Show the panel
        selectionPanel.style.display = 'flex';
        const mainContent = document.getElementById('duel-main-content');
        if (mainContent) mainContent.style.marginRight = '320px';

        // Rebuild panel structure with static info + live footer
        selectionPanel.innerHTML = buildStaticPanel();

        // Append live tracker at bottom
        setPanelStyles();
        selectionPanel.appendChild(countdownElement);
        renderPanel(remaining);
      }
    } else {
      // Show as floating button
      if (isInPanel || countdownElement.parentElement !== document.body) {
        isInPanel = false;
        // Remove from panel if there
        if (countdownElement.parentElement) {
          countdownElement.parentElement.removeChild(countdownElement);
          // And hide panel since we left
          const selectionPanel = document.getElementById('selection-panel');
          if (selectionPanel) selectionPanel.style.display = 'none';
        }
        setFloatingStyles();
        document.body.appendChild(countdownElement);
        renderFloating(remaining);
      }
    }
  };

  // Click on floating to navigate to crypto-duel
  countdownElement.addEventListener('click', () => {
    if (!isInPanel) {
      window.location.hash = '#/crypto-duel';
    }
  });

  // Listen for navigation
  window.addEventListener('hashchange', updatePosition);
  window.addEventListener('navigate', updatePosition);

  // Start ticker updates
  startTickerUpdates();

  // Initial position
  let remaining = durationMs;
  updatePosition();

  // Update countdown every second
  const countdownInterval = setInterval(() => {
    remaining -= 1000;
    if (remaining <= 0) {
      clearInterval(countdownInterval);
      stopTickerUpdates(); // Stop live updates
      window.removeEventListener('hashchange', updatePosition);
      window.removeEventListener('navigate', updatePosition);

      // Move to body for results display
      if (countdownElement.parentElement !== document.body) {
        if (countdownElement.parentElement) {
          countdownElement.parentElement.removeChild(countdownElement);
        }
        countdownElement.style.cssText = `
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-xl);
          padding: var(--spacing-lg);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          z-index: 1000;
          min-width: 300px;
          backdrop-filter: blur(10px);
        `;
        document.body.appendChild(countdownElement);
      }
      determineDuelWinner(duelInfo, countdownElement);
    } else {
      if (isInPanel) {
        renderPanel(remaining);
      } else {
        renderFloating(remaining);
      }
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
    // Try Binance first for end prices
    let endPriceA, endPriceB;

    try {
      const { fetchTickerData } = await import('../../services/candleService.js');
      const [tickerA, tickerB] = await Promise.all([
        fetchTickerData(duelInfo.tokenA.symbol.toUpperCase()),
        fetchTickerData(duelInfo.tokenB.symbol.toUpperCase())
      ]);
      endPriceA = tickerA.price;
      endPriceB = tickerB.price;
      console.log('🟢 Got final prices from Binance');
    } catch (binanceError) {
      console.log('Falling back to CoinGecko for final prices');
      const { fetchTokenPrices } = await import('../../services/priceService.js');
      const prices = await fetchTokenPrices([duelInfo.tokenA.id, duelInfo.tokenB.id]);
      endPriceA = prices[duelInfo.tokenA.id]?.usd || duelInfo.tokenA.startPrice;
      endPriceB = prices[duelInfo.tokenB.id]?.usd || duelInfo.tokenB.startPrice;
    }

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

  const selectionPanel = document.getElementById('selection-panel');
  const isInsidePanel = selectionPanel && selectionPanel.contains(overlay);

  if (!isInsidePanel) {
    // Floating overlay (outside panel)
    overlay.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: var(--glass-bg);
      border: 1px solid var(--glass-border);
      border-radius: var(--radius-xl);
      padding: var(--spacing-lg);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      z-index: 1000;
      min-width: 300px;
      backdrop-filter: blur(10px);
    `;
  } else {
    // Inside the Duel Slip panel
    // Clear all previous styles that cause misalignment
    overlay.style.cssText = `
      width: 100%;
      max-width: 300px;
      margin: 0 auto var(--spacing-md) auto;
      padding: 0;
      align-self: center;
    `;
    // Remove panel's bottom padding to avoid extra space
    selectionPanel.style.paddingBottom = '0';
    // Ensure panel uses 'flex-start' so card isn't pushed down
    selectionPanel.style.justifyContent = 'flex-start';
  }

  overlay.innerHTML = `
    <div style="text-align: center; animation: fadeIn 0.4s ease-out;">
      <div style="font-size: 3rem; margin-bottom: var(--spacing-sm);">
        ${result.userWon === null ? '🤝' : result.userWon ? '🎉' : '😔'}
      </div>
      <div style="font-size: 1.25rem; font-weight: 700; margin-bottom: var(--spacing-md); color: ${result.userWon === null ? 'var(--color-warning)' : result.userWon ? 'var(--color-success)' : 'var(--color-danger)'};">
        ${result.userWon === null ? "It's a Tie!" : result.userWon ? 'You Won!' : 'You Lost'}
      </div>
      <!-- Token A Results -->
      <div style="background: var(--color-bg-secondary); border-radius: var(--radius-md); padding: var(--spacing-sm); margin-bottom: var(--spacing-xs); ${result.actualWinner === 'A' ? 'border: 2px solid var(--color-success);' : ''}">
        <div style="display: flex; align-items: center; gap: var(--spacing-md); margin-bottom: var(--spacing-xs);">
          <div style="display: flex; align-items: center; gap: var(--spacing-xs);">
            <img src="${duelInfo.tokenA.image}" style="width: 24px; height: 24px; border-radius: 50%;" />
            <span style="font-weight: 600;">${duelInfo.tokenA.symbol.toUpperCase()}</span>
            ${result.actualWinner === 'A' ? '<span style="font-size: 0.7rem; background: var(--color-success); color: white; padding: 1px 6px; border-radius: 4px; margin-left: 4px;">WINNER</span>' : ''}
          </div>
          <span style="color: ${result.changeA >= 0 ? 'var(--color-success)' : 'var(--color-danger)'}; font-weight: 700; font-size: 1.1rem; white-space: nowrap;">
            ${result.changeA >= 0 ? '+' : ''}${result.changeA.toFixed(3)}%
          </span>
        </div>
        <div style="display: flex; gap: var(--spacing-md); font-size: 0.75rem; color: var(--color-text-muted);">
          <span>Start: $${duelInfo.tokenA.startPrice.toLocaleString('en-US', { maximumFractionDigits: 6 })}</span>
          <span>End: $${result.endPriceA.toLocaleString('en-US', { maximumFractionDigits: 6 })}</span>
        </div>
      </div>
      <!-- Token B Results -->
      <div style="background: var(--color-bg-secondary); border-radius: var(--radius-md); padding: var(--spacing-sm); margin-bottom: var(--spacing-md); ${result.actualWinner === 'B' ? 'border: 2px solid var(--color-success);' : ''}">
        <div style="display: flex; align-items: center; gap: var(--spacing-md); margin-bottom: var(--spacing-xs);">
          <div style="display: flex; align-items: center; gap: var(--spacing-xs);">
            <img src="${duelInfo.tokenB.image}" style="width: 24px; height: 24px; border-radius: 50%;" />
            <span style="font-weight: 600;">${duelInfo.tokenB.symbol.toUpperCase()}</span>
            ${result.actualWinner === 'B' ? '<span style="font-size: 0.7rem; background: var(--color-success); color: white; padding: 1px 6px; border-radius: 4px; margin-left: 4px;">WINNER</span>' : ''}
          </div>
          <span style="color: ${result.changeB >= 0 ? 'var(--color-success)' : 'var(--color-danger)'}; font-weight: 700; font-size: 1.1rem; white-space: nowrap;">
            ${result.changeB >= 0 ? '+' : ''}${result.changeB.toFixed(3)}%
          </span>
        </div>
        <div style="display: flex; gap: var(--spacing-md); font-size: 0.75rem; color: var(--color-text-muted);">
          <span>Start: $${duelInfo.tokenB.startPrice.toLocaleString('en-US', { maximumFractionDigits: 6 })}</span>
          <span>End: $${result.endPriceB.toLocaleString('en-US', { maximumFractionDigits: 6 })}</span>
        </div>
      </div>
      <!-- Difference Summary -->
      <div style="background: var(--color-bg-tertiary); border-radius: var(--radius-md); padding: var(--spacing-sm); margin-bottom: var(--spacing-md); text-align: center;">
        ${result.actualWinner === 'TIE'
      ? '<span style="font-size: 0.85rem; color: var(--color-text-muted);">Both tokens performed equally!</span>'
      : `<span style="font-size: 0.85rem;">${winnerToken.symbol.toUpperCase()} outperformed by <strong style="color: var(--color-success);">${Math.abs(result.changeA - result.changeB).toFixed(3)}%</strong></span>`
    }
      </div>
      <button id="close-duel-result-btn" class="btn ${result.userWon ? 'btn-success' : 'btn-primary'}" style="width: 100%;">
        ${result.userWon ? '🏆 Claim Reward' : 'Claim Reward'}
      </button>
    </div>
  `;

  const actionBtn = overlay.querySelector('#close-duel-result-btn');
  if (actionBtn) {
    actionBtn.textContent = result.userWon ? 'Claim Reward' : (result.userWon === null ? 'Claim Refund' : 'Settle Duel');

    actionBtn.addEventListener('click', async (e) => {
      e.stopPropagation();

      const state = walletManager.getState();
      const address = state.address || duelInfo.userAddress; // Fallback to stored address

      if (!address) {
        alert("Wallet not connected!");
        return;
      }

      try {
        actionBtn.disabled = true;
        actionBtn.innerHTML = '<div class="loading" style="width: 16px; height: 16px; border-color: white; border-top-color: transparent;"></div> Processing...';

        // Determine Point Adjustment
        let pointsToAdd = 0;
        let message = "";

        if (result.userWon) {
          pointsToAdd = 25; // 20 Entry + 5 Profit
          message = "🎉 Won 5 Points!";
        } else if (result.userWon === false) {
          pointsToAdd = 10; // Return 10, so Net Loss is 10
          message = "📉 Settle Complete";
        } else {
          pointsToAdd = 20; // Refund Entry
          message = "♻️ Refunded 20 Points";
        }

        await updatePoints(address, pointsToAdd);
        const newBalance = await getPoints(address);

        actionBtn.textContent = `${message} (Bal: ${newBalance})`;
        await new Promise(r => setTimeout(r, 1500));

      } catch (err) {
        console.error('Points error:', err);
        actionBtn.innerHTML = '❌ Error';
        setTimeout(() => {
          actionBtn.disabled = false;
          actionBtn.textContent = 'Try Again';
        }, 2000);
        return; // Don't close if error
      }

      // Close logic
      overlay.remove();

      const selectionPanel = document.getElementById('selection-panel');
      // If the panel exists in DOM, hide it and reset layout (regardless of page hash)
      if (selectionPanel) {
        selectionPanel.style.display = 'none';

        const mainContent = document.getElementById('duel-main-content');
        if (mainContent) mainContent.style.marginRight = '0';

        const tokenGrid = document.getElementById('token-grid');
        const tokenCards = document.querySelectorAll('#token-grid .token-card');
        if (tokenGrid) tokenGrid.classList.remove('compact-grid');
        tokenCards.forEach(card => card.classList.remove('compact-mode'));
      }
    });
  }
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
  /* Torn Paper Effect for Duel Slip - REMOVED */
  #selection-panel::before {
    display: none;
  }

  /* Clip-path version - REMOVED */
  #selection-panel {
    /* Hide scrollbar but allow scrolling */
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
  
  #selection-panel::-webkit-scrollbar {
    display: none;
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
