// Application Constants

// Supported Chains
export const CHAINS = {
  EVM: 'evm',
  SOLANA: 'solana',
};

// EVM Networks
export const EVM_NETWORKS = {
  ETHEREUM: {
    id: 1,
    name: 'Ethereum',
    rpcUrl: 'https://eth.llamarpc.com',
    blockExplorer: 'https://etherscan.io',
  },
  POLYGON: {
    id: 137,
    name: 'Polygon',
    rpcUrl: 'https://polygon-rpc.com',
    blockExplorer: 'https://polygonscan.com',
  },
  ARBITRUM: {
    id: 42161,
    name: 'Arbitrum',
    rpcUrl: 'https://arb1.arbitrum.io/rpc',
    blockExplorer: 'https://arbiscan.io',
  },
  BASE: {
    id: 8453,
    name: 'Base',
    rpcUrl: 'https://mainnet.base.org',
    blockExplorer: 'https://basescan.org',
  },
};

// Solana Networks
export const SOLANA_NETWORKS = {
  MAINNET: {
    name: 'Solana Mainnet',
    rpcUrl: 'https://api.mainnet-beta.solana.com',
    blockExplorer: 'https://explorer.solana.com',
  },
  DEVNET: {
    name: 'Solana Devnet',
    rpcUrl: 'https://api.devnet.solana.com',
    blockExplorer: 'https://explorer.solana.com?cluster=devnet',
  },
};

