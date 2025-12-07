// Price Service - CoinGecko API Integration

import { API_ENDPOINTS } from '../utils/constants.js';
import { ALLOWED_TOKENS } from '../utils/tokenWhitelist.js';

/**
 * Fetch top cryptocurrencies by market cap
 * @param {number} limit - Number of tokens to fetch
 * @returns {Promise<Array>} Array of token data
 */
export async function fetchTopTokens(limit = 20) {
    try {
        // Fetch a larger set to ensure we get enough whitelisted tokens after filtering
        // CoinGecko free tier allows up to 250 per page
        const fetchLimit = 250;
        const response = await fetch(
            `${API_ENDPOINTS.COINGECKO_MARKETS}?vs_currency=usd&order=market_cap_desc&per_page=${fetchLimit}&page=1&sparkline=false&price_change_percentage=24h,7d`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Filter to only include whitelisted tokens
        const whitelistedTokens = data.filter(token => {
            const symbol = token.symbol.toUpperCase();
            return ALLOWED_TOKENS.includes(symbol);
        });

        // Return only the requested limit
        return whitelistedTokens.slice(0, limit).map(token => ({
            id: token.id,
            symbol: token.symbol,
            name: token.name,
            image: token.image,
            currentPrice: token.current_price,
            marketCap: token.market_cap,
            marketCapRank: token.market_cap_rank,
            priceChange24h: token.price_change_percentage_24h,
            priceChange7d: token.price_change_percentage_7d_in_currency,
            volume24h: token.total_volume,
            circulatingSupply: token.circulating_supply,
            totalSupply: token.total_supply,
            high24h: token.high_24h,
            low24h: token.low_24h,
        }));
    } catch (error) {
        console.error('Error fetching top tokens:', error);
        throw error;
    }
}

/**
 * Fetch specific token prices
 * @param {Array<string>} tokenIds - Array of CoinGecko token IDs
 * @returns {Promise<Object>} Object with token prices
 */
export async function fetchTokenPrices(tokenIds) {
    try {
        const ids = tokenIds.join(',');
        const response = await fetch(
            `${API_ENDPOINTS.COINGECKO_PRICE}?ids=${ids}&vs_currencies=usd&include_24hr_change=true&include_market_cap=true`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching token prices:', error);
        throw error;
    }
}

/**
 * Fetch historical price data for a token
 * @param {string} tokenId - CoinGecko token ID
 * @param {number} days - Number of days of historical data
 * @returns {Promise<Array>} Array of price data points
 */
export async function fetchHistoricalPrices(tokenId, days = 7) {
    try {
        const response = await fetch(
            `https://api.coingecko.com/api/v3/coins/${tokenId}/market_chart?vs_currency=usd&days=${days}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        return data.prices.map(([timestamp, price]) => ({
            timestamp,
            price,
            date: new Date(timestamp),
        }));
    } catch (error) {
        console.error('Error fetching historical prices:', error);
        throw error;
    }
}

/**
 * Search for tokens by name or symbol (within whitelist only)
 * @param {string} query - Search query
 * @returns {Promise<Array>} Array of matching tokens
 */
export async function searchTokens(query) {
    try {
        // Fetch all whitelisted tokens (up to 250)
        const allTokens = await fetchTopTokens(250);

        // Filter tokens based on search query
        const searchLower = query.toLowerCase().trim();
        const matchingTokens = allTokens.filter(token => {
            const nameMatch = token.name.toLowerCase().includes(searchLower);
            const symbolMatch = token.symbol.toLowerCase().includes(searchLower);
            return nameMatch || symbolMatch;
        });

        // Return top 20 matches
        return matchingTokens.slice(0, 20);
    } catch (error) {
        console.error('Error searching tokens:', error);
        throw error;
    }
}

/**
 * Calculate price change between two values
 * @param {number} oldPrice - Previous price
 * @param {number} newPrice - Current price
 * @returns {number} Percentage change
 */
export function calculatePriceChange(oldPrice, newPrice) {
    if (!oldPrice || oldPrice === 0) return 0;
    return ((newPrice - oldPrice) / oldPrice) * 100;
}

/**
 * Determine which token performed better
 * @param {Object} tokenA - First token with price data
 * @param {Object} tokenB - Second token with price data
 * @returns {string} 'A', 'B', or 'TIE'
 */
export function compareTokenPerformance(tokenA, tokenB) {
    const changeA = tokenA.priceChange24h || 0;
    const changeB = tokenB.priceChange24h || 0;

    if (Math.abs(changeA - changeB) < 0.01) return 'TIE';
    return changeA > changeB ? 'A' : 'B';
}

/**
 * Create a price update listener (mock WebSocket for demo)
 * @param {Array<string>} tokenIds - Token IDs to watch
 * @param {Function} callback - Callback function for price updates
 * @returns {Function} Cleanup function
 */
export function subscribeToPriceUpdates(tokenIds, callback) {
    // In a real app, this would use WebSocket
    // For now, we'll poll every 30 seconds
    const interval = setInterval(async () => {
        try {
            const prices = await fetchTokenPrices(tokenIds);
            callback(prices);
        } catch (error) {
            console.error('Error in price update:', error);
        }
    }, 30000);

    // Return cleanup function
    return () => clearInterval(interval);
}
