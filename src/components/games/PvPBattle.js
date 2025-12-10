// PvP Battle Game Component
// 1v1 betting where users predict token direction (UP/DOWN)
// Matchmaking: Platform finds opponents with opposite predictions

import { formatCurrency, formatPercentage, getPriceChangeClass } from '../../utils/formatters.js';
import {
  fetchMultipleTickers,
  subscribeToTickerUpdates,
} from '../../services/candleService.js';
import walletManager from '../../wallet/walletManager.js';

// Allowed tokens for PvP
const PVP_TOKENS = ['BTC', 'ETH', 'SOL', 'BNB', 'XRP', 'HYPE', 'DOGE'];

// Token metadata (names and images)
const TOKEN_META = {
  BTC: { name: 'Bitcoin', image: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png' },
  ETH: { name: 'Ethereum', image: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png' },
  SOL: { name: 'Solana', image: 'https://assets.coingecko.com/coins/images/4128/small/solana.png' },
  BNB: { name: 'BNB', image: 'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png' },
  XRP: { name: 'XRP', image: 'https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png' },
  HYPE: { name: 'Hyperliquid', image: 'https://assets.coingecko.com/coins/images/40845/standard/hyperliquid.jpeg' },
  DOGE: { name: 'Dogecoin', image: 'https://assets.coingecko.com/coins/images/5/small/dogecoin.png' },
};

// Max bet amount
const MAX_BET_AMOUNT = 10;

// Duration for PvP battles (in minutes)
const PVP_DURATION_MINUTES = 5;

// Store for open bets (simulating backend)
let openBets = [];
let myBets = [];
let activeBattles = [];

// Active ticker subscriptions
let tickerSubscriptions = [];

// Selected state
let selectedToken = null;
let selectedDirection = null; // 'up' or 'down'
let betAmount = 5;

export function createPvPBattle() {
  // Reset state on page load
  selectedToken = null;
  selectedDirection = null;
  betAmount = 5;

  const page = document.createElement('div');
  page.className = 'pvp-battle-page';
  page.style.cssText = `
    display: flex;
    height: calc(100vh - 64px);
    overflow: hidden;
  `;

  // Main content (left side - token selection + bet slip)
  const mainContent = document.createElement('div');
  mainContent.id = 'pvp-main-content';
  mainContent.style.cssText = `
    flex: 1;
    overflow-y: auto;
    padding: var(--spacing-xl) var(--spacing-lg);
    background: linear-gradient(135deg, rgba(9, 194, 133, 0.02) 0%, transparent 50%);
  `;

  // Header
  const header = document.createElement('div');
  header.style.cssText = 'margin-bottom: var(--spacing-xl); text-align: center;';
  header.innerHTML = `
    <div style="display: inline-flex; align-items: center; justify-content: center; gap: var(--spacing-md); margin-bottom: var(--spacing-sm);">
      <div style="width: 56px; height: 56px; background: linear-gradient(135deg, #09C285 0%, #07a371 100%); border-radius: 16px; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 24px rgba(9, 194, 133, 0.3);">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M21 3v5l-11 9l-4 4l-3 -3l4 -4l9 -11z" />
          <path d="M5 13l6 6" />
          <path d="M14.32 17.32l3.68 3.68l3 -3l-3.365 -3.365" />
          <path d="M10 5.5l-2 -2.5h-5v5l3 2.5" />
        </svg>
      </div>
      <h1 style="font-size: 2.5rem; margin: 0; background: linear-gradient(135deg, #F0F0F0 0%, #A0A0A0 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
        PvP Battle
      </h1>
    </div>
    <p style="color: var(--color-text-secondary); font-size: 1.1rem; max-width: 500px; margin: 0 auto;">
      Predict <span style="color: #09C285; font-weight: 600;">LONG</span> or <span style="color: #EF4444; font-weight: 600;">SHORT</span>. Find an opponent. <strong>Winner takes all!</strong>
    </p>
  `;
  mainContent.appendChild(header);

  // Token Grid
  const tokenGrid = document.createElement('div');
  tokenGrid.id = 'pvp-token-grid';
  tokenGrid.style.cssText = `
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-xl);
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
  `;
  mainContent.appendChild(tokenGrid);

  // Bet Slip (appears after token selection)
  const betSlip = document.createElement('div');
  betSlip.id = 'pvp-bet-slip';
  betSlip.style.cssText = 'display: none;';
  mainContent.appendChild(betSlip);

  page.appendChild(mainContent);

  // Open Bets Panel (right side - notification style)
  const openBetsPanel = document.createElement('div');
  openBetsPanel.id = 'open-bets-panel';
  openBetsPanel.style.cssText = `
    width: 360px;
    height: calc(100vh - 64px);
    background: linear-gradient(180deg, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.85) 100%);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-left: 1px solid rgba(9, 194, 133, 0.2);
    padding: var(--spacing-lg);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  `;

  openBetsPanel.innerHTML = `
    <div style="display: flex; align-items: center; gap: var(--spacing-sm); margin-bottom: var(--spacing-lg); padding-bottom: var(--spacing-md); border-bottom: 1px solid rgba(9, 194, 133, 0.2);">
      <div style="width: 36px; height: 36px; background: linear-gradient(135deg, #09C285 0%, #07a371 100%); border-radius: 10px; display: flex; align-items: center; justify-content: center;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      </div>
      <div style="flex: 1;">
        <div style="font-weight: 700; font-size: 1.1rem;">Open Bets</div>
        <div style="font-size: 0.75rem; color: var(--color-text-muted);">Challenge other players</div>
      </div>
      <span id="open-bets-count" style="background: linear-gradient(135deg, #09C285 0%, #07a371 100%); color: white; border-radius: 50%; width: 26px; height: 26px; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 700; box-shadow: 0 4px 12px rgba(9, 194, 133, 0.3);">0</span>
    </div>
    <div id="open-bets-list" style="flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: var(--spacing-md); padding-right: 4px;"></div>
  `;

  page.appendChild(openBetsPanel);

  // Load tokens
  loadPvPTokens(tokenGrid);

  // Load initial open bets (simulated)
  loadOpenBets();

  // Cleanup on page unload
  page.addEventListener('DOMNodeRemovedFromDocument', cleanup);

  return page;
}

function cleanup() {
  tickerSubscriptions.forEach(unsub => unsub());
  tickerSubscriptions = [];
}

async function loadPvPTokens(gridContainer) {
  gridContainer.innerHTML = '<div class="loading" style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-2xl);"></div>';

  // Cleanup previous subscriptions
  cleanup();

  try {
    const binanceTokens = await fetchMultipleTickers(PVP_TOKENS);

    if (binanceTokens.length > 0) {
      const tokens = binanceTokens.map(t => ({
        symbol: t.symbol,
        name: TOKEN_META[t.symbol]?.name || t.symbol,
        image: TOKEN_META[t.symbol]?.image || t.image,
        price: t.price,
        priceChange24h: t.priceChange24h,
      }));

      renderTokenGrid(tokens, gridContainer);

      // Subscribe to real-time updates
      tokens.forEach(token => {
        const unsub = subscribeToTickerUpdates(token.symbol, (ticker) => {
          updateTokenCard(token.symbol, ticker.price, ticker.priceChange24h);
        });
        tickerSubscriptions.push(unsub);
      });

      console.log('🟢 PvP Tokens loaded with real-time updates');
    } else {
      throw new Error('No tokens loaded');
    }
  } catch (error) {
    console.error('Failed to load PvP tokens:', error);
    gridContainer.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-2xl); color: var(--color-danger);">
        Failed to load tokens. Please try again later.
      </div>
    `;
  }
}

function renderTokenGrid(tokens, gridContainer) {
  gridContainer.innerHTML = '';

  tokens.forEach(token => {
    const card = createTokenCard(token);
    card.addEventListener('click', () => selectToken(token));
    gridContainer.appendChild(card);
  });
}

function createTokenCard(token) {
  const card = document.createElement('div');
  card.className = 'pvp-token-card';
  card.dataset.symbol = token.symbol;

  const changeClass = getPriceChangeClass(token.priceChange24h);

  card.style.cssText = `
    background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    padding: var(--spacing-lg);
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: var(--spacing-sm);
    position: relative;
    overflow: hidden;
  `;

  card.innerHTML = `
    <div style="position: absolute; inset: 0; background: radial-gradient(circle at 50% 0%, rgba(9, 194, 133, 0.08) 0%, transparent 60%); opacity: 0; transition: opacity 0.3s;" class="card-glow"></div>
    <img src="${token.image}" alt="${token.name}" style="width: 48px; height: 48px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.1);" onerror="this.style.display='none'" />
    <div>
      <div style="font-weight: 700; font-size: 1.1rem; letter-spacing: 0.5px;">${token.symbol}</div>
      <div style="font-size: 0.8rem; color: var(--color-text-muted);">${token.name}</div>
    </div>
    <div style="margin-top: var(--spacing-xs);">
      <div class="token-price" style="font-weight: 600; font-size: 1rem;">${formatCurrency(token.price)}</div>
      <div class="token-change ${changeClass}" style="font-size: 0.85rem; font-weight: 500;">${formatPercentage(token.priceChange24h)}</div>
    </div>
  `;

  // Hover effect
  card.addEventListener('mouseenter', () => {
    if (!card.classList.contains('selected')) {
      card.style.borderColor = 'rgba(9, 194, 133, 0.5)';
      card.style.transform = 'translateY(-4px)';
      card.style.boxShadow = '0 12px 40px rgba(9, 194, 133, 0.15)';
      card.querySelector('.card-glow').style.opacity = '1';
    }
  });
  card.addEventListener('mouseleave', () => {
    if (!card.classList.contains('selected')) {
      card.style.borderColor = 'rgba(255, 255, 255, 0.08)';
      card.style.transform = 'none';
      card.style.boxShadow = 'none';
      card.querySelector('.card-glow').style.opacity = '0';
    }
  });

  return card;
}

function updateTokenCard(symbol, price, priceChange) {
  const card = document.querySelector(`.pvp-token-card[data-symbol="${symbol}"]`);
  if (!card) return;

  const priceEl = card.querySelector('.token-price');
  const changeEl = card.querySelector('.token-change');

  if (priceEl) {
    priceEl.textContent = formatCurrency(price);
  }

  if (changeEl) {
    changeEl.textContent = formatPercentage(priceChange);
    changeEl.className = `token-change ${getPriceChangeClass(priceChange)}`;
  }
}

function selectToken(token) {
  selectedToken = token;
  selectedDirection = null;

  // Update card selection visuals
  document.querySelectorAll('.pvp-token-card').forEach(card => {
    const glow = card.querySelector('.card-glow');
    if (card.dataset.symbol === token.symbol) {
      card.classList.add('selected');
      card.style.borderColor = '#09C285';
      card.style.boxShadow = '0 0 30px rgba(9, 194, 133, 0.4), inset 0 0 20px rgba(9, 194, 133, 0.05)';
      if (glow) glow.style.opacity = '1';
    } else {
      card.classList.remove('selected');
      card.style.borderColor = 'rgba(255, 255, 255, 0.08)';
      card.style.boxShadow = 'none';
      if (glow) glow.style.opacity = '0';
    }
  });

  // Show bet slip
  showBetSlip(token);
}

function showBetSlip(token) {
  const betSlip = document.getElementById('pvp-bet-slip');
  if (!betSlip) return;

  const changeClass = getPriceChangeClass(token.priceChange24h);

  betSlip.style.cssText = `
    display: block;
    background: var(--glass-bg);
    backdrop-filter: blur(12px);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-xl);
    padding: var(--spacing-lg);
    max-width: 400px;
    margin: 0 auto;
    animation: slideUp 0.3s ease-out;
  `;

  betSlip.innerHTML = `
    <style>
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .direction-btn {
        flex: 1;
        padding: var(--spacing-md);
        border: 2px solid var(--glass-border);
        border-radius: var(--radius-lg);
        background: transparent;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--spacing-xs);
        color: var(--color-text-primary);
      }
      .direction-btn:hover {
        transform: translateY(-2px);
      }
      .direction-btn.up:hover, .direction-btn.up.selected {
        border-color: #09C285;
        background: rgba(9, 194, 133, 0.1);
        color: #09C285;
      }
      .direction-btn.down:hover, .direction-btn.down.selected {
        border-color: #EF4444;
        background: rgba(239, 68, 68, 0.1);
        color: #EF4444;
      }
      .direction-btn.selected {
        transform: scale(1.02);
      }
      .amount-input {
        width: 100%;
        padding: var(--spacing-md);
        border: 1px solid var(--glass-border);
        border-radius: var(--radius-md);
        background: var(--color-bg-secondary);
        color: var(--color-text-primary);
        font-size: 1.2rem;
        text-align: center;
        font-weight: 600;
      }
      .amount-input:focus {
        outline: none;
        border-color: var(--color-primary);
      }
    </style>

    <div style="text-align: center; margin-bottom: var(--spacing-lg);">
      <img src="${token.image}" alt="${token.symbol}" style="width: 60px; height: 60px; border-radius: 50%; margin-bottom: var(--spacing-sm);" onerror="this.style.display='none'" />
      <h3 style="margin: 0; font-size: 1.3rem;">${token.symbol}</h3>
      <div style="color: var(--color-text-muted); font-size: 0.9rem;">${token.name}</div>
      <div style="margin-top: var(--spacing-xs);">
        <span style="font-weight: 600;">${formatCurrency(token.price)}</span>
        <span class="${changeClass}" style="margin-left: var(--spacing-xs);">${formatPercentage(token.priceChange24h)}</span>
      </div>
    </div>

    <div style="margin-bottom: var(--spacing-md);">
      <div style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: var(--spacing-xs);">Predict Direction (${PVP_DURATION_MINUTES} min)</div>
      <div style="display: flex; gap: var(--spacing-sm);">
        <button class="direction-btn up" data-direction="up">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M12 19V5M5 12l7-7 7 7"></path>
          </svg>
          <span style="font-weight: 600;">LONG</span>
        </button>
        <button class="direction-btn down" data-direction="down">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M12 5v14M5 12l7 7 7-7"></path>
          </svg>
          <span style="font-weight: 600;">SHORT</span>
        </button>
      </div>
    </div>

    <div style="margin-bottom: var(--spacing-lg);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-xs);">
        <span style="font-size: 0.85rem; color: var(--color-text-muted);">Bet Amount</span>
        <span style="font-size: 0.75rem; color: var(--color-text-muted);">Max: $${MAX_BET_AMOUNT}</span>
      </div>
      <div style="position: relative;">
        <span style="position: absolute; left: var(--spacing-md); top: 50%; transform: translateY(-50%); color: var(--color-text-muted); font-size: 1.2rem;">$</span>
        <input type="number" class="amount-input" id="bet-amount-input" value="${betAmount}" min="1" max="${MAX_BET_AMOUNT}" step="1" style="padding-left: 2rem;" />
      </div>
      <div style="display: flex; gap: var(--spacing-xs); margin-top: var(--spacing-xs);">
        ${[1, 5, 10].map(amt => `
          <button class="quick-amount-btn" data-amount="${amt}" style="flex: 1; padding: var(--spacing-xs); border: 1px solid var(--glass-border); border-radius: var(--radius-sm); background: transparent; cursor: pointer; color: var(--color-text-secondary); font-size: 0.85rem; transition: all 0.2s;">
            $${amt}
          </button>
        `).join('')}
      </div>
    </div>

    <button id="submit-bet-btn" class="btn btn-primary" style="width: 100%; padding: var(--spacing-md); font-size: 1rem;" disabled>
      Select Direction
    </button>

    <div style="text-align: center; margin-top: var(--spacing-sm);">
      <span style="font-size: 0.8rem; color: var(--color-text-muted);">Winner takes all • ${PVP_DURATION_MINUTES} min duration</span>
    </div>
  `;

  // Direction buttons
  betSlip.querySelectorAll('.direction-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedDirection = btn.dataset.direction;
      betSlip.querySelectorAll('.direction-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      updateSubmitButton();
    });
  });

  // Amount input
  const amountInput = betSlip.querySelector('#bet-amount-input');
  amountInput.addEventListener('input', (e) => {
    let value = parseFloat(e.target.value);
    if (value > MAX_BET_AMOUNT) value = MAX_BET_AMOUNT;
    if (value < 1) value = 1;
    betAmount = value;
    updateSubmitButton();
  });

  // Quick amount buttons
  betSlip.querySelectorAll('.quick-amount-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      betAmount = parseFloat(btn.dataset.amount);
      amountInput.value = betAmount;
      updateSubmitButton();
    });
  });

  // Submit button
  const submitBtn = betSlip.querySelector('#submit-bet-btn');
  submitBtn.addEventListener('click', submitBet);

  function updateSubmitButton() {
    if (selectedDirection && betAmount > 0) {
      submitBtn.disabled = false;
      submitBtn.textContent = `Place ${selectedDirection.toUpperCase()} Bet ($${betAmount})`;
    } else {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Select Direction';
    }
  }
}

async function submitBet() {
  const state = walletManager.getState();
  if (!state.connected) {
    alert('Please connect your wallet first!');
    return;
  }

  if (!selectedToken || !selectedDirection || betAmount <= 0) {
    return;
  }

  const submitBtn = document.getElementById('submit-bet-btn');
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<div class="loading"></div> Submitting...';

  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const bet = {
      id: Date.now().toString(),
      symbol: selectedToken.symbol,
      name: selectedToken.name,
      image: selectedToken.image,
      direction: selectedDirection,
      amount: betAmount,
      startPrice: null, // Price set when duel is accepted
      timestamp: Date.now(),
      user: state.address.slice(0, 6) + '...' + state.address.slice(-4),
      status: 'open', // 'open', 'matched', 'completed'
    };

    // Check for matching opponent
    const oppositeDir = selectedDirection === 'up' ? 'down' : 'up';
    const matchingBet = openBets.find(b =>
      b.symbol === bet.symbol &&
      b.direction === oppositeDir &&
      b.amount === bet.amount &&
      b.status === 'open'
    );

    if (matchingBet) {
      // Match found! Fetch current price as reference
      let referencePrice;
      try {
        const tickers = await fetchMultipleTickers([bet.symbol]);
        referencePrice = tickers[0]?.price || selectedToken.price;
      } catch (e) {
        referencePrice = selectedToken.price;
      }

      // Set reference price for both players
      matchingBet.status = 'matched';
      matchingBet.startPrice = referencePrice;
      bet.status = 'matched';
      bet.startPrice = referencePrice;

      const battle = {
        id: Date.now().toString(),
        player1: matchingBet,
        player2: bet,
        startTime: Date.now(),
        endTime: Date.now() + (PVP_DURATION_MINUTES * 60 * 1000),
        symbol: bet.symbol,
        startPrice: referencePrice,
      };

      activeBattles.push(battle);
      openBets = openBets.filter(b => b.id !== matchingBet.id);

      showMatchNotification(battle);
      startBattleCountdown(battle);
    } else {
      // No match, add to open bets
      openBets.unshift(bet);
      myBets.push(bet);
      showBetPlacedNotification(bet);
    }

    // Refresh open bets panel
    renderOpenBets();

    // Reset selection
    selectedToken = null;
    selectedDirection = null;
    document.querySelectorAll('.pvp-token-card').forEach(card => {
      card.classList.remove('selected');
      card.style.borderColor = 'var(--glass-border)';
      card.style.boxShadow = 'none';
    });
    document.getElementById('pvp-bet-slip').style.display = 'none';

  } catch (error) {
    alert(`Error: ${error.message}`);
    submitBtn.disabled = false;
    submitBtn.textContent = `Place ${selectedDirection.toUpperCase()} Bet ($${betAmount})`;
  }
}

function loadOpenBets() {
  // Simulate some existing open bets from "other users"
  const mockBets = [
    {
      id: '1',
      symbol: 'BTC',
      name: 'Bitcoin',
      image: TOKEN_META.BTC.image,
      direction: 'up',
      amount: 5,
      startPrice: 0,
      timestamp: Date.now() - 120000,
      user: '0x1a2b...3c4d',
      status: 'open',
    },
    {
      id: '2',
      symbol: 'ETH',
      name: 'Ethereum',
      image: TOKEN_META.ETH.image,
      direction: 'down',
      amount: 10,
      startPrice: 0,
      timestamp: Date.now() - 60000,
      user: '0x5e6f...7g8h',
      status: 'open',
    },
    {
      id: '3',
      symbol: 'SOL',
      name: 'Solana',
      image: TOKEN_META.SOL.image,
      direction: 'up',
      amount: 5,
      startPrice: 0,
      timestamp: Date.now() - 30000,
      user: '0x9i0j...1k2l',
      status: 'open',
    },
  ];

  openBets = mockBets;
  renderOpenBets();
}

function renderOpenBets() {
  const listEl = document.getElementById('open-bets-list');
  const countEl = document.getElementById('open-bets-count');

  if (!listEl) return;

  const visibleBets = openBets.filter(b => b.status === 'open');

  if (countEl) {
    countEl.textContent = visibleBets.length;
  }

  if (visibleBets.length === 0) {
    listEl.innerHTML = `
      <div style="text-align: center; padding: var(--spacing-xl); color: var(--color-text-muted);">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: var(--spacing-sm); opacity: 0.5;">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M16 16s-1.5-2-4-2-4 2-4 2"></path>
          <line x1="9" y1="9" x2="9.01" y2="9"></line>
          <line x1="15" y1="9" x2="15.01" y2="9"></line>
        </svg>
        <div>No open bets yet</div>
        <div style="font-size: 0.85rem; margin-top: var(--spacing-xs);">Be the first to place a bet!</div>
      </div>
    `;
    return;
  }

  listEl.innerHTML = visibleBets.map(bet => {
    const timeAgo = getTimeAgo(bet.timestamp);
    const isUp = bet.direction === 'up';
    const dirColor = isUp ? '#09C285' : '#EF4444';
    const dirIcon = isUp ? '↑' : '↓';
    const dirLabel = isUp ? 'LONG' : 'SHORT';

    return `
      <div class="open-bet-card" data-bet-id="${bet.id}" style="
        background: var(--color-bg-secondary);
        border: 1px solid var(--glass-border);
        border-radius: var(--radius-lg);
        padding: var(--spacing-sm) var(--spacing-md);
        cursor: pointer;
        transition: all 0.2s ease;
      ">
        <div style="display: flex; align-items: center; gap: var(--spacing-sm); margin-bottom: var(--spacing-xs);">
          <img src="${bet.image}" alt="${bet.symbol}" style="width: 28px; height: 28px; border-radius: 50%;" onerror="this.style.display='none'" />
          <div style="flex: 1;">
            <div style="font-weight: 600; font-size: 0.9rem;">${bet.symbol}</div>
            <div style="font-size: 0.75rem; color: var(--color-text-muted);">${bet.user}</div>
          </div>
          <div style="text-align: right;">
            <div style="font-weight: 700; color: ${dirColor}; display: flex; align-items: center; gap: 4px;">
              <span>${dirIcon}</span>
              <span>${dirLabel}</span>
            </div>
            <div style="font-size: 0.85rem; font-weight: 600;">$${bet.amount}</div>
          </div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 0.75rem; color: var(--color-text-muted);">${timeAgo}</span>
          <button class="accept-bet-btn" data-bet-id="${bet.id}" style="
            padding: 4px 12px;
            font-size: 0.8rem;
            background: var(--color-primary);
            color: white;
            border: none;
            border-radius: var(--radius-sm);
            cursor: pointer;
            font-weight: 600;
          ">Accept (${isUp ? 'SHORT' : 'LONG'})</button>
        </div>
      </div>
    `;
  }).join('');

  // Add hover effects
  listEl.querySelectorAll('.open-bet-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.borderColor = 'var(--color-primary)';
      card.style.transform = 'translateX(-4px)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.borderColor = 'var(--glass-border)';
      card.style.transform = 'none';
    });
  });

  // Accept bet buttons
  listEl.querySelectorAll('.accept-bet-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      acceptBet(btn.dataset.betId);
    });
  });
}

async function acceptBet(betId) {
  const state = walletManager.getState();
  if (!state.connected) {
    alert('Please connect your wallet first!');
    return;
  }

  const bet = openBets.find(b => b.id === betId);
  if (!bet || bet.status !== 'open') return;

  // Get current price
  try {
    const tickers = await fetchMultipleTickers([bet.symbol]);
    const currentPrice = tickers[0]?.price || bet.startPrice;

    const myBet = {
      id: Date.now().toString(),
      symbol: bet.symbol,
      name: bet.name,
      image: bet.image,
      direction: bet.direction === 'up' ? 'down' : 'up',
      amount: bet.amount,
      startPrice: currentPrice,
      timestamp: Date.now(),
      user: state.address.slice(0, 6) + '...' + state.address.slice(-4),
      status: 'matched',
    };

    bet.status = 'matched';
    bet.startPrice = currentPrice;

    const battle = {
      id: Date.now().toString(),
      player1: bet,
      player2: myBet,
      startTime: Date.now(),
      endTime: Date.now() + (PVP_DURATION_MINUTES * 60 * 1000),
      symbol: bet.symbol,
      startPrice: currentPrice,
    };

    activeBattles.push(battle);
    openBets = openBets.filter(b => b.id !== betId);

    showMatchNotification(battle);
    startBattleCountdown(battle);
    renderOpenBets();

  } catch (error) {
    alert(`Error accepting bet: ${error.message}`);
  }
}

function showMatchNotification(battle) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--glass-bg);
    backdrop-filter: blur(16px);
    border: 2px solid var(--color-primary);
    border-radius: var(--radius-xl);
    padding: var(--spacing-xl);
    text-align: center;
    z-index: 1000;
    animation: matchPop 0.5s ease-out;
    min-width: 300px;
  `;

  notification.innerHTML = `
    <style>
      @keyframes matchPop {
        0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
        50% { transform: translate(-50%, -50%) scale(1.1); }
        100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
      }
    </style>
    <div style="font-size: 3rem; margin-bottom: var(--spacing-sm);">⚔️</div>
    <h2 style="color: var(--color-primary); margin-bottom: var(--spacing-xs);">MATCHED!</h2>
    <p style="color: var(--color-text-secondary); margin-bottom: var(--spacing-md);">
      Battle starts now for ${battle.symbol}
    </p>
    <div style="display: flex; justify-content: center; gap: var(--spacing-lg); margin-bottom: var(--spacing-md);">
      <div>
        <div style="font-size: 0.85rem; color: var(--color-text-muted);">${battle.player1.user}</div>
        <div style="font-weight: 700; color: ${battle.player1.direction === 'up' ? '#09C285' : '#EF4444'};">
          ${battle.player1.direction === 'up' ? '↑ LONG' : '↓ SHORT'}
        </div>
      </div>
      <div style="font-size: 1.5rem; font-weight: 700;">VS</div>
      <div>
        <div style="font-size: 0.85rem; color: var(--color-text-muted);">${battle.player2.user}</div>
        <div style="font-weight: 700; color: ${battle.player2.direction === 'up' ? '#09C285' : '#EF4444'};">
          ${battle.player2.direction === 'up' ? '↑ LONG' : '↓ SHORT'}
        </div>
      </div>
    </div>
    <div style="font-size: 0.9rem; color: var(--color-text-muted);">
      Prize Pool: <strong style="color: var(--color-primary);">$${battle.player1.amount + battle.player2.amount}</strong>
    </div>
  `;

  document.body.appendChild(notification);

  // Auto-remove after 3 seconds
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.3s';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

function showBetPlacedNotification(bet) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--glass-bg);
    backdrop-filter: blur(12px);
    border: 1px solid var(--color-primary);
    border-radius: var(--radius-lg);
    padding: var(--spacing-md) var(--spacing-lg);
    z-index: 1000;
    animation: slideUpNotif 0.3s ease-out;
  `;

  notification.innerHTML = `
    <style>
      @keyframes slideUpNotif {
        from { opacity: 0; transform: translate(-50%, 20px); }
        to { opacity: 1; transform: translate(-50%, 0); }
      }
    </style>
    <div style="display: flex; align-items: center; gap: var(--spacing-md);">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <div>
        <div style="font-weight: 600;">Bet Placed!</div>
        <div style="font-size: 0.85rem; color: var(--color-text-muted);">Waiting for opponent...</div>
      </div>
    </div>
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.3s';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

