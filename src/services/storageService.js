// Local Storage Service

import { STORAGE_KEYS } from '../utils/constants.js';

/**
 * Get item from local storage
 * @param {string} key - Storage key
 * @param {*} defaultValue - Default value if key doesn't exist
 * @returns {*} Stored value or default
 */
export function getItem(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error(`Error reading from localStorage (${key}):`, error);
        return defaultValue;
    }
}

/**
 * Set item in local storage
 * @param {string} key - Storage key
 * @param {*} value - Value to store
 */
export function setItem(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(`Error writing to localStorage (${key}):`, error);
    }
}

/**
 * Remove item from local storage
 * @param {string} key - Storage key
 */
export function removeItem(key) {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error(`Error removing from localStorage (${key}):`, error);
    }
}

/**
 * Clear all items from local storage
 */
export function clearAll() {
    try {
        localStorage.clear();
    } catch (error) {
        console.error('Error clearing localStorage:', error);
    }
}

// Wallet Preferences
export function getWalletPreference() {
    return getItem(STORAGE_KEYS.WALLET_PREFERENCE);
}

export function setWalletPreference(preference) {
    setItem(STORAGE_KEYS.WALLET_PREFERENCE, preference);
}

// Theme
export function getTheme() {
    return getItem(STORAGE_KEYS.THEME, 'dark');
}

export function setTheme(theme) {
    setItem(STORAGE_KEYS.THEME, theme);
}

// Draft Predictions
export function getDraftPredictions() {
    return getItem(STORAGE_KEYS.DRAFT_PREDICTIONS, []);
}

export function saveDraftPrediction(prediction) {
    const drafts = getDraftPredictions();
    drafts.push({
        ...prediction,
        timestamp: Date.now(),
    });
    setItem(STORAGE_KEYS.DRAFT_PREDICTIONS, drafts);
}

export function removeDraftPrediction(index) {
    const drafts = getDraftPredictions();
    drafts.splice(index, 1);
    setItem(STORAGE_KEYS.DRAFT_PREDICTIONS, drafts);
}

export function clearDraftPredictions() {
    setItem(STORAGE_KEYS.DRAFT_PREDICTIONS, []);
}
