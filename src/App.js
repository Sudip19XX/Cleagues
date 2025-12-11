// Main Application Component

import { createHeader } from './components/Header.js';
import { createSidebar, initSidebar } from './components/Sidebar.js';
import { createHomePage } from './components/HomePage.js';
import { createCryptoDuel } from './components/games/CryptoDuel.js';
import { createDreamTeam } from './components/games/DreamTeam.js';
import { createTimeBasedAction } from './components/games/TimeBasedAction.js';
import { createPredictCandle } from './components/games/PredictCandle.js';
import { createPvPBattle } from './components/games/PvPBattle.js';
import { createPendingActionWidget, onRouteChange } from './components/PendingActionWidget.js';

import { createPredictionMarket } from './components/PredictionMarket.js';

// Simple router state
let currentRoute = '/';
let sidebarElement = null;
let appContainerElement = null;
let mainElement = null;
let headerElement = null;

export function createApp() {
    const app = document.createElement('div');
    app.className = 'app';

    // Create header
    headerElement = createHeader();
    app.appendChild(headerElement);

    // Create app container for sidebar + main content
    appContainerElement = document.createElement('div');
    appContainerElement.className = 'app-container';

    // Create sidebar (will be shown/hidden based on route)
    sidebarElement = createSidebar();
    appContainerElement.appendChild(sidebarElement);

    // Create main content area
    mainElement = document.createElement('main');
    mainElement.className = 'main-content';
    mainElement.style.minHeight = 'calc(100vh - 64px)';
    appContainerElement.appendChild(mainElement);

    app.appendChild(appContainerElement);

    // Create pending action widget (floating)
    createPendingActionWidget();

    // Initial render
    renderRoute(mainElement);

    // Initialize sidebar navigation
    setTimeout(() => initSidebar(), 0);

    // Listen for route changes
    window.addEventListener('popstate', () => {
        renderRoute(mainElement);
        onRouteChange(); // Update widget visibility
    });

    // Listen for sidebar navigation
    window.addEventListener('navigate', (e) => {
        const page = e.detail.page;
        navigate(`/${page}`);
    });

    return app;
}

function renderRoute(container) {
    // Clear current content
    container.innerHTML = '';

    // Get current route
    const path = window.location.hash.slice(1) || '/';
    currentRoute = path;

    // Determine if sidebar should be shown
    const isGameMode = ['/crypto-duel', '/dream-team', '/time-based', '/predict-candle', '/pvp-battle', '/prediction-market'].includes(path);

    if (headerElement) {
        if (path === '/') {
            headerElement.classList.add('home-transparent');
        } else {
            headerElement.classList.remove('home-transparent');
        }
    }

    // Show/hide sidebar based on route
    if (sidebarElement) {
        if (isGameMode) {
            sidebarElement.style.display = 'flex';
            // Main content should have sidebar spacing
            if (mainElement) {
                mainElement.style.marginLeft = '';
                mainElement.style.width = '';
            }
        } else {
            sidebarElement.style.display = 'none';
            // Main content should take full width
            if (mainElement) {
                mainElement.style.marginLeft = '0';
                mainElement.style.width = '100%';
            }
        }
    }

    // Render appropriate component
    let component;

    switch (path) {
        case '/':
            component = createHomePage();
            break;
        case '/crypto-duel':
            component = createCryptoDuel();
            break;
        case '/dream-team':
            component = createDreamTeam();
            break;
        case '/time-based':
            component = createTimeBasedAction();
            break;
        case '/predict-candle':
            component = createPredictCandle();
            break;
        case '/pvp-battle':
            component = createPvPBattle();
            break;
        case '/prediction-market':
            component = createPredictionMarket();
            break;
        default:
            component = create404Page();
    }

    container.appendChild(component);

    // Scroll to top
    window.scrollTo(0, 0);
}

function create404Page() {
    const page = document.createElement('div');
    page.className = 'container';
    page.style.cssText = 'text-align: center; padding: var(--spacing-3xl);';

    page.innerHTML = `
    <h1 style="font-size: 4rem; margin-bottom: var(--spacing-md);">404</h1>
    <p style="font-size: 1.5rem; color: var(--color-text-secondary); margin-bottom: var(--spacing-xl);">
      Page not found
    </p>
    <a href="#/" class="btn btn-primary">Go Home</a>
  `;

    return page;
}

// Navigation helper
export function navigate(path) {
    window.location.hash = path;
    window.dispatchEvent(new PopStateEvent('popstate'));
}
