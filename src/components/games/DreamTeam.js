// Dream Team Game Component

import { fetchTopTokens, searchTokens } from '../../services/priceService.js';
import { submitDreamTeam } from '../../contracts/gameContract.js';
import { formatCurrency, formatPercentage, getPriceChangeClass } from '../../utils/formatters.js';
import { MULTIPLIERS } from '../../utils/constants.js';
import walletManager from '../../wallet/walletManager.js';
import { getSelectedTeam, setSelectedTeam, getShouldOpenModal } from '../../utils/teamState.js';

export function createDreamTeam() {
  const page = document.createElement('div');
  page.className = 'dream-team-page';
  page.id = 'dream-team-page';

  const container = document.createElement('div');
  container.className = 'container';
  container.id = 'dream-team-container';
  container.style.cssText = `
    padding: var(--spacing-sm) var(--spacing-lg) var(--spacing-xl);
    transition: all 0.3s ease;
  `;

  // Info Cards Section (above header) - 3 column layout
  const infoCardsSection = document.createElement('div');
  infoCardsSection.style.cssText = `
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-xl);
  `;

  // Live Competitions Card (Left column)
  const liveCompCard = document.createElement('div');
  liveCompCard.className = 'card';
  liveCompCard.style.cssText = 'position: relative; padding: var(--spacing-lg);';
  liveCompCard.innerHTML = `
    <div style="display: flex; justify-content: center; align-items: center; gap: var(--spacing-sm); margin-bottom: var(--spacing-sm);">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#09C285" stroke-width="2">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
        <path d="M4 22h16"></path>
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
      </svg>
      <h3 style="margin: 0; font-size: 1.125rem; font-weight: 600;">Live Competitions</h3>
    </div>
    
    <div style="background: var(--glass-bg); border: 1px solid var(--glass-border); border-radius: 12px; padding: var(--spacing-md); backdrop-filter: blur(10px); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);">
      <div style="display: flex; justify-content: center; align-items: center; gap: var(--spacing-sm); margin-bottom: var(--spacing-xs);">
        <h4 style="margin: 0; font-size: 1rem; font-weight: 600;">Weekend Warriors</h4>
      </div>
      
      <div style="display: flex; justify-content: space-between; margin-bottom: var(--spacing-sm);">
        <div>
          <div style="display: flex; align-items: center; gap: var(--spacing-xs); color: var(--color-text-secondary); font-size: 0.875rem; margin-bottom: 4px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
              <path d="M4 22h16"></path>
              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
            </svg>
            Prize Pool
          </div>
          <div style="font-size: 1.5rem; font-weight: 700; color: #09C285;">$25,000</div>
        </div>
        <div style="text-align: right;">
          <div style="display: flex; align-items: center; justify-content: flex-end; gap: var(--spacing-xs); color: var(--color-text-secondary); font-size: 0.875rem; margin-bottom: 4px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            Players
          </div>
          <div style="font-size: 1.5rem; font-weight: 700;">1,523</div>
        </div>
      </div>
      
      <div style="display: flex; align-items: center; gap: var(--spacing-xs); color: var(--color-text-secondary); font-size: 0.875rem; margin-bottom: var(--spacing-sm);">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 6v6l4 2"></path>
        </svg>
        1d 12h left
      </div>
      
      <div style="display: flex; justify-content: center;">
        <button class="btn btn-primary">Join Competition</button>
      </div>
    </div>
    
    <div style="display: flex; justify-content: center; gap: var(--spacing-sm); margin-top: var(--spacing-sm);">
      <button class="carousel-btn" id="comp-prev" style="background: var(--glass-bg); border: 1px solid var(--glass-border); border-radius: 6px; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; cursor: pointer;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M15 18l-6-6 6-6"></path>
        </svg>
      </button>
      <button class="carousel-btn" id="comp-next" style="background: var(--glass-bg); border: 1px solid var(--glass-border); border-radius: 6px; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; cursor: pointer;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 18l6-6-6-6"></path>
        </svg>
      </button>
    </div>
  `;

  // Recent Winners Card (spans 2 columns and 2 rows)
  const winnersCard = document.createElement('div');
  winnersCard.className = 'card';
  winnersCard.style.cssText = 'position: relative; padding: var(--spacing-md);';
  winnersCard.innerHTML = `
    <div style="display: flex; justify-content: center; align-items: center; gap: var(--spacing-sm); margin-bottom: var(--spacing-sm);">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#09C285" stroke-width="2">
        <circle cx="12" cy="8" r="6"></circle>
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path>
      </svg>
      <h3 style="margin: 0; font-size: 1.125rem; font-weight: 600;">Recent Winners</h3>
    </div>
    
    <div style="background: var(--glass-bg); border: 1px solid var(--glass-border); border-radius: 12px; padding: var(--spacing-sm); backdrop-filter: blur(10px); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); max-height: 250px; overflow-y: auto;">
      <div style="display: flex; flex-direction: column; gap: var(--spacing-xs);">
        <div style="display: flex; justify-content: space-between; align-items: center; padding: var(--spacing-xs); background: rgba(255,255,255,0.05); border-radius: 6px;">
          <div style="display: flex; align-items: center; gap: var(--spacing-sm);">
            <div style="width: 24px; height: 24px; border-radius: 50%; background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 700; color: white;">1</div>
            <div>
              <div style="font-size: 0.8rem; font-weight: 600;">0x7a9f...3b2c</div>
              <div style="font-size: 0.65rem; color: var(--color-text-muted);">Weekend Warriors</div>
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 0.8rem; font-weight: 700; color: #09C285;">$25,000</div>
            <div style="font-size: 0.65rem; color: var(--color-text-muted);">2h ago</div>
          </div>
        </div>
        
        <div style="display: flex; justify-content: space-between; align-items: center; padding: var(--spacing-xs); background: rgba(255,255,255,0.05); border-radius: 6px;">
          <div style="display: flex; align-items: center; gap: var(--spacing-sm);">
            <div style="width: 24px; height: 24px; border-radius: 50%; background: linear-gradient(135deg, #C0C0C0 0%, #A8A8A8 100%); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 700; color: white;">2</div>
            <div>
              <div style="font-size: 0.8rem; font-weight: 600;">0x4e1d...8f9a</div>
              <div style="font-size: 0.65rem; color: var(--color-text-muted);">Crypto Sprint</div>
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 0.8rem; font-weight: 700; color: #09C285;">$10,000</div>
            <div style="font-size: 0.65rem; color: var(--color-text-muted);">5h ago</div>
          </div>
        </div>
        
        <div style="display: flex; justify-content: space-between; align-items: center; padding: var(--spacing-xs); background: rgba(255,255,255,0.05); border-radius: 6px;">
          <div style="display: flex; align-items: center; gap: var(--spacing-sm);">
            <div style="width: 24px; height: 24px; border-radius: 50%; background: linear-gradient(135deg, #CD7F32 0%, #B87333 100%); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 700; color: white;">3</div>
            <div>
              <div style="font-size: 0.8rem; font-weight: 600;">0x9c2b...5d7e</div>
              <div style="font-size: 0.65rem; color: var(--color-text-muted);">Daily Duel</div>
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 0.8rem; font-weight: 700; color: #09C285;">$5,000</div>
            <div style="font-size: 0.65rem; color: var(--color-text-muted);">8h ago</div>
          </div>
        </div>
        
        <div style="display: flex; justify-content: space-between; align-items: center; padding: var(--spacing-xs); background: rgba(255,255,255,0.05); border-radius: 6px;">
          <div style="display: flex; align-items: center; gap: var(--spacing-sm);">
            <div style="width: 24px; height: 24px; border-radius: 50%; background: var(--glass-border); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 700; color: var(--color-text-primary);">4</div>
            <div>
              <div style="font-size: 0.8rem; font-weight: 600;">0x3f8a...2c1d</div>
              <div style="font-size: 0.65rem; color: var(--color-text-muted);">Bull Run</div>
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 0.8rem; font-weight: 700; color: #09C285;">$2,500</div>
            <div style="font-size: 0.65rem; color: var(--color-text-muted);">12h ago</div>
          </div>
        </div>
        
        <div style="display: flex; justify-content: space-between; align-items: center; padding: var(--spacing-xs); background: rgba(255,255,255,0.05); border-radius: 6px;">
          <div style="display: flex; align-items: center; gap: var(--spacing-sm);">
            <div style="width: 24px; height: 24px; border-radius: 50%; background: var(--glass-border); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 700; color: var(--color-text-primary);">5</div>
            <div>
              <div style="font-size: 0.8rem; font-weight: 600;">0x1b5e...7a4f</div>
              <div style="font-size: 0.65rem; color: var(--color-text-muted);">Moon Shot</div>
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 0.8rem; font-weight: 700; color: #09C285;">$1,000</div>
            <div style="font-size: 0.65rem; color: var(--color-text-muted);">18h ago</div>
          </div>
        </div>
        
        <div style="display: flex; justify-content: space-between; align-items: center; padding: var(--spacing-xs); background: rgba(255,255,255,0.05); border-radius: 6px;">
          <div style="display: flex; align-items: center; gap: var(--spacing-sm);">
            <div style="width: 24px; height: 24px; border-radius: 50%; background: var(--glass-border); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 700; color: var(--color-text-primary);">6</div>
            <div>
              <div style="font-size: 0.8rem; font-weight: 600;">0x8d2c...4e7b</div>
              <div style="font-size: 0.65rem; color: var(--color-text-muted);">Diamond Hands</div>
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 0.8rem; font-weight: 700; color: #09C285;">$750</div>
            <div style="font-size: 0.65rem; color: var(--color-text-muted);">20h ago</div>
          </div>
        </div>
        
        <div style="display: flex; justify-content: space-between; align-items: center; padding: var(--spacing-xs); background: rgba(255,255,255,0.05); border-radius: 6px;">
          <div style="display: flex; align-items: center; gap: var(--spacing-sm);">
            <div style="width: 24px; height: 24px; border-radius: 50%; background: var(--glass-border); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 700; color: var(--color-text-primary);">7</div>
            <div>
              <div style="font-size: 0.8rem; font-weight: 600;">0x2f9a...1c3d</div>
              <div style="font-size: 0.65rem; color: var(--color-text-muted);">Altcoin Arena</div>
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 0.8rem; font-weight: 700; color: #09C285;">$500</div>
            <div style="font-size: 0.65rem; color: var(--color-text-muted);">21h ago</div>
          </div>
        </div>
        
        <div style="display: flex; justify-content: space-between; align-items: center; padding: var(--spacing-xs); background: rgba(255,255,255,0.05); border-radius: 6px;">
          <div style="display: flex; align-items: center; gap: var(--spacing-sm);">
            <div style="width: 24px; height: 24px; border-radius: 50%; background: var(--glass-border); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 700; color: var(--color-text-primary);">8</div>
            <div>
              <div style="font-size: 0.8rem; font-weight: 600;">0x5e7f...9a2b</div>
              <div style="font-size: 0.65rem; color: var(--color-text-muted);">Token Titans</div>
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 0.8rem; font-weight: 700; color: #09C285;">$400</div>
            <div style="font-size: 0.65rem; color: var(--color-text-muted);">22h ago</div>
          </div>
        </div>
        
        <div style="display: flex; justify-content: space-between; align-items: center; padding: var(--spacing-xs); background: rgba(255,255,255,0.05); border-radius: 6px;">
          <div style="display: flex; align-items: center; gap: var(--spacing-sm);">
            <div style="width: 24px; height: 24px; border-radius: 50%; background: var(--glass-border); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 700; color: var(--color-text-primary);">9</div>
            <div>
              <div style="font-size: 0.8rem; font-weight: 600;">0x6a3b...8d4c</div>
              <div style="font-size: 0.65rem; color: var(--color-text-muted);">Pump Masters</div>
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 0.8rem; font-weight: 700; color: #09C285;">$300</div>
            <div style="font-size: 0.65rem; color: var(--color-text-muted);">23h ago</div>
          </div>
        </div>
        
        <div style="display: flex; justify-content: space-between; align-items: center; padding: var(--spacing-xs); background: rgba(255,255,255,0.05); border-radius: 6px;">
          <div style="display: flex; align-items: center; gap: var(--spacing-sm);">
            <div style="width: 24px; height: 24px; border-radius: 50%; background: var(--glass-border); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 700; color: var(--color-text-primary);">10</div>
            <div>
              <div style="font-size: 0.8rem; font-weight: 600;">0x4c8d...2f5e</div>
              <div style="font-size: 0.65rem; color: var(--color-text-muted);">Whale Watch</div>
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 0.8rem; font-weight: 700; color: #09C285;">$200</div>
            <div style="font-size: 0.65rem; color: var(--color-text-muted);">24h ago</div>
          </div>
        </div>
      </div>
    </div>
  `;

  // User Teams Card (Right column)
  const userTeamsCard = document.createElement('div');
  userTeamsCard.className = 'card';
  userTeamsCard.style.cssText = 'position: relative; padding: var(--spacing-md);';
  userTeamsCard.innerHTML = `
    <div style="display: flex; justify-content: center; align-items: center; gap: var(--spacing-sm); margin-bottom: var(--spacing-sm);">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#09C285" stroke-width="2">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
      <h3 style="margin: 0; font-size: 1.125rem; font-weight: 600;">My Teams</h3>
    </div>
    
    <div style="background: var(--glass-bg); border: 1px solid var(--glass-border); border-radius: 12px; padding: var(--spacing-sm); backdrop-filter: blur(10px); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); max-height: 280px; overflow-y: auto;">
      <div style="display: flex; flex-direction: column; gap: var(--spacing-sm);">
        <div style="padding: var(--spacing-sm); background: rgba(255,255,255,0.05); border-radius: 8px; border-left: 3px solid #09C285;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-xs);">
            <div style="font-size: 0.85rem; font-weight: 600;">Team Alpha</div>
            <span class="badge badge-success" style="font-size: 0.65rem; padding: 0.15rem 0.4rem;">Active</span>
          </div>
          <div style="font-size: 0.7rem; color: var(--color-text-muted); margin-bottom: var(--spacing-xs);">15 tokens • Weekend Warriors</div>
          <div style="display: flex; gap: 4px; flex-wrap: wrap;">
            <div style="width: 20px; height: 20px; border-radius: 50%; background: linear-gradient(135deg, #627EEA 0%, #4E5ECD 100%); border: 2px solid var(--color-bg-primary);"></div>
            <div style="width: 20px; height: 20px; border-radius: 50%; background: linear-gradient(135deg, #F7931A 0%, #E07A0A 100%); border: 2px solid var(--color-bg-primary);"></div>
            <div style="width: 20px; height: 20px; border-radius: 50%; background: linear-gradient(135deg, #8247E5 0%, #6B3CC7 100%); border: 2px solid var(--color-bg-primary);"></div>
            <div style="width: 20px; height: 20px; border-radius: 50%; background: var(--glass-bg); border: 2px solid var(--color-bg-primary); display: flex; align-items: center; justify-content: center; font-size: 0.6rem; color: var(--color-text-muted);">+12</div>
          </div>
        </div>
        
        <div style="padding: var(--spacing-sm); background: rgba(255,255,255,0.05); border-radius: 8px; border-left: 3px solid var(--color-text-muted); opacity: 0.8;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-xs);">
            <div style="font-size: 0.85rem; font-weight: 600;">Team Beta</div>
            <span class="badge" style="font-size: 0.65rem; padding: 0.15rem 0.4rem; background: var(--glass-bg);">Ended</span>
          </div>
          <div style="font-size: 0.7rem; color: var(--color-text-muted); margin-bottom: var(--spacing-xs);">15 tokens • Crypto Sprint</div>
          <div style="font-size: 0.75rem; color: #09C285; font-weight: 600;">Rank: #42 • +$250</div>
        </div>
        
        <div style="padding: var(--spacing-sm); background: rgba(255,255,255,0.05); border-radius: 8px; border-left: 3px solid var(--color-text-muted); opacity: 0.8;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-xs);">
            <div style="font-size: 0.85rem; font-weight: 600;">Team Gamma</div>
            <span class="badge" style="font-size: 0.65rem; padding: 0.15rem 0.4rem; background: var(--glass-bg);">Ended</span>
          </div>
          <div style="font-size: 0.7rem; color: var(--color-text-muted); margin-bottom: var(--spacing-xs);">15 tokens • Daily Duel</div>
          <div style="font-size: 0.75rem; color: #09C285; font-weight: 600;">Rank: #15 • +$500</div>
        </div>
        
        <div style="padding: var(--spacing-sm); background: rgba(255,255,255,0.05); border-radius: 8px; border-left: 3px solid var(--color-text-muted); opacity: 0.8;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-xs);">
            <div style="font-size: 0.85rem; font-weight: 600;">Team Delta</div>
            <span class="badge" style="font-size: 0.65rem; padding: 0.15rem 0.4rem; background: var(--glass-bg);">Ended</span>
          </div>
          <div style="font-size: 0.7rem; color: var(--color-text-muted); margin-bottom: var(--spacing-xs);">15 tokens • Moon Shot</div>
          <div style="font-size: 0.75rem; color: #09C285; font-weight: 600;">Rank: #8 • +$1,200</div>
        </div>
      </div>
    </div>
  `;

  infoCardsSection.appendChild(liveCompCard);
  infoCardsSection.appendChild(winnersCard);
  infoCardsSection.appendChild(userTeamsCard);
  container.appendChild(infoCardsSection);

  // Header
  const header = document.createElement('div');
  header.style.marginBottom = 'var(--spacing-xl)';
  header.innerHTML = `
    <h1 style="font-size: 2.5rem; margin-bottom: var(--spacing-sm); display: flex; align-items: center; justify-content: center; gap: var(--spacing-md);">
      <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="team-grad-page" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#09C285"/>
            <stop offset="100%" style="stop-color:#07a371"/>
          </linearGradient>
        </defs>
        <circle cx="32" cy="22" r="6" fill="url(#team-grad-page)"/>
        <path d="M20 48C20 38 25 34 32 34C39 34 44 38 44 48" fill="url(#team-grad-page)"/>
        <circle cx="16" cy="26" r="5" fill="url(#team-grad-page)" opacity="0.8"/>
        <path d="M8 48C8 40 11 36 16 36C21 36 24 40 24 48" fill="url(#team-grad-page)" opacity="0.8"/>
        <circle cx="48" cy="26" r="5" fill="url(#team-grad-page)" opacity="0.8"/>
        <path d="M40 48C40 40 43 36 48 36C53 36 56 40 56 48" fill="url(#team-grad-page)" opacity="0.8"/>
        <circle cx="10" cy="30" r="4" fill="url(#team-grad-page)" opacity="0.6"/>
        <path d="M4 48C4 42 6 38 10 38C14 38 16 42 16 48" fill="url(#team-grad-page)" opacity="0.6"/>
        <circle cx="54" cy="30" r="4" fill="url(#team-grad-page)" opacity="0.6"/>
        <path d="M48 48C48 42 50 38 54 38C58 38 60 42 60 48" fill="url(#team-grad-page)" opacity="0.6"/>
      </svg>
      Dream Team
    </h1>
    <p style="color: var(--color-text-secondary); font-size: 1.125rem; margin-bottom: var(--spacing-md); text-align: center;">
      Build your ultimate crypto portfolio of 15 tokens
    </p>
  `;
  container.appendChild(header);

  // Filter and Search Bar with Selection Status
  const filterSearchBar = document.createElement('div');
  filterSearchBar.style.cssText = `
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-lg);
    gap: var(--spacing-md);
  `;

  // Category filters on the left
  const categoryFilters = document.createElement('div');
  categoryFilters.style.cssText = `
    display: flex;
    gap: var(--spacing-sm);
    flex-wrap: wrap;
  `;
  categoryFilters.innerHTML = `
    <button class="category-btn active" data-category="all" style="padding: 0.5rem 1rem; border-radius: 20px; border: 1px solid var(--color-border); background: var(--color-primary); color: white; cursor: pointer; font-weight: 600; transition: all 0.2s;">All</button>
    <button class="category-btn" data-category="defi" style="padding: 0.5rem 1rem; border-radius: 20px; border: 1px solid var(--color-border); background: var(--color-bg-secondary); color: var(--color-text-primary); cursor: pointer; font-weight: 600; transition: all 0.2s;">DeFi</button>
    <button class="category-btn" data-category="layer2" style="padding: 0.5rem 1rem; border-radius: 20px; border: 1px solid var(--color-border); background: var(--color-bg-secondary); color: var(--color-text-primary); cursor: pointer; font-weight: 600; transition: all 0.2s;">Layer 2</button>
    <button class="category-btn" data-category="gaming" style="padding: 0.5rem 1rem; border-radius: 20px; border: 1px solid var(--color-border); background: var(--color-bg-secondary); color: var(--color-text-primary); cursor: pointer; font-weight: 600; transition: all 0.2s;">Gaming</button>
    <button class="category-btn" data-category="meme" style="padding: 0.5rem 1rem; border-radius: 20px; border: 1px solid var(--color-border); background: var(--color-bg-secondary); color: var(--color-text-primary); cursor: pointer; font-weight: 600; transition: all 0.2s;">Meme</button>
  `;

  // Search bar and selection status on the right
  const rightSection = document.createElement('div');
  rightSection.style.cssText = `
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
  `;

  // Search bar
  const searchBar = document.createElement('div');
  searchBar.style.cssText = `
    transition: all 0.3s ease;
  `;
  searchBar.innerHTML = `
    <input type="text" class="input" placeholder="Search cryptocurrencies..." id="search-input" style="width: 250px; border-radius: 24px; padding: 0.875rem 1.25rem;" />
  `;

  // Selection badge (initially hidden, will slide in)
  const selectionBadge = document.createElement('div');
  selectionBadge.id = 'selected-badge';
  selectionBadge.className = 'badge badge-primary';
  selectionBadge.style.cssText = `
    font-size: 0.9rem;
    padding: 0.625rem 1.5rem;
    border-radius: 14px;
    font-weight: 600;
    opacity: 0;
    transform: translateX(20px);
    transition: all 0.3s ease;
    display: none;
  `;
  selectionBadge.innerHTML = `Selected: <span id="selected-count">0</span>/15`;

  rightSection.appendChild(searchBar);
  rightSection.appendChild(selectionBadge);

  filterSearchBar.appendChild(categoryFilters);
  filterSearchBar.appendChild(rightSection);
  container.appendChild(filterSearchBar);

  // Scrollable token grid section
  const tokenGridWrapper = document.createElement('div');
  tokenGridWrapper.id = 'token-grid-wrapper';

  const tokenGrid = document.createElement('div');
  tokenGrid.id = 'token-grid';
  tokenGrid.className = 'grid grid-auto';

  tokenGridWrapper.appendChild(tokenGrid);
  container.appendChild(tokenGridWrapper);

  // Bottom Action Bar (shown only when 15 tokens selected)
  const actionBar = document.createElement('div');
  actionBar.id = 'action-bar';
  actionBar.style.cssText = `
    position: fixed;
    bottom: 24px;
    left: 0;
    right: 0;
    background: transparent;
    padding: 0;
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 100;
    pointer-events: none;
  `;
  actionBar.innerHTML = `
    <div style="
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border-radius: 18px;
      padding: 6px;
      box-shadow: 
        0 8px 32px rgba(0, 0, 0, 0.12), 
        inset 0 2px 4px rgba(255, 255, 255, 0.4),
        inset 0 -2px 4px rgba(0, 0, 0, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.35);
      pointer-events: auto;
    ">
      <button class="btn btn-primary" id="bottom-submit-btn" style="
        padding: 0.875rem 2.5rem; 
        font-size: 1.1rem; 
        background: var(--color-primary);
        border: none;
        border-radius: 14px;
        color: white;
        font-weight: 600;
        box-shadow: 0 4px 12px rgba(9, 194, 133, 0.35);
      ">
        Proceed to Submit
      </button>
    </div>
  `;
  page.appendChild(actionBar);

  page.appendChild(container);

  // Load tokens
  loadTokens(tokenGrid);

  // Setup category filters
  const categoryButtons = categoryFilters.querySelectorAll('.category-btn');
  categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      categoryButtons.forEach(b => {
        b.style.background = 'var(--color-bg-secondary)';
        b.style.color = 'var(--color-text-primary)';
        b.classList.remove('active');
      });
      btn.style.background = 'var(--color-primary)';
      btn.style.color = 'white';
      btn.classList.add('active');

      // Filter tokens by category
      const category = btn.dataset.category;
      filterByCategory(category, tokenGrid);
    });
  });

  // Setup search
  const searchInput = searchBar.querySelector('#search-input');
  let searchTimeout;
  searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      if (e.target.value.trim()) {
        performSearch(e.target.value, tokenGrid);
      } else {
        loadTokens(tokenGrid);
      }
    }, 300);
  });

  return page;
}


