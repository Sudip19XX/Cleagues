// Wallet Connection UI Component

import walletManager from './walletManager.js';
import { formatAddress } from '../utils/formatters.js';
import { CHAINS } from '../utils/constants.js';

export function createWalletButton(container) {
  const button = document.createElement('button');
  button.className = 'wallet-button';
  button.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
      <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>
    </svg>
    <span class="wallet-text">Connect Wallet</span>
  `;

  // Update button based on wallet state
  const updateButton = (state) => {
    if (state.connected) {
      button.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
        <span class="wallet-address">${formatAddress(state.address)}</span>
      `;
      button.classList.add('connected');
    } else {
      button.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
          <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
          <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>
        </svg>
        <span class="wallet-text">Connect Wallet</span>
      `;
      button.classList.remove('connected');
    }
  };

  // Subscribe to wallet state changes
  walletManager.subscribe(updateButton);

  // Initial state
  updateButton(walletManager.getState());

  // Click handler
  button.addEventListener('click', () => {
    const state = walletManager.getState();
    if (state.connected) {
      showWalletMenu(button);
    } else {
      showWalletModal();
    }
  });

  container.appendChild(button);
  return button;
}

function showWalletModal() {
  // Create modal overlay
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.style.animation = 'fadeIn 0.2s ease-out';

  // Create modal
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.style.maxWidth = '400px';

  modal.innerHTML = `
    <button class="modal-close">×</button>
    <h2 class="modal-title">Connect Wallet</h2>
    <div class="modal-body">
      <p style="text-align: center; color: var(--color-text-secondary); margin-bottom: var(--spacing-lg);">
        Choose your preferred blockchain to get started
      </p>
      
      <div style="display: flex; flex-direction: column; gap: var(--spacing-md);">
        <button class="wallet-option" data-chain="${CHAINS.EVM}">
          <div style="display: flex; align-items: center; gap: var(--spacing-md);">
            <div style="width: 48px; height: 48px; border-radius: 50%; background: #ffffff; display: flex; align-items: center; justify-content: center; padding: 6px;">
              <svg viewBox="0 0 318.6 318.6" style="width: 100%; height: 100%;">
                <path fill="#E2761B" stroke="#E2761B" d="M274.1,35.5l-99.5,73.9L193,65.8z"/>
                <path fill="#E4761B" stroke="#E4761B" d="M44.4,35.5l98.7,74.6l-17.5-44.3L44.4,35.5z M238.3,206.8l-26.5,40.6l56.7,15.6l16.3-55.3 L238.3,206.8z M33.9,207.7L50.1,263l56.7-15.6l-26.5-40.6L33.9,207.7z"/>
                <path fill="#E4761B" stroke="#E4761B" d="M103.6,138.2l-15.8,23.9l56.3,2.5l-2-60.5L103.6,138.2z M214.9,138.2l-39.2-34.8l-1.3,61.2 l56.2-2.5L214.9,138.2z M106.8,247.4l33.8-16.5l-29.2-22.8L106.8,247.4z M177.9,230.9l33.9,16.5l-4.7-39.3L177.9,230.9z"/>
                <path fill="#D7C1B3" stroke="#D7C1B3" d="M211.8,247.4l-33.9-16.5l2.7,22.1l-0.3,9.3L211.8,247.4z M106.8,247.4l31.5,14.9l-0.2-9.3 l2.5-22.1l-33.8,16.5H106.8z"/>
                <path fill="#233447" stroke="#233447" d="M138.8,193.5l-28.2-8.3l19.9-9.1L138.8,193.5z M179.7,193.5l8.3-17.4l20,9.1L179.7,193.5z"/>
                <path fill="#CD6116" stroke="#CD6116" d="M106.8,247.4l4.8-40.6l-31.3,0.9L106.8,247.4z M207,206.8l4.8,40.6l26.5-39.7L207,206.8z M230.8,162.1l-56.2,2.5l5.2,28.9l8.3-17.4l20,9.1L230.8,162.1z M110.6,185.2l20-9.1l8.2,17.4l5.3-28.9l-56.3-2.5L110.6,185.2z"/>
                <path fill="#E4751F" stroke="#E4751F" d="M87.8,162.1l23.6,46l-0.8-22.9L87.8,162.1z M208.1,185.2l-1,22.9l23.7-46L208.1,185.2z M144.1,164.6l-5.3,28.9l6.6,34.1l1.5-44.9L144.1,164.6z M174.6,164.6l-2.7,18l1.2,45l6.7-34.1L174.6,164.6z"/>
                <path fill="#F6851B" stroke="#F6851B" d="M179.8,193.5l-6.7,34.1l4.8,3.3l29.2-22.8l1-22.9L179.8,193.5z M110.6,185.2l0.8,22.9l29.2,22.8 l4.8-3.3l-6.6-34.1L110.6,185.2z"/>
                <path fill="#C0AD9E" stroke="#C0AD9E" d="M180,262.3l0.3-9.3l-2.5-2.2h-37.7l-2.3,2.2l0.2,9.3l-31.5-14.9l11,9l22.3,15.5h38.3 l22.4-15.5l11-9L180,262.3z"/>
                <path fill="#161616" stroke="#161616" d="M177.9,230.9l-4.8-3.3h-27.7l-4.8,3.3l-2.5,22.1l2.3-2.2h37.7l2.5,2.2L177.9,230.9z"/>
                <path fill="#763D16" stroke="#763D16" d="M278.3,114.2l8.5-40.8l-12.7-37.9l-96.2,71.4l37,31.3l52.3,15.3l11.6-13.5l-5-3.6l8-7.3 l-6.2-4.8l8-6.1L278.3,114.2z M31.8,73.4l8.5,40.8l-5.4,4l8,6.1l-6.1,4.8l8,7.3l-5,3.6l11.5,13.5l52.3-15.3l37-31.3L44.4,35.5 L31.8,73.4z"/>
                <path fill="#F6851B" stroke="#F6851B" d="M267.2,153.5l-52.3-15.3l15.9,23.9l-23.7,46l31.2-0.4h46.5L267.2,153.5z M103.6,138.2l-52.3,15.3 l-17.4,54.4h46.4l31.1,0.4l-23.6-46L103.6,138.2z M174.6,164.6l3.3-57.7l15.2-41.1h-67.5l15,41.1l3.5,57.7l1.2,18.2l0.1,44.8h27.7 l0.2-44.8L174.6,164.6z"/>
              </svg>
            </div>
            <div style="flex: 1; text-align: left;">
              <div style="font-weight: 600; margin-bottom: 4px;">EVM Wallet</div>
              <div style="font-size: 0.875rem; color: var(--color-text-muted);">MetaMask, Coinbase Wallet, etc.</div>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 18l6-6-6-6"></path>
            </svg>
          </div>
        </button>

        <button class="wallet-option" data-chain="${CHAINS.CAMP}">
          <div style="display: flex; align-items: center; gap: var(--spacing-md);">
            <div style="width: 48px; height: 48px; border-radius: 50%; background: #FF5722; display: flex; align-items: center; justify-content: center; padding: 6px;">
              <!-- Placeholder Icon for Camp Network -->
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2">
                <path d="M12 2l8 4.5v11L12 22l-8-4.5v-11L12 2z"></path>
                <path d="M12 2v20"></path>
                <path d="M20 6.5l-8 5-8-5"></path>
              </svg>
            </div>
            <div style="flex: 1; text-align: left;">
              <div style="font-weight: 600; margin-bottom: 4px;">Camp Network</div>
              <div style="font-size: 0.875rem; color: var(--color-text-muted);">Connect to Camp L2</div>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 18l6-6-6-6"></path>
            </svg>
          </div>
        </button>

        <button class="wallet-option" data-chain="${CHAINS.SOLANA}">
          <div style="display: flex; align-items: center; gap: var(--spacing-md);">
            <div style="width: 48px; height: 48px; border-radius: 50%; background: linear-gradient(135deg, #14141f 0%, #1a1a2e 100%); display: flex; align-items: center; justify-content: center; padding: 8px;">
              <svg viewBox="0 0 397.7 311.7" style="width: 100%; height: 100%;">
                <defs>
                  <linearGradient id="solana-grad1" x1="360.88" y1="351.46" x2="-8.46" y2="-8.88" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stop-color="#00ffa3"/>
                    <stop offset="1" stop-color="#dc1fff"/>
                  </linearGradient>
                  <linearGradient id="solana-grad2" x1="264.83" y1="401.6" x2="-104.51" y2="32.25" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stop-color="#00ffa3"/>
                    <stop offset="1" stop-color="#dc1fff"/>
                  </linearGradient>
                  <linearGradient id="solana-grad3" x1="312.55" y1="376.68" x2="-56.79" y2="7.34" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stop-color="#00ffa3"/>
                    <stop offset="1" stop-color="#dc1fff"/>
                  </linearGradient>
                </defs>
                <path d="M64.6,237.9c2.4-2.4,5.7-3.8,9.2-3.8h317.4c5.8,0,8.7,7,4.6,11.1l-62.7,62.7c-2.4,2.4-5.7,3.8-9.2,3.8H6.5 c-5.8,0-8.7-7-4.6-11.1L64.6,237.9z" fill="url(#solana-grad1)"/>
                <path d="M64.6,3.8C67.1,1.4,70.4,0,73.8,0h317.4c5.8,0,8.7,7,4.6,11.1l-62.7,62.7c-2.4,2.4-5.7,3.8-9.2,3.8H6.5 c-5.8,0-8.7-7-4.6-11.1L64.6,3.8z" fill="url(#solana-grad2)"/>
                <path d="M333.1,120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8,0-8.7,7-4.6,11.1l62.7,62.7c2.4,2.4,5.7,3.8,9.2,3.8h317.4 c5.8,0,8.7-7,4.6-11.1L333.1,120.1z" fill="url(#solana-grad3)"/>
              </svg>
            </div>
            <div style="flex: 1; text-align: left;">
              <div style="font-weight: 600; margin-bottom: 4px;">Solana Wallet</div>
              <div style="font-size: 0.875rem; color: var(--color-text-muted);">Phantom, Solflare, etc.</div>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 18l6-6-6-6"></path>
            </svg>
          </div>
        </button>
      </div>
    </div>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Close button handler
  const closeBtn = modal.querySelector('.modal-close');
  closeBtn.addEventListener('click', () => {
    overlay.remove();
  });

  // Overlay click handler
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.remove();
    }
  });

  // Wallet option handlers
  const walletOptions = modal.querySelectorAll('.wallet-option');
  walletOptions.forEach(option => {
    option.addEventListener('click', async () => {
      const chain = option.dataset.chain;

      // Show loading state
      option.innerHTML = '<div class="loading"></div> Connecting...';
      option.disabled = true;

      try {
        if (chain === CHAINS.EVM) {
          await walletManager.connectEVM();
        } else if (chain === CHAINS.CAMP) {
          await walletManager.connectCAMP();
        } else if (chain === CHAINS.SOLANA) {
          await walletManager.connectSolana();
        }
        overlay.remove();
      } catch (error) {
        alert(error.message);
        option.disabled = false;
        // Restore original content
        location.reload(); // Simple approach to reset UI
      }
    });
  });
}

