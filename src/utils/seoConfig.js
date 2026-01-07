/**
 * SEO Configuration
 * Centralized metadata and structured data configuration for all routes
 */

// Site-wide configuration
export const SITE_CONFIG = {
    name: 'Crypto Leagues',
    tagline: 'Web3 Fantasy Trading & Crypto Predictions',
    baseUrl: 'https://cryptoleagues.io',
    defaultImage: '/assets/og-image.png',
    twitterHandle: '@leaguesdotfun',
    themeColor: '#09C285',
    language: 'en',
};

// Default metadata fallback
export const DEFAULT_META = {
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    description: 'Crypto Leagues is the premier Web3 fantasy trading platform. Compete in prediction markets, PvP battles, and build your dream crypto portfolio. No token holding required.',
    keywords: 'crypto fantasy, web3 trading, crypto predictions, dream team crypto, pvp crypto battles, fantasy crypto, blockchain gaming',
    image: SITE_CONFIG.defaultImage,
    type: 'website',
};

// Route-specific metadata
export const ROUTE_META = {
    '/': {
        title: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
        description: 'Crypto Leagues is the premier Web3 fantasy trading platform. Compete in prediction markets, PvP battles, and build your dream crypto portfolio without holding tokens.',
        keywords: 'crypto fantasy, web3 trading, crypto predictions, blockchain gaming, fantasy trading platform',
    },
    '/dream-team': {
        title: 'Dream Team | Build Your Crypto Portfolio | Crypto Leagues',
        description: 'Assemble a squad of 12 tokens, predict market movements, and compete for massive rewards. Build your ultimate crypto dream team and climb the leaderboards.',
        keywords: 'crypto dream team, fantasy crypto portfolio, token selection, crypto competition, daily crypto contest',
    },
    '/crypto-duel': {
        title: 'Crypto Duel | Head-to-Head Token Battles | Crypto Leagues',
        description: 'Select two tokens and predict which will outperform the other in real-time. It\'s a battle of relative strength—choose the stronger contender to claim victory.',
        keywords: 'crypto duel, token battle, head to head crypto, crypto comparison, token vs token',
    },
    '/pvp-battle': {
        title: 'PvP Battle | 1v1 Crypto Price Predictions | Crypto Leagues',
        description: 'Challenge other players in winner-takes-all 1v1 crypto price prediction duels. One goes Long, one goes Short—only one can win.',
        keywords: 'pvp crypto, 1v1 crypto battle, crypto prediction duel, player vs player crypto',
    },
    '/predict-candle': {
        title: 'Predict the Candle | Forecast Market Direction | Crypto Leagues',
        description: 'Put your technical analysis skills to the test. Study market patterns to forecast if the next candle will close green or red.',
        keywords: 'predict candle, crypto technical analysis, candle prediction, green or red candle, market direction',
    },
    '/time-based': {
        title: '60 Sec Sprint | Quick Crypto Predictions | Crypto Leagues',
        description: 'Feel the rush with quick decisions. Predict the price movement in just 60 seconds and beat the high-intensity race against time.',
        keywords: '60 second crypto, quick prediction, fast crypto trading, time based prediction, rapid crypto game',
    },
    '/prediction-market': {
        title: 'Prediction Market | Crypto Event Forecasting | Crypto Leagues',
        description: 'Explore trending prediction markets and place predictions on crypto events. Trade on outcomes and earn rewards for accurate forecasts.',
        keywords: 'crypto prediction market, event forecasting, crypto predictions, market predictions',
    },
    '/learn-more': {
        title: 'How It Works | Learn About Crypto Leagues',
        description: 'Discover how Crypto Leagues works. Learn about our game modes, platform mechanics, and how to start competing in crypto fantasy trading.',
        keywords: 'how crypto leagues works, crypto fantasy guide, game modes explained, get started crypto leagues',
    },
    '/faqs': {
        title: 'Frequently Asked Questions | Crypto Leagues',
        description: 'Find answers to common questions about Crypto Leagues. Learn about points, game modes, wallet safety, and how to get started.',
        keywords: 'crypto leagues faq, crypto fantasy questions, how to play, points system, wallet safety',
    },
    '/terms': {
        title: 'Terms of Use | Crypto Leagues',
        description: 'Read the Terms of Use for Crypto Leagues. Understand your rights and responsibilities when using our Web3 fantasy trading platform.',
        keywords: 'terms of use, crypto leagues terms, user agreement, platform rules',
    },
    '/privacy': {
        title: 'Privacy Policy | Crypto Leagues',
        description: 'Learn how Crypto Leagues protects your privacy. Our privacy policy explains data collection, usage, and your rights.',
        keywords: 'privacy policy, data protection, user privacy, crypto leagues privacy',
    },
};

// Organization structured data
export const ORGANIZATION_SCHEMA = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.baseUrl,
    logo: `${SITE_CONFIG.baseUrl}/assets/logo.png`,
    sameAs: [
        'https://x.com/leaguesdotfun',
        'https://discord.gg/cryptoleagues',
        'https://t.me/cryptoleagues',
    ],
    contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        url: `${SITE_CONFIG.baseUrl}/#/learn-more?section=support`,
    },
};

