// Candlestick Service - Binance WebSocket Integration
// Real-time OHLC data for Predict the Candle game

/**
 * Binance-supported tokens with their trading pair symbols
 * Format: Symbol -> Binance trading pair (always paired with USDT)
 */
export const BINANCE_TOKENS = {
    // Major Cryptocurrencies
    'BTC': { pair: 'BTCUSDT', name: 'Bitcoin', image: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png' },
    'ETH': { pair: 'ETHUSDT', name: 'Ethereum', image: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png' },
    'XRP': { pair: 'XRPUSDT', name: 'XRP', image: 'https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png' },
    'BNB': { pair: 'BNBUSDT', name: 'BNB', image: 'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png' },
    'SOL': { pair: 'SOLUSDT', name: 'Solana', image: 'https://assets.coingecko.com/coins/images/4128/small/solana.png' },
    'TRX': { pair: 'TRXUSDT', name: 'TRON', image: 'https://assets.coingecko.com/coins/images/1094/small/tron-logo.png' },
    'DOGE': { pair: 'DOGEUSDT', name: 'Dogecoin', image: 'https://assets.coingecko.com/coins/images/5/small/dogecoin.png' },
    'ADA': { pair: 'ADAUSDT', name: 'Cardano', image: 'https://assets.coingecko.com/coins/images/975/small/cardano.png' },
    'LINK': { pair: 'LINKUSDT', name: 'Chainlink', image: 'https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png' },
    'AVAX': { pair: 'AVAXUSDT', name: 'Avalanche', image: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png' },
    'SUI': { pair: 'SUIUSDT', name: 'Sui', image: 'https://assets.coingecko.com/coins/images/26375/small/sui_asset.jpeg' },
    'XLM': { pair: 'XLMUSDT', name: 'Stellar', image: 'https://assets.coingecko.com/coins/images/100/small/Stellar_symbol_black_RGB.png' },
    'LTC': { pair: 'LTCUSDT', name: 'Litecoin', image: 'https://assets.coingecko.com/coins/images/2/small/litecoin.png' },
    'SHIB': { pair: 'SHIBUSDT', name: 'Shiba Inu', image: 'https://assets.coingecko.com/coins/images/11939/small/shiba.png' },
    'DOT': { pair: 'DOTUSDT', name: 'Polkadot', image: 'https://assets.coingecko.com/coins/images/12171/small/polkadot.png' },
    'UNI': { pair: 'UNIUSDT', name: 'Uniswap', image: 'https://assets.coingecko.com/coins/images/12504/small/uniswap-uni.png' },
    'AAVE': { pair: 'AAVEUSDT', name: 'Aave', image: 'https://assets.coingecko.com/coins/images/12645/small/AAVE.png' },
    'NEAR': { pair: 'NEARUSDT', name: 'NEAR', image: 'https://assets.coingecko.com/coins/images/10365/small/near.jpg' },
    'ETC': { pair: 'ETCUSDT', name: 'Ethereum Classic', image: 'https://assets.coingecko.com/coins/images/453/small/ethereum-classic-logo.png' },
    'ICP': { pair: 'ICPUSDT', name: 'Internet Computer', image: 'https://assets.coingecko.com/coins/images/14495/small/Internet_Computer_logo.png' },
    'PEPE': { pair: 'PEPEUSDT', name: 'Pepe', image: 'https://assets.coingecko.com/coins/images/29850/small/pepe-token.jpeg' },
    'APT': { pair: 'APTUSDT', name: 'Aptos', image: 'https://assets.coingecko.com/coins/images/26455/small/aptos_round.png' },
    'ALGO': { pair: 'ALGOUSDT', name: 'Algorand', image: 'https://assets.coingecko.com/coins/images/4380/small/download.png' },
    'ARB': { pair: 'ARBUSDT', name: 'Arbitrum', image: 'https://assets.coingecko.com/coins/images/16547/small/photo_2023-03-29_21.47.00.jpeg' },
    'VET': { pair: 'VETUSDT', name: 'VeChain', image: 'https://assets.coingecko.com/coins/images/1167/small/VET_Token_Icon.png' },
    'FIL': { pair: 'FILUSDT', name: 'Filecoin', image: 'https://assets.coingecko.com/coins/images/12817/small/filecoin.png' },
    'ATOM': { pair: 'ATOMUSDT', name: 'Cosmos', image: 'https://assets.coingecko.com/coins/images/1481/small/cosmos_hub.png' },
    'SEI': { pair: 'SEIUSDT', name: 'Sei', image: 'https://assets.coingecko.com/coins/images/28205/small/Sei_Logo_-_Transparent.png' },
    'CAKE': { pair: 'CAKEUSDT', name: 'PancakeSwap', image: 'https://assets.coingecko.com/coins/images/12632/small/pancakeswap-cake-logo.png' },
    'BONK': { pair: 'BONKUSDT', name: 'Bonk', image: 'https://assets.coingecko.com/coins/images/28600/small/bonk.jpg' },
    'OP': { pair: 'OPUSDT', name: 'Optimism', image: 'https://assets.coingecko.com/coins/images/25244/small/Optimism.png' },
    'INJ': { pair: 'INJUSDT', name: 'Injective', image: 'https://assets.coingecko.com/coins/images/12882/small/Secondary_Symbol.png' },
    'STX': { pair: 'STXUSDT', name: 'Stacks', image: 'https://assets.coingecko.com/coins/images/2069/small/Stacks_logo_full.png' },
    'XTZ': { pair: 'XTZUSDT', name: 'Tezos', image: 'https://assets.coingecko.com/coins/images/976/small/Tezos-logo.png' },
    'TIA': { pair: 'TIAUSDT', name: 'Celestia', image: 'https://assets.coingecko.com/coins/images/31967/small/tia.jpg' },
    'GRT': { pair: 'GRTUSDT', name: 'The Graph', image: 'https://assets.coingecko.com/coins/images/13397/small/Graph_Token.png' },
    'ENS': { pair: 'ENSUSDT', name: 'Ethereum Name Service', image: 'https://assets.coingecko.com/coins/images/19785/small/acatxTm8_400x400.jpg' },
    'IOTA': { pair: 'IOTAUSDT', name: 'IOTA', image: 'https://assets.coingecko.com/coins/images/692/small/IOTA_Swirl.png' },
    'PENDLE': { pair: 'PENDLEUSDT', name: 'Pendle', image: 'https://assets.coingecko.com/coins/images/15069/small/Pendle_Logo_Normal-03.png' },
    'PYTH': { pair: 'PYTHUSDT', name: 'Pyth Network', image: 'https://assets.coingecko.com/coins/images/31924/small/pyth.png' },
    'BAT': { pair: 'BATUSDT', name: 'Basic Attention Token', image: 'https://assets.coingecko.com/coins/images/677/small/basic-attention-token.png' },
    'WIF': { pair: 'WIFUSDT', name: 'dogwifhat', image: 'https://assets.coingecko.com/coins/images/33566/small/dogwifhat.jpg' },
    'SAND': { pair: 'SANDUSDT', name: 'The Sandbox', image: 'https://assets.coingecko.com/coins/images/12129/small/sandbox_logo.jpg' },
    'FLOW': { pair: 'FLOWUSDT', name: 'Flow', image: 'https://assets.coingecko.com/coins/images/13446/small/5f6294c0c7a8cda55cb1c936_Flow_Wordmark.png' },
    'JASMY': { pair: 'JASMYUSDT', name: 'JasmyCoin', image: 'https://assets.coingecko.com/coins/images/13876/small/JASMY200x200.jpg' },
    'GALA': { pair: 'GALAUSDT', name: 'Gala', image: 'https://assets.coingecko.com/coins/images/12493/small/GALA-COINGECKO.png' },
    'THETA': { pair: 'THETAUSDT', name: 'Theta Network', image: 'https://assets.coingecko.com/coins/images/2538/small/theta-token-logo.png' },
    'CHZ': { pair: 'CHZUSDT', name: 'Chiliz', image: 'https://assets.coingecko.com/coins/images/8834/small/CHZ_Token_updated.png' },
    'COMP': { pair: 'COMPUSDT', name: 'Compound', image: 'https://assets.coingecko.com/coins/images/10775/small/COMP.png' },
    'MANA': { pair: 'MANAUSDT', name: 'Decentraland', image: 'https://assets.coingecko.com/coins/images/878/small/decentraland-mana.png' },
    'NEO': { pair: 'NEOUSDT', name: 'Neo', image: 'https://assets.coingecko.com/coins/images/480/small/NEO_512_512.png' },
    'ZK': { pair: 'ZKUSDT', name: 'zkSync', image: 'https://assets.coingecko.com/coins/images/38043/small/ZKTokenBlack.png' },
    'ZRO': { pair: 'ZROUSDT', name: 'LayerZero', image: 'https://assets.coingecko.com/coins/images/28206/small/ftxG9_TJ_400x400.jpeg' },
    'AR': { pair: 'ARUSDT', name: 'Arweave', image: 'https://assets.coingecko.com/coins/images/4343/small/oRt6SiEN_400x400.jpg' },
    '1INCH': { pair: '1INCHUSDT', name: '1inch', image: 'https://assets.coingecko.com/coins/images/13469/small/1inch-token.png' },
    'IMX': { pair: 'IMXUSDT', name: 'Immutable', image: 'https://assets.coingecko.com/coins/images/17233/small/immutableX-symbol-BLK-RGB.png' },
    'RUNE': { pair: 'RUNEUSDT', name: 'THORChain', image: 'https://assets.coingecko.com/coins/images/6595/small/Rune200x200.png' },
    'EGLD': { pair: 'EGLDUSDT', name: 'MultiversX', image: 'https://assets.coingecko.com/coins/images/12335/small/egld-token-logo.png' },
    'AXS': { pair: 'AXSUSDT', name: 'Axie Infinity', image: 'https://assets.coingecko.com/coins/images/13029/small/axie_infinity_logo.png' },
    'DYDX': { pair: 'DYDXUSDT', name: 'dYdX', image: 'https://assets.coingecko.com/coins/images/17500/small/hjnIm9bV.jpg' },
    'SNX': { pair: 'SNXUSDT', name: 'Synthetix', image: 'https://assets.coingecko.com/coins/images/3406/small/SNX.png' },
    'QTUM': { pair: 'QTUMUSDT', name: 'Qtum', image: 'https://assets.coingecko.com/coins/images/684/small/Qtum_Logo_blue_CG.png' },
    'KSM': { pair: 'KSMUSDT', name: 'Kusama', image: 'https://assets.coingecko.com/coins/images/9568/small/m4zRhP5e_400x400.jpg' },
    'RON': { pair: 'RONUSDT', name: 'Ronin', image: 'https://assets.coingecko.com/coins/images/20009/small/ronin.jpg' },
    'AXL': { pair: 'AXLUSDT', name: 'Axelar', image: 'https://assets.coingecko.com/coins/images/27277/small/V-65_xQ1_400x400.jpeg' },
    'KAVA': { pair: 'KAVAUSDT', name: 'Kava', image: 'https://assets.coingecko.com/coins/images/9761/small/kava.png' },
    'MINA': { pair: 'MINAUSDT', name: 'Mina Protocol', image: 'https://assets.coingecko.com/coins/images/15628/small/JM4_vQ34_400x400.png' },
    'EOS': { pair: 'EOSUSDT', name: 'EOS', image: 'https://assets.coingecko.com/coins/images/738/small/eos-eos-logo.png' },
    'FLOKI': { pair: 'FLOKIUSDT', name: 'FLOKI', image: 'https://assets.coingecko.com/coins/images/16746/small/PNG_image.png' },
    'WLD': { pair: 'WLDUSDT', name: 'Worldcoin', image: 'https://assets.coingecko.com/coins/images/31069/small/worldcoin.jpeg' },
    'STRK': { pair: 'STRKUSDT', name: 'Starknet', image: 'https://assets.coingecko.com/coins/images/26433/small/starknet.png' },
    'RENDER': { pair: 'RENDERUSDT', name: 'Render', image: 'https://assets.coingecko.com/coins/images/11636/small/rndr.png' },
    'JTO': { pair: 'JTOUSDT', name: 'Jito', image: 'https://assets.coingecko.com/coins/images/33228/small/jto.png' },
    'JUP': { pair: 'JUPUSDT', name: 'Jupiter', image: 'https://assets.coingecko.com/coins/images/34188/small/jup.png' },
    'BERA': { pair: 'BERAUSDT', name: 'Berachain', image: 'https://assets.coingecko.com/coins/images/36017/small/bera.png' },
    'MOVE': { pair: 'MOVEUSDT', name: 'Movement', image: 'https://assets.coingecko.com/coins/images/37160/small/move.jpg' },
    'POL': { pair: 'POLUSDT', name: 'Polygon', image: 'https://assets.coingecko.com/coins/images/4713/small/polygon.png' },
};

// List of symbol keys for easy iteration
export const BINANCE_TOKEN_SYMBOLS = Object.keys(BINANCE_TOKENS);

// Active WebSocket connections
let activeConnections = new Map();

/**
 * Binance Kline intervals
 */
export const KLINE_INTERVALS = {
    '1m': '1m',
    '3m': '3m',
    '5m': '5m',
    '15m': '15m',
    '30m': '30m',
    '1h': '1h',
    '4h': '4h',
    '1d': '1d',
};

/**
 * Fetch historical klines (candlesticks) from Binance REST API
 * @param {string} symbol - Token symbol (e.g., 'BTC')
 * @param {string} interval - Kline interval (e.g., '1m', '5m')
 * @param {number} limit - Number of candles to fetch (max 1000)
 * @returns {Promise<Array>} Array of candle objects
 */
export async function fetchHistoricalCandles(symbol, interval = '1m', limit = 50) {
    const tokenInfo = BINANCE_TOKENS[symbol];
    if (!tokenInfo) {
        throw new Error(`Token ${symbol} not supported on Binance`);
    }

    const url = `https://api.binance.com/api/v3/klines?symbol=${tokenInfo.pair}&interval=${interval}&limit=${limit}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Binance API error: ${response.status}`);
        }

        const data = await response.json();

        // Transform Binance kline format to our format
        // Binance format: [openTime, open, high, low, close, volume, closeTime, ...]
        return data.map(kline => ({
            openTime: kline[0],
            open: parseFloat(kline[1]),
            high: parseFloat(kline[2]),
            low: parseFloat(kline[3]),
            close: parseFloat(kline[4]),
            volume: parseFloat(kline[5]),
            closeTime: kline[6],
            isGreen: parseFloat(kline[4]) >= parseFloat(kline[1]), // close >= open
            isClosed: true,
        }));
    } catch (error) {
        console.error(`Error fetching candles for ${symbol}:`, error);
        throw error;
    }
}

