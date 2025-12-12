import { supabase } from './db.js';

export const createBet = async (betData) => {
    try {
        const { data, error } = await supabase
            .from('pvp_bets')
            .insert({
                user_address: betData.user,
                symbol: betData.symbol,
                direction: betData.direction,
                amount: betData.amount,
                duration: betData.duration,
                expires_at: new Date(betData.expiryTime),
                status: 'open'
            })
            .select()
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error creating PvP bet:', error);
        throw error;
    }
};

export const getOpenBets = async () => {
    try {
        const { data, error } = await supabase
            .from('pvp_bets')
            .select('*')
            .eq('status', 'open')
            .gt('expires_at', new Date().toISOString())
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data.map(bet => ({
            id: bet.id,
            symbol: bet.symbol,
            direction: bet.direction,
            amount: bet.amount,
            user: bet.user_address,
            duration: bet.duration,
            timestamp: new Date(bet.created_at).getTime(),
            expiryTime: new Date(bet.expires_at).getTime(),
            status: bet.status
        }));
    } catch (error) {
        console.error('Error fetching open bets:', error);
        return [];
    }
};

export const findMatch = async (betData) => {
    // Look for an OPPOSITE bet with SAME symbol and SAME amount
    const oppositeDir = betData.direction === 'up' ? 'down' : 'up';

    try {
        const { data, error } = await supabase
            .from('pvp_bets')
            .select('*')
            .eq('symbol', betData.symbol)
            .eq('direction', oppositeDir)
            .eq('amount', betData.amount)
            .eq('status', 'open')
            .gt('expires_at', new Date().toISOString())
            .neq('user_address', betData.user) // Don't match self
            .limit(1)
            .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows found"
            throw error;
        }

        return data || null;
    } catch (error) {
        console.error('Error finding match:', error);
        return null; // Return null if error or no match
    }
};

export const acceptMatch = async (betId, opponentAddress, startPrice) => {
    try {
        const { data, error } = await supabase
            .from('pvp_bets')
            .update({
                status: 'matched',
                opponent_address: opponentAddress,
                start_price: startPrice
            })
            .eq('id', betId)
            .select()
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error accepting match:', error);
        throw error;
    }
};
