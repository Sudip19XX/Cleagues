// In-memory player store
// Replaces database implementation

const players = new Set();

export const addPlayer = async (address) => {
    if (address) {
        try {
            const normalizedAddress = address.toLowerCase();
            if (!players.has(normalizedAddress)) {
                players.add(normalizedAddress);
                console.log('Player added to memory:', normalizedAddress);
            }
        } catch (error) {
            console.error('Error adding player:', error);
        }
    }
};

export const getPlayerCount = async () => {
    try {
        return players.size;
    } catch (error) {
        console.error('Error getting player count:', error);
        return 0;
    }
};
