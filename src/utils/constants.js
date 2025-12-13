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
  BASE_SEPOLIA: {
    id: 84532,
    name: 'Base Sepolia',
    rpcUrl: 'https://sepolia.base.org',
    blockExplorer: 'https://sepolia.basescan.org',
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

// USDC Contract Addresses
export const USDC_ADDRESSES = {
  [EVM_NETWORKS.ETHEREUM.id]: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  [EVM_NETWORKS.POLYGON.id]: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359', // Native USDC
  [EVM_NETWORKS.ARBITRUM.id]: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
  [EVM_NETWORKS.BASE.id]: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
  [EVM_NETWORKS.BASE_SEPOLIA.id]: '0x036CbD53842c5426634e7929541eC2318f3dCF7e', // Base Sepolia USDC
  SOLANA: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', // Native USDC on Solana
};

// Game Modes
export const GAME_MODES = {
  CRYPTO_DUEL: {
    name: 'Crypto Duel',
    description: "Select two distinct tokens and predict which will outperform the other in real-time. It's a battle of relative strength—choose the stronger contender to claim victory.",
    path: '/crypto-duel',
    icon: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="duel-green" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#09C285"/>
              <stop offset="100%" style="stop-color:#07a371"/>
            </linearGradient>
            <linearGradient id="duel-red" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#EF4444"/>
              <stop offset="100%" style="stop-color:#DC2626"/>
            </linearGradient>
          </defs>
          <style>
            @keyframes duel-float-1 {
              0%, 100% { transform: translate(0, 0); }
              50% { transform: translate(-3px, 3px); }
            }
            @keyframes duel-float-2 {
              0%, 100% { transform: translate(0, 0); }
              50% { transform: translate(3px, -3px); }
            }
            @keyframes spark-flash {
              0%, 100% { opacity: 0; transform: scale(0.5); }
              50% { opacity: 1; transform: scale(1.2); }
            }
          </style>
          
          <!-- Coin 1 (Top Right) - Green/Bitcoin -->
          <g style="animation: duel-float-1 2s ease-in-out infinite;">
            <circle cx="42" cy="22" r="12" fill="url(#duel-green)" stroke="none"/>
            <circle cx="42" cy="22" r="12" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
            <!-- Better Bitcoin B (Filled) -->
             <g transform="translate(35, 15) scale(0.6)">
                <path fill="white" d="M16.4,12.5c1.4-0.9,2.3-2.3,2-4.2c-0.5-2.5-2.4-3.5-5.6-3.7V0h-2.8v4.6H7.7V0H4.9v4.5H0v2.9h2.8 c0.3,0,0.6-0.1,0.8,0.3v8.5c0,0.4-0.3,0.3-0.8,0.3H0v2.9h4.9v4.8h2.8v-4.7h2.3c3.7,0,5.9-1.3,6.3-4.6 C16.4,14.6,16.5,13.3,16.4,12.5z M9.1,6.8h2.5c2,0,2.1,0.8,2.1,1.9s-0.2,2-2.1,2H9.1V6.8z M9.7,16.7H7.1v-4.5h2.8 c2.1,0,2.3,1,2.3,2.2S11.9,16.7,9.7,16.7z"/>
             </g>
          </g>

          <!-- Coin 2 (Bottom Left) - Red/Ethereum -->
          <g style="animation: duel-float-2 2s ease-in-out infinite;">
            <circle cx="22" cy="42" r="12" fill="url(#duel-red)" stroke="none"/>
            <circle cx="22" cy="42" r="12" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
            <!-- ETH Logo (Wireframe) -->
            <g transform="translate(15, 30) scale(0.6)">
                <!-- Top Pyramid -->
                <path d="M11 1 L1 17 L11 23 L21 17 Z" stroke="white" stroke-width="2" stroke-linejoin="round" fill="none"/>
                <path d="M11 1 L11 23" stroke="white" stroke-width="2" stroke-linejoin="round" fill="none"/>
                <!-- Bottom Pyramid -->
                <path d="M11 26 L1 17 L11 36 L21 17 Z" stroke="white" stroke-width="2" stroke-linejoin="round" fill="none"/>
                <path d="M11 26 L11 36" stroke="white" stroke-width="2" stroke-linejoin="round" fill="none"/>
            </g>
          </g>

          <!-- Clash/Spark in center -->
          <path d="M32 28 L35 32 L39 29 L36 35 L40 40 L34 37 L30 42 L31 36 L26 33 L31 31 Z" fill="#FFFFFF" style="animation: spark-flash 1s ease-in-out infinite; transform-origin: center;"/>
        </svg>`,
  },
  DREAM_TEAM: {
    name: 'Dream Team',
    description: 'Assemble a squad of 12 tokens, predict market movements, and outperform other players. Climb the leaderboards & get massive rewards.',
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
            <circle cx="32" cy="22" r="6" fill="url(#team-grad)" stroke="none"/>
            <path d="M20 48C20 38 25 34 32 34C39 34 44 38 44 48" fill="url(#team-grad)" stroke="none"/>
          </g>
          
          <!-- Left front person (appears second - 0.5s delay) -->
          <g class="team-member-2">
            <circle cx="16" cy="26" r="5" fill="url(#team-grad)" opacity="0.8" stroke="none"/>
            <path d="M8 48C8 40 11 36 16 36C21 36 24 40 24 48" fill="url(#team-grad)" opacity="0.8" stroke="none"/>
          </g>
          
          <!-- Right front person (appears third - 1s delay) -->
          <g class="team-member-3">
            <circle cx="48" cy="26" r="5" fill="url(#team-grad)" opacity="0.8" stroke="none"/>
            <path d="M40 48C40 40 43 36 48 36C53 36 56 40 56 48" fill="url(#team-grad)" opacity="0.8" stroke="none"/>
          </g>
          
          <!-- Left back person (appears fourth - 1.5s delay) -->
          <g class="team-member-4">
            <circle cx="10" cy="30" r="4" fill="url(#team-grad)" opacity="0.6" stroke="none"/>
            <path d="M4 48C4 42 6 38 10 38C14 38 16 42 16 48" fill="url(#team-grad)" opacity="0.6" stroke="none"/>
          </g>
          
          <!-- Right back person (appears fifth - 2s delay) -->
          <g class="team-member-5">
            <circle cx="54" cy="30" r="4" fill="url(#team-grad)" opacity="0.6" stroke="none"/>
            <path d="M48 48C48 42 50 38 54 38C58 38 60 42 60 48" fill="url(#team-grad)" opacity="0.6" stroke="none"/>
          </g>
        </svg>`,
  },
  TIME_BASED: {
    name: '60 Sec Sprint',
    description: "Feel the rush with quick decisions. Predict the price movement in just 60 seconds. Beat the high-intensity race against time.",
    path: '/time-based',
    icon: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="time-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#09C285"/>
              <stop offset="100%" style="stop-color:#07a371"/>
            </linearGradient>
          </defs>
          <style>
              @keyframes tick-tock {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
              }
              .clock-hand {
                  transform-origin: 32px 36px;
                  animation: tick-tock 2s linear infinite;
              }
          </style>

          <!-- Top Plunger Button (y=16 to 20) -->
          <rect x="25" y="16" width="14" height="4" rx="2" stroke="url(#time-grad)" stroke-width="2.5" fill="none"/>
          
          <!-- Stem (y=20 to 24) -->
          <path d="M32 20 V 24" stroke="url(#time-grad)" stroke-width="2.5"/>

          <!-- Body (y=24 to 48, cy=36, r=12) -->
          <circle cx="32" cy="36" r="12" stroke="url(#time-grad)" stroke-width="2.5"/>

          <!-- Side Button -->
          <path d="M42 27 L45 24" stroke="url(#time-grad)" stroke-width="2.5" stroke-linecap="round"/>

          <!-- Hands -->
          <g class="clock-hand">
             <path d="M32 36 V 28" stroke="url(#time-grad)" stroke-width="2.5" stroke-linecap="round"/>
             <path d="M32 36 L 37 41" stroke="url(#time-grad)" stroke-width="2.5" stroke-linecap="round"/>
          </g>
          
          <!-- Center Dot -->
          <circle cx="32" cy="36" r="2" fill="url(#time-grad)"/>
        </svg>`,
  },
  PREDICT_CANDLE: {
    name: 'Predict Candle',
    description: 'Put your technical analysis skills to the test. Study market patterns to forecast the direction of the upcoming candle. Will it close green or red?',
    path: '/predict-candle',
    icon: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="green-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#09C285"/>
              <stop offset="100%" style="stop-color:#07a371"/>
            </linearGradient>
            <linearGradient id="red-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#EF4444"/>
              <stop offset="100%" style="stop-color:#DC2626"/>
            </linearGradient>
          </defs>
          <style>
            @keyframes slide-up {
              0% { opacity: 0; transform: translateY(15px); }
              20% { opacity: 1; transform: translateY(0); }
              80% { opacity: 1; transform: translateY(0); }
              100% { opacity: 0; transform: translateY(0); }
            }
            @keyframes slide-down {
              0% { opacity: 0; transform: translateY(-15px); }
              20% { opacity: 1; transform: translateY(0); }
              80% { opacity: 1; transform: translateY(0); }
              100% { opacity: 0; transform: translateY(0); }
            }
            
            .c-anim { opacity: 0; }
            
            .candle-1 { animation: slide-up 4s ease-out infinite; animation-delay: 0s; }
            .candle-2 { animation: slide-down 4s ease-out infinite; animation-delay: 0.8s; }
            .candle-3 { animation: slide-up 4s ease-out infinite; animation-delay: 1.6s; }
            .candle-4 { animation: slide-down 4s ease-out infinite; animation-delay: 2.4s; }
            .candle-5 { animation: slide-up 4s ease-out infinite; animation-delay: 3.2s; }
          </style>

          <!-- Candle 1 - Green (Up) -->
          <g class="candle-1 c-anim">
            <line x1="12" y1="20" x2="12" y2="48" stroke="url(#green-grad)" stroke-width="2"/>
            <rect x="9" y="30" width="6" height="12" fill="url(#green-grad)" rx="1" stroke="none"/>
          </g>
          
          <!-- Candle 2 - Red (Down) -->
          <g class="candle-2 c-anim">
            <line x1="22" y1="18" x2="22" y2="46" stroke="url(#red-grad)" stroke-width="2"/>
            <rect x="19" y="24" width="6" height="12" fill="url(#red-grad)" rx="1" stroke="none"/>
          </g>
          
          <!-- Candle 3 - Green (Up) -->
          <g class="candle-3 c-anim">
            <line x1="32" y1="22" x2="32" y2="50" stroke="url(#green-grad)" stroke-width="2"/>
            <rect x="29" y="32" width="6" height="14" fill="url(#green-grad)" rx="1" stroke="none"/>
          </g>
          
          <!-- Candle 4 - Red (Down) -->
          <g class="candle-4 c-anim">
            <line x1="42" y1="16" x2="42" y2="44" stroke="url(#red-grad)" stroke-width="2"/>
            <rect x="39" y="22" width="6" height="14" fill="url(#red-grad)" rx="1" stroke="none"/>
          </g>
          
          <!-- Candle 5 - Green (Up) -->
          <g class="candle-5 c-anim">
            <line x1="52" y1="14" x2="52" y2="42" stroke="url(#green-grad)" stroke-width="2"/>
            <rect x="49" y="20" width="6" height="16" fill="url(#green-grad)" rx="1" stroke="none"/>
          </g>
        </svg>`,
  },
  PVP_MODE: {
    name: 'PvP Battle',
    description: 'One player goes Long, the other goes Short—only <strong>one can win</strong>. Lock in your prediction and challenge an opponent in this winner-takes-all showdown.',
    path: '/pvp-battle', // Placeholder path
    icon: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
        @keyframes clash-l-strike {
           0%, 100% { transform: translate(0, 0) rotate(0deg); } /* Crossed Guard */
           20% { transform: translate(-4px, 4px) rotate(-15deg); } /* Windup (Pull back) */
           40% { transform: translate(2px, -2px) rotate(5deg); } /* Strike/Clash! */
           60% { transform: translate(0, 0) rotate(0deg); } /* Recoil/Return */
        }
        @keyframes clash-r-strike {
           0%, 100% { transform: translate(0, 0) rotate(0deg); } /* Crossed Guard */
           20% { transform: translate(4px, 4px) rotate(15deg); } /* Windup (Pull back) */
           40% { transform: translate(-2px, -2px) rotate(-5deg); } /* Strike/Clash! */
           60% { transform: translate(0, 0) rotate(0deg); } /* Recoil/Return */
        }
        .sword-main-l {
           transform-origin: center;
           animation: clash-l-strike 1.2s infinite ease-in-out;
           transform-box: fill-box;
        }
        .sword-main-r {
           transform-origin: center;
           animation: clash-r-strike 1.2s infinite ease-in-out;
           transform-box: fill-box;
        }
      </style>
      <g transform="translate(14, 14) scale(1.5)">
        <!-- Green Sword (Left/Up) -->
        <g class="sword-main-l">
          <path d="M21 3v5l-11 9l-4 4l-3 -3l4 -4l9 -11z" stroke="#09C285" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M5 13l6 6" stroke="#09C285" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <!-- Red Sword (Right/Down) -->
        <g class="sword-main-r">
          <path d="M14.32 17.32l3.68 3.68l3 -3l-3.365 -3.365" stroke="#EF4444" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M10 5.5l-2 -2.5h-5v5l3 2.5" stroke="#EF4444" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
      </g>
    </svg>`,
  },
  PREDICTION_MARKET: {
    name: 'Prediction Market',
    description: 'Explore trending prediction markets and place predictions.',
    path: '/prediction-market',
    icon: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="30" stroke="currentColor" stroke-width="4"/>
      <text x="32" y="38" text-anchor="middle" font-size="24" fill="currentColor" font-family="Arial" font-weight="bold">PM</text>
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
