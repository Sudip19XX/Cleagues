import { createFooter } from "./Footer.js";
import { createBackgroundLines } from "./BackgroundLines.js";
import { GAME_MODES } from "../utils/constants.js";

export function createLearnMorePage() {
    const page = document.createElement('div');
    page.className = 'learn-more-page';

    // Add futuristic grid background
    const bg = createBackgroundLines();
    page.appendChild(bg);

    // Main container with top padding for header
    const container = document.createElement('div');
    container.className = 'container';
    container.style.cssText = `
        padding-top: 100px;
        min-height: 100vh;
        max-width: 900px;
    `;

    // 1. Hero / About Us Section
    const heroSection = document.createElement('section');
    heroSection.id = 'about-section';
    heroSection.style.marginBottom = 'var(--spacing-3xl)';
    heroSection.style.textAlign = 'center';
    heroSection.innerHTML = `
        <h1 style="
            font-size: 3.5rem; 
            margin-bottom: var(--spacing-xl); 
            background: var(--gradient-primary);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        ">
            About Crypto Leagues
        </h1>
        <p style="
            font-size: 1.2rem; 
            line-height: 1.8; 
            color: var(--color-text-secondary);
            margin-bottom: var(--spacing-lg);
        ">
            This platform is a one-of-a-kind crypto-native fantasy platform where users can have a similar experience like that of fantasy sports, but in crypto. Users can predict market movements and earn real rewards without the risk of holding cryptocurrency tokens.
        </p>
        <p style="
            font-size: 1.2rem; 
            line-height: 1.8; 
            color: var(--color-text-secondary);
        ">
             Our mission is to gamify crypto trading while bridging the fantasy element present in sports into crypto. Due to its ease of use, even Web2 as well as Web3 beginners can compete alongside seasoned Web3 experts.
        </p>
    `;

    // 2. Our Game Modes Section
    const howItWorksSection = document.createElement('section');
    howItWorksSection.id = 'modes-section';
    howItWorksSection.style.marginBottom = 'var(--spacing-3xl)';
    howItWorksSection.innerHTML = `
        <h2 style="font-size: 2.5rem; margin-bottom: var(--spacing-xl); text-align: center; color: var(--color-primary);">Our League Modes</h2>
        
        <div class="accordion-list" style="max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; gap: var(--spacing-md);">
            <!-- Items generated below -->
        </div>

        <script>
            // Helper to create accordion functionality (will be handled by event listener below)
        </script>
    `;

    const leagueModes = [
        {
            icon: GAME_MODES.DREAM_TEAM.icon,
            title: 'Dream Team',
            description: 'Build a portfolio of 12 tokens and predict their movements to earn points. Compete against other players\' choices—stay in the top 10 to guarantee massive rewards. Entry fee for this mode is just 5 USDC.'
        },
        {
            icon: GAME_MODES.PVP_MODE.icon,
            title: 'PvP Battles',
            description: 'Choose a token and predict it will go up or down and publicly challenge online players. When one accepts, it\'s game on. MAKE YOUR CHOICE WISELY IN THIS WINNER TAKES ALL MODE.'
        },
        {
            icon: GAME_MODES.PREDICT_CANDLE.icon,
            title: 'Predict Candle',
            description: 'Predict whether the next candle will close green or red, ranging from 1 minute to 1 day. Enter with 10$ & get 2x rewards'
        },
        {
            icon: GAME_MODES.TIME_BASED.icon,
            title: '60 Sec Sprint',
            description: 'Feel the rush with quick decisions. Predict the price movement in just 60 seconds. Beat the high-intensity race against time.'
        },
        {
            icon: GAME_MODES.CRYPTO_DUEL.icon,
            title: 'Crypto Duel',
            description: 'Gather points for future rewards and the ability to get discounts on entry fees in other game modes. Choose two coins, select which token will perform better, and get 2x points.'
        }
    ];

    const accordionList = howItWorksSection.querySelector('.accordion-list');

    leagueModes.forEach((mode, index) => {
        const item = document.createElement('div');
        item.className = 'accordion-item';
        item.style.cssText = `
            background: var(--glass-bg);
            border: 1px solid var(--glass-border);
            border-radius: var(--radius-lg);
            overflow: hidden;
            transition: all 0.3s ease;
            cursor: pointer;
        `;

        item.innerHTML = `
            <div class="accordion-header" style="
                padding: var(--spacing-lg);
                display: flex;
                align-items: center;
                gap: var(--spacing-md);
            ">
                <div style="width: 48px; height: 48px; display: flex; align-items: center; justify-content: center;">${mode.icon}</div>
                <h3 style="margin: 0; flex-grow: 1; font-size: 1.25rem;">${mode.title}</h3>
                <div class="accordion-arrow" style="
                    transition: transform 0.3s ease;
                    color: var(--color-text-secondary);
                ">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </div>
            </div>
            <div class="accordion-content" style="
                max-height: 0;
                overflow: hidden;
                transition: max-height 0.3s ease, padding 0.3s ease;
                padding: 0 var(--spacing-lg);
                opacity: 0;
            ">
                <p style="
                    color: var(--color-text-secondary); 
                    line-height: 1.6;
                    padding-bottom: var(--spacing-lg);
                    margin: 0;
                ">${mode.description}</p>
            </div>
        `;

        // Add Click Event
        item.addEventListener('click', () => {
            const content = item.querySelector('.accordion-content');
            const arrow = item.querySelector('.accordion-arrow');
            const isOpen = content.style.maxHeight !== '0px';

            // Close all others (optional, but usually nicer for accordions)
            // Array.from(accordionList.children).forEach(child => {
            //     if (child !== item) {
            //          // verify if this is what user wants, usually "accordion" implies one open at a time
            //          // but user said "can be expanded", didn't specify auto-close. 
            //          // keeping it independent for now is safer/simpler user experience for this context.
            //     }
            // });

            if (isOpen) {
                // Close
                content.style.maxHeight = '0px';
                content.style.paddingTop = '0';
                content.style.paddingBottom = '0'; // clear padding specifically
                content.style.opacity = '0';
                arrow.style.transform = 'rotate(0deg)';
                item.style.borderColor = 'var(--glass-border)';
                item.style.backgroundColor = 'var(--glass-bg)';
            } else {
                // Open
                content.style.maxHeight = content.scrollHeight + 40 + 'px'; // + padding buffer
                content.style.opacity = '1';
                arrow.style.transform = 'rotate(180deg)';

                // Highlight active style
                item.style.borderColor = 'var(--color-primary)';
                item.style.backgroundColor = 'rgba(9, 194, 133, 0.05)';
            }
        });

        // Initial state force close style
        const content = item.querySelector('.accordion-content');
        content.style.maxHeight = '0px';

        accordionList.appendChild(item);
    });

    // 3. Support & Community Section
    const supportSection = document.createElement('section');
    supportSection.id = 'support-section';
    supportSection.style.marginBottom = 'var(--spacing-3xl)';

    supportSection.innerHTML = `
        <h2 style="font-size: 2.5rem; margin-bottom: var(--spacing-xl); text-align: center;">Support & Community</h2>
        <div class="card" style="
            background: linear-gradient(135deg, rgba(9, 194, 133, 0.1) 0%, rgba(9, 194, 133, 0.05) 100%); 
            border: 1px solid rgba(9, 194, 133, 0.2);
            padding: var(--spacing-xl);
            text-align: center;
        ">
            <p style="font-size: 1.1rem; margin-bottom: var(--spacing-lg); color: var(--color-text-primary);">
                Contact us via the following platforms:
            </p>
            <div style="display: flex; justify-content: center; gap: var(--spacing-lg); flex-wrap: wrap;">
                ${[
            {
                name: 'Join Discord',
                url: 'https://discord.gg/cryptoleagues',
                icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M8 12a1 1 0 1 0 2 0a1 1 0 0 0 -2 0"/>
                            <path d="M14 12a1 0 1 0 2 0a1 0 0 0 -2 0"/>
                            <path d="M15.5 17c0 1 1.5 3 2 3c1.5 0 2.833 -1.667 3.5 -3c.667 -1.667 .5 -5.833 -1.5 -11.5c-1.457 -1.015 -3 -1.34 -4.5 -1.5l-.972 1.923a11.913 11.913 0 0 0 -4.053 0l-.975 -1.923c-1.5 .16 -3.043 .485 -4.5 1.5c-2 5.667 -2.167 9.833 -1.5 11.5c.667 1.333 2 3 3.5 3c.5 0 2 -2 2 -3"/>
                            <path d="M7 16.5c3.5 1 6.5 1 10 0"/>
                        </svg>`
            },
            {
                name: 'Follow on X',
                url: 'https://x.com/leaguesdotfun',
                icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M4 4l11.733 16h4.267l-11.733 -16z"/>
                            <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/>
                        </svg>`
            }
        ].map(link => `
                    <a href="${link.url}" target="_blank" style="
                        display: flex;
                        align-items: center;
                        gap: var(--spacing-sm);
                        padding: 12px 24px;
                        background: rgba(9, 194, 133, 0.15);
                        border: 1px solid rgba(9, 194, 133, 0.3);
                        border-radius: 14px;
                        color: #09C285;
                        text-decoration: none;
                        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                        backdrop-filter: blur(20px);
                        font-weight: 600;
                        font-family: inherit;
                        box-shadow: 0 4px 16px rgba(9, 194, 133, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(0, 0, 0, 0.05);
                    "
                    onmouseover="this.style.background='rgba(9, 194, 133, 0.25)'; this.style.borderColor='rgba(9, 194, 133, 0.4)'; this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 24px rgba(9, 194, 133, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(0, 0, 0, 0.05)';"
                    onmouseout="this.style.background='rgba(9, 194, 133, 0.15)'; this.style.borderColor='rgba(9, 194, 133, 0.3)'; this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 16px rgba(9, 194, 133, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(0, 0, 0, 0.05)';"
                    >
                        ${link.icon}
                        <span>${link.name}</span>
                    </a>
                `).join('')}
            </div>
        </div>
    `;

    container.appendChild(heroSection);
    container.appendChild(howItWorksSection);
    container.appendChild(supportSection);

    // Add Footer to the bottom of the page container
    container.appendChild(createFooter());

    page.appendChild(container);

    // Handle deep linking
    setTimeout(() => {
        if (window.location.hash.includes('section=support')) {
            const el = document.getElementById('support-section');
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            }
        } else if (window.location.hash.includes('section=about')) {
            const el = document.getElementById('about-section');
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            }
        } else if (window.location.hash.includes('section=modes')) {
            const el = document.getElementById('modes-section');
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
                // Expand all accordion items
                setTimeout(() => {
                    const items = el.querySelectorAll('.accordion-item');
                    items.forEach(item => {
                        const content = item.querySelector('.accordion-content');
                        const arrow = item.querySelector('.accordion-arrow');

                        // Force open
                        content.style.maxHeight = '500px';
                        content.style.opacity = '1';
                        if (arrow) arrow.style.transform = 'rotate(180deg)';
                        item.style.borderColor = 'var(--color-primary)';
                        item.style.backgroundColor = 'rgba(9, 194, 133, 0.05)';
                    });
                }, 300); // Small delay to ensure render/scroll
            }
        }
    }, 100);

    return page;
}
