// Placeholder player store for counting unique wallet addresses
// Replace with a real database implementation later
import { supabase } from './db.js';

export const addPlayer = async (address) => {
    if (address) {
        try {
            console.log('Attempting to add player to Supabase:', address);
            const { data, error } = await supabase
                .from('players')
                .upsert({ address: address.toLowerCase(), last_seen: new Date() }, { onConflict: 'address' })
                .select();

            if (error) {
                console.error('Error adding player to Supabase:', error);
            } else {
                console.log('Player added/updated successfully:', data);
            }
        } catch (error) {
            console.error('Unexpected error adding player:', error);
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
