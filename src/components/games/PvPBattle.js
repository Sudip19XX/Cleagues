// PvP Battle Game Component
// 1v1 betting where users predict token direction (UP/DOWN)
// Matchmaking: Platform finds opponents with opposite predictions

// ==========================================
// 🧪 TEST MODE ENABLED
// ==========================================
// For production testing - no real USDC required
// Bets are simulated, winners get mock rewards
// ==========================================
const TEST_MODE = false; // Test mode disabled

import { formatCurrency, formatPercentage, getPriceChangeClass } from '../../utils/formatters.js';
import {
  fetchMultipleTickers,
  subscribeToTickerUpdates,
} from '../../services/candleService.js';
import { supabase } from '../../services/supabaseClient.js';
import walletManager from '../../wallet/walletManager.js';

// Allowed tokens for PvP
const PVP_TOKENS = ['BTC', 'ETH', 'SOL', 'BNB', 'XRP', 'DOGE', 'ADA', 'AVAX', 'LINK', 'POL', 'DOT', 'PEPE'];

const BATTLE_DURATIONS = [
  { label: '5m', value: 5 },
  { label: '15m', value: 15 },
  { label: '30m', value: 30 },
  { label: '1h', value: 60 },
  { label: '4h', value: 240 },
  { label: '1D', value: 1440 },
];

const EXPIRY_TIMES = [
  { label: '10m', value: 10 },
  { label: '30m', value: 30 },
  { label: '1h', value: 60 },
  { label: '4h', value: 240 },
];

