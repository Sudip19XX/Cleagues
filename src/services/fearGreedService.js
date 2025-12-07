// Fear and Greed Index Service
// Fetches market sentiment data from CoinMarketCap API

const CMC_API_BASE = 'https://pro-api.coinmarketcap.com/v3';
const CMC_API_KEY = import.meta.env.VITE_CMC_API_KEY || '';

/**
 * Fetch the latest Fear and Greed Index value
 * @returns {Promise<{value: number, classification: string, timestamp: string}>}
 */
export async function fetchFearGreedIndex() {
    try {
        // For demo purposes, if no API key is set, return mock data
        if (!CMC_API_KEY) {
            console.warn('CoinMarketCap API key not set, using mock data');
            return {
                value: 62,
                classification: 'Greed',
                timestamp: new Date().toISOString()
            };
        }

        const response = await fetch(`${CMC_API_BASE}/fear-and-greed/historical?limit=1`, {
            headers: {
                'X-CMC_PRO_API_KEY': CMC_API_KEY,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();

        if (data.status.error_code !== 0) {
            throw new Error(data.status.error_message || 'API error');
        }

        // Get the latest entry
        const latest = data.data[0];

        return {
            value: latest.value,
            classification: latest.value_classification,
            timestamp: latest.timestamp
        };
    } catch (error) {
        console.error('Error fetching Fear and Greed Index:', error);

        // Return fallback data
        return {
            value: 62,
            classification: 'Greed',
            timestamp: new Date().toISOString()
        };
    }
}

/**
 * Get color based on Fear and Greed value
 * @param {number} value - Fear and Greed Index value (0-100)
 * @returns {string} - Color hex code
 */
export function getFearGreedColor(value) {
    if (value <= 25) return '#FF4D4F'; // Extreme Fear - Red
    if (value <= 45) return '#FFA940'; // Fear - Orange
    if (value <= 55) return '#FFD700'; // Neutral - Yellow
    if (value <= 75) return '#52C41A'; // Greed - Light Green
    return '#09C285'; // Extreme Greed - Green
}

/**
 * Get classification text based on value
 * @param {number} value - Fear and Greed Index value (0-100)
 * @returns {string} - Classification text
 */
export function getFearGreedClassification(value) {
    if (value <= 25) return 'Extreme Fear';
    if (value <= 45) return 'Fear';
    if (value <= 55) return 'Neutral';
    if (value <= 75) return 'Greed';
    return 'Extreme Greed';
}
