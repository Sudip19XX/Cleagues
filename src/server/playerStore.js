// Placeholder player store for counting unique wallet addresses
// Replace with a real database implementation later
import { supabase } from './db.js';

export const addPlayer = async (address) => {
    if (address) {
        try {
            await supabase
                .from('players')
                .upsert({ address: address.toLowerCase(), last_seen: new Date() }, { onConflict: 'address' });
        } catch (error) {
            console.error('Error adding player:', error);
        }
    }
};

export const getPlayerCount = async () => {
    try {
        const { count, error } = await supabase
            .from('players')
            .select('*', { count: 'exact', head: true });

        if (error) throw error;
        return count;
    } catch (error) {
        console.error('Error getting player count:', error);
        return 0;
    }
};