/**
 * Subscribe to real-time candlestick updates via WebSocket
 * @param {string} symbol - Token symbol (e.g., 'BTC')
 * @param {string} interval - Kline interval (e.g., '1m', '5m')
 * @param {Function} onCandle - Callback for candle updates
 * @returns {Function} Unsubscribe function
 */
/**
 * Subscribe to real-time candlestick updates via WebSocket
 * Supports multiple subscribers for the same token/interval
 * @param {string} symbol - Token symbol (e.g., 'BTC')
 * @param {string} interval - Kline interval (e.g., '1m', '5m')
 * @param {Function} onCandle - Callback for candle updates
 * @returns {Function} Unsubscribe function
 */
export function subscribeToCandleUpdates(symbol, interval, onCandle) {
    const tokenInfo = BINANCE_TOKENS[symbol];
    if (!tokenInfo) {
        console.error(`Token ${symbol} not supported on Binance`);
        return () => { };
    }

    const streamName = `${tokenInfo.pair.toLowerCase()}@kline_${interval}`;
    const connectionKey = `${symbol}_${interval}`;

    // If connection exists, add callback to listeners
    if (activeConnections.has(connectionKey)) {
        const connection = activeConnections.get(connectionKey);
        connection.callbacks.add(onCandle);

        return () => {
            if (activeConnections.has(connectionKey)) {
                const conn = activeConnections.get(connectionKey);
                conn.callbacks.delete(onCandle);
                if (conn.callbacks.size === 0) {
                    conn.close();
                    activeConnections.delete(connectionKey);
                }
            }
        };
    }

    // New connection setup
    const callbacks = new Set([onCandle]);
    const wsUrl = `wss://stream.binance.com:9443/ws/${streamName}`;

    let ws;
    let isActive = true;
    let reconnectTimeout;
    let reconnectAttempts = 0;

    const close = () => {
        isActive = false;
        if (reconnectTimeout) clearTimeout(reconnectTimeout);
        if (ws) {
            ws.onclose = null;
            ws.close();
        }
    };

    function connect() {
        if (!isActive) return;

        ws = new WebSocket(wsUrl);

        ws.onopen = () => {
            console.log(`WebSocket connected: ${symbol} ${interval}`);
            reconnectAttempts = 0;
        };

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                const kline = data.k;

                const candle = {
                    openTime: kline.t,
                    open: parseFloat(kline.o),
                    high: parseFloat(kline.h),
                    low: parseFloat(kline.l),
                    close: parseFloat(kline.c),
                    volume: parseFloat(kline.v),
                    closeTime: kline.T,
                    isGreen: parseFloat(kline.c) >= parseFloat(kline.o),
                    isClosed: kline.x, // true if candle is closed
                    symbol: symbol,
                    interval: interval,
                };

                // Notify all subscribers
                callbacks.forEach(cb => {
                    try { cb(candle); } catch (e) { console.error('Error in candle callback:', e); }
                });
            } catch (error) {
                console.error('Error parsing candle data:', error);
            }
        };

        ws.onerror = (error) => {
            // console.error(`WebSocket error for ${symbol}:`, error);
        };

        ws.onclose = () => {
            if (isActive) {
                // Infinite retries with max 30s backoff
                reconnectAttempts++;
                const delay = Math.min(1000 * Math.pow(1.5, reconnectAttempts), 30000);
                console.log(`WebSocket closed for ${symbol} ${interval}, reconnecting in ${delay}ms...`);
                reconnectTimeout = setTimeout(connect, delay);
            }
        };
    }

    connect();

    // Store connection info
    activeConnections.set(connectionKey, {
        callbacks,
        close
    });

    return () => {
        if (activeConnections.has(connectionKey)) {
            const conn = activeConnections.get(connectionKey);
            conn.callbacks.delete(onCandle);
            if (conn.callbacks.size === 0) {
                conn.close();
                activeConnections.delete(connectionKey);
            }
        }
    };
}

