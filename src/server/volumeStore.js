// In-memory volume store
// Replaces database implementation

let totalVolume = 0;

export const addVolume = async (amount) => {
    if (amount && !isNaN(amount) && amount > 0) {
        try {
            totalVolume += parseFloat(amount);
            console.log('Volume updated in memory:', totalVolume);
        } catch (error) {
            console.error('Error adding volume:', error);
        }
    }
};

export const getVolume = async () => {
    try {
        return totalVolume;
    } catch (error) {
        console.error('Error getting volume:', error);
        return 0;
    }
};
