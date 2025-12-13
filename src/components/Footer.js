export function createFooter() {
  const footer = document.createElement('footer');
  footer.className = 'footer';
  footer.style.cssText = `
    background: transparent;
    border-top: 1px solid var(--color-border);
    padding: var(--spacing-xl) 0; /* Reduced padding since it's smaller now */
    margin-top: var(--spacing-3xl);
  `;

  const container = document.createElement('div');
  container.className = 'container';

  // New Layout: Flex row centered
  container.innerHTML = `
    <div style="display: flex; justify-content: center; align-items: center; flex-wrap: wrap; gap: var(--spacing-2xl);">
      
      <!-- Links Group 1: Platform -->
      <div style="display: flex; gap: var(--spacing-xl);">
        <a href="#/learn-more?section=about" style="color: var(--color-text-secondary); text-decoration: none; transition: color 0.2s;">About Us</a>
        <a href="#/learn-more?section=modes" style="color: var(--color-text-secondary); text-decoration: none; transition: color 0.2s;">How it Works</a>
        <a href="#/learn-more?section=support" style="color: var(--color-text-secondary); text-decoration: none; transition: color 0.2s;">Contact Us</a>
      </div>

      <!-- Divider -->
      <div style="width: 1px; height: 20px; background: var(--color-border);"></div>

      <!-- Links Group 2: Support -->
      <div style="display: flex; gap: var(--spacing-xl);">
        <a href="#/learn-more?section=support" style="color: var(--color-text-secondary); text-decoration: none; transition: color 0.2s;">Help Center</a>
        <a href="#/terms" style="color: var(--color-text-secondary); text-decoration: none; transition: color 0.2s;">Terms of Use</a>
        <a href="#/privacy" style="color: var(--color-text-secondary); text-decoration: none; transition: color 0.2s;">Privacy Policy</a>
      </div>

    </div>
    
    <div style="margin-top: var(--spacing-lg); text-align: center; color: var(--color-text-muted); font-size: 0.8rem;">
      &copy; ${new Date().getFullYear()} Crypto Leagues. All rights reserved.
    </div>
  `;

  footer.appendChild(container);

  // Add hover effects via JS
  footer.querySelectorAll('a').forEach(link => {
    link.addEventListener('mouseenter', () => link.style.color = 'var(--color-primary)');
    link.addEventListener('mouseleave', () => link.style.color = 'var(--color-text-secondary)');
  });

  return footer;
}
