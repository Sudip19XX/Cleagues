// Main Application Entry Point

import '/src/styles/index.css';
import '/src/styles/components.css';
import '/src/styles/game-cards.css';
import '/src/styles/animations.css';
import '/src/styles/sidebar.css';
import { createApp } from './App.js';
import walletManager from './wallet/walletManager.js';

// Initialize the application
async function init() {
    console.log('🚀 Initializing Crypto Leagues...');

    // Try to auto-connect wallet
    try {
        await walletManager.autoConnect();
    } catch (error) {
        console.log('No previous wallet connection found');
    }

    // Create and mount the app
    const app = createApp();
    const appContainer = document.getElementById('app');

    if (appContainer) {
        appContainer.appendChild(app);
    } else {
        console.error('App container not found!');
    }

    console.log('✅ Crypto Leagues initialized');
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
