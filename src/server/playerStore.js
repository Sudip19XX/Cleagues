// Supabase-backed player store

import { supabase } from '../services/supabaseClient.js';

export const addPlayer = async (address) => {
    if (address) {
        try {
            const normalizedAddress = address.toLowerCase();

            // Check if player exists
            const { data, error } = await supabase
                .from('players')
                .select('*')
                .eq('address', normalizedAddress)
                .single();

            if (error && error.code !== 'PGRST116') { // PGRST116 is 'not found'
                console.error('Error checking player:', error);
                return;
            }

            if (!data) {
                // Insert new player
                const { error: insertError } = await supabase
                    .from('players')
                    .insert([
                        {
                            address: normalizedAddress,
                            points: 100 // Default points
                        }
                    ]);

                if (insertError) {
                    console.error('Error creating player:', insertError);
                } else {
                    console.log('Player initialized with 100 points:', normalizedAddress);
                }
            } else {
                // Update last_seen
                await supabase
                    .from('players')
                    .update({ last_seen: new Date().toISOString() })
                    .eq('address', normalizedAddress);
            }
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

export const getPoints = async (address) => {
    if (!address) return 0;

    try {
        const normalizedAddress = address.toLowerCase();
        const { data, error } = await supabase
            .from('players')
            .select('points')
            .eq('address', normalizedAddress)
            .single();

        if (error) {
            if (error.code !== 'PGRST116') {
                console.error('Error getting points:', error);
            }
            // If not found, return 100 (assuming they will be created soon or are new)
            // Or strictly 0. Following original logic which defaulted to 100.
            return 100;
        }

        return data?.points || 100;
    } catch (error) {
        console.error('Error in getPoints:', error);
        return 100;
    }
};

export const updatePoints = async (address, change) => {
    if (!address) return 0;

    try {
        const normalizedAddress = address.toLowerCase();

        // Use RPC or Get-Update pattern. 
        // For simplicity, we'll do Get-Update here, but stored procedures are better for atomicity.
        // Assuming optimistic UI or low concurrency for now.

        const currentPoints = await getPoints(normalizedAddress);
        const newBalance = parseFloat(currentPoints) + parseFloat(change); // Ensure numbers

        const { error } = await supabase
            .from('players')
            .update({ points: newBalance })
            .eq('address', normalizedAddress);

        if (error) {
            console.error('Error updating points:', error);
            return currentPoints;
        }

        console.log(`Points updated for ${normalizedAddress}: ${currentPoints} -> ${newBalance}`);
        return newBalance;

    } catch (error) {
        console.error('Error in updatePoints:', error);
        return 0;
    }
};
