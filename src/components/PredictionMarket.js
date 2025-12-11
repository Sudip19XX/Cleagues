
import { fetchTrendingMarkets, searchMarkets, fetchMarketsByCategory, formatVolume } from '../services/polymarketService.js';

export function createPredictionMarket() {
    const page = document.createElement('div');
    page.className = 'prediction-market-page';
    page.style.cssText = `
        padding: var(--spacing-xl);
        max-width: 1200px;
        margin: 0 auto;
        animation: fadeIn 0.5s ease-out;
    `;

    // Header
    const header = document.createElement('div');
    header.style.cssText = `
        margin-bottom: var(--spacing-2xl);
        text-align: center;
    `;
    header.innerHTML = `
        <h1 style="font-size: 2.5rem; margin-bottom: var(--spacing-sm); display: flex; align-items: center; justify-content: center; gap: 12px;">
            <span style="font-size: 2.5rem;">🔮</span> Polymarket Trending
        </h1>
        <p style="color: var(--color-text-secondary); font-size: 1.1rem;">
            Top trending prediction markets happening right now
        </p>
    `;
    page.appendChild(header);

    // Search and Filter Container
    const controls = document.createElement('div');
    controls.style.cssText = `
        display: flex;
        flex-direction: column;
        gap: var(--spacing-md);
        margin-bottom: var(--spacing-xl);
        max-width: 800px;
        margin-left: auto;
        margin-right: auto;
    `;
    page.appendChild(controls);

    // Search Bar
    const searchContainer = document.createElement('div');
    searchContainer.style.cssText = `
        position: relative;
        width: 100%;
    `;
    searchContainer.innerHTML = `
        <input type="text" id="market-search" placeholder="Search markets (e.g. Trump, Crypto, NFL)..." style="
            width: 100%;
            padding: 12px 20px;
            padding-left: 48px;
            background: var(--glass-bg);
            border: 1px solid var(--glass-border);
            border-radius: var(--radius-full);
            color: var(--color-text-primary);
            font-size: 1rem;
            outline: none;
            transition: border-color 0.2s;
        ">
        <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="
            position: absolute;
            left: 16px;
            top: 50%;
            transform: translateY(-50%);
            color: var(--color-text-muted);
            pointer-events: none;
        ">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
    `;
    controls.appendChild(searchContainer);

    // Categories
    const categories = [
        { id: 'all', label: 'Trending' }, // Default
        { id: 'politics', label: 'Politics', tagId: '2' }, // Verified ID: 2
        { id: 'crypto', label: 'Crypto', tagId: '21' }, // Verified ID: 21
        { id: 'sports', label: 'Sports', tagId: '1' }, // Verified ID: 1
        { id: 'pop-culture', label: 'Pop Culture' }, // Fallback to search
        { id: 'business', label: 'Business' }, // Fallback to search
        { id: 'science', label: 'Science' }, // Fallback to search
    ];

    const categoryContainer = document.createElement('div');
    categoryContainer.style.cssText = `
        display: flex;
        gap: var(--spacing-sm);
        overflow-x: auto;
        padding-bottom: 4px;
        scrollbar-width: none;
        justify-content: center;
    `;

    let activeCategory = 'all';

    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.textContent = cat.label;
        btn.className = `category-btn ${cat.id === activeCategory ? 'active' : ''}`;
        btn.style.cssText = `
            padding: 8px 16px;
            border-radius: var(--radius-full);
            border: 1px solid var(--glass-border);
            background: ${cat.id === activeCategory ? 'var(--color-primary)' : 'var(--glass-bg)'};
            color: ${cat.id === activeCategory ? '#000' : 'var(--color-text-secondary)'};
            font-size: 0.9rem;
            cursor: pointer;
            white-space: nowrap;
            transition: all 0.2s;
        `;

        btn.onclick = () => {
            // Update UI
            document.querySelectorAll('.category-btn').forEach(b => {
                b.style.background = 'var(--glass-bg)';
                b.style.color = 'var(--color-text-secondary)';
            });
            btn.style.background = 'var(--color-primary)';
            btn.style.color = '#000';

            activeCategory = cat.id;
            loadMarkets(grid, { category: cat });
        };

        categoryContainer.appendChild(btn);
    });
    controls.appendChild(categoryContainer);


    // Grid Container
    const grid = document.createElement('div');
    grid.className = 'prediction-grid';
    grid.style.cssText = `
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: var(--spacing-lg);
    `;
    page.appendChild(grid);

    // Initial Load
    grid.innerHTML = `
        <div style="grid-column: 1 / -1; display: flex; flex-direction: column; align-items: center; padding: 40px;">
            <div class="loading" style="width: 40px; height: 40px; margin-bottom: 20px;"></div>
            <div style="color: var(--color-text-secondary);">Loading markets...</div>
        </div>
    `;

    loadMarkets(grid);

    // Search Logic
    const searchInput = searchContainer.querySelector('#market-search');
    let bounceTimer;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(bounceTimer);
        bounceTimer = setTimeout(() => {
            const query = e.target.value.trim();
            if (query.length > 2) {
                loadMarkets(grid, { search: query });
            } else if (query.length === 0) {
                loadMarkets(grid, { category: categories.find(c => c.id === activeCategory) });
            }
        }, 500);
    });

    return page;
}

