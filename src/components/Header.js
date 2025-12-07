// Header Component

import { createWalletButton } from '../wallet/WalletConnect.js';
import { navigate } from '../App.js';

export function createHeader() {
  const header = document.createElement('header');
  header.className = 'header';

  const container = document.createElement('div');
  container.className = 'header-container';

  // Logo
  const logo = document.createElement('a');
  logo.href = '#/';
  logo.className = 'logo';
  logo.innerHTML = `
    <svg class="logo-icon" width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#09C285"/>
          <stop offset="100%" style="stop-color:#07a371"/>
        </linearGradient>
      </defs>
      
      <!-- Crown on top (Premier League style - More prominent with proper tips) -->
      <path d="M9 2H15V4H9V2Z" fill="url(#logo-gradient)"/>
      <path d="M8 4L9 6L10 5L12 6.5L14 5L15 6L16 4H8Z" fill="url(#logo-gradient)" stroke="url(#logo-gradient)" stroke-width="0.5"/>
      <!-- Crown jewels/tips -->
      <circle cx="9" cy="5.5" r="0.9" fill="url(#logo-gradient)"/>
      <circle cx="12" cy="6" r="1" fill="url(#logo-gradient)"/>
      <circle cx="15" cy="5.5" r="0.9" fill="url(#logo-gradient)"/>
      
      <!-- Gap between crown and trophy -->
      
      <!-- Ornate handles (Lion-like) -->
      <path d="M6.5 9C6 9.5 5.5 10.5 5.5 12C5.5 13.5 6 14.5 6.5 15" 
            stroke="url(#logo-gradient)" 
            stroke-width="1.8" 
            stroke-linecap="round"/>
      <circle cx="6" cy="12" r="1" fill="url(#logo-gradient)"/>
      
      <path d="M17.5 9C18 9.5 18.5 10.5 18.5 12C18.5 13.5 18 14.5 17.5 15" 
            stroke="url(#logo-gradient)" 
            stroke-width="1.8" 
            stroke-linecap="round"/>
      <circle cx="18" cy="12" r="1" fill="url(#logo-gradient)"/>
      
      <!-- Trophy cup (Classic Premier League shape) -->
      <path d="M8 7.5H16L15.5 9.5H8.5L8 7.5Z" fill="url(#logo-gradient)" stroke="url(#logo-gradient)" stroke-width="0.5"/>
      <path d="M8.5 9.5H15.5V14.5C15.5 16 14.5 17.5 12 17.5C9.5 17.5 8.5 16 8.5 14.5V9.5Z" 
            fill="url(#logo-gradient)" 
            stroke="url(#logo-gradient)" 
            stroke-width="1.3" 
            stroke-linejoin="round"/>
      
      <!-- Decorative bands -->
      <line x1="8.5" y1="11.5" x2="15.5" y2="11.5" stroke="#FFFFFF" stroke-width="0.4" opacity="0.5"/>
      <line x1="9" y1="13.5" x2="15" y2="13.5" stroke="#FFFFFF" stroke-width="0.4" opacity="0.5"/>
      
      <!-- Trophy stem -->
      <rect x="10.5" y="17.5" width="3" height="2.5" fill="url(#logo-gradient)"/>
      <path d="M10 18H14" stroke="url(#logo-gradient)" stroke-width="1.5"/>
      
      <!-- Ornate base (Premier League style) -->
      <path d="M8.5 20H15.5L16 21.5H8L8.5 20Z" fill="url(#logo-gradient)" stroke="url(#logo-gradient)" stroke-width="0.8"/>
      <rect x="7.5" y="21.5" width="9" height="1.5" rx="0.3" fill="url(#logo-gradient)"/>
      
      <!-- Highlight -->
      <ellipse cx="11" cy="11.5" rx="1.5" ry="2" fill="#FFFFFF" opacity="0.25"/>>
    </svg>
    <div class="logo-text">
      <div><span class="logo-first-letter">C</span>RYPTO</div>
      <div><span class="logo-first-letter">L</span>EAGUES</div>
    </div>
  `;

  logo.addEventListener('click', (e) => {
    e.preventDefault();
    navigate('/');
  });

  // Navigation (removed - now in sidebar)
  const nav = document.createElement('nav');
  nav.className = 'nav';
  nav.style.display = 'none'; // Hide nav since items moved to sidebar

  // Wallet button container
  const walletContainer = document.createElement('div');
  walletContainer.style.display = 'flex';
  walletContainer.style.alignItems = 'center';
  walletContainer.style.gap = 'var(--spacing-md)';

  // Create wallet button
  createWalletButton(walletContainer);

  // Dark mode toggle button
  const darkModeToggle = document.createElement('button');
  darkModeToggle.id = 'dark-mode-toggle';
  darkModeToggle.style.cssText = `
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid var(--glass-border);
    background: var(--glass-bg);
    cursor: pointer;
    transition: all 0.3s ease;
  `;

  // Check if dark mode is already enabled (from localStorage)
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  if (isDarkMode) {
    document.documentElement.classList.add('dark-mode');
    document.body.classList.add('dark-mode');
  }

  // Set initial icon and styling based on current mode
  const updateToggleIcon = () => {
    const isDark = document.documentElement.classList.contains('dark-mode');
    darkModeToggle.innerHTML = isDark ? `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFD700" stroke-width="2">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    ` : `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    `;
    darkModeToggle.title = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';

    // Update button styling for dark mode - lighter background
    if (isDark) {
      darkModeToggle.style.background = 'rgba(255, 255, 255, 0.15)';
      darkModeToggle.style.borderColor = 'rgba(255, 255, 255, 0.3)';
      darkModeToggle.style.color = '#FFD700';
    } else {
      darkModeToggle.style.background = 'var(--glass-bg)';
      darkModeToggle.style.borderColor = 'var(--glass-border)';
      darkModeToggle.style.color = 'currentColor';
    }
  };

  updateToggleIcon();

  darkModeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark-mode');
    document.body.classList.toggle('dark-mode');
    const isDark = document.documentElement.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
    updateToggleIcon();
  });

  darkModeToggle.addEventListener('mouseenter', () => {
    darkModeToggle.style.transform = 'scale(1.1)';
  });

  darkModeToggle.addEventListener('mouseleave', () => {
    darkModeToggle.style.transform = 'scale(1)';
  });

  walletContainer.appendChild(darkModeToggle);

  // Assemble header
  container.appendChild(logo);
  container.appendChild(walletContainer);
  header.appendChild(container);

  return header;
}
