// News Service - Fetches crypto news from CryptoPanic RSS feed

const RSS2JSON_API = 'https://api.rss2json.com/v1/api.json';
const CRYPTOPANIC_RSS = 'https://cryptopanic.com/news/rss/';

// Cache to prevent excessive API calls
let newsCache = {
    data: null,
    timestamp: 0
};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Fetch crypto news from CryptoPanic RSS feed
 * @returns {Promise<Array>} Array of news items
 */
export async function fetchCryptoNews() {
    // Check cache first
    if (newsCache.data && Date.now() - newsCache.timestamp < CACHE_DURATION) {
        return newsCache.data;
    }

    try {
        const url = `${RSS2JSON_API}?rss_url=${encodeURIComponent(CRYPTOPANIC_RSS)}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Failed to fetch news');
        }

        const data = await response.json();

        if (data.status !== 'ok' || !data.items) {
            throw new Error('Invalid response format');
        }

        // Transform the data
        const news = data.items.slice(0, 5).map(item => ({
            title: item.title,
            link: item.link,
            pubDate: item.pubDate,
            timeAgo: getTimeAgo(new Date(item.pubDate)),
            source: extractSource(item.title) || 'Crypto News'
        }));

        // Update cache
        newsCache.data = news;
        newsCache.timestamp = Date.now();

        return news;
    } catch (error) {
        console.error('Error fetching crypto news:', error);
        // Return fallback news if cache is available or static fallback
        return newsCache.data || getFallbackNews();
    }
}

/**
 * Calculate relative time ago
 */
function getTimeAgo(date) {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return date.toLocaleDateString();
}

/**
 * Extract source from title (e.g., "News Title - Source")
 */
function extractSource(title) {
    const match = title.match(/\s-\s([^-]+)$/);
    return match ? match[1].trim() : null;
}

/**
 * Fallback news for when API fails
 */
function getFallbackNews() {
    return [
        {
            title: 'Bitcoin and Ethereum Show Strong Recovery',
            link: '#',
            pubDate: new Date().toISOString(),
            timeAgo: '1h ago',
            source: 'Crypto News'
        },
        {
            title: 'DeFi Total Value Locked Reaches New Highs',
            link: '#',
            pubDate: new Date().toISOString(),
            timeAgo: '2h ago',
            source: 'DeFi Daily'
        },
        {
            title: 'Major Exchange Announces New Token Listings',
            link: '#',
            pubDate: new Date().toISOString(),
            timeAgo: '3h ago',
            source: 'Exchange News'
        }
    ];
}

/**
 * Force refresh the news cache
 */
export async function refreshNews() {
    newsCache.data = null;
    newsCache.timestamp = 0;
    return fetchCryptoNews();
}
