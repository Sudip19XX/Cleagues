// Header Component

import { createWalletButton } from '../wallet/WalletConnect.js';
import { navigate } from '../App.js';

export function createHeader() {
  const header = document.createElement('header');
  header.className = 'header';

  const container = document.createElement('div');
  container.className = 'header-container';
  container.style.position = 'relative'; // Support absolute centering of children

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

  // Navigation
  // To strictly center it regardless of Logo/Wallet widths, use absolute positioning
  const nav = document.createElement('nav');
  nav.className = 'nav';
  nav.style.display = 'none';
  nav.style.gap = '24px';
  nav.style.alignItems = 'center';

  // Absolute centering
  nav.style.position = 'absolute';
  nav.style.left = '50%';
  nav.style.transform = 'translateX(-50%)';
  nav.style.margin = '0';

  // "leaderboard picks and rewards"
  const navLinks = [
    { label: 'Leaderboard', path: '/leaderboard' },
    { label: 'Picks', path: '/picks' },
    { label: 'Rewards', path: '/rewards' }
  ];

  navLinks.forEach((item, index) => {
    const link = document.createElement('a');
    link.href = `#${item.path}`;
    link.textContent = item.label;
    link.className = 'nav-link';
    link.style.cssText = `
        color: var(--color-text-secondary);
        text-decoration: none;
        font-weight: 500;
        font-size: 0.95rem;
        transition: all 0.2s ease;
        text-transform: capitalize;
        display: inline-block; /* Required for transform */
    `;
    link.addEventListener('mouseenter', () => {
      link.style.color = '#fff';
      link.style.transform = 'scale(1.05)'; // Increase size slightly
    });
    link.addEventListener('mouseleave', () => {
      link.style.color = 'var(--color-text-secondary)';
      link.style.transform = 'scale(1)';

      // Re-apply active color if needed logic is handled by checkActive?
      // checkActive sets initial color. Mouseleave resets to default.
      // We should re-run checkActive logic on mouseleave to ensure Active state persists?
      const hash = window.location.hash.replace('#', '') || '/';
      if (hash === item.path) {
        link.style.color = '#fff';
      }
    });

    // Add active state styling
    const checkActive = () => {
      const hash = window.location.hash.replace('#', '') || '/';
      if (hash === item.path) {
        link.style.color = '#fff';
        link.style.fontWeight = '600';
      } else {
        // Only reset if NOT hovering?
        // Simple: Reset color/weight.
        link.style.color = 'var(--color-text-secondary)';
        link.style.fontWeight = '500';
      }
    };
    window.addEventListener('hashchange', checkActive);
    setTimeout(checkActive, 0);

    link.addEventListener('click', (e) => {
      e.preventDefault();
      navigate(item.path);
    });
    nav.appendChild(link);

    // Add vertical divider after text (except last)
    if (index < navLinks.length - 1) {
      const divider = document.createElement('div');
      divider.style.cssText = `
            width: 1px;
            height: 16px;
            background: rgba(255, 255, 255, 0.15);
        `;
      nav.appendChild(divider);
    }
  });

  // Logic to show/hide nav based on page (and wallet? user request didn't mention wallet this time but implies "logged in" context usually)
  // "header in other pages should have"
  const updateNavVisibility = () => {
    const hash = window.location.hash.replace('#', '') || '/';
    const isHome = hash === '/' || hash === '' || hash === '/home';

    // Show on other pages
    if (!isHome) {
      nav.style.display = 'flex';
    } else {
      nav.style.display = 'none';
    }
  };

  window.addEventListener('hashchange', updateNavVisibility);

  // Initial check
  setTimeout(updateNavVisibility, 0);

  // Wallet button container
  const walletContainer = document.createElement('div');
  walletContainer.style.display = 'flex';
  walletContainer.style.alignItems = 'center';
  walletContainer.style.gap = 'var(--spacing-md)';

  // Create wallet button
  createWalletButton(walletContainer);

  // Theme switch removed per request

  // Initialize Theme (Default to Dark)
  const isDarkMode = localStorage.getItem('darkMode') !== 'false';
  if (isDarkMode) {
    document.documentElement.classList.add('dark-mode');
    document.body.classList.add('dark-mode');
  } else {
    // If user explicitly set light mode previously, respect it (or force dark if desired?)
    // "site should be dark mode by default" implies default.
    // If we want to FORCE dark mode always since toggle is gone:
    // document.documentElement.classList.add('dark-mode');
    // document.body.classList.add('dark-mode');
    // But let's stick to reading preference for now.
    document.documentElement.classList.remove('dark-mode');
    document.body.classList.remove('dark-mode');
  }

  // Assemble header
  container.appendChild(logo);
  container.appendChild(nav); // Add navigation links
  container.appendChild(walletContainer);
  header.appendChild(container);

  return header;
}