/**
 * Subscribe to multiple tokens at once
 * @param {Array<string>} symbols - Array of token symbols
 * @param {string} interval - Kline interval
 * @param {Function} onCandle - Callback for candle updates
 * @returns {Function} Unsubscribe function for all
 */
export function subscribeToMultipleTokens(symbols, interval, onCandle) {
    const unsubscribeFns = symbols
        .filter(symbol => BINANCE_TOKENS[symbol])
        .map(symbol => subscribeToCandleUpdates(symbol, interval, onCandle));

    return () => {
        unsubscribeFns.forEach(unsub => unsub());
    };
}

/**
 * Get formatted token data for display
 * @param {string} symbol - Token symbol
 * @returns {Object|null} Token display data
 */
export function getTokenDisplayData(symbol) {
    const tokenInfo = BINANCE_TOKENS[symbol];
    if (!tokenInfo) return null;

    return {
        id: symbol.toLowerCase(),
        symbol: symbol,
        name: tokenInfo.name,
        image: tokenInfo.image,
        pair: tokenInfo.pair,
    };
}

/**
 * Get all available tokens for Predict the Candle
 * @param {number} limit - Maximum number of tokens
 * @returns {Array} Array of token display data
 */
export function getAvailableTokens(limit = 12) {
    const priorityTokens = [
        'BTC', 'ETH', 'SOL', 'XRP', 'DOGE', 'PEPE',
        'BNB', 'ADA', 'AVAX', 'LINK', 'DOT', 'SHIB'
    ];

    const tokens = priorityTokens
        .slice(0, limit)
        .map(symbol => getTokenDisplayData(symbol))
        .filter(Boolean);

    return tokens;
}

