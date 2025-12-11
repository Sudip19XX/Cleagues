// Global Winners Service - Tracks winners from all game modes

// In-memory store of recent winners
let recentWinners = [
    { address: '0x7a9f...3b2c', gameMode: 'Dream Team', amount: 25000, timestamp: Date.now() - 2 * 60 * 60 * 1000 },
    { address: '0x4e1d...8f9a', gameMode: 'PvP Battle', amount: 10000, timestamp: Date.now() - 5 * 60 * 60 * 1000 },
    { address: '0x9c2b...5d7e', gameMode: 'Crypto Duel', amount: 5000, timestamp: Date.now() - 8 * 60 * 60 * 1000 },
    { address: '0x3f8a...2c1d', gameMode: 'Time Based', amount: 2500, timestamp: Date.now() - 12 * 60 * 60 * 1000 },
    { address: '0x1b5e...7a4f', gameMode: 'Predict Candle', amount: 1000, timestamp: Date.now() - 18 * 60 * 60 * 1000 },
    { address: '0x8d2c...4e7b', gameMode: 'Dream Team', amount: 750, timestamp: Date.now() - 20 * 60 * 60 * 1000 },
];

// Subscribers for winner updates
let subscribers = [];

/**
 * Get all recent winners sorted by most recent first
 * @param {number} limit - Maximum number of winners to return
 * @returns {Array} Recent winners
 */
export function getRecentWinners(limit = 10) {
    return [...recentWinners]
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, limit);
}

/**
 * Add a new winner (called when someone wins in any game mode)
 * @param {Object} winner - Winner data { address, gameMode, amount }
 */
export function addWinner(winner) {
    const newWinner = {
        ...winner,
        timestamp: Date.now(),
    };

    recentWinners.unshift(newWinner);

    // Keep only last 50 winners
    if (recentWinners.length > 50) {
        recentWinners = recentWinners.slice(0, 50);
    }

    // Notify subscribers
    notifySubscribers();
}

/**
 * Subscribe to winner updates
 * @param {Function} callback - Called when winners list changes
 * @returns {Function} Unsubscribe function
 */
export function subscribeToWinners(callback) {
    subscribers.push(callback);
    return () => {
        subscribers = subscribers.filter(sub => sub !== callback);
    };
}

/**
 * Notify all subscribers of changes
 */
function notifySubscribers() {
    const winners = getRecentWinners();
    subscribers.forEach(callback => callback(winners));
}

/**
 * Format timestamp to relative time string
 * @param {number} timestamp 
 * @returns {string}
 */
export function formatRelativeTime(timestamp) {
    const now = Date.now();
    const diffMs = now - timestamp;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
}

/**
 * Format amount with currency
 * @param {number} amount 
 * @returns {string}
 */
export function formatWinAmount(amount) {
    return `$${amount.toLocaleString()}`;
}
