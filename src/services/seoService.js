/**
 * SEO Service
 * Handles dynamic meta tag updates and structured data injection
 */

import {
    SITE_CONFIG,
    getRouteMeta,
    getBreadcrumbSchema,
    getWebPageSchema,
    getFAQSchema,
    ORGANIZATION_SCHEMA,
    WEBSITE_SCHEMA,
} from '../utils/seoConfig.js';

// Track injected script elements for cleanup
let structuredDataScripts = [];

/**
 * Initialize SEO on app load
 * Injects base structured data (Organization, Website)
 */
export function initSEO() {
    // Inject base structured data
    injectStructuredData('organization', ORGANIZATION_SCHEMA);
    injectStructuredData('website', WEBSITE_SCHEMA);

    console.log('🔍 SEO Service initialized');
}

/**
 * Update page SEO for a specific route
 * @param {string} route - The current route path
 */
export function updatePageSEO(route) {
    // Get metadata for this route
    const meta = getRouteMeta(route);

    // Update meta tags
    updateMetaTags(meta);

    // Update document title
    document.title = meta.title;

    // Clear previous page-specific structured data
    clearStructuredData(['webpage', 'breadcrumb', 'faq']);

    // Inject page-specific structured data
    const webPageSchema = getWebPageSchema(route);
    injectStructuredData('webpage', webPageSchema);

    // Inject breadcrumbs if available
    const breadcrumbSchema = getBreadcrumbSchema(route);
    if (breadcrumbSchema) {
        injectStructuredData('breadcrumb', breadcrumbSchema);
    }

    // Inject FAQ schema on FAQ page
    if (route === '/faqs') {
        const faqSchema = getFAQSchema();
        injectStructuredData('faq', faqSchema);
    }

    // Update canonical URL
    updateCanonicalUrl(meta.url);

    // Update Open Graph URL
    updateMetaTag('property', 'og:url', meta.url);
}

/**
 * Update all meta tags
 * @param {Object} meta - Metadata object
 */
function updateMetaTags(meta) {
    // Basic meta tags
    updateMetaTag('name', 'description', meta.description);
    updateMetaTag('name', 'keywords', meta.keywords);

    // Open Graph tags
    updateMetaTag('property', 'og:title', meta.title);
    updateMetaTag('property', 'og:description', meta.description);
    updateMetaTag('property', 'og:image', `${SITE_CONFIG.baseUrl}${meta.image}`);
    updateMetaTag('property', 'og:url', meta.url);
    updateMetaTag('property', 'og:type', meta.type || 'website');
    updateMetaTag('property', 'og:site_name', SITE_CONFIG.name);

    // Twitter Card tags
    updateMetaTag('name', 'twitter:title', meta.title);
    updateMetaTag('name', 'twitter:description', meta.description);
    updateMetaTag('name', 'twitter:image', `${SITE_CONFIG.baseUrl}${meta.image}`);
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:site', SITE_CONFIG.twitterHandle);
}

/**
 * Update or create a single meta tag
 * @param {string} attrType - 'name' or 'property'
 * @param {string} attrValue - The attribute value (e.g., 'description', 'og:title')
 * @param {string} content - The content value
 */
function updateMetaTag(attrType, attrValue, content) {
    let meta = document.querySelector(`meta[${attrType}="${attrValue}"]`);

    if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attrType, attrValue);
        document.head.appendChild(meta);
    }

    meta.setAttribute('content', content);
}

/**
 * Update canonical URL
 * @param {string} url - The canonical URL
 */
function updateCanonicalUrl(url) {
    let canonical = document.querySelector('link[rel="canonical"]');

    if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
    }

    canonical.setAttribute('href', url);
}

/**
 * Inject structured data script
 * @param {string} id - Identifier for the script
 * @param {Object} data - Structured data object
 */
function injectStructuredData(id, data) {
    // Create script element
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = `structured-data-${id}`;
    script.textContent = JSON.stringify(data);

    // Remove existing script with same ID if present
    const existing = document.getElementById(script.id);
    if (existing) {
        existing.remove();
    }

    // Append to head
    document.head.appendChild(script);

    // Track for cleanup
    structuredDataScripts.push(script.id);
}

/**
 * Clear structured data scripts by ID prefixes
 * @param {Array<string>} ids - Array of ID suffixes to clear
 */
function clearStructuredData(ids) {
    ids.forEach(id => {
        const script = document.getElementById(`structured-data-${id}`);
        if (script) {
            script.remove();
        }
    });
}

/**
 * Get current page metadata
 * @returns {Object} Current metadata
 */
export function getCurrentMeta() {
    return {
        title: document.title,
        description: document.querySelector('meta[name="description"]')?.content || '',
        canonical: document.querySelector('link[rel="canonical"]')?.href || '',
    };
}

/**
 * Preload critical resources for a route
 * @param {string} route - The route to preload resources for
 */
export function preloadRouteResources(route) {
    // Add preload hints for route-specific resources
    // This can be expanded based on route-specific needs
    const preloads = {
        '/dream-team': ['/assets/icons/tokens/'],
        '/crypto-duel': ['/assets/icons/tokens/'],
    };

    const resources = preloads[route] || [];
    resources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = resource;
        document.head.appendChild(link);
    });
}

/**
 * Generate and return sitemap entries
 * @returns {Array} Array of sitemap entries
 */
export function getSitemapEntries() {
    const routes = [
        { path: '/', priority: 1.0, changefreq: 'daily' },
        { path: '/dream-team', priority: 0.9, changefreq: 'daily' },
        { path: '/crypto-duel', priority: 0.9, changefreq: 'daily' },
        { path: '/pvp-battle', priority: 0.9, changefreq: 'daily' },
        { path: '/predict-candle', priority: 0.9, changefreq: 'daily' },
        { path: '/time-based', priority: 0.9, changefreq: 'daily' },
        { path: '/prediction-market', priority: 0.8, changefreq: 'daily' },
        { path: '/learn-more', priority: 0.7, changefreq: 'weekly' },
        { path: '/faqs', priority: 0.6, changefreq: 'weekly' },
        { path: '/terms', priority: 0.3, changefreq: 'monthly' },
        { path: '/privacy', priority: 0.3, changefreq: 'monthly' },
    ];

    return routes.map(route => ({
        ...route,
        url: `${SITE_CONFIG.baseUrl}/#${route.path}`,
        lastmod: new Date().toISOString().split('T')[0],
    }));
}
