// Placeholder rewards store for tracking total rewards claimed
// Replace with a real database implementation later
import { supabase } from './db.js';

export const addReward = async (amount) => {
    if (amount && !isNaN(amount) && amount > 0) {
        try {
            await supabase.from('transactions').insert({
                amount: parseFloat(amount),
                type: 'reward',
                created_at: new Date()
            });
        } catch (error) {
            console.error('Error adding reward:', error);
        }
    }
};

export const getRewards = async () => {
    try {
        const { data, error } = await supabase.rpc('get_total_rewards');
        if (error) {
            console.warn('RPC get_total_rewards failed:', error.message);
            return 0;
        }
        return data || 0;
    } catch (error) {
        console.error('Error getting rewards:', error);
        return 0;
    }
};