/**
 * Clean up all active WebSocket connections
 */
export function cleanupAllConnections() {
    activeConnections.forEach((connection, key) => {
        if (connection.close) connection.close();
        else if (connection.unsubscribe) connection.unsubscribe(); // Fallback for any legacy connections
    });
    activeConnections.clear();
    console.log('All WebSocket connections cleaned up');
}

/**
 * Get current price from last candle
 * @param {string} symbol - Token symbol
 * @returns {Promise<Object>} Current price data
 */
export async function getCurrentPrice(symbol) {
    const candles = await fetchHistoricalCandles(symbol, '1m', 1);
    if (candles.length > 0) {
        const lastCandle = candles[0];
        return {
            symbol,
            price: lastCandle.close,
            priceChange24h: 0, // Would need separate API call for 24h change
            lastUpdate: new Date(),
        };
    }
    return null;
}

/**
 * Subscribe to real-time ticker (price) updates via WebSocket
 * Perfect for displaying live prices in Crypto Duel
 * @param {string} symbol - Token symbol (e.g., 'BTC')
 * @param {Function} onTicker - Callback for ticker updates
 * @returns {Function} Unsubscribe function
 */
/**
 * Subscribe to real-time ticker (price) updates via WebSocket
 * Supports multiple subscribers for the same token
 * @param {string} symbol - Token symbol (e.g., 'BTC')
 * @param {Function} onTicker - Callback for ticker updates
 * @returns {Function} Unsubscribe function
 */
