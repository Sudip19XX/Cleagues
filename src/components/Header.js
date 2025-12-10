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

  // Dark mode toggle switch
  const themeSwitch = document.createElement('label');
  themeSwitch.className = 'theme-switch';
  // Note: We use the slider-icon classes if we want static icons on the track, but the CSS uses pseudo-elements for now.
  themeSwitch.innerHTML = `
    <input type="checkbox" id="dark-mode-checkbox">
    <span class="theme-slider"></span>
  `;

  const checkbox = themeSwitch.querySelector('input');

  // Check if dark mode should be enabled (default to dark mode)
  const isDarkMode = localStorage.getItem('darkMode') !== 'false';

  // Set initial state
  if (isDarkMode) {
    document.documentElement.classList.add('dark-mode');
    document.body.classList.add('dark-mode');
    checkbox.checked = true;
  } else {
    document.documentElement.classList.remove('dark-mode');
    document.body.classList.remove('dark-mode');
    checkbox.checked = false;
  }

  // Handle toggle change
  checkbox.addEventListener('change', (e) => {
    if (e.target.checked) {
      document.documentElement.classList.add('dark-mode');
      document.body.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark-mode');
      document.body.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'false');
    }
  });

  walletContainer.appendChild(themeSwitch);

  // Assemble header
  container.appendChild(logo);
  container.appendChild(walletContainer);
  header.appendChild(container);

  return header;
}
