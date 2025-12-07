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
    <img class="logo-icon" src="/assets/logo.png" alt="Crypto Leagues" width="36" height="36" style="object-fit: contain;" />
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
