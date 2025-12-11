// Sidebar Component

export function createSidebar() {
  const sidebar = document.createElement('aside');
  sidebar.id = 'sidebar';
  sidebar.className = 'sidebar';

  sidebar.innerHTML = `
    <div class="sidebar-content">
      <div class="sidebar-section">
        <div class="sidebar-category">
          <div class="sidebar-category-header">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            <span style="white-space: nowrap; font-size: 0.85rem;">League Originals</span>
          </div>
          
          <div class="sidebar-links">
            <a href="#dream-team" class="sidebar-link" data-page="dream-team">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <style>
                  @keyframes team-bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-2px); }
                  }
                  .sidebar-link.active .dream-team-filled { 
                    fill: #09C285; 
                    stroke: #09C285; 
                    fill-opacity: 0.2; 
                    animation: team-bounce 2s infinite ease-in-out;
                  }
                  .sidebar-link.active .dream-team-outline {
                    animation: team-bounce 2s infinite ease-in-out 0.2s;
                  }
                  .dream-team-filled, .dream-team-outline { transition: all 0.2s; }
                </style>
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" class="dream-team-outline"></path>
                <circle cx="9" cy="7" r="4" class="dream-team-filled"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75" class="dream-team-filled"></path>
              </svg>
              <span>Dream Team</span>
            </a>
            <a href="#pvp-battle" class="sidebar-link" data-page="pvp-battle">
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                 <style>
                   @keyframes swords-pulse {
                     0%, 100% { transform: scale(1); }
                     50% { transform: scale(1.1); }
                   }
                   .sidebar-link.active .swords-path {
                     stroke: #09C285;
                     animation: swords-pulse 1.5s infinite ease-in-out;
                     transform-origin: center;
                     transform-box: fill-box;
                   }
                 </style>
                 <g class="swords-path">
                   <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                   <path d="M21 3v5l-11 9l-4 4l-3 -3l4 -4l9 -11z" />
                   <path d="M5 13l6 6" />
                   <path d="M14.32 17.32l3.68 3.68l3 -3l-3.365 -3.365" />
                   <path d="M10 5.5l-2 -2.5h-5v5l3 2.5" />
                 </g>
               </svg>
               <span>PvP Battle</span>
            </a>
            

            <a href="#predict-candle" class="sidebar-link" data-page="predict-candle">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke-width="2">
                <style>
                  @keyframes candle-fluctuate {
                    0%, 100% { transform: scaleY(1); }
                    50% { transform: scaleY(0.7); }
                  }
                  .candle-line { 
                    stroke: currentColor; 
                    transition: stroke 0.2s; 
                    transform-origin: bottom;
                    transform-box: fill-box;
                  }
                  .sidebar-link.active .candle-green { 
                    stroke: #09C285; 
                    animation: candle-fluctuate 1.5s infinite ease-in-out alternate;
                  }
                  .sidebar-link.active .candle-red { 
                    stroke: #FF4D4F; 
                    animation: candle-fluctuate 2s infinite ease-in-out alternate-reverse;
                  }
                </style>
                <line x1="5" y1="6" x2="5" y2="18" stroke-width="2.5" class="candle-line candle-green"/>
                <line x1="10" y1="10" x2="10" y2="20" stroke-width="2.5" class="candle-line candle-red"/>
                <line x1="15" y1="4" x2="15" y2="16" stroke-width="2.5" class="candle-line candle-green"/>
                <line x1="20" y1="8" x2="20" y2="18" stroke-width="2.5" class="candle-line candle-red"/>
              </svg>
              <span>Predict Candle</span>
            </a>
            
            <a href="#time-based" class="sidebar-link" data-page="time-based">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <style>
                  @keyframes tick-sidebar {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                  }
                  .tick-hand-sidebar {
                    transform-origin: 12px 14px;
                  }
                  /* Animate only when active */
                  .sidebar-link.active .tick-hand-sidebar {
                    animation: tick-sidebar 2s steps(60) infinite;
                  }
                </style>
                <circle cx="12" cy="14" r="9" />
                <path d="M12 5V2M10 2h4" />
                <line x1="12" y1="14" x2="12" y2="8" stroke="currentColor" stroke-width="1.5" class="tick-hand-sidebar"/>
              </svg>
              <span>1min Frenzy</span>
            </a>

            <a href="#crypto-duel" class="sidebar-link" data-page="crypto-duel">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <style>
                  @keyframes vs-pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.2); }
                  }
                  .vs-text { 
                    fill: currentColor; 
                    stroke: none; 
                    transition: fill 0.2s; 
                    transform-origin: center; 
                    transform-box: fill-box;
                  }
                  .sidebar-link.active .vs-text { 
                    fill: #09C285; 
                    animation: vs-pulse 1.5s infinite ease-in-out;
                  }
                </style>
                <text x="12" y="16" font-size="12" font-weight="bold" text-anchor="middle" class="vs-text">VS</text>
              </svg>
              <span>Crypto Duel</span>
            </a>

          </div>
        </div>
        
        <!-- Prediction Category -->
        <div class="sidebar-category" style="margin-top: var(--spacing-md); border-top: 1px solid var(--glass-border); padding-top: var(--spacing-md);">
          <div class="sidebar-category-header">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 16v-4"></path>
              <path d="M12 8h.01"></path>
            </svg>
            <span style="white-space: nowrap; font-size: 0.85rem;">Prediction</span>
          </div>
          
          <div class="sidebar-links">
            <a href="#prediction-market" class="sidebar-link" data-page="prediction-market">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
              <span>Trending Bets</span>
            </a>
          </div>
        </div>
      </div>
      
      <!-- Footer Section -->
      <div class="sidebar-footer">
        <a href="#faqs" class="sidebar-footer-link">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
          <span>FAQs</span>
        </a>
        <a href="#terms" class="sidebar-footer-link">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
          </svg>
          <span>Terms & Conditions</span>
        </a>
        <a href="#team" class="sidebar-footer-link">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          <span>Crypto Leagues Team</span>
        </a>
      </div>
      
      <!-- Live data indicator - pinned to bottom -->
      <div class="sidebar-live-indicator" style="
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: var(--spacing-sm) var(--spacing-md);
        background: rgba(0, 0, 0, 0.2);
        border-top: 1px solid rgba(255,255,255,0.05);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
      ">
        <div style="width: 6px; height: 6px; background: #09C285; border-radius: 50%; animation: pulse 2s infinite;"></div>
        <span style="font-size: 0.55rem; color: var(--color-text-muted); opacity: 0.7;">Prices & data live from Binance</span>
      </div>
    </div>
  `;

  return sidebar;
}

// Initialize sidebar navigation
export function initSidebar() {
  const links = document.querySelectorAll('.sidebar-link');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      // Remove active class from all links
      links.forEach(l => l.classList.remove('active'));

      // Add active class to clicked link
      link.classList.add('active');

      // Dispatch custom event for navigation
      const page = link.dataset.page;
      window.dispatchEvent(new CustomEvent('navigate', { detail: { page } }));
    });
  });

  // Function to update active state based on current hash
  const updateActiveState = () => {
    // Remove leading slash and hash from the path
    let currentHash = window.location.hash.slice(1) || 'home';
    // Remove leading slash if present (e.g., '/dream-team' -> 'dream-team')
    if (currentHash.startsWith('/')) {
      currentHash = currentHash.slice(1);
    }

    // Remove active class from all links first
    links.forEach(l => l.classList.remove('active'));

    // Find and activate the matching link
    const activeLink = document.querySelector(`.sidebar-link[data-page="${currentHash}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
    }
  };

  // Set initial active state
  updateActiveState();

  // Listen for hash changes to update active state
  window.addEventListener('hashchange', updateActiveState);
  window.addEventListener('popstate', updateActiveState);
}
