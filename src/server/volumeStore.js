// Placeholder volume store for tracking total transaction volume
// Replace with a real database implementation later
import { supabase } from './db.js';

export const addVolume = async (amount) => {
    if (amount && !isNaN(amount) && amount > 0) {
        try {
            // Assuming a 'transactions' table where we log volume events
            await supabase.from('transactions').insert({
                amount: parseFloat(amount),
                type: 'volume',
                created_at: new Date()
            });
        } catch (error) {
            console.error('Error adding volume:', error);
        }
    }
};

export const getVolume = async () => {
    try {
        // Can use a stored procedure or sum query
        // For simplicity, we create an RPC 'get_total_volume' in Supabase later
        // Or just sum client side if small (not recommended)
        // Best practice: RPC
        const { data, error } = await supabase.rpc('get_total_volume');
        if (error) {
            // Fallback if RPC doesn't exist yet, or just return 0
            console.warn('RPC get_total_volume failed:', error.message);
            return 0;
        }
        return data || 0;
    } catch (error) {
        console.error('Error getting volume:', error);
        return 0;
    }
};
