// In-memory rewards store
// Replaces database implementation

let totalRewards = 0;

export const addReward = async (amount) => {
    if (amount && !isNaN(amount) && amount > 0) {
        try {
            totalRewards += parseFloat(amount);
            console.log('Rewards updated in memory:', totalRewards);
        } catch (error) {
            console.error('Error adding reward:', error);
        }
    }
};

export const getRewards = async () => {
    try {
        return totalRewards;
    } catch (error) {
        console.error('Error getting rewards:', error);
        return 0;
    }
};
