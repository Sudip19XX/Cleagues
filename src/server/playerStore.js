// In-memory player store
// Replaces database implementation

const players = new Set();
const points = new Map(); // Store points for each player

export const addPlayer = async (address) => {
    if (address) {
        try {
            const normalizedAddress = address.toLowerCase();
            if (!players.has(normalizedAddress)) {
                players.add(normalizedAddress);
                // Initialize with 100 points for new players
                points.set(normalizedAddress, 100);
                console.log('Player initialized with 100 points:', normalizedAddress);
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

export const getPoints = async (address) => {
    if (!address) return 0;
    const normalizedAddress = address.toLowerCase();
    // Default to 100 if not found (or should we strictly Init?)
    // If addPlayer is called on connect, it should be there.
    // If server restarted, memory is lost. We can default to 100 for dev UX.
    if (!points.has(normalizedAddress)) {
        points.set(normalizedAddress, 100);
    }
    return points.get(normalizedAddress);
};

export const updatePoints = async (address, change) => {
    if (!address) return 0;
    const normalizedAddress = address.toLowerCase();
    const current = await getPoints(normalizedAddress);
    const newBalance = current + change;
    points.set(normalizedAddress, newBalance);
    console.log(`Points updated for ${normalizedAddress}: ${current} -> ${newBalance}`);
    return newBalance;
};