export function subscribeToTickerUpdates(symbol, onTicker) {
    const tokenInfo = BINANCE_TOKENS[symbol];
    if (!tokenInfo) {
        console.error(`Token ${symbol} not supported on Binance`);
        return () => { };
    }

    const streamName = `${tokenInfo.pair.toLowerCase()}@ticker`;
    const connectionKey = `ticker_${symbol}`;

    // If connection exists, add callback to subscribers list
    if (activeConnections.has(connectionKey)) {
        const connection = activeConnections.get(connectionKey);
        connection.callbacks.add(onTicker);

        // Return unplug function for this specific listener
        return () => {
            if (activeConnections.has(connectionKey)) {
                const conn = activeConnections.get(connectionKey);
                conn.callbacks.delete(onTicker);
                // If no more listeners, close connection
                if (conn.callbacks.size === 0) {
                    conn.close();
                    activeConnections.delete(connectionKey);
                }
            }
        };
    }

    // New connection setup
    const callbacks = new Set([onTicker]);
    const wsUrl = `wss://stream.binance.com:9443/ws/${streamName}`;

    let ws;
    let isActive = true;
    let reconnectTimeout;
    let reconnectAttempts = 0;

    const close = () => {
        isActive = false;
        if (reconnectTimeout) clearTimeout(reconnectTimeout);
        if (ws) {
            ws.onclose = null; // Prevent reconnection logic triggered by manual close
            ws.close();
        }
    };

    function connect() {
        if (!isActive) return;

        ws = new WebSocket(wsUrl);

        ws.onopen = () => {
            console.log(`Ticker WebSocket connected: ${symbol}`);
            reconnectAttempts = 0;
        };

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                const ticker = {
                    symbol: symbol,
                    price: parseFloat(data.c),
                    priceChange24h: parseFloat(data.P),
                    high24h: parseFloat(data.h),
                    low24h: parseFloat(data.l),
                    volume24h: parseFloat(data.v),
                    lastUpdate: Date.now(),
                };

                // Notify all subscribers
                callbacks.forEach(cb => {
                    try { cb(ticker); } catch (e) { console.error('Error in ticker callback:', e); }
                });
            } catch (error) {
                console.error('Error parsing ticker data:', error);
            }
        };

        ws.onerror = (error) => {
            // console.error(`Ticker WebSocket error for ${symbol}:`, error);
        };

        ws.onclose = () => {
            if (isActive) {
                // Infinite retries with max 30s backoff
                reconnectAttempts++;
                const delay = Math.min(1000 * Math.pow(1.5, reconnectAttempts), 30000);
                console.log(`Ticker WebSocket closed for ${symbol}, reconnecting in ${delay}ms...`);
                reconnectTimeout = setTimeout(connect, delay);
            }
        };
    }

    connect();

    // Store connection info
    activeConnections.set(connectionKey, {
        callbacks,
        close
    });

    // Return unsubscribe function
    return () => {
        if (activeConnections.has(connectionKey)) {
            const conn = activeConnections.get(connectionKey);
            conn.callbacks.delete(onTicker);
            if (conn.callbacks.size === 0) {
                conn.close();
                activeConnections.delete(connectionKey);
            }
        }
    };
}

