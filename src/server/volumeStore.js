// Placeholder volume store for tracking total transaction volume
// Replace with a real database implementation later
let totalVolume = 0;

export const addVolume = (amount) => {
    if (amount && !isNaN(amount) && amount > 0) {
        totalVolume += parseFloat(amount);
    }
};

export const getVolume = () => totalVolume;