async function loadMarkets(container, { category = { id: 'all' }, search = '' } = {}) {
    container.innerHTML = `
        <div style="grid-column: 1 / -1; display: flex; flex-direction: column; align-items: center; padding: 40px;">
            <div class="loading" style="width: 40px; height: 40px; margin-bottom: 20px;"></div>
            <div style="color: var(--color-text-secondary);">Loading...</div>
        </div>
    `;

    try {
        let markets = [];

        if (search) {
            markets = await searchMarkets(search);
        } else if (category.id === 'all') {
            markets = await fetchTrendingMarkets(20);
        } else {
            // Use tagId if available, otherwise search by label
            if (category.tagId) {
                markets = await fetchMarketsByCategory(category.tagId);
            } else {
                markets = await searchMarkets(category.label);
            }
        }

        if (markets.length === 0) {
            container.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--color-text-secondary);">
                    No markets found.
                </div>
            `;
            return;
        }

        container.innerHTML = ''; // Clear loading

        markets.forEach(market => {
            const card = createMarketCard(market);
            container.appendChild(card);
        });

    } catch (error) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--color-danger);">
                Failed to load markets.
            </div>
        `;
    }
}

function createMarketCard(market) {
    const card = document.createElement('div');
    card.className = 'market-card';
    card.style.cssText = `
        background: var(--glass-bg);
        border: 1px solid var(--glass-border);
        border-radius: var(--radius-lg);
        overflow: hidden;
        transition: transform 0.2s, box-shadow 0.2s;
        display: flex;
        flex-direction: column;
        height: 100%;
    `;

    // Hover effect
    card.onmouseenter = () => {
        card.style.transform = 'translateY(-4px)';
        card.style.borderColor = 'var(--color-primary)';
    };
    card.onmouseleave = () => {
        card.style.transform = 'translateY(0)';
        card.style.borderColor = 'var(--glass-border)';
    };

    // Calculate probabilities if available
    const yesPrice = market.outcomePrices?.[0] ? (parseFloat(market.outcomePrices[0]) * 100).toFixed(0) : '0';
    const noPrice = market.outcomePrices?.[1] ? (parseFloat(market.outcomePrices[1]) * 100).toFixed(0) : '0';

    card.innerHTML = `
        <div style="padding: var(--spacing-md); display: flex; gap: var(--spacing-md); border-bottom: 1px solid var(--glass-border);">
            <img src="${market.image}" alt="Market" style="width: 48px; height: 48px; border-radius: 50%; object-fit: cover; background: var(--color-bg-tertiary);">
            <div style="flex: 1;">
                <div style="font-size: 0.75rem; color: var(--color-primary); font-weight: 600; text-transform: uppercase; margin-bottom: 4px;">
                    ${market.category}
                </div>
                <div style="font-weight: 600; font-size: 1rem; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                    ${market.title}
                </div>
            </div>
        </div>
        
        <div style="padding: var(--spacing-md); flex: 1; display: flex; flex-direction: column; justify-content: flex-end;">
            
            <div style="display: flex; gap: 8px; margin-bottom: var(--spacing-md);">
                <div style="flex: 1; background: rgba(9, 194, 133, 0.1); border: 1px solid rgba(9, 194, 133, 0.3); padding: 8px; border-radius: 8px; text-align: center;">
                    <div style="font-size: 0.75rem; color: var(--color-text-secondary); margin-bottom: 2px;">Yes</div>
                    <div style="font-weight: 700; color: #09C285; font-size: 1.1rem;">${yesPrice}%</div>
                </div>
                <div style="flex: 1; background: rgba(255, 77, 79, 0.1); border: 1px solid rgba(255, 77, 79, 0.3); padding: 8px; border-radius: 8px; text-align: center;">
                     <div style="font-size: 0.75rem; color: var(--color-text-secondary); margin-bottom: 2px;">No</div>
                    <div style="font-weight: 700; color: #FF4D4F; font-size: 1.1rem;">${noPrice}%</div>
                </div>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem; color: var(--color-text-secondary);">
                <div>24h Vol: <span style="color: var(--color-text-primary);">${formatVolume(market.volume24hr)}</span></div>
                <a href="https://polymarket.com/event/${market.slug}" target="_blank" class="btn btn-sm btn-secondary" style="text-decoration: none;">View</a>
            </div>
        </div>
    `;

    return card;
}