/**
 * Get 24hr ticker data from Binance REST API (for initial load)
 * @param {string} symbol - Token symbol
 * @returns {Promise<Object>} Ticker data
 */
export async function fetchTickerData(symbol) {
    const tokenInfo = BINANCE_TOKENS[symbol];
    if (!tokenInfo) {
        throw new Error(`Token ${symbol} not supported on Binance`);
    }

    const url = `https://api.binance.com/api/v3/ticker/24hr?symbol=${tokenInfo.pair}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Binance API error: ${response.status}`);
        }

        const data = await response.json();

        return {
            symbol: symbol,
            name: tokenInfo.name,
            image: tokenInfo.image,
            price: parseFloat(data.lastPrice),
            priceChange24h: parseFloat(data.priceChangePercent),
            high24h: parseFloat(data.highPrice),
            low24h: parseFloat(data.lowPrice),
            volume24h: parseFloat(data.volume),
        };
    } catch (error) {
        console.error(`Error fetching ticker for ${symbol}:`, error);
        throw error;
    }
}

/**
 * Fetch ticker data for multiple tokens
 * @param {Array<string>} symbols - Array of token symbols
 * @returns {Promise<Array>} Array of ticker data
 */
export async function fetchMultipleTickers(symbols) {
    try {
        // Use bulk endpoint to get ALL tickers in one request
        // This is much faster and avoids rate limits compared to 100+ individual requests
        const response = await fetch('https://api.binance.com/api/v3/ticker/24hr');
        if (!response.ok) {
            throw new Error(`Binance API error: ${response.status}`);
        }

        const allTickers = await response.json();

        // Create a map for quick lookup: "BTCUSDT" -> tickerData
        const tickerMap = new Map();
        allTickers.forEach(t => {
            tickerMap.set(t.symbol, t);
        });

        // Filter and map our requested symbols
        const results = symbols
            .filter(sym => BINANCE_TOKENS[sym]) // Ensure we support this token
            .map(sym => {
                const tokenInfo = BINANCE_TOKENS[sym];
                const tickerData = tickerMap.get(tokenInfo.pair);

                if (!tickerData) return null;

                return {
                    symbol: sym,
                    name: tokenInfo.name,
                    image: tokenInfo.image,
                    price: parseFloat(tickerData.lastPrice),
                    priceChange24h: parseFloat(tickerData.priceChangePercent),
                    high24h: parseFloat(tickerData.highPrice),
                    low24h: parseFloat(tickerData.lowPrice),
                    volume24h: parseFloat(tickerData.volume),
                };
            })
            .filter(Boolean); // Remove nulls

        return results;
    } catch (error) {
        console.error('Error fetching multiple tickers:', error);
        return [];
    }
}

