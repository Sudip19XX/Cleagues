
// Polymarket Service using Gamma API

// Use proxy in development to avoid CORS, direct URL in production (though prod needs a backend proxy too usually)
const BASE_URL = import.meta.env.DEV ? '/api/polymarket' : 'https://gamma-api.polymarket.com';

/**
 * Fetch trending/active markets from Polymarket
 * Uses the events endpoint sorted by volume to find "trending"
 * @param {number} limit 
 * @returns {Promise<Array>}
 */
export async function fetchTrendingMarkets(limit = 20) {
    try {
        // Fetch active events, sorted by 24h volume (descending) to get "trending"
        // Note: Gamma API structure might require adjustments based on specific field availability
        const url = `${BASE_URL}/events?limit=${limit}&active=true&closed=false&order=volume24hr&ascending=false`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Polymarket API error: ${response.statusText}`);
        }

        const data = await response.json();

        // Transform data to a usable format
        // The API returns a list of events. Each event has markets.
        return transformEvents(data);

    } catch (error) {
        console.error('Error fetching Polymarket data:', error);
        return [];
    }
}

/**
 * Fetch markets with flexible options (search, category, etc.)
 * @param {Object} options 
 * @returns {Promise<Array>}
 */
export async function fetchMarkets({ limit = 20, active = true, closed = false, order = 'volume24hr', ascending = false, tag_id = '', slug = '' } = {}) {
    try {
        const params = new URLSearchParams({
            limit,
            active,
            closed,
            order,
            ascending
        });

        if (tag_id) params.append('tag_id', tag_id);
        if (slug) params.append('slug', slug); // Gamma API supports partial text matches on slug/question often via specific params, checking capability.
        // Note: Gamma API has strict filtering. Search is often best done via specialized endpoint or by client-side if dataset small. 
        // However, let's try strict params.

        let url = `${BASE_URL}/events?${params.toString()}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error(response.statusText);

        const data = await response.json();
        return transformEvents(data);
    } catch (error) {
        console.error('Error fetching markets:', error);
        return [];
    }
}

/**
 * Search markets by text
 * @param {string} query 
 * @returns {Promise<Array>}
 */
export async function searchMarkets(query) {
    // Basic search via Gamma API often requires using the 'q' param or specific query endpoint if available.
    // Gamma API standard events endpoint might not support full text search efficiently.
    // We will try standard 'slug' or client side filter if needed, but 'events' endpoint often supports ?q=
    // Let's try URL construction with 'q' or fallback to specific tags.
    try {
        // Warning: Gamma API might differ on search. 
        // Using `?q=` is common convention.
        const url = `${BASE_URL}/events?q=${encodeURIComponent(query)}&active=true&closed=false&limit=20&order=volume24hr&ascending=false`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(response.statusText);
        const data = await response.json();
        return transformEvents(data);
    } catch (error) {
        console.error('Error searching markets:', error);
        return [];
    }
}

/**
 * Fetch markets by category ID
 * @param {string} tagId 
 * @returns {Promise<Array>}
 */
export async function fetchMarketsByCategory(tagId) {
    return fetchMarkets({ tag_id: tagId });
}


// Helper to transform raw API event data
function transformEvents(data) {
    if (!Array.isArray(data)) return [];

    return data.map(event => {
        const market = event.markets?.[0];
        if (!market) return null;

        return {
            id: event.id,
            title: event.title,
            image: event.image,
            volume: event.volume,
            volume24hr: event.volume24hr,
            description: event.description,
            slug: event.slug,
            category: event.tags?.[0]?.label || 'General',
            endDate: event.endDate,
            outcomes: market.outcomes ? JSON.parse(market.outcomes) : [],
            outcomePrices: market.outcomePrices ? JSON.parse(market.outcomePrices) : [],
            question: market.question
        };
    }).filter(item => item !== null);
}

/**
 * Format volume number
 * @param {number} num 
 * @returns {string}
 */
export function formatVolume(num) {
    if (num >= 1000000) {
        return '$' + (num / 1000000).toFixed(2) + 'M';
    }
    if (num >= 1000) {
        return '$' + (num / 1000).toFixed(2) + 'K';
    }
    return '$' + parseFloat(num).toFixed(2);
}