// Website structured data
export const WEBSITE_SCHEMA = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.baseUrl,
    description: DEFAULT_META.description,
    potentialAction: {
        '@type': 'SearchAction',
        target: {
            '@type': 'EntryPoint',
            urlTemplate: `${SITE_CONFIG.baseUrl}/?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
    },
};

// Breadcrumb configurations
export const BREADCRUMBS = {
    '/dream-team': [
        { name: 'Home', url: '/' },
        { name: 'Game Modes', url: '/learn-more?section=modes' },
        { name: 'Dream Team', url: '/dream-team' },
    ],
    '/crypto-duel': [
        { name: 'Home', url: '/' },
        { name: 'Game Modes', url: '/learn-more?section=modes' },
        { name: 'Crypto Duel', url: '/crypto-duel' },
    ],
    '/pvp-battle': [
        { name: 'Home', url: '/' },
        { name: 'Game Modes', url: '/learn-more?section=modes' },
        { name: 'PvP Battle', url: '/pvp-battle' },
    ],
    '/predict-candle': [
        { name: 'Home', url: '/' },
        { name: 'Game Modes', url: '/learn-more?section=modes' },
        { name: 'Predict the Candle', url: '/predict-candle' },
    ],
    '/time-based': [
        { name: 'Home', url: '/' },
        { name: 'Game Modes', url: '/learn-more?section=modes' },
        { name: '60 Sec Sprint', url: '/time-based' },
    ],
    '/prediction-market': [
        { name: 'Home', url: '/' },
        { name: 'Game Modes', url: '/learn-more?section=modes' },
        { name: 'Prediction Market', url: '/prediction-market' },
    ],
    '/learn-more': [
        { name: 'Home', url: '/' },
        { name: 'Learn More', url: '/learn-more' },
    ],
    '/faqs': [
        { name: 'Home', url: '/' },
        { name: 'FAQs', url: '/faqs' },
    ],
    '/terms': [
        { name: 'Home', url: '/' },
        { name: 'Terms of Use', url: '/terms' },
    ],
    '/privacy': [
        { name: 'Home', url: '/' },
        { name: 'Privacy Policy', url: '/privacy' },
    ],
};

// FAQ items for structured data
export const FAQ_ITEMS = [
    {
        question: 'What is Crypto Leagues?',
        answer: 'Crypto Leagues is a premier skill-based fantasy platform where you can compete in shorter-term prediction markets and battles using platform Points. Test your market skills without the risk of holding actual assets.',
    },
    {
        question: 'How do Points work?',
        answer: 'Points are primarily used for the Crypto Duel game mode. New users receive 100 Points upon connecting their wallet. You can spend points to enter Crypto Duels (20 Pts entry), and you can also earn Points as rewards for winning in other game modes across the platform.',
    },
    {
        question: 'Is this a gambling site?',
        answer: 'No. Crypto Leagues is a skill-based fantasy platform. You are predicting the crypto market macro movements and competing against other players.',
    },
    {
        question: 'How do I start participation?',
        answer: 'Simply connect your Web3 wallet (like MetaMask or Phantom) using the button in the top right. You will be able to participate in game modes (except Crypto Duel) using USDC.',
    },
    {
        question: 'What are the Game Modes?',
        answer: 'Crypto Duel: A head-to-head battle between two tokens. Predict the Candle: Predict if the next candle will be Green or Red. 60 Sec Sprint: Predict price movement in exactly 1 minute. PvP Battle: Challenge other players in 1v1 duels. Dream Team: Build a portfolio and compete for highest ROI.',
    },
    {
        question: 'Can I withdraw my Points?',
        answer: 'Currently, Points are for platform use only to climb the leaderboards and compete against others. Future updates may include rewards or prizes for top-ranking players.',
    },
    {
        question: 'Is my wallet safe?',
        answer: 'Yes. We only use your wallet for authentication (signing a message) to create your account. We never ask for your private keys or seed phrase, and we do not have access to your funds.',
    },
];

/**
 * Get metadata for a specific route
 * @param {string} route - The route path
 * @returns {Object} Merged metadata
 */
export function getRouteMeta(route) {
    const routeMeta = ROUTE_META[route] || {};
    return {
        ...DEFAULT_META,
        ...routeMeta,
        url: `${SITE_CONFIG.baseUrl}/#${route}`,
    };
}

/**
 * Generate breadcrumb schema for a route
 * @param {string} route - The route path
 * @returns {Object|null} Breadcrumb structured data or null
 */
export function getBreadcrumbSchema(route) {
    const crumbs = BREADCRUMBS[route];
    if (!crumbs) return null;

    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: crumbs.map((crumb, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: crumb.name,
            item: `${SITE_CONFIG.baseUrl}/#${crumb.url}`,
        })),
    };
}

/**
 * Generate FAQ page schema
 * @returns {Object} FAQPage structured data
 */
export function getFAQSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQ_ITEMS.map(item => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
            },
        })),
    };
}

/**
 * Generate WebPage schema for a route
 * @param {string} route - The route path
 * @returns {Object} WebPage structured data
 */
export function getWebPageSchema(route) {
    const meta = getRouteMeta(route);
    return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: meta.title,
        description: meta.description,
        url: meta.url,
        isPartOf: {
            '@type': 'WebSite',
            name: SITE_CONFIG.name,
            url: SITE_CONFIG.baseUrl,
        },
    };
}
