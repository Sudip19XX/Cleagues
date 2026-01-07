/**
 * Breadcrumbs Component
 * Provides navigation breadcrumbs with structured data for SEO
 */

import { BREADCRUMBS, SITE_CONFIG } from '../utils/seoConfig.js';
import { navigate } from '../App.js';

/**
 * Create a breadcrumbs element for a given route
 * @param {string} route - The current route path
 * @returns {HTMLElement|null} Breadcrumbs element or null if no breadcrumbs defined
 */
export function createBreadcrumbs(route) {
    const crumbs = BREADCRUMBS[route];
    if (!crumbs || crumbs.length === 0) return null;

    const nav = document.createElement('nav');
    nav.className = 'breadcrumbs';
    nav.setAttribute('aria-label', 'Breadcrumb navigation');
    nav.style.cssText = `
    padding: var(--spacing-md) 0;
    margin-bottom: var(--spacing-md);
  `;

    const ol = document.createElement('ol');
    ol.style.cssText = `
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--spacing-xs);
    list-style: none;
    margin: 0;
    padding: 0;
    font-size: 0.875rem;
  `;

    crumbs.forEach((crumb, index) => {
        const li = document.createElement('li');
        li.style.cssText = `
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
    `;

        const isLast = index === crumbs.length - 1;

        if (isLast) {
            // Current page - no link
            const span = document.createElement('span');
            span.textContent = crumb.name;
            span.setAttribute('aria-current', 'page');
            span.style.cssText = `
        color: var(--color-primary);
        font-weight: 500;
      `;
            li.appendChild(span);
        } else {
            // Clickable link
            const a = document.createElement('a');
            a.href = `#${crumb.url}`;
            a.textContent = crumb.name;
            a.style.cssText = `
        color: var(--color-text-secondary);
        text-decoration: none;
        transition: color 0.2s ease;
      `;

            a.addEventListener('mouseenter', () => {
                a.style.color = 'var(--color-primary)';
            });

            a.addEventListener('mouseleave', () => {
                a.style.color = 'var(--color-text-secondary)';
            });

            a.addEventListener('click', (e) => {
                e.preventDefault();
                navigate(crumb.url);
            });

            li.appendChild(a);

            // Add separator
            const separator = document.createElement('span');
            separator.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--color-text-muted); opacity: 0.5;">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      `;
            separator.setAttribute('aria-hidden', 'true');
            separator.style.cssText = `
        display: flex;
        align-items: center;
      `;
            li.appendChild(separator);
        }

        ol.appendChild(li);
    });

    nav.appendChild(ol);

    // Inject structured data for breadcrumbs
    const structuredData = generateBreadcrumbSchema(crumbs);
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    nav.appendChild(script);

    return nav;
}

/**
 * Generate JSON-LD structured data for breadcrumbs
 * @param {Array} crumbs - Array of breadcrumb items
 * @returns {Object} Structured data object
 */
function generateBreadcrumbSchema(crumbs) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: crumbs.map((crumb, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: crumb.name,
            item: `${SITE_CONFIG.baseUrl}/#${crumb.url}`,
        })),
    };
}

/**
 * CSS styles for breadcrumbs (to be included in index.css)
 */
export const breadcrumbStyles = `
  .breadcrumbs {
    font-family: var(--font-primary);
  }
  
  .breadcrumbs ol {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.25rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  .breadcrumbs li {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
  
  .breadcrumbs a {
    color: var(--color-text-secondary);
    text-decoration: none;
    transition: color 0.2s ease;
  }
  
  .breadcrumbs a:hover {
    color: var(--color-primary);
  }
  
  .breadcrumbs [aria-current="page"] {
    color: var(--color-primary);
    font-weight: 500;
  }
  
  @media (max-width: 480px) {
    .breadcrumbs {
      font-size: 0.75rem;
    }
  }
`;