// Game Modes
export const GAME_MODES = {
  CRYPTO_DUEL: {
    name: 'Crypto Duel',
    description: 'Pick two tokens and predict which will outperform',
    path: '/crypto-duel',
    icon: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="coin-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#09C285"/>
              <stop offset="100%" style="stop-color:#07a371"/>
            </linearGradient>
          </defs>
          <!-- Left coin (Bitcoin) - slides in from left -->
          <g class="coin-left">
            <circle cx="18" cy="32" r="14" fill="url(#coin-grad)" opacity="0.9"/>
            <circle cx="18" cy="32" r="10" fill="none" stroke="#FFFFFF" stroke-width="2"/>
            <text x="18" y="36" text-anchor="middle" fill="#FFFFFF" font-size="12" font-weight="bold">₿</text>
          </g>
          
          <!-- VS text in center -->
          <g class="vs-badge">
            <circle cx="32" cy="32" r="8" fill="#FFFFFF" stroke="url(#coin-grad)" stroke-width="2"/>
            <text x="32" y="36" text-anchor="middle" fill="#09C285" font-size="10" font-weight="bold">VS</text>
          </g>
          
          <!-- Right coin (Ethereum) - slides in from right -->
          <g class="coin-right">
            <circle cx="46" cy="32" r="14" fill="url(#coin-grad)" opacity="0.9"/>
            <circle cx="46" cy="32" r="10" fill="none" stroke="#FFFFFF" stroke-width="2"/>
            <text x="46" y="36" text-anchor="middle" fill="#FFFFFF" font-size="12" font-weight="bold">Ξ</text>
          </g>
          
          <!-- Impact/clash effects -->
          <g class="clash-effects">
            <line x1="32" y1="18" x2="32" y2="14" stroke="#09C285" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="32" y1="46" x2="32" y2="50" stroke="#09C285" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="26" y1="22" x2="23" y2="19" stroke="#09C285" stroke-width="2" stroke-linecap="round"/>
            <line x1="38" y1="22" x2="41" y2="19" stroke="#09C285" stroke-width="2" stroke-linecap="round"/>
            <line x1="26" y1="42" x2="23" y2="45" stroke="#09C285" stroke-width="2" stroke-linecap="round"/>
            <line x1="38" y1="42" x2="41" y2="45" stroke="#09C285" stroke-width="2" stroke-linecap="round"/>
          </g>
        </svg>`,
  },
  DREAM_TEAM: {
    name: 'Dream Team',
    description: 'Build your ultimate crypto portfolio of 15 tokens',
    path: '/dream-team',
    icon: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="team-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#09C285"/>
              <stop offset="100%" style="stop-color:#07a371"/>
            </linearGradient>
          </defs>
          <!-- Center person (appears first) -->
          <g class="team-member-1">
            <circle cx="32" cy="22" r="6" fill="url(#team-grad)"/>
            <path d="M20 48C20 38 25 34 32 34C39 34 44 38 44 48" fill="url(#team-grad)"/>
          </g>
          
          <!-- Left front person (appears second - 0.5s delay) -->
          <g class="team-member-2">
            <circle cx="16" cy="26" r="5" fill="url(#team-grad)" opacity="0.8"/>
            <path d="M8 48C8 40 11 36 16 36C21 36 24 40 24 48" fill="url(#team-grad)" opacity="0.8"/>
          </g>
          
          <!-- Right front person (appears third - 1s delay) -->
          <g class="team-member-3">
            <circle cx="48" cy="26" r="5" fill="url(#team-grad)" opacity="0.8"/>
            <path d="M40 48C40 40 43 36 48 36C53 36 56 40 56 48" fill="url(#team-grad)" opacity="0.8"/>
          </g>
          
          <!-- Left back person (appears fourth - 1.5s delay) -->
          <g class="team-member-4">
            <circle cx="10" cy="30" r="4" fill="url(#team-grad)" opacity="0.6"/>
            <path d="M4 48C4 42 6 38 10 38C14 38 16 42 16 48" fill="url(#team-grad)" opacity="0.6"/>
          </g>
          
          <!-- Right back person (appears fifth - 2s delay) -->
          <g class="team-member-5">
            <circle cx="54" cy="30" r="4" fill="url(#team-grad)" opacity="0.6"/>
            <path d="M48 48C48 42 50 38 54 38C58 38 60 42 60 48" fill="url(#team-grad)" opacity="0.6"/>
          </g>
        </svg>`,
  },
  TIME_BASED: {
    name: '1min Frenzy',
    description: 'Make quick decisions before time runs out',
    path: '/time-based',
    icon: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <style>
            @keyframes tick {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            .stopwatch-hand {
              transform-origin: 32px 34px;
              animation: tick 2s steps(60) infinite;
            }
          </style>
          
          <defs>
            <linearGradient id="time-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#09C285"/>
              <stop offset="100%" style="stop-color:#07a371"/>
            </linearGradient>
          </defs>
          
          <!-- Stopwatch Body -->
          <circle cx="32" cy="34" r="22" stroke="url(#time-grad)" stroke-width="3" fill="none"/>
          <circle cx="32" cy="34" r="22" stroke="url(#time-grad)" stroke-width="3" fill="url(#time-grad)" opacity="0.1"/>
          
          <!-- Top Button -->
          <path d="M26 6H38V10H26V6Z" fill="url(#time-grad)"/>
          <rect x="30" y="2" width="4" height="4" fill="url(#time-grad)"/>
          
          <!-- Ticks -->
          <path d="M32 16V19" stroke="url(#time-grad)" stroke-width="2" stroke-linecap="round"/>
          <path d="M32 49V52" stroke="url(#time-grad)" stroke-width="2" stroke-linecap="round"/>
          <path d="M47 34H44" stroke="url(#time-grad)" stroke-width="2" stroke-linecap="round"/>
          <path d="M17 34H20" stroke="url(#time-grad)" stroke-width="2" stroke-linecap="round"/>
          
          <!-- Hand -->
          <line x1="32" y1="34" x2="32" y2="20" stroke="#FF4D4F" stroke-width="2" stroke-linecap="round" class="stopwatch-hand"/>
          
          <!-- Center Dot -->
          <circle cx="32" cy="34" r="3" fill="#3B82F6"/>
        </svg>`,
  },
  PREDICT_CANDLE: {
    name: 'Predict Candle',
    description: 'Forecast if the next candle will be green or red',
    path: '/predict-candle',
    icon: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="green-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#09C285"/>
              <stop offset="100%" style="stop-color:#07a371"/>
            </linearGradient>
            <linearGradient id="red-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#FF4D4F"/>
              <stop offset="100%" style="stop-color:#ff3336"/>
            </linearGradient>
          </defs>
          <!-- Candle 1 - Green (animates) -->
          <g class="candle-1">
            <line x1="10" y1="20" x2="10" y2="48" stroke="url(#green-grad)" stroke-width="1.5"/>
            <rect x="7" y="28" width="6" height="16" fill="url(#green-grad)" rx="1"/>
          </g>
          
          <!-- Candle 2 - Red (animates) -->
          <g class="candle-2">
            <line x1="20" y1="16" x2="20" y2="44" stroke="url(#red-grad)" stroke-width="1.5"/>
            <rect x="17" y="24" width="6" height="12" fill="url(#red-grad)" rx="1"/>
          </g>
          
          <!-- Candle 3 - Green (animates) -->
          <g class="candle-3">
            <line x1="30" y1="22" x2="30" y2="50" stroke="url(#green-grad)" stroke-width="1.5"/>
            <rect x="27" y="30" width="6" height="14" fill="url(#green-grad)" rx="1"/>
          </g>
          
          <!-- Candle 4 - Red (animates) -->
          <g class="candle-4">
            <line x1="40" y1="18" x2="40" y2="46" stroke="url(#red-grad)" stroke-width="1.5"/>
            <rect x="37" y="26" width="6" height="14" fill="url(#red-grad)" rx="1"/>
          </g>
          
          <!-- Candle 5 - Green (animates) -->
          <g class="candle-5">
            <line x1="50" y1="14" x2="50" y2="42" stroke="url(#green-grad)" stroke-width="1.5"/>
            <rect x="47" y="22" width="6" height="16" fill="url(#green-grad)" rx="1"/>
          </g>
          
          <!-- Trend line -->
          <path d="M6 46 L16 38 L26 42 L36 34 L46 36 L56 28" stroke="#09C285" stroke-width="1.5" stroke-dasharray="3 3" opacity="0.5"/>
        </svg>`,
  },
};

// Time Periods
export const TIME_PERIODS = {
  ONE_MIN: { hours: 1 / 60, label: '1M', minutes: 1 },
  TEN_MINS: { hours: 10 / 60, label: '10M', minutes: 10 },
  THIRTY_MINS: { hours: 0.5, label: '30M', minutes: 30 },
  ONE_HOUR: { hours: 1, label: '1H', minutes: 60 },
  FOUR_HOURS: { hours: 4, label: '4H', minutes: 240 },
  ONE_DAY: { hours: 24, label: '1D', minutes: 1440 },
};

// Point Multipliers
export const MULTIPLIERS = {
  CAPTAIN: 2,
  VICE_CAPTAIN: 1.5,
  REGULAR: 1,
};

// API Endpoints
export const API_ENDPOINTS = {
  COINGECKO_MARKETS: 'https://api.coingecko.com/api/v3/coins/markets',
  COINGECKO_PRICE: 'https://api.coingecko.com/api/v3/simple/price',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  WALLET_PREFERENCE: 'crypto_leagues_wallet_pref',
  THEME: 'crypto_leagues_theme',
  DRAFT_PREDICTIONS: 'crypto_leagues_drafts',
};

// Contract Addresses (Placeholder - Update with actual deployed contracts)
export const CONTRACT_ADDRESSES = {
  [EVM_NETWORKS.ETHEREUM.id]: {
    GAME_PREDICTION: '0x0000000000000000000000000000000000000000',
    TEAM_MANAGEMENT: '0x0000000000000000000000000000000000000000',
    LEADERBOARD: '0x0000000000000000000000000000000000000000',
  },
  [EVM_NETWORKS.POLYGON.id]: {
    GAME_PREDICTION: '0x0000000000000000000000000000000000000000',
    TEAM_MANAGEMENT: '0x0000000000000000000000000000000000000000',
    LEADERBOARD: '0x0000000000000000000000000000000000000000',
  },
  SOLANA: {
    GAME_PREDICTION: '11111111111111111111111111111111',
    TEAM_MANAGEMENT: '11111111111111111111111111111111',
    LEADERBOARD: '11111111111111111111111111111111',
  },
};

// Top Crypto Tokens (Fallback if API fails)
export const TOP_TOKENS = [
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum' },
  { id: 'binancecoin', symbol: 'BNB', name: 'BNB' },
  { id: 'solana', symbol: 'SOL', name: 'Solana' },
  { id: 'ripple', symbol: 'XRP', name: 'XRP' },
  { id: 'cardano', symbol: 'ADA', name: 'Cardano' },
  { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin' },
  { id: 'polkadot', symbol: 'DOT', name: 'Polkadot' },
  { id: 'polygon', symbol: 'MATIC', name: 'Polygon' },
  { id: 'chainlink', symbol: 'LINK', name: 'Chainlink' },
];
