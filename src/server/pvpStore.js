// In-memory PvP store
// Replaces database implementation

let bets = [];

export const createBet = async (betData) => {
    try {
        const newBet = {
            id: crypto.randomUUID(),
            user_address: betData.user,
            symbol: betData.symbol,
            direction: betData.direction,
            amount: betData.amount,
            duration: betData.duration,
            created_at: new Date(),
            expires_at: new Date(betData.expiryTime),
            status: 'open'
        };

        bets.push(newBet);
        console.log('Bet created in memory:', newBet.id);
        return newBet;
    } catch (error) {
        console.error('Error creating PvP bet:', error);
        throw error;
    }
};

export const getOpenBets = async () => {
    try {
        const now = new Date();
        return bets
            .filter(bet => bet.status === 'open' && new Date(bet.expires_at) > now)
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .map(bet => ({
                id: bet.id,
                symbol: bet.symbol,
                direction: bet.direction,
                amount: bet.amount,
                user: bet.user_address,
                duration: bet.duration,
                timestamp: new Date(bet.created_at).getTime(),
                expiryTime: new Date(bet.expires_at).getTime(),
                status: bet.status
            }));
    } catch (error) {
        console.error('Error fetching open bets:', error);
        return [];
    }
};

export const findMatch = async (betData) => {
    // Look for an OPPOSITE bet with SAME symbol and SAME amount
    const oppositeDir = betData.direction === 'up' ? 'down' : 'up';
    const now = new Date();

    try {
        const match = bets.find(bet =>
            bet.symbol === betData.symbol &&
            bet.direction === oppositeDir &&
            bet.amount == betData.amount && // Loose equality for potential string/number mix
            bet.status === 'open' &&
            new Date(bet.expires_at) > now &&
            bet.user_address !== betData.user
        );

        return match || null;
    } catch (error) {
        console.error('Error finding match:', error);
        return null;
    }
};

export const acceptMatch = async (betId, opponentAddress, startPrice) => {
    try {
        const betIndex = bets.findIndex(b => b.id === betId);

        if (betIndex === -1) {
            throw new Error('Bet not found');
        }

        const bet = bets[betIndex];

        // Update the bet
        bet.status = 'matched';
        bet.opponent_address = opponentAddress;
        bet.start_price = startPrice;

        // In a real system, we might create a separate match record, 
        // but for now updating the bet works similarly to the DB approach

        return bet;
    } catch (error) {
        console.error('Error accepting match:', error);
        throw error;
    }
};
