// Token Exclusion List
// This file contains all tokens that should be excluded from the Dream Team game
// Organized by category for easy maintenance and updates
// Last updated: 2025-12-06 with comprehensive user-provided list

/**
 * Comprehensive list of token IDs and symbols to exclude
 * Add new tokens to the appropriate category below
 */

export const EXCLUDED_TOKEN_IDS = [
    // ============================================
    // USD STABLECOINS
    // ============================================
    'tether', 'usdt', 'binance-bridged-usdt', 'usdt0', 'mantle-bridged-usdt-mantle',
    'usd-coin', 'usdc', 'circle-usdc', 'binance-bridged-usdc', 'polygon-bridged-usdc',
    'cronos-bridged-usdc', 'noble-usdc', 'usdc-e',
    'dai', 'polygon-pos-bridged-dai', 'usdai',
    'busd', 'binance-peg-busd', 'bfusd',
    'true-usd', 'trueusd', 'tusd',
    'paxos-standard',
    'gemini-dollar', 'gusd',
    'terrausd',
    'fei-usd',
    'first-digital-usd', 'fdusd',
    'ethena-usde', 'usde', 'ethena-staked-usde', 'susde',
    'usds', 'susdai', 'susds',
    'usdd',
    'paypal-usd', 'pyusd',
    'usd1',
    'falcon-usd', 'usdf',
    'blackrock-usd-institutional-digital-liquidity-fund', 'buidl',
    'circle-usyc', 'usyc',
    'ripple-usd', 'rlusd',
    'nexo',
    'ondo-us-dollar-yield', 'usdy',
    'usual-usd', 'usd0',
    'usdb',
    'usx',
    'cap-usd', 'cusd',
    'usda', 'aster-usdf',
    'resolv-usr', 'usr',
    'standx-dusd', 'dusd',
    'frax-usd', 'frxusd',
    'ausd',
    'satoshi-stablecoin', 'satusd',
    'syrup-finance', 'syrupusdc', 'syrup-usdc', 'syrupusdt',
    'global-dollar', 'usdg',
    'gho',
    'crvusd',
    'infinifi-usd', 'iusd',

    // ============================================
    // EURO STABLECOINS
    // ============================================
    'eutbl', 'euro-tether', 'eurt', 'stasis-eurs', 'eurs',
    'euro-coin', 'eurc',

    // ============================================
    // WRAPPED BITCOIN (BTC) VARIANTS
    // ============================================
    'wrapped-bitcoin', 'wbtc', 'polygon-bridged-wbtc-polygon-pos',
    'arbitrum-bridged-wbtc-arbitrum-one',
    'avalanche-bridged-btc-avalanche', 'btc-b',
    'coinbase-wrapped-btc', 'cbbtc',
    'renbtc',
    'hbtc',
    'tbtc',
    'imbtc',
    'obtc',
    'bitcoin-sv', 'bsv',

    // ============================================
    // BTC DERIVATIVES & STAKED BTC
    // ============================================
    'function-btc', 'fbtc',
    'solv-protocol-solvbtc', 'solvbtc', 'solv-protocol-staked-btc', 'xsolvbtc',
    'core-btc', 'clbtc',
    'lombard-staked-btc', 'lbtc',
    'unit-bitcoin', 'ubtc',
    'kraken-wrapped-btc', 'kbtc',
    'lorenzo-wrapped-bitcoin', 'enzobtc',
    'etherfi-staked-btc', 'ebtc',
    'sbtc',
    'cwbtc',

    // ============================================
    // WRAPPED ETHEREUM (ETH) VARIANTS
    // ============================================
    'weth', 'wrapped-eth', 'binance-peg-weth',
    'polygon-pos-bridged-weth-polygon-pos',
    'arbitrum-bridged-weth-arbitrum-one',
    'mantle-bridged-weth-mantle',
    'l2-standard-bridged-weth-base',
    'wrapped-hype', 'whype',

    // ============================================
    // STAKED ETHEREUM (ETH) VARIANTS
    // ============================================
    'staked-ether', 'steth', 'lido-staked-ether',
    'wrapped-steth', 'wsteth',
    'rocket-pool-eth', 'reth',
    'coinbase-wrapped-staked-ethereum', 'cbeth',
    'wrapped-beacon-eth', 'wbeth',
    'liquid-staked-ethereum', 'cgeth', 'lseth',
    'gteth',
    'kelp-dao-restaked-eth', 'rseth',
    'renzo-restaked-eth', 'ezeth',
    'mantle-staked-ether', 'meth',
    'mantle-restaked-eth', 'cmeth',
    'stakewise-staked-eth', 'swise', 'oseth',
    'stader-ethx', 'ethx',
    'etherfi-liquid-eth', 'eeth', 'liquideth',
    'wrapped-eeth', 'weeth',
    'arbitrum-bridged-wrapped-eeth-arbitrum-one',
    'etherfi-weeth', 'weeths',
    'swell-ethereum', 'sweth',
    'etherfi-staked-eth',
    'frax-ether', 'frxeth',
    'staked-frax-ether', 'sfrxeth',
    'super-oeth', 'superoeth',
    'ethplus', 'eth+',
    'cryptocom-staked-eth', 'cdceth',
    'cgeth-hashkey',
    'origin-ether',
    'treehouse-eth', 'teth',

    // ============================================
    // WRAPPED SOLANA (SOL) VARIANTS
    // ============================================
    'wrapped-solana', 'wsol', 'wrapped-sol',
    'binance-peg-sol',

    // ============================================
    // STAKED SOLANA (SOL) VARIANTS
    // ============================================
    'lido-staked-sol', 'stsol',
    'marinade-staked-sol', 'msol',
    'binance-staked-sol', 'bnsol',
    'jito-staked-sol', 'jitosol',
    'jupiter-staked-sol', 'jupsol',
    'drift-staked-sol', 'dsol',
    'phantom-staked-sol', 'psol',
    'bybit-staked-sol', 'bbsol',

    // ============================================
    // WRAPPED BNB VARIANTS
    // ============================================
    'wrapped-bnb', 'wbnb',
    'aster-staked-bnb', 'asbnb',

    // ============================================
    // WRAPPED AVAX VARIANTS
    // ============================================
    'wrapped-avax', 'wavax',
    'benqi-liquid-staked-avax', 'savax',

    // ============================================
    // WRAPPED MATIC VARIANTS
    // ============================================
    'wrapped-matic', 'wmatic',

    // ============================================
    // TREASURY/YIELD TOKENS
    // ============================================
    'superstate-short-duration-us-government-securities-fund', 'ustb', 'usdtb',
    'superstate-token', 'superstate',
    'janus-henderson-anemoy-aaa-clo-fund', 'jaaa',
    'janus-henderson-anemoy-treasury-fund', 'jtrsy',
    'mountain-protocol-usdm', 'usdm',
    'hashnote-us-yield-coin', 'usyc', 'hashnote-short-term-bond-fund',
    'ondo-us-government-bond-fund', 'ousg',
    'spiko-us-t-bills-money-market-fund', 'ustbl',
    'spiko-eu-t-bills-money-market-fund', 'eutbl',
    'theo-short-duration-us-treasury-fund', 'thbill',
    'fidelity-digital-interest-token', 'fdit',
    'steakhouse-usdc-morpho-vault', 'steakusdc',
    'apollo-diversified-credit-securitize-fund', 'acred',
    'payfi-strategy-token-usdc', 'pstusdc',

    // ============================================
    // GOLD/SILVER BACKED TOKENS
    // ============================================
    'pax-gold', 'paxg',
    'tether-gold', 'xaut',
    'gold-coin', 'glc',
    'digix-gold', 'dgx',
    'perth-mint-gold-token', 'pmgt',
    'cache-gold', 'cgt',
    'kinesis-gold', 'kau',
    'kinesis-silver', 'kag',

    // ============================================
    // JUPITER DERIVATIVES
    // ============================================
    'jupiter-perpetuals-liquidity-provider-token', 'jlp',

    // ============================================
    // EXCHANGE/PLATFORM TOKENS TO EXCLUDE
    // ============================================
    'leo-token', 'unus-sed-leo',
    'whitebit-coin', 'wbt',
    'htx-dao', 'htx',
    'sun-token', 'sun',
    'tokenize-xchange', 'tkx',
    'gate', 'gt',
    'bitget-token', 'bgb',
    'bitmart', 'bmx',
    'coinex', 'cet',
    'btse-token', 'btse',

    // ============================================
    // FORKS & LEGACY CHAINS
    // ============================================
    'bitcoin-cash', 'bch',
    'bitcoin-sv', 'bsv',
    'terra-luna-classic', 'lunc',
    'ecash', 'xec',

    // ============================================
    // OTHER EXCLUDED TOKENS
    // ============================================
    'hash', 'provenance-blockchain', 'provenance', 'hash-token',
    'heloc', 'figure-heloc', 'figr-heloc',
    'binance-peg-dogecoin',
    'savings-dai', 'sdai',
    'wrapped-aave-ethereum-usdc', 'waethusdc',
    'wrapped-aave-ethereum-usdt', 'waethusdt',
    'resolv-wstusdr', 'wstusr',
    'flare-bridged-xrp-flare', 'fxrp',
    'midas-mf-one', 'mf-one',
    'tradable-na-rent-financing-platform-sstn', 'pc0000031',
    'mag7-ssi', 'mag7.ssi',
    'binancelife',
    'dog-bitcoin', 'dog',
    'kub-coin', 'kub',
    'rollbit-coin', 'rlb',
    'spx6900', 'spx',
    'ultima', 'ultima',
    'just', 'jst',
    'staked-trx', 'strx',
    'ethena-staked-ena', 'sena',
    'loaded-lions', 'lion',
    'origintail', 'trac',
    'hajimi',
    'blockchain-capital', 'bcap',
    'syrup-usdc',
    'global-dollar',
    'ondo',
    'kaspa', 'kas',
    'worldcoin', 'wld',
    'flare', 'flr',
    'artificial-superintelligence-alliance', 'fet',
    'beldex', 'bdx',
    'aerodrome-finance', 'aero',
    'myx-finance', 'myx',
    'optimism', 'op',
    'floki', 'floki',
    'doublezero', '2z',
    'iota', 'iota',
    'bittorrent', 'btt',
    'basic-attention-token', 'bat',
    'olympus', 'ohm',
    'the-sandbox', 'sand',
    'decred', 'dcr',
    'ainft', 'nft',
    'vision', 'vsn',
    'mimblewimblecoin', 'mwc',
    'neo', 'neo',
    'ape-and-pepe', 'apepe',
    'zebec-network', 'zbcn',
    'falcon-finance', 'ff',
    'fluid', 'fluid',
    'reallink', 'real',
    'undeads-games', 'uds',
    'aethir', 'ath',
    'wormhole', 'w',
    'legacy-token', 'lgct',
    'sky-coin', 'xso',
    'wefi', 'wfi',
    'zano', 'zano',
    'ribbita-by-virtuals', 'tibbir',
    'uchain', 'ucn',
    'koge', 'koge',
    'concordium', 'ccd',
    'creditcoin', 'ctc',
    'sosovalue', 'soso',
    'theta-fuel', 'tfuel',
    'gomining-token', 'gomining',
    'conscious-token', 'conscious',
    'nexus-mutual', 'nxm',
    'metadao', 'meta',
    'quantum-resistant-ledger', 'qrl',
    'starkgate-bridged-usdc-starknet',
    'yearn-finance', 'yfi',
    'nexpace', 'nxpc',
    'chainlink', 'link',
    'ethereum-name-service', 'ens',
    'kinetiq-staked-hype', 'khype',
    'staked-usdai', 'susdai',
];

/**
 * Pattern-based exclusion rules
 * These catch tokens that match certain naming patterns
 */
export const EXCLUSION_PATTERNS = {
    // Symbol patterns
    symbolStartsWith: ['usd', 'eur', 'w', 'st'],
    symbolEndsWith: ['usd', 'eur'],
    symbolIncludes: ['usd', 'btc', 'eth'], // Will be checked with special logic

    // Name patterns
    nameIncludes: [
        'wrapped',
        'staked',
        'bridged',
        'pegged',
        'synthetic',
        'mirrored',
        'tokenized',
        'alternate',
        'liquid staking',
        'derivative',
        'treasury',
        'yield',
        'heloc',
        'euro',
        'binance-peg',
        'binance peg',
    ],
};

/**
 * Tokens that are allowed even if they match exclusion patterns
 * (e.g., original Bitcoin and Ethereum)
 */
export const ALLOWED_EXCEPTIONS = [
    'bitcoin',    // Allow original BTC
    'ethereum',   // Allow original ETH
];