// Initialize from global state (preserves team when navigating away and back)
let selectedTeam = getSelectedTeam();

// Sync local team to global state whenever it changes
function syncToGlobalState() {
  setSelectedTeam(selectedTeam);
}
async function loadTokens(gridContainer) {
  gridContainer.innerHTML = '<div class="loading" style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-2xl);"></div>';

  try {
    // Fetch all allowlisted tokens (max 250)
    const tokens = await fetchTopTokens(250);
    renderTokens(tokens, gridContainer);

    // Refresh local team from global state (in case we navigated back)
    selectedTeam = getSelectedTeam();

    // Update UI to reflect current selection state (shows action bar if 15 selected)
    updateUI();

    // Check if we should auto-open modal (redirected from widget)
    if (getShouldOpenModal() && selectedTeam.length === 15) {
      setTimeout(() => openCaptainModal(), 500);
    }
  } catch (error) {
    gridContainer.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-2xl); color: var(--color-danger);">
        Failed to load tokens. Please try again later.
      </div>
    `;
  }
}

async function performSearch(query, gridContainer) {
  gridContainer.innerHTML = '<div class="loading" style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-2xl);"></div>';

  try {
    const tokens = await searchTokens(query);
    if (tokens.length === 0) {
      gridContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-2xl);">
          <div style="font-size: 1.25rem; font-weight: 700; color: var(--color-danger); margin-bottom: var(--spacing-sm);">
            YOU CANNOT CHOOSE THIS TOKEN IN THE DREAM TEAM
          </div>
          <div style="font-size: 0.875rem; color: var(--color-text-secondary);">
            Try searching for a different cryptocurrency from our available list.
          </div>
        </div>
      `;
    } else {
      renderTokens(tokens, gridContainer);
    }
  } catch (error) {
    gridContainer.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-2xl); color: var(--color-danger);">
        Search failed. Please try again.
      </div>
    `;
  }
}

async function filterByCategory(category, gridContainer) {
  if (category === 'all') {
    loadTokens(gridContainer);
    return;
  }

  gridContainer.innerHTML = '<div class="loading" style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-2xl);"></div>';

  try {
    const allTokens = await fetchTopTokens(250);

    // Define category mappings
    const categories = {
      defi: ['AAVE', 'UNI', 'CAKE', 'MORPHO', 'PENDLE', 'COMP', 'SNX', 'DYDX', 'RUNE', 'SUSHI', 'CRV'],
      layer2: ['ARB', 'OP', 'STRK', 'ZK', 'ZRO', 'LINEA', 'MERL', 'ZORA', 'MANTA'],
      gaming: ['AXS', 'GALA', 'SAND', 'IMX', 'MANA', 'WEMIX', 'RON', 'BEAM', 'PRIME'],
      meme: ['DOGE', 'SHIB', 'PEPE', 'BONK', 'FLOKI', 'WIF', 'FARTCOIN', 'CHEEMS', 'BABYDOGE']
    };

    const categoryTokens = categories[category] || [];
    const filteredTokens = allTokens.filter(token =>
      categoryTokens.includes(token.symbol.toUpperCase())
    );

    if (filteredTokens.length === 0) {
      gridContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-2xl); color: var(--color-text-secondary);">
          No tokens found in this category
        </div>
      `;
    } else {
      renderTokens(filteredTokens, gridContainer);
    }
  } catch (error) {
    gridContainer.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-2xl); color: var(--color-danger);">
        Failed to load tokens. Please try again.
      </div>
    `;
  }
}

function renderTokens(tokens, gridContainer) {
  gridContainer.innerHTML = '';

  tokens.forEach(token => {
    const card = createTokenCard(token);
    gridContainer.appendChild(card);
  });
}

function createTokenCard(token) {
  const card = document.createElement('div');
  card.className = 'card token-card';
  card.dataset.tokenId = token.id;
  card.style.cssText = `
    cursor: pointer;
    transition: all var(--transition-base);
    animation: fadeIn 0.6s ease-out;
  `;

  const changeClass = getPriceChangeClass(token.priceChange24h);
  const index = selectedTeam.findIndex(t => t.id === token.id);
  const isSelected = index > -1;
  const direction = isSelected ? selectedTeam[index].direction : null;

  if (isSelected) {
    if (direction === 'UP') card.classList.add('selected-up');
    else if (direction === 'DOWN') card.classList.add('selected-down');
    else card.classList.add('selected'); // Fallback
  }

  // Truncate coin name if longer than 9 characters
  const displayName = token.name.length > 9 ? token.name.substring(0, 9) + '...' : token.name;

  card.innerHTML = `
    <div style="display: flex; align-items: center; gap: var(--spacing-sm);">
      <img src="${token.image}" alt="${token.name}" class="lifted-element" style="width: 36px; height: 36px; border-radius: 50%; flex-shrink: 0;" />
      <div style="flex: 1; min-width: 0;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px; gap: var(--spacing-lg);">
          <div class="lifted-element" style="font-weight: 700; font-size: 1rem;">${token.symbol.toUpperCase()}</div>
          <div class="token-current-price" style="font-size: 0.95rem; font-weight: 700; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${formatCurrency(token.currentPrice)}</div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div style="font-size: 0.75rem; color: var(--color-text-muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${displayName}</div>
          <div class="token-price-change ${changeClass}" style="font-size: 0.8rem; white-space: nowrap; margin-left: var(--spacing-sm);">
            ${formatPercentage(token.priceChange24h)}
          </div>
        </div>
      </div>
      ${isSelected ? `<div class="badge ${direction === 'UP' ? 'badge-success' : 'badge-danger'}" style="padding: 0.25rem 0.5rem; font-size: 0.7rem; flex-shrink: 0; margin-left: var(--spacing-sm);">${direction === 'UP' ? 'UP' : 'Down'}</div>` : ''}
    </div>
    
    <!-- Split Selection Overlay -->
    <div class="selection-overlay">
      <div class="selection-overlay-left" onclick="event.stopPropagation(); window.toggleTokenSelection('${token.id}', 'DOWN')">
        <span class="selection-overlay-text" style="display: flex; flex-direction: column; align-items: center; gap: -8px;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: -6px; opacity: 0.5;">
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
        </span>
      </div>
      <div class="selection-overlay-right" onclick="event.stopPropagation(); window.toggleTokenSelection('${token.id}', 'UP')">
        <span class="selection-overlay-text" style="display: flex; flex-direction: column; align-items: center; gap: -8px;">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="5 12 12 5 19 12"></polyline>
          </svg>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="margin-top: -6px; opacity: 0.5;">
            <polyline points="5 12 12 5 19 12"></polyline>
          </svg>
        </span>
      </div>
    </div>
  `;

  // Attach token object to window for access via inline onclick (since specific token object isn't serializable easily in HTML)
  // Actually, better pattern is to attach event listener to elements, but logic is complex. 
  // Let's attach listeners to the overlay elements directly using closure
  const leftOverlay = card.querySelector('.selection-overlay-left');
  const rightOverlay = card.querySelector('.selection-overlay-right');

  if (leftOverlay) {
    leftOverlay.onclick = (e) => {
      e.stopPropagation();
      toggleTokenSelection(token, card, 'DOWN');
    };
  }

  if (rightOverlay) {
    rightOverlay.onclick = (e) => {
      e.stopPropagation();
      toggleTokenSelection(token, card, 'UP');
    };
  }

  // Fallback click on card itself (maybe just toggle off if selected?)
  card.onclick = (e) => {
    // If clicking card body (not overlay), toggle selection if already selected
    if (isSelected) {
      toggleTokenSelection(token, card, null);
    }
  };

  return card;
}

// Confetti animation
function createConfetti() {
  const colors = ['#09C285', '#4a90e2', '#FFD700', '#FF6B6B', '#4ECDC4', '#95E1D3'];
  const confettiCount = 50;

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.style.cssText = `
      position: fixed;
      width: 10px;
      height: 10px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      left: ${Math.random() * 100}vw;
      top: -10px;
      opacity: 1;
      border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
      z-index: 9999;
      pointer-events: none;
      animation: confetti-fall ${2 + Math.random() * 2}s linear forwards;
    `;

    document.body.appendChild(confetti);

    // Remove after animation
    setTimeout(() => {
      confetti.remove();
    }, 4000);
  }
}

// Add confetti animation CSS
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
  @keyframes confetti-fall {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(100vh) rotate(${360 + Math.random() * 360}deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(confettiStyle);

function toggleTokenSelection(token, card, direction) {
  const index = selectedTeam.findIndex(t => t.id === token.id);

  if (index > -1) {
    // If already specific direction and clicked that direction, unselect?
    // Or if clicked different direction, switch direction?
    // If direction is null (clicked card body), remove

    if (direction === null) {
      selectedTeam.splice(index, 1);
      card.classList.remove('selected', 'selected-up', 'selected-down');
    } else if (selectedTeam[index].direction === direction) {
      // Toggle off if same direction clicked
      selectedTeam.splice(index, 1);
      card.classList.remove('selected', 'selected-up', 'selected-down');
    } else {
      // Switch direction
      selectedTeam[index].direction = direction;
      card.classList.remove('selected-up', 'selected-down');
      card.classList.add(direction === 'UP' ? 'selected-up' : 'selected-down');
      // Update badge
      const badge = card.querySelector('.badge');
      if (badge) {
        badge.className = `badge ${direction === 'UP' ? 'badge-success' : 'badge-danger'}`;
        badge.textContent = direction === 'UP' ? 'UP' : 'Down';
      }
    }
  } else {
    // Add to selection
    if (selectedTeam.length >= 15) {
      alert('You can only select up to 15 tokens!');
      return;
    }

    // Default direction if none provided (shouldn't happen with overlay, but safety)
    const newDirection = direction || 'UP';

    selectedTeam.push({ ...token, direction: newDirection });
    card.classList.add(newDirection === 'UP' ? 'selected-up' : 'selected-down');
  }

  updateUI();
}

function updateUI() {
  // Toggle scroll mode based on selection
  const pageEl = document.getElementById('dream-team-page');
  const containerEl = document.getElementById('dream-team-container');
  const tokenGridWrapper = document.getElementById('token-grid-wrapper');
  const tokenGrid = document.getElementById('token-grid');
  const infoCards = document.querySelector('.dream-team-page .container > div:first-child');

  if (selectedTeam.length > 0 && pageEl && containerEl && tokenGridWrapper) {
    // Fixed header mode - hide info cards, only token grid scrolls
    pageEl.style.cssText = `
      display: flex;
      flex-direction: column;
      height: calc(100vh - 80px);
      overflow: hidden;
    `;
    containerEl.style.cssText = `
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: var(--spacing-xl) var(--spacing-md) 0;
      transition: all 0.3s ease;
    `;
    tokenGridWrapper.style.cssText = `
      flex: 1;
      overflow-y: auto;
      padding: var(--spacing-lg) var(--spacing-sm) var(--spacing-lg) 0;
    `;

    // Add custom scrollbar styling
    const scrollbarStyle = document.createElement('style');
    scrollbarStyle.id = 'token-grid-scrollbar';
    if (!document.getElementById('token-grid-scrollbar')) {
      scrollbarStyle.textContent = `
        #token-grid-wrapper::-webkit-scrollbar {
          width: 8px;
        }
        #token-grid-wrapper::-webkit-scrollbar-track {
          background: transparent;
          margin: var(--spacing-md) 0;
        }
        #token-grid-wrapper::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        #token-grid-wrapper::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `;
      document.head.appendChild(scrollbarStyle);
    }
    // Hide info cards
    if (infoCards) {
      infoCards.style.display = 'none';
    }
    // Change grid to 5 columns with reduced gap
    if (tokenGrid) {
      tokenGrid.style.gridTemplateColumns = 'repeat(5, 1fr)';
      tokenGrid.style.gap = 'var(--spacing-sm)';
    }
  } else if (pageEl && containerEl && tokenGridWrapper) {
    // Normal scroll mode - show info cards
    pageEl.style.cssText = '';
    containerEl.style.cssText = `
      padding: var(--spacing-sm) var(--spacing-lg) var(--spacing-xl);
      transition: all 0.3s ease;
    `;
    tokenGridWrapper.style.cssText = 'display: block;';
    // Show info cards with grid layout
    if (infoCards) {
      infoCards.style.display = 'grid';
    }
    // Revert grid to responsive auto-fill
    if (tokenGrid) {
      tokenGrid.style.gridTemplateColumns = '';
      tokenGrid.style.gap = '';
    }
  }

  // Update count
  const countEl = document.getElementById('selected-count');
  if (countEl) {
    countEl.textContent = selectedTeam.length;
  }

  // Show/hide badge based on selection with slide-in animation
  const badge = document.getElementById('selected-badge');
  const searchInput = document.getElementById('search-input');

  // Check for Unselect All button
  let unselectAllBtn = document.getElementById('unselect-all-btn');
  if (!unselectAllBtn) {
    unselectAllBtn = document.createElement('button');
    unselectAllBtn.id = 'unselect-all-btn';
    unselectAllBtn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
      Unselect All
    `;
    unselectAllBtn.style.cssText = `
      display: none;
      align-items: center;
      gap: 6px;
      padding: 0.625rem 1.5rem;
      border-radius: 14px;
      border: none;
      background: rgba(255, 77, 79, 0.15);
      color: var(--color-danger);
      font-size: 0.9rem;
      font-weight: 600;
      line-height: 1.5;
      height: 42px; /* Explicit height */
      box-sizing: border-box;
      cursor: pointer;
      transition: all 0.2s ease;
      margin-left: var(--spacing-sm);
    `;
    unselectAllBtn.onmouseover = () => {
      unselectAllBtn.style.background = 'rgba(255, 77, 79, 0.2)';
    };
    unselectAllBtn.onmouseout = () => {
      unselectAllBtn.style.background = 'rgba(255, 77, 79, 0.15)';
    };
    unselectAllBtn.onclick = () => {
      selectedTeam = [];
      updateUI();
      // Reset card styles
      document.querySelectorAll('.token-card').forEach(card => card.classList.remove('selected'));
      // Re-render cards to remove badges
      const tokenGrid = document.getElementById('token-grid');
      // If we had a way to just update selection state without full re-render that would be better,
      // but triggering a search/filter update is easiest way to refresh grid
      const searchInput = document.getElementById('search-input');
      if (searchInput) searchInput.dispatchEvent(new Event('input'));

      // If we're in "all" category, we might need to manually refresh if search is empty
      // But for now let's just manually fix the DOM for visible cards
      document.querySelectorAll('.token-card .badge-success').forEach(el => el.remove());
    };

    // Insert before badge if possible
    const badgeParent = document.getElementById('selected-badge'); // Renamed to avoid conflict
    if (badgeParent && badgeParent.parentNode) {
      badgeParent.parentNode.insertBefore(unselectAllBtn, badgeParent);
    }
  }

  if (badge) {
    if (selectedTeam.length > 0) {
      badge.style.display = 'block';
      if (unselectAllBtn) unselectAllBtn.style.display = 'flex';

      // Trigger animation after display change
      setTimeout(() => {
        badge.style.opacity = '1';
        badge.style.transform = 'translateX(0)';
      }, 10);

      badge.style.fontSize = '0.9rem';
      badge.style.padding = '0.625rem 1.5rem';
      badge.style.borderRadius = '14px';
      badge.style.fontWeight = '600';
      badge.style.lineHeight = '1.5';
      badge.style.height = '42px';
      badge.style.boxSizing = 'border-box';
      badge.style.display = 'inline-flex';
      badge.style.alignItems = 'center';

      // Update search placeholder and width
      if (searchInput) {
        searchInput.placeholder = 'Search for token you want to add';
        searchInput.style.width = '300px';
      }

      if (selectedTeam.length === 15) {
        badge.className = 'badge badge-success';
        badge.style.background = 'var(--color-primary)';
        badge.style.color = 'white';
        badge.style.border = 'none';
      } else {
        badge.className = 'badge badge-primary';
        badge.style.background = '';
        badge.style.color = '';
        badge.style.border = '';
      }
    } else {
      badge.style.opacity = '0';
      badge.style.transform = 'translateX(20px)';
      if (unselectAllBtn) unselectAllBtn.style.display = 'none';

      // Reset search placeholder and width
      if (searchInput) {
        searchInput.placeholder = 'Search cryptocurrencies...';
        searchInput.style.width = '250px';
      }

      // Hide after animation completes
      setTimeout(() => {
        badge.style.display = 'none';
      }, 300);
    }
  }

  // Show/hide bottom action bar (only when 15 tokens selected)
  const actionBar = document.getElementById('action-bar');
  if (actionBar) {
    if (selectedTeam.length === 15) {
      actionBar.style.display = 'flex';
      // Trigger confetti animation
      if (!actionBar.dataset.confettiShown) {
        createConfetti();
        actionBar.dataset.confettiShown = 'true';
      }
    } else {
      actionBar.style.display = 'none';
      actionBar.dataset.confettiShown = '';
    }
  }

  // Update bottom submit button
  const bottomSubmitBtn = document.getElementById('bottom-submit-btn');
  if (bottomSubmitBtn) {
    bottomSubmitBtn.style.cssText = 'padding: 0.895rem 2.5rem; font-size: 1.125rem; background: var(--color-primary); color: white; border: none;';
    bottomSubmitBtn.onclick = () => openCaptainModal();
  }

  // Sync to global state (for pending action widget)
  syncToGlobalState();
}

function openCaptainModal() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.style.animation = 'fadeIn 0.2s ease-out';
  overlay.style.backdropFilter = 'blur(4px)';
  overlay.style.webkitBackdropFilter = 'blur(4px)';

  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.style.maxWidth = '600px';
  modal.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.3)';

  function renderModalContent() {
    modal.innerHTML = `
        <button class="modal-close">×</button>
        <h2 class="modal-title" style="color: #000;">Select Team Leaders</h2>
        
        <div class="modal-body" style="display: flex; flex-direction: column; gap: var(--spacing-md); height: 100%;">
          
          <!-- Leadership Section (Top) -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-md); padding-bottom: var(--spacing-sm); border-bottom: 1px solid var(--glass-border);">
            
            <!-- Captain Slot -->
            <div style="display: flex; flex-direction: column; gap: var(--spacing-xs);">
                <div style="font-size: 0.8rem; font-weight: 700; color: #000; text-transform: uppercase;">
                    Captain (2x)
                </div>
                <div id="captain-slot"></div>
            </div>

            <!-- Vice Captain Slot -->
            <div style="display: flex; flex-direction: column; gap: var(--spacing-xs);">
                <div style="font-size: 0.8rem; font-weight: 700; color: #000; text-transform: uppercase;">
                    Vice Captain (1.5x)
                </div>
                <div id="vice-slot"></div>
            </div>
            
          </div>

          <!-- Roster Section (Bottom) -->
          <div style="flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: var(--spacing-xs);">
             <div style="font-size: 0.8rem; color: var(--color-text-secondary); sticky: top;">
                  Team Roster (${selectedTeam.length - (captainIndex !== -1 ? 1 : 0) - (viceIndex !== -1 ? 1 : 0)} Remaining)
             </div>
             <div id="roster-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-xs);"></div>
          </div>
          
        </div>
      `;

    // 1. Render Captain
    const captainSlot = modal.querySelector('#captain-slot');
    if (captainIndex !== -1) {
      const captainToken = selectedTeam[captainIndex];
      const capCard = createModalTokenCard(captainToken, captainIndex, 'CAPTAIN');
      captainSlot.appendChild(capCard);
    } else {
      // Empty Captain Slot
      captainSlot.innerHTML = `
            <div style="
                border: 1px dashed var(--color-primary); 
                border-radius: var(--radius-lg); 
                height: 60px; 
                display: flex; 
                align-items: center; 
                justify-content: center; 
                font-size: 0.8rem; 
                color: var(--color-primary);
                background: rgba(var(--color-primary-rgb), 0.05);
                font-weight: 600;
            ">
                Select Captain
            </div>
          `;
    }

    // 2. Render Vice Captain
    const viceSlot = modal.querySelector('#vice-slot');
    if (viceIndex !== -1) {
      const viceToken = selectedTeam[viceIndex];
      const viceCard = createModalTokenCard(viceToken, viceIndex, 'VICE');
      viceSlot.appendChild(viceCard);
    } else {
      // Empty Vice Slot
      viceSlot.innerHTML = `
            <div style="
                border: 1px dashed #FFD700; 
                border-radius: var(--radius-lg); 
                height: 60px; 
                display: flex; 
                align-items: center; 
                justify-content: center; 
                font-size: 0.8rem; 
                color: #B8860B; /* Darker Gold for text visibility */
                background: rgba(255, 215, 0, 0.05);
                font-weight: 600;
            ">
                Select Vice
            </div>
          `;
    }

    // 3. Render Roster (Everyone else)
    const rosterGrid = modal.querySelector('#roster-grid');
    const rosterTokens = selectedTeam.filter((_, index) => index !== captainIndex && index !== viceIndex);

    rosterTokens.forEach((token, rosterIndex) => {
      const originalIndex = selectedTeam.indexOf(token);
      const card = createModalTokenCard(token, originalIndex, 'ROSTER');

      // If odd number of roster items and this is the last one, center it
      if (rosterTokens.length % 2 === 1 && rosterIndex === rosterTokens.length - 1) {
        card.style.gridColumn = 'span 2';
        card.style.maxWidth = '50%';
        card.style.margin = '0 auto';
      }

      rosterGrid.appendChild(card);
    });

    // 4. Close Handler & Submit
    modal.querySelector('.modal-close').addEventListener('click', () => overlay.remove());
    checkAndSubmit();
  }

  function createModalTokenCard(token, index, type) {
    const card = document.createElement('div');
    const isLeader = type !== 'ROSTER';

    // Base styles
    let borderStyle = '1px solid var(--glass-border)';
    let bgStyle = 'var(--glass-bg)';

    // Card Color Themes
    if (type === 'CAPTAIN') {
      // Blue Theme for Captain
      bgStyle = 'rgba(0, 123, 255, 0.15)';
      borderStyle = '1px solid #007bff';
    } else if (type === 'VICE') {
      // Yellow Theme for Vice
      bgStyle = 'rgba(255, 215, 0, 0.15)';
      borderStyle = '1px solid #FFD700';
    }
    // Roster items keep neutral background to let the "Up/Down" indicator stand out? 
    // User said "captain card blue color and vice in yellow".
    // Direction indicator is a separate element.

    card.className = 'card';
    // Compact styles for roster
    card.style.cssText = `
        padding: ${isLeader ? 'var(--spacing-sm)' : '6px'};
        display: flex;
        align-items: center;
        gap: ${isLeader ? 'var(--spacing-sm)' : '8px'};
        background: ${bgStyle};
        border: ${borderStyle};
        transition: all 0.2s ease;
        cursor: pointer;
        position: relative;
        min-height: ${isLeader ? 'auto' : '50px'};
      `;

    // Direction Indicator - Arrow icons
    const arrowSvg = token.direction === 'UP'
      ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="5 12 12 5 19 12"></polyline></svg>`
      : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-danger)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="19 12 12 19 5 12"></polyline></svg>`;

    // Inner HTML
    card.innerHTML = `
        <div style="position: relative;">
            <img src="${token.image}" alt="${token.name}" style="width: ${isLeader ? '40px' : '28px'}; height: ${isLeader ? '40px' : '28px'}; border-radius: 50%;" />
            <!-- Direction Arrow Indicator -->
            <div style="position: absolute; bottom: -4px; right: -4px; background: white; border-radius: 50%; padding: 2px; display: flex; align-items: center; justify-content: center; box-shadow: 0 1px 3px rgba(0,0,0,0.2);">
                ${arrowSvg}
            </div>
        </div>
        <div style="flex: 1; min-width: 0;">
          <div style="font-weight: 600; font-size: ${isLeader ? '1rem' : '0.8rem'}; line-height: 1.2; color: #000;">${token.symbol.toUpperCase()}</div>
        </div>
        
        ${type === 'ROSTER' ? `
            <div style="display: flex; gap: 6px;">
                <button class="btn-swap" style="background: var(--color-primary); color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 0.8rem; font-weight: 700; box-shadow: 0 2px 4px rgba(0,0,0,0.15);">
                    C
                </button>
                <button class="btn-vice" style="background: #FFD700; color: #000; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 0.8rem; font-weight: 700; box-shadow: 0 2px 4px rgba(0,0,0,0.15);">
                    VC
                </button>
            </div>
        ` : ''}
      `;

    // Event Listeners
    if (type === 'ROSTER') {
      // Make Captain Click
      const swapBtn = card.querySelector('.btn-swap');
      if (swapBtn) {
        swapBtn.onclick = (e) => {
          e.stopPropagation();
          // Promote to Captain
          captainIndex = index;
          if (index === viceIndex) viceIndex = -1;
          renderModalContent();
        };
      }

      // Make Vice Click
      const viceBtn = card.querySelector('.btn-vice');
      if (viceBtn) {
        viceBtn.onclick = (e) => {
          e.stopPropagation();
          viceIndex = index;
          renderModalContent();
        };
      }
    }

    return card;
  }

  // Initial State: No default captain
  let captainIndex = -1;
  let viceIndex = -1;

  // Render
  renderModalContent();

  async function checkAndSubmit() {
    // Only show submit if we have a captain (always do by default)
    // Vice is optional? "select captain and vide captain" implies both.
    // Let's enforce vice too? Or maybe make the first non-captain vice by default?
    // Let's just render the button always but validate in click

    // Remove existing button if any to re-render in correct place?
    // Actually renderModalContent re-renders everything body-wise. 
    // We need to append submit button to the end of modal-body.

    const modalBody = modal.querySelector('.modal-body');
    const existingBtn = modalBody.querySelector('.submit-team-btn');
    if (existingBtn) existingBtn.remove();

    const btn = document.createElement('button');
    btn.className = 'btn btn-primary submit-team-btn';
    // Center button and make fit-content
    btn.style.width = 'fit-content';
    btn.style.display = 'block';
    btn.style.margin = 'var(--spacing-md) auto';
    btn.style.padding = '0.875rem 5rem';

    // Explicit solid colors with importance to override component styles
    btn.style.cssText += 'background: #09C285 !important; color: white !important; border: none !important; opacity: 1;';

    btn.textContent = 'Submit Team';

    modalBody.appendChild(btn);

    btn.addEventListener('click', async () => {
      // Validation - check if captain and vice are selected
      if (captainIndex === -1 || viceIndex === -1) {
        alert("Please select captain and vice captain first");
        return;
      }

      btn.disabled = true;
      btn.innerHTML = '<div class="loading"></div>';

      try {
        // Send full token objects including direction
        const result = await submitDreamTeam({
          team: selectedTeam.map(t => ({
            id: t.id,
            direction: t.direction
          })),
          captainIndex,
          viceCaptainIndex: viceIndex,
        });

        overlay.remove();
        alert(`✅ ${result.message}\n\nTeam ID: ${result.teamId}\nTransaction: ${result.txHash.slice(0, 10)}...`);

        // Reset team
        selectedTeam = [];
        updateUI();
      } catch (error) {
        btn.disabled = false;
        btn.textContent = 'Submit Team';
        alert(`❌ Error: ${error.message}`);
      }
    });
  }

  modal.querySelector('.modal-close').addEventListener('click', () => overlay.remove());
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.remove();
  });

  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}