function startBattleCountdown(battle) {
  // Create floating tracker
  const tracker = document.createElement('div');
  tracker.id = `battle-tracker-${battle.id}`;
  tracker.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    background: rgba(15, 23, 42, 0.9);
    backdrop-filter: blur(12px);
    border: 1px solid var(--color-primary);
    border-radius: var(--radius-lg);
    padding: var(--spacing-md);
    z-index: 999;
    min-width: 240px;
    animation: fadeIn 0.3s ease-out;
  `;

  document.body.appendChild(tracker);

  // Update countdown
  const updateTracker = async () => {
    const remaining = battle.endTime - Date.now();

    if (remaining <= 0) {
      // Battle ended - determine winner
      await resolveBattle(battle, tracker);
      return;
    }

    const mins = Math.floor(remaining / 60000);
    const secs = Math.floor((remaining % 60000) / 1000);

    // Get current price
    let currentPrice = battle.startPrice;
    try {
      const tickers = await fetchMultipleTickers([battle.symbol]);
      currentPrice = tickers[0]?.price || battle.startPrice;
    } catch (e) { }

    const priceChange = ((currentPrice - battle.startPrice) / battle.startPrice * 100);
    const isUp = priceChange >= 0;

    tracker.innerHTML = `
      <div style="display: flex; align-items: center; gap: var(--spacing-sm); margin-bottom: var(--spacing-sm);">
        <span style="font-size: 1.2rem;">⚔️</span>
        <span style="font-weight: 600;">${battle.symbol} Battle</span>
        <span style="margin-left: auto; font-family: monospace; font-weight: 600;">${mins}:${secs.toString().padStart(2, '0')}</span>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 0.85rem; color: var(--color-text-muted);">
        <span>Start: ${formatCurrency(battle.startPrice)}</span>
        <span style="color: ${isUp ? '#09C285' : '#EF4444'}; font-weight: 600;">
          Now: ${formatCurrency(currentPrice)} (${isUp ? '+' : ''}${priceChange.toFixed(2)}%)
        </span>
      </div>
      <div style="margin-top: var(--spacing-sm); padding-top: var(--spacing-sm); border-top: 1px solid var(--glass-border); display: flex; justify-content: space-between; font-size: 0.8rem;">
        <span style="color: ${battle.player1.direction === 'up' ? '#09C285' : '#EF4444'};">${battle.player1.user}: ${battle.player1.direction.toUpperCase()}</span>
        <span style="color: ${battle.player2.direction === 'up' ? '#09C285' : '#EF4444'};">${battle.player2.user}: ${battle.player2.direction.toUpperCase()}</span>
      </div>
    `;

    setTimeout(updateTracker, 1000);
  };

  updateTracker();
}

async function resolveBattle(battle, tracker) {
  // Get final price
  let finalPrice = battle.startPrice;
  try {
    const tickers = await fetchMultipleTickers([battle.symbol]);
    finalPrice = tickers[0]?.price || battle.startPrice;
  } catch (e) { }

  const priceChange = ((finalPrice - battle.startPrice) / battle.startPrice * 100);
  const priceWentUp = priceChange > 0;
  const priceWentDown = priceChange < 0;

  let winner = null;
  let loser = null;

  if (priceChange === 0) {
    // Tie - no winner
  } else {
    // Determine winner based on direction
    const player1Wins = (battle.player1.direction === 'up' && priceWentUp) ||
      (battle.player1.direction === 'down' && priceWentDown);

    if (player1Wins) {
      winner = battle.player1;
      loser = battle.player2;
    } else {
      winner = battle.player2;
      loser = battle.player1;
    }
  }

  const prizePool = battle.player1.amount + battle.player2.amount;

  tracker.innerHTML = `
    <div style="text-align: center; padding: var(--spacing-sm);">
      <div style="font-size: 2rem; margin-bottom: var(--spacing-xs);">${winner ? '🏆' : '🤝'}</div>
      <div style="font-weight: 700; font-size: 1.1rem; color: ${winner ? 'var(--color-primary)' : 'var(--color-text-primary)'};">
        ${winner ? `${winner.user} WINS!` : "IT'S A TIE!"}
      </div>
      <div style="font-size: 0.85rem; color: var(--color-text-muted); margin: var(--spacing-xs) 0;">
        ${battle.symbol}: ${formatCurrency(battle.startPrice)} → ${formatCurrency(finalPrice)}
        <span style="color: ${priceChange >= 0 ? '#09C285' : '#EF4444'};">(${priceChange >= 0 ? '+' : ''}${priceChange.toFixed(2)}%)</span>
      </div>
      ${winner ? `
        <div style="font-weight: 600; color: var(--color-primary);">
          Prize: $${prizePool}
        </div>
      ` : ''}
      <button onclick="this.parentElement.parentElement.remove()" style="
        margin-top: var(--spacing-sm);
        padding: var(--spacing-xs) var(--spacing-md);
        background: var(--color-primary);
        color: white;
        border: none;
        border-radius: var(--radius-sm);
        cursor: pointer;
        font-weight: 600;
      ">Close</button>
    </div>
  `;

  // Remove from active battles
  activeBattles = activeBattles.filter(b => b.id !== battle.id);
}

function getTimeAgo(timestamp) {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
}
