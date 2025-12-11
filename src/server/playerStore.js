// Placeholder player store for counting unique wallet addresses
// Replace with a real database implementation later
const players = new Set();

export const addPlayer = (address) => {
    if (address) {
        players.add(address.toLowerCase());
    }
};

export const getPlayerCount = () => players.size;