// Token metadata (names and images)
const TOKEN_META = {
  BTC: { name: 'Bitcoin', image: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png' },
  ETH: { name: 'Ethereum', image: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png' },
  SOL: { name: 'Solana', image: 'https://assets.coingecko.com/coins/images/4128/small/solana.png' },
  BNB: { name: 'BNB', image: 'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png' },
  XRP: { name: 'XRP', image: 'https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png' },
  DOGE: { name: 'Dogecoin', image: 'https://assets.coingecko.com/coins/images/5/small/dogecoin.png' },
  ADA: { name: 'Cardano', image: 'https://assets.coingecko.com/coins/images/975/small/cardano.png' },
  AVAX: { name: 'Avalanche', image: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png' },
  LINK: { name: 'Chainlink', image: 'https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png' },
  POL: { name: 'Polygon', image: 'https://assets.coingecko.com/coins/images/4713/small/polygon.png' },
  DOT: { name: 'Polkadot', image: 'https://assets.coingecko.com/coins/images/12171/small/polkadot.png' },
  PEPE: { name: 'Pepe', image: 'https://assets.coingecko.com/coins/images/29850/small/pepe-token.jpeg' },
};

// Max bet amount
const MAX_BET_AMOUNT = 10;

// Duration for PvP battles (in minutes)
const PVP_DURATION_MINUTES = 5;

// Store for open bets (simulating backend)
let openBets = [];
let myBets = [];
let activeBattles = [];
let tickerSubscriptions = [];
let currentSort = 'recent';

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
      Predict <span style="color: #09C285; font-weight: 600;">UP</span> or <span style="color: #EF4444; font-weight: 600;">DOWN</span>. Find an opponent. <strong>Winner takes all!</strong>
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
  mainContent.appendChild(header);

  // Grid Styles
  const gridStyles = document.createElement('style');
  gridStyles.textContent = `
    #pvp-token-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      margin-bottom: var(--spacing-xl);
      max-width: 900px;
      margin-left: auto;
      margin-right: auto;
    }
    @media (max-width: 800px) {
      #pvp-token-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    @media (max-width: 600px) {
      #pvp-token-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  `;
  mainContent.appendChild(gridStyles);

  // Token Grid container
  const tokenGrid = document.createElement('div');
  tokenGrid.id = 'pvp-token-grid';
  mainContent.appendChild(tokenGrid);

  // Backdrop for expanded card
  const backdrop = document.createElement('div');
  backdrop.id = 'pvp-backdrop';
  backdrop.style.cssText = `
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    z-index: 999;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s;
  `;
  backdrop.addEventListener('click', () => {
    document.querySelectorAll('.pvp-token-card.expanded').forEach(card => collapseCard(card));
  });
  page.appendChild(backdrop);

  // Betting Modal (Dedicated overlay)
  const bettingModal = document.createElement('div');
  bettingModal.id = 'pvp-betting-modal';
  bettingModal.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.9);
    width: 90%;
    max-width: 360px;
    background: rgba(15, 23, 42, 0.95);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 24px;
    z-index: 1000;
    opacity: 0;
    pointer-events: none;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 20px 50px rgba(0,0,0,0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  `;
  page.appendChild(bettingModal);

  // Close modal on backdrop click
  backdrop.addEventListener('click', () => {
    closeBettingModal();
  });

  page.appendChild(mainContent);

  // Open Bets Panel (right side - RADAR STYLE)
  const openBetsPanel = document.createElement('div');
  openBetsPanel.id = 'open-bets-panel';
  openBetsPanel.style.cssText = `
    width: 380px;
    height: calc(100vh - 64px);
    background: linear-gradient(180deg, rgba(5, 15, 25, 0.98) 0%, rgba(10, 20, 30, 0.95) 100%);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-left: 1px solid rgba(9, 194, 133, 0.3);
    padding: var(--spacing-lg);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  `;

  openBetsPanel.innerHTML = `
    <style>
      @keyframes radar-sweep {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes blip-pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.2); opacity: 0.8; }
      }
      @keyframes blip-appear {
        from { transform: scale(0); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }
      .radar-panel-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: var(--spacing-sm);
        margin-bottom: var(--spacing-sm);
        border-bottom: 1px solid rgba(9, 194, 133, 0.2);
      }
      .radar-panel-title h3 {
        font-size: 0.9rem;
        font-weight: 700;
        color: #09C285;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin: 0;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .radar-container {
        position: relative;
        width: 150px;
        height: 150px;
        margin: 0 auto var(--spacing-sm);
      }
      .radar-bg {
        position: absolute;
        inset: 0;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(9, 194, 133, 0.05) 0%, rgba(9, 194, 133, 0.02) 50%, transparent 70%);
        border: 1px solid rgba(9, 194, 133, 0.3);
      }
      .radar-grid {
        position: absolute;
        inset: 0;
        border-radius: 50%;
      }
      .radar-ring {
        position: absolute;
        border: 1px solid rgba(9, 194, 133, 0.12);
        border-radius: 50%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      .radar-line {
        position: absolute;
        width: 1px;
        height: 100%;
        left: 50%;
        top: 0;
        background: rgba(9, 194, 133, 0.08);
      }
      .radar-sweep {
        position: absolute;
        inset: 0;
        border-radius: 50%;
        background: conic-gradient(from 0deg, transparent 0deg, rgba(9, 194, 133, 0.35) 25deg, transparent 50deg);
        animation: radar-sweep 3s linear infinite;
      }
      .radar-center {
        position: absolute;
        width: 6px;
        height: 6px;
        background: #09C285;
        border-radius: 50%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        box-shadow: 0 0 15px rgba(9, 194, 133, 0.8);
      }
      .radar-blip {
        position: absolute;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: blip-pulse 2s ease-in-out infinite, blip-appear 0.3s ease-out;
        cursor: pointer;
        transition: all 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 6px;
        font-weight: bold;
        color: white;
      }
      .radar-blip:hover {
        transform: translate(-50%, -50%) scale(1.4);
        z-index: 10;
      }
      .radar-blip.long {
        background: rgba(9, 194, 133, 0.9);
        box-shadow: 0 0 8px rgba(9, 194, 133, 0.6);
      }
      .radar-blip.short {
        background: rgba(239, 68, 68, 0.9);
        box-shadow: 0 0 8px rgba(239, 68, 68, 0.6);
      }
      .radar-legend {
        display: flex;
        justify-content: center;
        gap: var(--spacing-md);
        font-size: 0.65rem;
        margin-bottom: var(--spacing-sm);
        color: var(--color-text-muted);
      }
      .legend-item {
        display: flex;
        align-items: center;
        gap: 4px;
      }
      .legend-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
      }
      .legend-dot.long { background: #09C285; }
      .legend-dot.short { background: #EF4444; }
      .signals-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 6px 10px;
        background: rgba(9, 194, 133, 0.08);
        border-radius: 6px;
        border: 1px solid rgba(9, 194, 133, 0.15);
        margin-bottom: var(--spacing-xs);
      }
      .signals-header span {
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--color-text-secondary);
      }
      #open-bets-list {
        flex: 1;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 6px;
        padding-right: 4px;
      }
      #open-bets-list::-webkit-scrollbar {
        width: 4px;
      }
      #open-bets-list::-webkit-scrollbar-track {
        background: rgba(255,255,255,0.05);
        border-radius: 2px;
      }
      #open-bets-list::-webkit-scrollbar-thumb {
        background: rgba(9, 194, 133, 0.3);
        border-radius: 2px;
      }
      #open-bets-list::-webkit-scrollbar-thumb:hover {
        background: rgba(9, 194, 133, 0.5);
      }
    </style>
    
    <div class="radar-panel-title">
      <h3>🛰️ Live Bet Radar</h3>
      <span id="open-bets-count" style="background: linear-gradient(135deg, #09C285 0%, #07a371 100%); color: white; border-radius: 50%; width: 22px; height: 22px; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 700;">0</span>
    </div>
    
    <div class="radar-container">
      <div class="radar-bg"></div>
      <div class="radar-grid">
        <div class="radar-ring" style="width: 33%; height: 33%;"></div>
        <div class="radar-ring" style="width: 66%; height: 66%;"></div>
        <div class="radar-ring" style="width: 100%; height: 100%;"></div>
        <div class="radar-line" style="transform: translateX(-50%) rotate(0deg);"></div>
        <div class="radar-line" style="transform: translateX(-50%) rotate(45deg);"></div>
        <div class="radar-line" style="transform: translateX(-50%) rotate(90deg);"></div>
        <div class="radar-line" style="transform: translateX(-50%) rotate(135deg);"></div>
      </div>
      <div class="radar-sweep"></div>
      <div class="radar-center"></div>
      <div id="radar-blips"></div>
    </div>
    
    <div class="radar-legend">
      <div class="legend-item">
        <div class="legend-dot long"></div>
        <span>UP</span>
      </div>
      <div class="legend-item">
        <div class="legend-dot short"></div>
        <span>DOWN</span>
      </div>
    </div>
    
    <div class="signals-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.05);">
      <span style="font-weight: 700; color: var(--color-text-primary);">Active Signals</span>
      <select id="bets-sort-select" style="
        background: rgba(0,0,0,0.3);
        border: 1px solid rgba(255,255,255,0.1);
        color: var(--color-text-secondary);
        font-size: 0.75rem;
        border-radius: 6px;
        padding: 4px 8px;
        outline: none;
        cursor: pointer;
      ">
        <option value="recent">Recent</option>
        <option value="long">Up Only</option>
        <option value="short">Down Only</option>
      </select>
    </div>
    
    <div id="open-bets-list" style="
        flex: 1; 
        overflow-y: auto; 
        padding-right: 4px; 
        display: flex; 
        flex-direction: column; 
        gap: 8px;
        min-height: 0;
    "></div>

    <div id="my-bets-footer" style="
      margin-top: auto;
      padding-top: var(--spacing-md);
      border-top: 1px solid rgba(9, 194, 133, 0.2);
    ">
      <div style="font-size: 0.75rem; font-weight: 700; color: var(--color-text-secondary); margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
        <span style="width: 6px; height: 6px; background: #3B82F6; border-radius: 50%;"></span>
        YOUR ACTIVE BETS
      </div>
      <div id="my-bets-list" style="display: flex; flex-direction: column; gap: 6px; max-height: 150px; overflow-y: auto;"></div>
    </div>
  `;

  page.appendChild(openBetsPanel);

  // Add Accept Match Modal
  const acceptModal = document.createElement('div');
  acceptModal.id = 'accept-match-modal';
  acceptModal.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.9);
    width: 90%;
    max-width: 380px;
    background: rgba(15, 23, 42, 0.95);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 24px;
    z-index: 1001;
    opacity: 0;
    pointer-events: none;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 20px 50px rgba(0,0,0,0.5);
    display: flex;
    flex-direction: column;
    gap: 16px;
  `;
  page.appendChild(acceptModal);

  // Add Cancel Match Modal
  const cancelModal = document.createElement('div');
  cancelModal.id = 'cancel-match-modal';
  cancelModal.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.9);
    width: 90%;
    max-width: 340px;
    background: rgba(15, 23, 42, 0.95);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(239, 68, 68, 0.3);
    border-radius: 20px;
    padding: 24px;
    z-index: 1002;
    opacity: 0;
    pointer-events: none;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 20px 50px rgba(0,0,0,0.5);
    display: flex;
    flex-direction: column;
    gap: 16px;
    text-align: center;
  `;
  page.appendChild(cancelModal);

  // Add Sort Listener
  const sortSelect = openBetsPanel.querySelector('#bets-sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderOpenBets();
    });
  }

  // Load tokens
  loadPvPTokens(tokenGrid);

  // Start expiry check
  const expiryInterval = setInterval(checkExpiredBets, 10000);
  tickerSubscriptions.push(() => clearInterval(expiryInterval));

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

      // Subscribe to PvP bets
      const betsChannel = supabase.channel('pvp-bets-channel')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'pvp_bets' },
          (payload) => {
            console.log('PvP Bet Change:', payload);
            loadOpenBets(); // Reload on any change for now (simple)
            // Also check if any of MY bets changed (e.g. matched)
            const state = walletManager.getState();
            if (state.address) {
              loadMyBets();
            }
          }
        )
        .subscribe();

      tickerSubscriptions.push(() => supabase.removeChannel(betsChannel));

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
    padding: var(--spacing-md);
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: var(--spacing-xs);
    position: relative;
    overflow: hidden;
    height: 100%;
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
    card.style.borderColor = 'rgba(9, 194, 133, 0.5)';
    card.style.transform = 'translateY(-4px)';
    card.style.boxShadow = '0 12px 40px rgba(9, 194, 133, 0.15)';
    card.querySelector('.card-glow').style.opacity = '1';
  });
  card.addEventListener('mouseleave', () => {
    card.style.borderColor = 'rgba(255, 255, 255, 0.08)';
    card.style.transform = 'none';
    card.style.boxShadow = 'none';
    card.querySelector('.card-glow').style.opacity = '0';
  });

  // Click to open modal
  card.addEventListener('click', () => {
    openBettingModal(token);
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



async function submitBet(battleDuration = 5, expiryMinutes = 30) {
  const state = walletManager.getState();
  if (!state.connected) {
    alert('Please connect your wallet first!');
    return;
  }

  if (!selectedToken || !selectedDirection || betAmount <= 0) {
    return;
  }

  const submitBtn = document.getElementById('modal-submit-btn');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<div class="loading"></div> Submitting...';
  }

  try {
    const userAddress = state.address;
    const opponentDirection = selectedDirection === 'up' ? 'down' : 'up';

    // 1. Check for existing match
    const { data: potentialMatches, error: matchError } = await supabase
      .from('pvp_bets')
      .select('*')
      .eq('status', 'open')
      .eq('symbol', selectedToken.symbol)
      .eq('amount', betAmount)
      .eq('duration', battleDuration)
      .eq('direction', opponentDirection)
      .neq('user_address', userAddress) // Can't play against self
      .order('created_at', { ascending: true }) // Match oldest first
      .limit(1);

    if (matchError) throw matchError;

    if (potentialMatches && potentialMatches.length > 0) {
      // MATCH FOUND!
      const match = potentialMatches[0];

      // Optimistic UI Update
      console.log('Match found!', match);

      // Update the existing bet to matched
      const { error: updateError } = await supabase
        .from('pvp_bets')
        .update({
          status: 'matched',
          opponent_address: userAddress,
          start_price: selectedToken.price, // Use current price as start price
          expires_at: null // Clear expiry or update it
        })
        .eq('id', match.id);

      if (updateError) throw updateError;

      alert(`⚔️ Match Found! Battle started against ${match.user_address.slice(0, 6)}...`);
    } else {
      // CREATE NEW OPEN BET
      const { error: insertError } = await supabase
        .from('pvp_bets')
        .insert({
          user_address: userAddress,
          symbol: selectedToken.symbol,
          direction: selectedDirection,
          amount: betAmount,
          duration: battleDuration,
          status: 'open',
          start_price: selectedToken.price, // Reference
          expires_at: new Date(Date.now() + (expiryMinutes * 60 * 1000)).toISOString()
        });

      if (insertError) throw insertError;

      alert('✅ Bet Placed! Waiting for opponent...');
    }

    // Close modal
    closeBettingModal();

    // Reload
    loadOpenBets();
    loadMyBets();

  } catch (error) {
    console.error('Bet submission error:', error);
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Place Bet';
    }
    alert(`❌ Error: ${error.message}`);
  }
}

async function loadOpenBets() {
  try {
    const { data, error } = await supabase
      .from('pvp_bets')
      .select('*')
      .eq('status', 'open')
      .order('created_at', { ascending: false });

    if (error) throw error;

    if (data) {
      openBets = data.map(b => ({
        ...b,
        user: b.user_address,
        expiryTime: b.expires_at ? new Date(b.expires_at).getTime() : null,
        timestamp: new Date(b.created_at).getTime()
      }));
      renderOpenBets();
    }
  } catch (err) {
    console.error('Error loading open bets:', err);
  }
}

async function loadMyBets() {
  const state = walletManager.getState();
  if (!state.address) return;

  try {
    const { data, error } = await supabase
      .from('pvp_bets')
      .select('*')
      .eq('user_address', state.address)
      .neq('status', 'cancelled')
      .order('created_at', { ascending: false });

    if (error) throw error;

    if (data) {
      myBets = data.map(b => ({
        ...b,
        user: b.user_address,
        expiryTime: new Date(b.expires_at).getTime(),
        timestamp: new Date(b.created_at).getTime()
      }));
    }
  } catch (err) {
    console.error('Error loading my bets:', err);
  }
}

function cancelBet(betId) {
  // Remove from openBets
  openBets = openBets.filter(b => b.id !== betId);

  // Remove from myBets
  myBets = myBets.filter(b => b.id !== betId);

  // Re-render
  renderOpenBets();
}

function renderOpenBets() {
  const listEl = document.getElementById('open-bets-list');
  const countEl = document.getElementById('open-bets-count');
  const radarBlips = document.getElementById('radar-blips');

  if (!listEl) return;

  let visibleBets = openBets.filter(b => b.status === 'open');

  // Apply Sorting/Filtering
  if (currentSort === 'long') {
    visibleBets = visibleBets.filter(b => b.direction === 'up');
  } else if (currentSort === 'short') {
    visibleBets = visibleBets.filter(b => b.direction === 'down');
  }

  // Always sort by recent (timestamp desc)
  visibleBets.sort((a, b) => b.timestamp - a.timestamp);

  if (countEl) {
    countEl.textContent = visibleBets.length;
  }

  // Render radar blips
  if (radarBlips) {
    // Get current user for comparison
    const state = walletManager.getState();
    const currentUserAddress = state.connected ? state.address.slice(0, 6) + '...' + state.address.slice(-4) : null;

    if (visibleBets.length === 0) {
      radarBlips.innerHTML = '';
    } else {
      radarBlips.innerHTML = visibleBets.map((bet, index) => {
        const isUp = bet.direction === 'up';
        const isOwnBet = currentUserAddress && bet.user === currentUserAddress;
        // Generate pseudo-random positions based on bet id for consistency
        // Radar is now 150px, so center is at 75px
        const angle = (parseInt(bet.id) * 137.5 + index * 45) % 360;
        const distance = 20 + ((parseInt(bet.id) * 17) % 40); // 20-60px from center
        const x = 75 + distance * Math.cos(angle * Math.PI / 180);
        const y = 75 + distance * Math.sin(angle * Math.PI / 180);

        return `
          <div class="radar-blip ${isOwnBet ? 'own' : (isUp ? 'long' : 'short')}" 
               style="left: ${x}px; top: ${y}px; animation-delay: ${index * 0.15}s; ${isOwnBet ? 'width: 14px; height: 14px; background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%); box-shadow: 0 0 10px rgba(59, 130, 246, 0.8); border: 2px solid white;' : ''}"
               data-bet-id="${bet.id}"
               title="${isOwnBet ? 'YOUR BET: ' : ''}${bet.symbol} ${isUp ? 'LONG' : 'SHORT'} $${bet.amount}">
            ${isOwnBet ? '<span style="font-size: 5px;">YOU</span>' : ''}
          </div>
        `;
      }).join('');

      // Add click handlers to blips
      radarBlips.querySelectorAll('.radar-blip').forEach(blip => {
        blip.addEventListener('click', () => {
          const betId = blip.dataset.betId;
          const card = listEl.querySelector(`[data-bet-id="${betId}"]`);
          if (card) {
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            card.style.borderColor = '#09C285';
            card.style.boxShadow = '0 0 20px rgba(9, 194, 133, 0.3)';
            setTimeout(() => {
              card.style.borderColor = 'var(--glass-border)';
              card.style.boxShadow = 'none';
            }, 2000);
          }
        });
      });
    }
  }

  if (visibleBets.length === 0) {
    listEl.innerHTML = `
      <div style="text-align: center; padding: var(--spacing-xl); color: var(--color-text-muted);">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: var(--spacing-sm); opacity: 0.5;">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M8 12h8M12 8v8"></path>
        </svg>
        <div>No signals detected</div>
        <div style="font-size: 0.85rem; margin-top: var(--spacing-xs);">Be the first to broadcast a bet!</div>
      </div>
    `;
    return;
  }

  // Get current user address for comparison
  const state = walletManager.getState();
  const currentUserAddress = state.connected ? state.address.slice(0, 6) + '...' + state.address.slice(-4) : null;

  // Separate bets
  const othersBets = visibleBets.filter(b => !currentUserAddress || b.user !== currentUserAddress);
  const myActiveBets = visibleBets.filter(b => currentUserAddress && b.user === currentUserAddress);

  // Render Others' Bets (Active Signals)
  if (othersBets.length === 0) {
    listEl.innerHTML = `
      <div style="text-align: center; padding: var(--spacing-xl); color: var(--color-text-muted);">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: var(--spacing-sm); opacity: 0.5;">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M8 12h8M12 8v8"></path>
        </svg>
        <div>No signals active</div>
        <div style="font-size: 0.85rem; margin-top: var(--spacing-xs);">Be the first to broadcast a bet!</div>
      </div>
    `;
  } else {
    listEl.innerHTML = othersBets.map(bet => {
      const timeAgo = getTimeAgo(bet.timestamp);
      const isUp = bet.direction === 'up';
      const dirColor = isUp ? '#09C285' : '#EF4444';
      const dirIcon = isUp ? '↑' : '↓';
      const dirLabel = isUp ? 'UP' : 'DOWN';

      return `
        <div class="open-bet-card" data-bet-id="${bet.id}" style="
          background: rgba(9, 194, 133, 0.05);
          border: 1px solid rgba(9, 194, 133, 0.15);
          border-radius: var(--radius-md);
          padding: var(--spacing-sm);
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
        ">
          <div style="display: flex; align-items: center; gap: var(--spacing-sm);">
            <img src="${bet.image}" alt="${bet.symbol}" style="width: 24px; height: 24px; border-radius: 50%;" onerror="this.style.display='none'" />
            <div style="flex: 1;">
              <div style="font-weight: 600; font-size: 0.85rem;">${bet.symbol}</div>
              <div style="font-size: 0.7rem; color: var(--color-text-muted);">${bet.user}</div>
            </div>
            <div style="text-align: right;">
              <div style="font-weight: 700; font-size: 0.8rem; color: ${dirColor};">${dirIcon} ${dirLabel}</div>
              <div style="font-size: 0.75rem; font-weight: 600;">$${bet.amount}</div>
            </div>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: var(--spacing-xs); padding-top: var(--spacing-xs); border-top: 1px solid rgba(255,255,255,0.05);">
            <span style="font-size: 0.7rem; color: var(--color-text-muted);">${timeAgo}</span>
            <button class="accept-bet-btn" data-bet-id="${bet.id}" style="
              padding: 3px 10px;
              font-size: 0.7rem;
              background: ${isUp ? 'rgba(239, 68, 68, 0.2)' : 'rgba(9, 194, 133, 0.2)'};
              color: ${isUp ? '#EF4444' : '#09C285'};
              border: 1px solid ${isUp ? 'rgba(239, 68, 68, 0.3)' : 'rgba(9, 194, 133, 0.3)'};
              border-radius: var(--radius-sm);
              cursor: pointer;
              font-weight: 600;
              transition: all 0.2s;
            ">CHALLENGE</button>
          </div>
        </div>
      `;
    }).join('');
  }

  // Render My Bets (Footer)
  const myBetsListEl = document.getElementById('my-bets-list');
  if (myBetsListEl) {
    if (myActiveBets.length === 0) {
      myBetsListEl.innerHTML = `
        <div style="font-size: 0.8rem; color: var(--color-text-muted); text-align: center; padding: 16px; border: 1px dashed rgba(255,255,255,0.15); border-radius: 8px;">
          You have no active bets.
        </div>
      `;
    } else {
      myBetsListEl.innerHTML = myActiveBets.map(bet => {
        const isUp = bet.direction === 'up';
        const dirColor = isUp ? '#09C285' : '#EF4444';
        const dirIcon = isUp ? '↑' : '↓';
        const dirLabel = isUp ? 'UP' : 'DOWN';

        return `
          <div class="my-bet-card" style="
            background: rgba(59, 130, 246, 0.1);
            border: 1px solid rgba(59, 130, 246, 0.3);
            border-radius: var(--radius-md);
            padding: 8px;
            display: flex;
            align-items: center;
            gap: 10px;
          ">
            <img src="${bet.image}" alt="${bet.symbol}" style="width: 20px; height: 20px; border-radius: 50%;" onerror="this.style.display='none'" />
            <div style="flex: 1;">
              <div style="font-weight: 600; font-size: 0.8rem;">${bet.symbol}</div>
              <div style="font-size: 0.7rem; font-weight: 700; color: ${dirColor};">${dirIcon} ${dirLabel} <span style="color: var(--color-text-primary); margin-left: 4px;">$${bet.amount}</span></div>
            </div>
            <button class="cancel-bet-btn" data-bet-id="${bet.id}" style="
              padding: 4px 8px;
              font-size: 0.65rem;
              background: rgba(239, 68, 68, 0.2);
              color: #EF4444;
              border: 1px solid rgba(239, 68, 68, 0.3);
              border-radius: 4px;
              font-weight: 600;
              cursor: pointer;
              transition: all 0.2s;
            ">CANCEL</button>
          </div>
        `;
      }).join('');
    }

    // Attach listener for cancel buttons
    myBetsListEl.querySelectorAll('.cancel-bet-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openCancelMatchModal(btn.dataset.betId);
      });
    });
  }

  // Add hover effects
  listEl.querySelectorAll('.open-bet-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.borderColor = 'rgba(9, 194, 133, 0.4)';
      card.style.background = 'rgba(9, 194, 133, 0.1)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.borderColor = 'rgba(9, 194, 133, 0.15)';
      card.style.background = 'rgba(9, 194, 133, 0.05)';
    });
  });

  // Accept bet buttons (only for non-own bets)
  listEl.querySelectorAll('.accept-bet-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openAcceptMatchModal(btn.dataset.betId);
    });
    btn.addEventListener('mouseenter', () => {
      btn.style.transform = 'scale(1.05)';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'scale(1)';
    });
  });
}

async function openAcceptMatchModal(betId) {
  const bet = openBets.find(b => b.id === betId);
  if (!bet) return;

  const modal = document.getElementById('accept-match-modal');
  const backdrop = document.getElementById('pvp-backdrop');
  if (!modal || !backdrop) return;

  const isOpponentLong = bet.direction === 'up';
  const myDirection = isOpponentLong ? 'DOWN' : 'UP';
  const myDirColor = isOpponentLong ? '#EF4444' : '#09C285';
  const oppDirColor = isOpponentLong ? '#09C285' : '#EF4444';

  let balance = '0.00';
  let currency = 'USDC';
  try {
    balance = await walletManager.getUSDCBalance();
  } catch (e) {
    console.error('Failed to load balance', e);
  }

  modal.innerHTML = `
    <button type="button" class="close-accept-modal" style="position: absolute; top: 16px; right: 16px; width: 32px; height: 32px; border-radius: 50%; border: none; background: rgba(255,255,255,0.1); color: var(--color-text-muted); cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 18px; transition: all 0.2s;">×</button>
    
    <div style="text-align: center; margin-bottom: 24px;">
      <h2 style="font-size: 1.5rem; margin: 0 0 8px 0; background: linear-gradient(135deg, #F0F0F0 0%, #A0A0A0 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">Accept Challenge</h2>
      <div style="color: var(--color-text-muted); font-size: 0.9rem; display: flex; align-items: center; justify-content: center; gap: 6px;">
        <span style="opacity: 0.7;">VS</span> 
        <span style="color: var(--color-text-primary); font-weight: 600;">${bet.user}</span>
      </div>
    </div>

    <!-- VS Card -->
    <div style="display: flex; align-items: center; justify-content: space-between; background: rgba(0, 0, 0, 0.2); border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; padding: 20px;">
      
      <!-- Opponent -->
      <div style="text-align: center; flex: 1;">
        <div style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; color: var(--color-text-muted); margin-bottom: 8px;">Opponent</div>
        <div style="font-weight: 800; color: ${oppDirColor}; font-size: 1.25rem; margin-bottom: 4px;">${bet.direction.toUpperCase()}</div>
        <div style="font-size: 0.9rem; font-family: 'Space Grotesk', sans-serif; opacity: 0.9;">$${bet.amount}</div>
      </div>

      <!-- Divider -->
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 0 12px;">
         <div style="width: 1px; height: 40px; background: rgba(255,255,255,0.1);"></div>
         <div style="background: rgba(255,255,255,0.1); color: var(--color-text-muted); font-size: 0.7rem; font-weight: 700; padding: 4px 8px; border-radius: 12px; margin: -20px 0;">VS</div>
      </div>

      <!-- You -->
      <div style="text-align: center; flex: 1;">
        <div style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; color: var(--color-text-muted); margin-bottom: 8px;">You</div>
        <div style="font-weight: 800; color: ${myDirColor}; font-size: 1.25rem; margin-bottom: 4px;">${myDirection}</div>
        <div style="font-size: 0.9rem; font-family: 'Space Grotesk', sans-serif; opacity: 0.9;" id="match-your-amount">$${bet.amount}</div>
      </div>
    </div>

    <!-- Amount Input & Slider -->
    <div style="margin-top: 24px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <label style="font-size: 0.85rem; color: var(--color-text-muted); font-weight: 500;">Match Amount</label>
        <div style="font-size: 0.8rem; color: var(--color-text-secondary);">
          Balance: <span style="color: var(--color-primary); font-family: monospace;">${balance} ${currency}</span>
        </div>
      </div>

      <div style="display: flex; align-items: center; gap: 12px;">
        <!-- Small Input -->
        <div style="position: relative; width: 140px;">
            <span style="position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: var(--color-text-secondary); font-weight: 600;">$</span>
            <input type="number" id="match-amount-input" value="${bet.amount}" min="${bet.amount}" step="1" style="
            width: 100%;
            background: rgba(15, 23, 42, 0.6);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 12px;
            padding: 12px 12px 12px 32px;
            color: white;
            font-family: 'Space Grotesk', sans-serif;
            font-size: 1.1rem;
            font-weight: 600;
            outline: none;
            transition: all 0.2s;
            -moz-appearance: textfield;
            appearance: textfield;
            ">
            <style>
                #match-amount-input::-webkit-outer-spin-button,
                #match-amount-input::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }
            </style>
        </div>

        <!-- Slider -->
        <div style="flex: 1; display: flex; align-items: center;">
            <input type="range" id="match-amount-slider" min="${bet.amount}" max="${Math.max(bet.amount * 5, 100)}" value="${bet.amount}" step="1" style="
                width: 100%;
                cursor: pointer;
                accent-color: #09C285;
                height: 6px;
                background: rgba(255,255,255,0.1);
                border-radius: 3px;
                outline: none;
            ">
        </div>
      </div>

      <p id="match-error" style="color: #EF4444; font-size: 0.8rem; margin: 8px 0 0 0; display: none; display: flex; align-items: center; gap: 4px;">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v4"></path><path d="M12 16h.01"></path></svg>
        Amount must be at least $${bet.amount}
      </p>
    </div>

    <!-- Confirm Button -->
    <button id="confirm-match-btn" style="
      width: 100%;
      padding: 18px;
      border: none;
      border-radius: 16px;
      background: linear-gradient(135deg, #09C285 0%, #07a371 100%);
      color: white;
      font-weight: 700;
      font-size: 1.1rem;
      cursor: pointer;
      margin-top: 24px;
      transition: all 0.2s;
      box-shadow: 0 4px 12px rgba(9, 194, 133, 0.3);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    "> Submit ($${bet.amount})</button>
  `;

  // Logic
  const input = modal.querySelector('#match-amount-input');
  const slider = modal.querySelector('#match-amount-slider');
  const confirmBtn = modal.querySelector('#confirm-match-btn');
  const errorMsg = modal.querySelector('#match-error');
  const yourAmountDisplay = modal.querySelector('#match-your-amount');

  const updateUI = (val) => {
    yourAmountDisplay.textContent = `$${val || 0}`;

    // Update button text
    if (!isNaN(val)) {
      confirmBtn.innerHTML = ` Submit ($${val})`;
    }

    if (isNaN(val) || val < bet.amount) {
      errorMsg.style.display = 'flex';
      confirmBtn.disabled = true;
      confirmBtn.style.opacity = '0.5';
      confirmBtn.style.cursor = 'not-allowed';
    } else {
      errorMsg.style.display = 'none';
      confirmBtn.disabled = false;
      confirmBtn.style.opacity = '1';
      confirmBtn.style.cursor = 'pointer';
    }
  };

  input.addEventListener('input', () => {
    const val = parseFloat(input.value);
    slider.value = isNaN(val) ? bet.amount : val;
    updateUI(val);
  });

  slider.addEventListener('input', () => {
    const val = parseFloat(slider.value);
    input.value = val;
    updateUI(val);
  });

  confirmBtn.addEventListener('click', () => {
    const val = parseFloat(input.value);
    if (!isNaN(val) && val >= bet.amount) {
      processAcceptBet(bet.id, val);
      closeAcceptMatchModal();
    }
  });

  modal.querySelector('.close-accept-modal').addEventListener('click', closeAcceptMatchModal);

  // Show
  modal.style.opacity = '1';
  modal.style.transform = 'translate(-50%, -50%) scale(1)';
  modal.style.pointerEvents = 'auto';
  backdrop.style.opacity = '1';
  backdrop.style.pointerEvents = 'auto';
}

function closeAcceptMatchModal() {
  const modal = document.getElementById('accept-match-modal');
  const backdrop = document.getElementById('pvp-backdrop');
  if (modal && backdrop) {
    modal.style.opacity = '0';
    modal.style.transform = 'translate(-50%, -50%) scale(0.9)';
    modal.style.pointerEvents = 'none';
    backdrop.style.opacity = '0';
    backdrop.style.pointerEvents = 'none';
  }
}

// Modal functions
function closeBettingModal() {
  const modal = document.getElementById('pvp-betting-modal');
  const backdrop = document.getElementById('pvp-backdrop');
  if (modal && backdrop) {
    modal.style.opacity = '0';
    modal.style.transform = 'translate(-50%, -50%) scale(0.9)';
    modal.style.pointerEvents = 'none';
    backdrop.style.opacity = '0';
    backdrop.style.pointerEvents = 'none';

    // Clear selection state after delay
    setTimeout(() => {
      selectedToken = null;
    }, 300);
  }
}

async function openBettingModal(token) {
  const modal = document.getElementById('pvp-betting-modal');
  const backdrop = document.getElementById('pvp-backdrop');

  if (!modal || !backdrop) return;

  selectedToken = token;
  let modalDirection = null;
  let modalAmount = 5;
  let modalDuration = 5;
  let modalExpiry = 30;
  let userBalance = 0;
  let isCustomInput = false; // Tracks if user is manually inputting/adding
  const changeClass = getPriceChangeClass(token.priceChange24h);

  // Fetch balance asynchronously
  walletManager.getUSDCBalance().then(b => {
    userBalance = parseFloat(b);
    // Update modal balance display
    const balanceEl = modal.querySelector('#modal-balance-display');
    if (balanceEl) {
      balanceEl.textContent = `Bal: $${b}`;
    }
    updateStyles();
  }).catch(e => console.error(e));

  modal.innerHTML = `
    <button type="button" class="modal-close-btn" style="position: absolute; top: 16px; right: 16px; width: 32px; height: 32px; border-radius: 50%; border: none; background: rgba(255,255,255,0.1); color: var(--color-text-muted); cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 18px; transition: all 0.2s;">×</button>
    
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
      <div style="display: flex; align-items: center; gap: 12px;">
        <img src="${token.image}" alt="${token.name}" style="width: 42px; height: 42px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.1);" onerror="this.style.display='none'" />
        <div style="text-align: left;">
          <div style="font-size: 1.25rem; font-weight: 700; line-height: 1.1;">${token.symbol}</div>
          <div style="font-size: 0.85rem; color: var(--color-text-muted);">${token.name}</div>
        </div>
      </div>
      
      <div style="text-align: right;">
        <div style="font-size: 1.1rem; font-weight: 600;">${formatCurrency(token.price)}</div>
        <div class="${changeClass}" style="font-size: 0.85rem; font-weight: 500;">${formatPercentage(token.priceChange24h)}</div>
      </div>
    </div>
    
    <div style="width: 100%;">
      <div style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 12px;">Battle Duration</div>
      <div style="display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px; margin-bottom: 16px;">
        ${BATTLE_DURATIONS.map(d => `
          <button type="button" class="duration-btn" data-val="${d.value}" style="flex: 0 0 auto; padding: 6px 12px; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; background: transparent; color: var(--color-text-secondary); font-size: 0.8rem; cursor: pointer; transition: all 0.2s;">${d.label}</button>
        `).join('')}
      </div>

      <div style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 12px;">Expiry Time (Cancel if no match)</div>
      <div style="display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px;">
        ${EXPIRY_TIMES.map(t => `
          <button type="button" class="expiry-btn" data-val="${t.value}" style="flex: 0 0 auto; padding: 6px 12px; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; background: transparent; color: var(--color-text-secondary); font-size: 0.8rem; cursor: pointer; transition: all 0.2s;">${t.label}</button>
        `).join('')}
      </div>
    </div>

    <div style="width: 100%; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px;">
      <div style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 12px;">Select Direction</div>
      <div style="display: flex; gap: 12px;">
        <button type="button" class="dir-btn up" data-dir="up" style="flex: 1; padding: 16px; border: 2px solid rgba(255,255,255,0.1); border-radius: 12px; background: rgba(255,255,255,0.03); cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 4px; color: var(--color-text-primary); transition: all 0.2s;">
          <span style="font-weight: 700; font-size: 1.2rem;">UP</span>
        </button>
        <button type="button" class="dir-btn down" data-dir="down" style="flex: 1; padding: 16px; border: 2px solid rgba(255,255,255,0.1); border-radius: 12px; background: rgba(255,255,255,0.03); cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 4px; color: var(--color-text-primary); transition: all 0.2s;">
          <span style="font-weight: 700; font-size: 1.2rem;">DOWN</span>
        </button>
      </div>
    </div>
    
    <div style="width: 100%;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
        <span style="font-size: 0.85rem; color: var(--color-text-muted);">Bet Amount (USDC)</span>
        <span id="modal-balance-display" style="font-size: 0.85rem; font-weight: 600; color: #FFD700;">🧪 Test Mode</span>
      </div>
      <style>
        /* Hide native spin buttons */
        #bet-amount-input::-webkit-outer-spin-button,
        #bet-amount-input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        #bet-amount-input {
          -moz-appearance: textfield;
        }
      </style>
      <div style="display: flex; gap: 8px;">
        <div style="flex: 1; position: relative; display: flex; align-items: center; border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; background: rgba(255,255,255,0.03);">
            <span style="padding-left: 16px; color: var(--color-text-secondary);">$</span>
            <input type="number" id="bet-amount-input" value="${modalAmount}" min="5" step="0.5" style="
                flex: 1;
                width: 100%;
                padding: 12px;
                border: none;
                background: transparent;
                color: white;
                font-family: inherit;
                font-weight: 600;
                outline: none;
            " placeholder="Amount">
            <div style="display: flex; flex-direction: column; border-left: 1px solid rgba(255,255,255,0.1); height: 100%;">
              <button type="button" class="step-btn inc" style="flex: 1; border: none; background: transparent; color: var(--color-text-secondary); padding: 0 10px; font-size: 10px; cursor: pointer; border-bottom: 1px solid rgba(255,255,255,0.1); border-top-right-radius: 10px; display: flex; align-items: center; justify-content: center;">▲</button>
              <button type="button" class="step-btn dec" style="flex: 1; border: none; background: transparent; color: var(--color-text-secondary); padding: 0 10px; font-size: 10px; cursor: pointer; border-bottom-right-radius: 10px; display: flex; align-items: center; justify-content: center;">▼</button>
            </div>
        </div>
        <button type="button" class="amount-btn active" data-amount="5" style="flex: 0 0 60px; padding: 12px; border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; background: transparent; color: var(--color-text-secondary); font-weight: 600; cursor: pointer; transition: all 0.2s;">$5</button>
        <button type="button" class="amount-btn" data-amount="10" style="flex: 0 0 60px; padding: 12px; border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; background: transparent; color: var(--color-text-secondary); font-weight: 600; cursor: pointer; transition: all 0.2s;">$10</button>
      </div>
    </div>
    
    <button type="button" id="modal-submit-btn" disabled style="width: 100%; padding: 16px; border: none; border-radius: 12px; background: linear-gradient(135deg, #09C285 0%, #07a371 100%); color: white; font-weight: 700; font-size: 1.1rem; cursor: pointer; margin-top: 8px; opacity: 0.5;">Select Direction</button>
  `;

  // Update styles for active buttons
  const updateStyles = () => {
    // Buttons Text
    const btn5 = modal.querySelector('.amount-btn[data-amount="5"]');
    const btn10 = modal.querySelector('.amount-btn[data-amount="10"]');
    if (btn5 && btn10) {
      if (isCustomInput) {
        btn5.textContent = '+5';
        btn10.textContent = '+10';
      } else {
        btn5.textContent = '$5';
        btn10.textContent = '$10';
      }
    }

    // Amounts
    modal.querySelectorAll('.amount-btn').forEach(btn => {
      // Highlight only if NOT custom and matches matches
      if (!isCustomInput && parseFloat(btn.dataset.amount) === modalAmount) {
        btn.style.borderColor = '#09C285';
        btn.style.backgroundColor = 'rgba(9, 194, 133, 0.15)';
        btn.style.color = 'white';
      } else {
        btn.style.borderColor = 'rgba(255,255,255,0.1)';
        btn.style.backgroundColor = 'transparent';
        btn.style.color = 'var(--color-text-secondary)';
      }
    });

    // Directions
    modal.querySelectorAll('.dir-btn').forEach(btn => {
      const dir = btn.dataset.dir;
      if (dir === modalDirection) {
        if (dir === 'up') {
          btn.style.borderColor = '#09C285';
          btn.style.backgroundColor = 'rgba(9, 194, 133, 0.2)';
          btn.style.color = '#09C285';
          btn.style.boxShadow = '0 0 20px rgba(9, 194, 133, 0.2)';
        } else {
          btn.style.borderColor = '#EF4444';
          btn.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
          btn.style.color = '#EF4444';
          btn.style.boxShadow = '0 0 20px rgba(239, 68, 68, 0.2)';
        }
      } else {
        btn.style.borderColor = 'rgba(255,255,255,0.1)';
        btn.style.backgroundColor = 'rgba(255,255,255,0.03)';
        btn.style.color = 'var(--color-text-primary)';
        btn.style.boxShadow = 'none';
      }
    });

    // Submit button
    const submitBtn = modal.querySelector('#modal-submit-btn');
    submitBtn.style.background = 'linear-gradient(135deg, #09C285 0%, #07a371 100%)'; // Reset gradient

    if (modalAmount < 5) {
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.5';
      submitBtn.style.cursor = 'not-allowed';
      submitBtn.textContent = 'Min Bet is $5';
      submitBtn.style.background = '#374151'; // Grey
    } else if (!TEST_MODE && modalAmount > userBalance) {
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.5';
      submitBtn.style.cursor = 'not-allowed';
      submitBtn.textContent = 'Insufficient Balance';
      submitBtn.style.background = '#EF4444'; // Red for error
    } else if (!modalDirection) {
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.5';
      submitBtn.style.cursor = 'not-allowed';
      submitBtn.textContent = 'Select Direction';
    } else {
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
      submitBtn.style.cursor = 'pointer';
      submitBtn.textContent = `Place ${modalDirection.toUpperCase()} Bet ($${modalAmount})`;
    }

    // Attachment logic for durations/expiry highlighting ... 
    // We must re-run this or keep it separate? 
    // This function runs on every update. It should update styles.
    // Durations styling logic is duplicated here from previous implementation?
    // I should ensure I include it.
    modal.querySelectorAll('.duration-btn').forEach(btn => {
      if (parseInt(btn.dataset.val) === modalDuration) {
        btn.style.borderColor = 'var(--color-primary)';
        btn.style.background = 'rgba(9, 194, 133, 0.15)';
        btn.style.color = 'white';
      } else {
        btn.style.borderColor = 'rgba(255,255,255,0.1)';
        btn.style.background = 'transparent';
        btn.style.color = 'var(--color-text-secondary)';
      }
    });

    // Expiry
    modal.querySelectorAll('.expiry-btn').forEach(btn => {
      if (parseInt(btn.dataset.val) === modalExpiry) {
        btn.style.borderColor = 'var(--color-primary)';
        btn.style.background = 'rgba(9, 194, 133, 0.15)';
        btn.style.color = 'white';
      } else {
        btn.style.borderColor = 'rgba(255,255,255,0.1)';
        btn.style.background = 'transparent';
        btn.style.color = 'var(--color-text-secondary)';
      }
    });
  };

  // Attach listeners
  modal.querySelector('.modal-close-btn').addEventListener('click', closeBettingModal);

  modal.querySelectorAll('.dir-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      modalDirection = btn.dataset.dir;
      updateStyles();
    });
  });

  modal.querySelectorAll('.amount-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const amt = parseFloat(btn.dataset.amount);
      if (isCustomInput) {
        modalAmount = parseFloat((modalAmount + amt).toFixed(2));
      } else {
        modalAmount = amt;
      }
      const input = modal.querySelector('#bet-amount-input');
      if (input) input.value = modalAmount;
      updateStyles();
    });
  });

  const amountInput = modal.querySelector('#bet-amount-input');
  if (amountInput) {
    amountInput.addEventListener('input', () => {
      modalAmount = parseFloat(amountInput.value) || 0;
      isCustomInput = true; // User typed manually
      updateStyles();
    });
    // Focus styling
    amountInput.addEventListener('focus', () => amountInput.parentElement.style.borderColor = 'var(--color-primary)');
    amountInput.addEventListener('blur', () => amountInput.parentElement.style.borderColor = 'rgba(255,255,255,0.1)');

    // Stepper
    modal.querySelectorAll('.step-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        let val = parseFloat(amountInput.value) || 0;
        if (btn.classList.contains('inc')) val += 1;
        else val -= 1;
        if (val < 0.1) val = 0.1; // Or min 5?
        // Stepper should probably respect min 5 if strict? 
        // But user might want to step up to 5.
        amountInput.value = parseFloat(val.toFixed(1));
        amountInput.dispatchEvent(new Event('input'));
      });
    });
  }

  modal.querySelectorAll('.duration-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      modalDuration = parseInt(btn.dataset.val);
      updateStyles();
    });
  });

  modal.querySelectorAll('.expiry-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      modalExpiry = parseInt(btn.dataset.val);
      updateStyles();
    });
  });

  modal.querySelector('#modal-submit-btn').addEventListener('click', async () => {
    if (!modalDirection || modalAmount < 5) return;
    selectedDirection = modalDirection;
    betAmount = modalAmount;
    await submitBet(modalDuration, modalExpiry);
    closeBettingModal();
  });

  // Initial render styles
  updateStyles();

  // Show modal
  modal.style.opacity = '1';
  modal.style.transform = 'translate(-50%, -50%) scale(1)';
  modal.style.pointerEvents = 'auto';
  backdrop.style.opacity = '1';
  backdrop.style.pointerEvents = 'auto';
}

async function processAcceptBet(betId, matchAmount) {
  const state = walletManager.getState();
  if (!state.connected) {
    alert('Please connect your wallet first!');
    return;
  }

  const bet = openBets.find(b => b.id === betId);
  if (!bet || bet.status !== 'open') return;

  // Get current price
  if (TEST_MODE) {
    console.log(`🧪 [TEST MODE] Simulating bet acceptance for $${matchAmount} USDC...`);
  } else {
    console.log(`[Production] Deducting $${matchAmount} USDC from acceptor...`);
  }
  try {
    const tickers = await fetchMultipleTickers([bet.symbol]);
    const currentPrice = tickers[0]?.price || bet.price || 0;

    // Call API to accept match
    const response = await fetch('/api/pvp/match', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        betId: betId,
        userAddress: state.address,
        startPrice: currentPrice
      })
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to accept match');
    }

    // Success! 
    const matchedBet = result.match;
    // Construct local battle object
    const myBet = {
      id: 'match-' + Date.now(),
      symbol: matchedBet.symbol,
      direction: matchedBet.direction === 'up' ? 'down' : 'up', // Oppposite
      amount: matchedBet.amount,
      user: state.address,
      status: 'matched',
    };

    const battle = {
      id: matchedBet.id, // Use same ID or new one? DB uses UUID, local uses strings. Let's use DB ID.
      player1: { ...matchedBet, status: 'matched' }, // The maker (from DB)
      player2: myBet, // Me
      startTime: Date.now(),
      endTime: Date.now() + (matchedBet.duration * 60 * 1000),
      symbol: matchedBet.symbol,
      startPrice: currentPrice,
    };

    activeBattles.push(battle);
    openBets = openBets.filter(b => b.id !== betId);

    showMatchNotification(battle);
    startBattleCountdown(battle);
    renderOpenBets();

    // Update volume
    fetch('/api/volume', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: matchedBet.amount })
    }).catch(err => console.error('Failed to report volume:', err));

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
          ${battle.player1.direction === 'up' ? '↑ UP' : '↓ DOWN'}
        </div>
      </div>
      <div style="font-size: 2rem; font-weight: 800; margin: var(--spacing-md) 0; display: flex; align-items: center; justify-content: center; gap: var(--spacing-xl);">
        <div style="color: ${battle.player1.direction === 'up' ? '#09C285' : '#EF4444'}">
          ${battle.player1.direction === 'up' ? '↑ UP' : '↓ DOWN'}
        </div>
        <div style="font-size: 1rem; opacity: 0.5;">VS</div>
        <div style="color: ${battle.player2.direction === 'up' ? '#09C285' : '#EF4444'}">
          ${battle.player2.direction === 'up' ? '↑ UP' : '↓ DOWN'}
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

  const prizePool = (battle.player1.amount + battle.player2.amount) * 0.97; // 3% Platform Fee

  if (winner) {
    // Report reward to backend (prize pool is the reward paid out)
    fetch('/api/rewards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: prizePool })
    }).catch(err => console.error('Failed to report reward:', err));
  }

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

function openCancelMatchModal(betId) {
  const bet = openBets.find(b => b.id === betId);
  if (!bet) return; // Should allow searching in myBets too if needed, but openBets contains them.

  const modal = document.getElementById('cancel-match-modal');
  const backdrop = document.getElementById('pvp-backdrop');
  if (!modal || !backdrop) return;

  modal.innerHTML = `
    <div style="margin-bottom: 8px;">
        <div style="width: 48px; height: 48px; background: rgba(239, 68, 68, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px auto;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"></path></svg>
        </div>
        <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 8px;">Cancel Prediction?</h3>
        <p style="color: var(--color-text-secondary); font-size: 0.9rem;">
            Do you want to cancel your prediction for <strong>${bet.symbol}</strong>?
        </p>
    </div>
    
    <div style="display: flex; gap: 12px; margin-top: 16px;">
        <button id="cancel-no-btn" style="
            flex: 1; padding: 14px; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px;
            background: rgba(255,255,255,0.05); color: white; font-weight: 600; cursor: pointer; transition: all 0.2s;
        ">No</button>
        <button id="cancel-yes-btn" style="
            flex: 1; padding: 14px; border: none; border-radius: 12px;
            background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%); color: white; font-weight: 600; cursor: pointer; transition: all 0.2s;
            box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
        ">Yes</button>
    </div>
  `;

  // Listeners
  modal.querySelector('#cancel-no-btn').onclick = closeCancelMatchModal;
  modal.querySelector('#cancel-yes-btn').onclick = () => {
    cancelBet(betId);
    closeCancelMatchModal();
  };

  // Show
  modal.style.opacity = '1';
  modal.style.transform = 'translate(-50%, -50%) scale(1)';
  modal.style.pointerEvents = 'auto';
  backdrop.style.opacity = '1';
  backdrop.style.pointerEvents = 'auto';
}

function closeCancelMatchModal() {
  const modal = document.getElementById('cancel-match-modal');
  const backdrop = document.getElementById('pvp-backdrop');
  if (modal && backdrop) {
    modal.style.opacity = '0';
    modal.style.transform = 'translate(-50%, -50%) scale(0.9)';
    modal.style.pointerEvents = 'none';
    backdrop.style.opacity = '0';
    backdrop.style.pointerEvents = 'none';
  }
}

function checkExpiredBets() {
  const now = Date.now();
  const expired = openBets.filter(b => b.status === 'open' && b.expiryTime && b.expiryTime < now);

  if (expired.length > 0) {
    expired.forEach(bet => {
      console.log(`[Mock] Bet ${bet.id} expired. Refunding $${bet.amount}...`);
      cancelBet(bet.id);
    });
  }
}

