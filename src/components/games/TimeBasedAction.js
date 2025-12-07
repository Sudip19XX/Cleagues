// Time-Based Action Game Component

import { fetchTopTokens } from '../../services/priceService.js';
import { submitTimeAction } from '../../contracts/gameContract.js';
import { formatCurrency, formatPercentage, getPriceChangeClass } from '../../utils/formatters.js';
import walletManager from '../../wallet/walletManager.js';

export function createTimeBasedAction() {
  const page = document.createElement('div');
  page.className = 'time-based-page';

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
          <linearGradient id="time-grad-page" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#09C285"/>
            <stop offset="100%" style="stop-color:#07a371"/>
          </linearGradient>
        </defs>
        <rect x="16" y="6" width="32" height="4" rx="2" fill="url(#time-grad-page)"/>
        <rect x="16" y="54" width="32" height="4" rx="2" fill="url(#time-grad-page)"/>
        <path d="M20 10 Q20 18 24 22 L32 28 L40 22 Q44 18 44 10" fill="none" stroke="url(#time-grad-page)" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M20 54 Q20 46 24 42 L32 36 L40 42 Q44 46 44 54" fill="none" stroke="url(#time-grad-page)" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="20" y1="10" x2="20" y2="54" stroke="url(#time-grad-page)" stroke-width="2.5"/>
        <line x1="44" y1="10" x2="44" y2="54" stroke="url(#time-grad-page)" stroke-width="2.5"/>
        <ellipse cx="32" cy="16" rx="8" ry="3" fill="url(#time-grad-page)" opacity="0.3"/>
        <path d="M24 16 Q24 20 28 23 L32 26 L36 23 Q40 20 40 16" fill="url(#time-grad-page)" opacity="0.3"/>
        <path d="M22 52 Q22 48 26 44 L32 39 L38 44 Q42 48 42 52 Z" fill="url(#time-grad-page)" opacity="0.85"/>
        <ellipse cx="32" cy="52" rx="10" ry="2" fill="url(#time-grad-page)" opacity="0.85"/>
      </svg>
      Time-Based Action
    </h1>
    <p style="color: var(--color-text-secondary); font-size: 1.125rem;">
      Make quick trading decisions on major cryptocurrencies
    </p>
  `;
  container.appendChild(header);

  // Active Challenge Card
  const challengeCard = document.createElement('div');
  challengeCard.className = 'card';
  challengeCard.style.cssText = `
    background: linear-gradient(135deg, var(--color-bg-secondary) 0%, var(--color-bg-tertiary) 100%);
    border: 2px solid var(--glass-border);
    margin-bottom: var(--spacing-xl);
    text-align: center;
  `;
  challengeCard.innerHTML = `
    <div style="font-size: 3rem; margin-bottom: var(--spacing-md);">⏰</div>
    <h2 style="margin-bottom: var(--spacing-md);">Active Challenge</h2>
    <div id="timer" style="font-size: 3rem; font-weight: 700; margin-bottom: var(--spacing-lg); background: var(--gradient-primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
      05:00
    </div>
    <p style="color: var(--color-text-secondary); margin-bottom: var(--spacing-lg);">
      Time remaining to make your decision
    </p>
  `;
  container.appendChild(challengeCard);

  // Token Grid
  const tokenGrid = document.createElement('div');
  tokenGrid.id = 'token-grid';
  tokenGrid.className = 'grid grid-auto';
  container.appendChild(tokenGrid);

  page.appendChild(container);

  // Load tokens and start timer
  loadTokens(tokenGrid);
  startTimer(challengeCard.querySelector('#timer'));

  return page;
}

let timeRemaining = 300; // 5 minutes in seconds

function startTimer(timerElement) {
  const interval = setInterval(() => {
    timeRemaining--;

    if (timeRemaining <= 0) {
      clearInterval(interval);
      timerElement.textContent = '00:00';
      timerElement.style.color = 'var(--color-danger)';
      alert('⏰ Time\'s up! Challenge ended.');
      return;
    }

    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    // Change color when time is running out
    if (timeRemaining <= 60) {
      timerElement.style.background = 'var(--gradient-orange)';
      timerElement.style.webkitBackgroundClip = 'text';
      timerElement.style.webkitTextFillColor = 'transparent';
      timerElement.style.backgroundClip = 'text';
    }
  }, 1000);
}

async function loadTokens(gridContainer) {
  gridContainer.innerHTML = '<div class="loading" style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-2xl);"></div>';

  try {
    const tokens = await fetchTopTokens(10);
    renderTokens(tokens, gridContainer);
  } catch (error) {
    gridContainer.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-2xl); color: var(--color-danger);">
        Failed to load tokens. Please try again later.
      </div>
    `;
  }
}

function renderTokens(tokens, gridContainer) {
  gridContainer.innerHTML = '';

  tokens.forEach(token => {
    const card = createActionCard(token);
    gridContainer.appendChild(card);
  });
}

function createActionCard(token) {
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

    <div style="display: flex; flex-direction: column; gap: var(--spacing-sm); margin-top: auto;">
      <button class="action-btn buy-btn" data-token="${token.id}" data-action="buy">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 19V5M5 12l7-7 7 7"></path>
        </svg>
        Buy
      </button>
      <button class="action-btn hold-btn" data-token="${token.id}" data-action="hold">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="8" y1="12" x2="16" y2="12"></line>
        </svg>
        Hold
      </button>
      <button class="action-btn sell-btn" data-token="${token.id}" data-action="sell">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 5v14M5 12l7 7 7-7"></path>
        </svg>
        Sell
      </button>
    </div>
  `;

  // Add event listeners to action buttons
  card.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      const tokenId = btn.dataset.token;
      submitAction(tokenId, action, token.name, btn);
    });
  });

  return card;
}

async function submitAction(tokenId, action, tokenName, button) {
  const state = walletManager.getState();
  if (!state.connected) {
    alert('Please connect your wallet first!');
    return;
  }

  if (timeRemaining <= 0) {
    alert('Challenge has ended!');
    return;
  }

  const originalHTML = button.innerHTML;
  button.disabled = true;
  button.innerHTML = '<div class="loading"></div>';

  try {
    const result = await submitTimeAction({
      challengeId: 1,
      actionType: action,
      token: tokenId,
    });

    alert(`✅ ${result.message}\n\nAction: ${action.toUpperCase()} ${tokenName}\nAction ID: ${result.actionId}\nTransaction: ${result.txHash.slice(0, 10)}...`);

    button.innerHTML = '✓ Submitted';
    button.style.background = 'var(--gradient-green)';
  } catch (error) {
    button.disabled = false;
    button.innerHTML = originalHTML;
    alert(`❌ Error: ${error.message}`);
  }
}

// Add action button styles
const style = document.createElement('style');
style.textContent = `
  .action-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem;
    border: none;
    border-radius: var(--radius-md);
    font-weight: 600;
    cursor: pointer;
    transition: all var(--transition-base);
    font-family: var(--font-primary);
  }

  .action-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .buy-btn {
    background: var(--gradient-green);
    color: white;
  }

  .buy-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(56, 239, 125, 0.3);
  }

  .hold-btn {
    background: var(--gradient-blue);
    color: white;
  }

  .hold-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(33, 150, 243, 0.3);
  }

  .sell-btn {
    background: var(--gradient-orange);
    color: white;
  }

  .sell-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(254, 81, 150, 0.3);
  }
`;
document.head.appendChild(style);
