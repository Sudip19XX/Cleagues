// Placeholder rewards store for tracking total rewards claimed
// Replace with a real database implementation later
let totalRewards = 0;

export const addReward = (amount) => {
    if (amount && !isNaN(amount) && amount > 0) {
        totalRewards += parseFloat(amount);
    }
};

export const getRewards = () => totalRewards;