function showWalletMenu(button) {
  // Remove existing menu if any
  const existingMenu = button.querySelector('.wallet-menu');
  if (existingMenu) {
    existingMenu.remove();
    return;
  }

  // Create dropdown menu
  const menu = document.createElement('div');
  menu.className = 'wallet-menu';
  const buttonWidth = button.offsetWidth;
  menu.style.cssText = `
    position: absolute;
    top: calc(100% + 4px);
    right: 0;
    background: var(--color-bg-secondary);
    border: 1px solid var(--glass-border);
    border-radius: 0 0 var(--radius-lg) var(--radius-lg);
    padding: var(--spacing-xs);
    width: ${buttonWidth}px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    animation: fadeIn 0.15s ease-out;
  `;

  const state = walletManager.getState();
  const chainLabel = state.chain === CHAINS.EVM ? 'EVM' : (state.chain === CHAINS.CAMP ? 'CAMP' : 'SOL');
  const chainColor = state.chain === CHAINS.EVM ? '#E2761B' : (state.chain === CHAINS.CAMP ? '#FF5722' : '#9945FF');

  menu.innerHTML = `
    <!-- Network tag centered -->
    <div style="display: flex; align-items: center; justify-content: center; gap: var(--spacing-xs); padding: var(--spacing-sm) var(--spacing-md);">
      <span style="font-size: 0.7rem; color: ${chainColor}; background: ${chainColor}20; padding: 2px 8px; border-radius: 4px; font-weight: 600;">${chainLabel}</span>
      <span style="width: 6px; height: 6px; background: #09C285; border-radius: 50%;"></span>
    </div>
    
    <!-- Address with copy button -->
    <div class="wallet-menu-item" style="padding: var(--spacing-xs) var(--spacing-md); display: flex; align-items: center; justify-content: center; gap: var(--spacing-xs);">
      <span style="font-size: 0.8rem; font-family: monospace; color: var(--color-text-secondary);">${formatAddress(state.address)}</span>
      <button id="copy-address" style="background: none; border: none; cursor: pointer; padding: 2px; color: var(--color-text-muted); display: flex;" title="Copy address">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
      </button>
    </div>
    
    <div style="height: 1px; background: var(--glass-border); margin: var(--spacing-xs) 0;"></div>
    
    <!-- Rewards -->
    <div class="wallet-menu-item" style="padding: var(--spacing-sm) var(--spacing-md); display: flex; align-items: center; gap: var(--spacing-sm); cursor: pointer;">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-secondary)" stroke-width="2">
        <circle cx="12" cy="8" r="7"></circle>
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
      </svg>
      <span style="flex: 1; font-size: 0.9rem;">Rewards</span>
    </div>
    
    <!-- Transactions -->
    <div class="wallet-menu-item" style="padding: var(--spacing-sm) var(--spacing-md); display: flex; align-items: center; gap: var(--spacing-sm); cursor: pointer;">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-secondary)" stroke-width="2">
        <line x1="12" y1="1" x2="12" y2="23"></line>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
      </svg>
      <span style="flex: 1; font-size: 0.9rem;">Transactions</span>
    </div>
    
    <div style="height: 1px; background: var(--glass-border); margin: var(--spacing-xs) 0;"></div>
    
    <!-- Documentation -->
    <div class="wallet-menu-item" style="padding: var(--spacing-sm) var(--spacing-md); display: flex; align-items: center; gap: var(--spacing-sm); cursor: pointer;">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-secondary)" stroke-width="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
      </svg>
      <span style="flex: 1; font-size: 0.9rem;">Documentation</span>
    </div>
    
    <!-- Privacy Policy -->
    <div class="wallet-menu-item" style="padding: var(--spacing-sm) var(--spacing-md); display: flex; align-items: center; gap: var(--spacing-sm); cursor: pointer;">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-secondary)" stroke-width="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      </svg>
      <span style="flex: 1; font-size: 0.9rem;">Privacy Policy</span>
    </div>
    
    <!-- FAQs -->
    <div class="wallet-menu-item" style="padding: var(--spacing-sm) var(--spacing-md); display: flex; align-items: center; gap: var(--spacing-sm); cursor: pointer;">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-secondary)" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>
      <span style="flex: 1; font-size: 0.9rem;">FAQs</span>
    </div>
    
    <div style="height: 1px; background: var(--glass-border); margin: var(--spacing-xs) 0;"></div>
    
    <!-- Logout -->
    <div class="wallet-menu-item" id="disconnect-wallet" style="padding: var(--spacing-sm) var(--spacing-md); display: flex; align-items: center; justify-content: center; gap: var(--spacing-sm); cursor: pointer; color: var(--color-danger);">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
        <polyline points="16 17 21 12 16 7"></polyline>
        <line x1="21" y1="12" x2="9" y2="12"></line>
      </svg>
      <span style="font-size: 0.9rem;">Logout</span>
    </div>
  `;

  // Position menu relative to button
  button.style.position = 'relative';
  button.appendChild(menu);

  // Copy address handler
  menu.querySelector('#copy-address').addEventListener('click', (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(state.address);
    const copyBtn = menu.querySelector('#copy-address');
    copyBtn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#09C285" stroke-width="2">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    `;
    setTimeout(() => {
      copyBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
      `;
    }, 1500);
  });

  // Disconnect handler
  menu.querySelector('#disconnect-wallet').addEventListener('click', async () => {
    await walletManager.disconnect();
    menu.remove();
  });

  // Close menu when clicking outside
  setTimeout(() => {
    document.addEventListener('click', function closeMenu(e) {
      if (!menu.contains(e.target) && e.target !== button) {
        menu.remove();
        document.removeEventListener('click', closeMenu);
      }
    });
  }, 0);
}

// Add menu item styles
const style = document.createElement('style');
style.textContent = `
  .wallet-option {
    width: 100%;
    padding: var(--spacing-md);
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-lg);
    cursor: pointer;
    transition: all var(--transition-base);
    color: var(--color-text-primary);
    font-family: var(--font-primary);
  }

  .wallet-option:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateX(4px);
  }

  .menu-item {
    width: 100%;
    padding: var(--spacing-sm) var(--spacing-md);
    background: transparent;
    border: none;
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all var(--transition-fast);
    color: var(--color-text-primary);
    font-family: var(--font-primary);
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    font-size: 0.875rem;
  }

  .menu-item:hover {
    background: var(--glass-bg);
  }

  .wallet-menu-item {
    transition: background 0.15s ease;
    border-radius: var(--radius-sm);
  }

  .wallet-menu-item:hover {
    background: var(--glass-bg);
  }



  .wallet-address {
    font-family: var(--font-primary);
  }
`;
document.head.appendChild(style);
