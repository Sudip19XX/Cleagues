// Smart Contract Interfaces and ABIs

// Game Prediction Contract ABI (simplified)
export const GAME_PREDICTION_ABI = [
    {
        name: 'submitPrediction',
        type: 'function',
        inputs: [
            { name: 'gameId', type: 'uint256' },
            { name: 'tokenA', type: 'string' },
            { name: 'tokenB', type: 'string' },
            { name: 'prediction', type: 'uint8' }, // 0 = A wins, 1 = B wins
            { name: 'duration', type: 'uint256' }, // in hours
        ],
        outputs: [{ name: 'predictionId', type: 'uint256' }],
    },
    {
        name: 'claimReward',
        type: 'function',
        inputs: [{ name: 'predictionId', type: 'uint256' }],
        outputs: [{ name: 'reward', type: 'uint256' }],
    },
    {
        name: 'getPrediction',
        type: 'function',
        inputs: [{ name: 'predictionId', type: 'uint256' }],
        outputs: [
            { name: 'user', type: 'address' },
            { name: 'tokenA', type: 'string' },
            { name: 'tokenB', type: 'string' },
            { name: 'prediction', type: 'uint8' },
            { name: 'timestamp', type: 'uint256' },
            { name: 'resolved', type: 'bool' },
            { name: 'won', type: 'bool' },
        ],
    },
];

// Team Management Contract ABI (simplified)
export const TEAM_MANAGEMENT_ABI = [
    {
        name: 'submitTeam',
        type: 'function',
        inputs: [
            { name: 'tokens', type: 'string[]' }, // Array of 15 token IDs
            { name: 'captainIndex', type: 'uint8' },
            { name: 'viceCaptainIndex', type: 'uint8' },
        ],
        outputs: [{ name: 'teamId', type: 'uint256' }],
    },
    {
        name: 'getTeam',
        type: 'function',
        inputs: [{ name: 'teamId', type: 'uint256' }],
        outputs: [
            { name: 'user', type: 'address' },
            { name: 'tokens', type: 'string[]' },
            { name: 'captainIndex', type: 'uint8' },
            { name: 'viceCaptainIndex', type: 'uint8' },
            { name: 'score', type: 'uint256' },
        ],
    },
    {
        name: 'getTeamScore',
        type: 'function',
        inputs: [{ name: 'teamId', type: 'uint256' }],
        outputs: [{ name: 'score', type: 'uint256' }],
    },
];

// Leaderboard Contract ABI (simplified)
export const LEADERBOARD_ABI = [
    {
        name: 'getTopPlayers',
        type: 'function',
        inputs: [
            { name: 'gameMode', type: 'uint8' },
            { name: 'limit', type: 'uint256' },
        ],
        outputs: [
            { name: 'addresses', type: 'address[]' },
            { name: 'scores', type: 'uint256[]' },
        ],
    },
    {
        name: 'getUserStats',
        type: 'function',
        inputs: [{ name: 'user', type: 'address' }],
        outputs: [
            { name: 'totalGames', type: 'uint256' },
            { name: 'wins', type: 'uint256' },
            { name: 'totalScore', type: 'uint256' },
            { name: 'rank', type: 'uint256' },
        ],
    },
];

// Time-Based Challenge Contract ABI (simplified)
export const TIME_CHALLENGE_ABI = [
    {
        name: 'submitAction',
        type: 'function',
        inputs: [
            { name: 'challengeId', type: 'uint256' },
            { name: 'action', type: 'uint8' }, // 0 = buy, 1 = sell, 2 = hold
            { name: 'token', type: 'string' },
        ],
        outputs: [{ name: 'actionId', type: 'uint256' }],
    },
    {
        name: 'getActiveChallenge',
        type: 'function',
        inputs: [],
        outputs: [
            { name: 'challengeId', type: 'uint256' },
            { name: 'token', type: 'string' },
            { name: 'endTime', type: 'uint256' },
        ],
    },
];

// Candle Prediction Contract ABI (simplified)
export const CANDLE_PREDICTION_ABI = [
    {
        name: 'predictCandle',
        type: 'function',
        inputs: [
            { name: 'token', type: 'string' },
            { name: 'isGreen', type: 'bool' }, // true = green, false = red
            { name: 'timeframe', type: 'uint256' }, // in minutes
        ],
        outputs: [{ name: 'predictionId', type: 'uint256' }],
    },
    {
        name: 'resolvePrediction',
        type: 'function',
        inputs: [{ name: 'predictionId', type: 'uint256' }],
        outputs: [{ name: 'won', type: 'bool' }],
    },
];

// Contract Interface Types
export const CONTRACT_TYPES = {
    GAME_PREDICTION: 'GAME_PREDICTION',
    TEAM_MANAGEMENT: 'TEAM_MANAGEMENT',
    LEADERBOARD: 'LEADERBOARD',
    TIME_CHALLENGE: 'TIME_CHALLENGE',
    CANDLE_PREDICTION: 'CANDLE_PREDICTION',
};

// Get ABI by contract type
export function getABI(contractType) {
    switch (contractType) {
        case CONTRACT_TYPES.GAME_PREDICTION:
            return GAME_PREDICTION_ABI;
        case CONTRACT_TYPES.TEAM_MANAGEMENT:
            return TEAM_MANAGEMENT_ABI;
        case CONTRACT_TYPES.LEADERBOARD:
            return LEADERBOARD_ABI;
        case CONTRACT_TYPES.TIME_CHALLENGE:
            return TIME_CHALLENGE_ABI;
        case CONTRACT_TYPES.CANDLE_PREDICTION:
            return CANDLE_PREDICTION_ABI;
        default:
            throw new Error(`Unknown contract type: ${contractType}`);
    }
}
