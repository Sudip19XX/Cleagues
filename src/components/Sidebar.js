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
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <span>Dream Team</span>
            </a>
            
            <a href="#crypto-duel" class="sidebar-link" data-page="crypto-duel">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <text x="12" y="16" font-size="12" font-weight="bold" text-anchor="middle" fill="currentColor" stroke="none">VS</text>
              </svg>
              <span>Crypto Duel</span>
            </a>
            
            <a href="#predict-candle" class="sidebar-link" data-page="predict-candle">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke-width="2">
                <line x1="5" y1="6" x2="5" y2="18" stroke="#09C285" stroke-width="2.5"/>
                <line x1="10" y1="10" x2="10" y2="20" stroke="#FF4D4F" stroke-width="2.5"/>
                <line x1="15" y1="4" x2="15" y2="16" stroke="#09C285" stroke-width="2.5"/>
                <line x1="20" y1="8" x2="20" y2="18" stroke="#FF4D4F" stroke-width="2.5"/>
              </svg>
              <span>Predict Candle</span>
            </a>
            
            <a href="#time-based" class="sidebar-link" data-page="time-based">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <!-- Hourglass top -->
                <path d="M6 2h12v4l-6 6 6 6v4H6v-4l6-6-6-6V2z" stroke="currentColor" stroke-width="1.5" fill="none"/>
                <!-- Sand in top -->
                <path d="M8 4h8l-4 4z" fill="currentColor" opacity="0.5"/>
              </svg>
              <span>Time-Based Action</span>
            </a>
          </div>
        </div>
        
        <!-- Prediction Category -->
        <div class="sidebar-category" style="margin-top: var(--spacing-md);">
          <div class="sidebar-category-header">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 16v-4"></path>
              <path d="M12 8h.01"></path>
              <path d="M8 9c0-2.2 1.8-4 4-4s4 1.8 4 4c0 1.5-.8 2.8-2 3.5"></path>
            </svg>
            <span style="white-space: nowrap; font-size: 0.85rem;">Prediction</span>
          </div>
          
          <div class="sidebar-links">
            <span style="font-size: 0.75rem; color: var(--color-text-muted); padding: 0.5rem 0.75rem; display: block;">Coming Soon</span>
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

  // Set initial active state based on current hash
  const currentHash = window.location.hash.slice(1) || 'home';
  const activeLink = document.querySelector(`.sidebar-link[data-page="${currentHash}"]`);
  if (activeLink) {
    activeLink.classList.add('active');
  }
}
