// Formatting Utilities

/**
 * Format wallet address to shortened version
 * @param {string} address - Full wallet address
 * @param {number} startChars - Number of characters to show at start
 * @param {number} endChars - Number of characters to show at end
 * @returns {string} Formatted address
 */
export function formatAddress(address, startChars = 6, endChars = 4) {
    if (!address) return '';
    if (address.length <= startChars + endChars) return address;
    return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}

/**
 * Format currency value
 * @param {number} value - Numeric value
 * @param {object} options - Formatting options
 * @returns {string} Formatted currency
 */
export function formatCurrency(value, options = {}) {
    const {
        currency = 'USD',
        minimumFractionDigits = 2,
        maximumFractionDigits = 6,
        compact = false,
    } = options;

    if (value === null || value === undefined) return '$0.00';

    // Handle compact notation for large numbers
    if (compact && Math.abs(value) >= 1000) {
        return formatCompactNumber(value, { prefix: '$' });
    }

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits,
        maximumFractionDigits,
    }).format(value);
}

/**
 * Format percentage value
 * @param {number} value - Numeric value
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted percentage
 */
export function formatPercentage(value, decimals = 2) {
    if (value === null || value === undefined) return '0.00%';

    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(decimals)}%`;
}

/**
 * Format large numbers with K, M, B suffixes
 * @param {number} value - Numeric value
 * @param {object} options - Formatting options
 * @returns {string} Formatted number
 */
export function formatCompactNumber(value, options = {}) {
    const { decimals = 2, prefix = '', suffix = '' } = options;

    if (value === null || value === undefined) return `${prefix}0${suffix}`;

    const absValue = Math.abs(value);
    const sign = value < 0 ? '-' : '';

    if (absValue >= 1e9) {
        return `${sign}${prefix}${(value / 1e9).toFixed(decimals)}B${suffix}`;
    }
    if (absValue >= 1e6) {
        return `${sign}${prefix}${(value / 1e6).toFixed(decimals)}M${suffix}`;
    }
    if (absValue >= 1e3) {
        return `${sign}${prefix}${(value / 1e3).toFixed(decimals)}K${suffix}`;
    }

    return `${sign}${prefix}${value.toFixed(decimals)}${suffix}`;
}

/**
 * Format timestamp to readable date
 * @param {number|Date} timestamp - Timestamp or Date object
 * @param {object} options - Formatting options
 * @returns {string} Formatted date
 */
export function formatDate(timestamp, options = {}) {
    const {
        includeTime = false,
        relative = false,
    } = options;

    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);

    if (relative) {
        return formatRelativeTime(date);
    }

    if (includeTime) {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(date);
    }

    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }).format(date);
}

/**
 * Format relative time (e.g., "2 hours ago")
 * @param {Date} date - Date object
 * @returns {string} Relative time string
 */
export function formatRelativeTime(date) {
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffSec < 60) return 'just now';
    if (diffMin < 60) return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
    if (diffHour < 24) return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
    if (diffDay < 7) return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;

    return formatDate(date);
}

/**
 * Format token amount with proper decimals
 * @param {number|string} amount - Token amount
 * @param {number} decimals - Token decimals
 * @returns {string} Formatted token amount
 */
export function formatTokenAmount(amount, decimals = 18) {
    if (!amount) return '0';

    const value = typeof amount === 'string' ? parseFloat(amount) : amount;
    const divisor = Math.pow(10, decimals);
    const formatted = value / divisor;

    if (formatted < 0.01) {
        return formatted.toExponential(2);
    }

    return formatted.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 6,
    });
}

/**
 * Get price change icon
 * @param {number} change - Price change percentage
 * @returns {string} Icon character
 */
export function getPriceChangeIcon(change) {
    if (change > 0) return '▲';
    if (change < 0) return '▼';
    return '●';
}

/**
 * Get price change class name
 * @param {number} change - Price change percentage
 * @returns {string} CSS class name
 */
export function getPriceChangeClass(change) {
    if (change > 0) return 'positive';
    if (change < 0) return 'negative';
    return 'neutral';
}

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export function truncateText(text, maxLength = 50) {
    if (!text || text.length <= maxLength) return text;
    return `${text.slice(0, maxLength)}...`;
}
