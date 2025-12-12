import { supabase } from './db.js';

export const submitDreamTeam = async (address, teamData) => {
    if (!address || !teamData || !teamData.tokens) {
        throw new Error('Invalid submission data');
    }

    try {
        const { data, error } = await supabase
            .from('dream_team_submissions')
            .insert({
                user_address: address,
                tokens: teamData.tokens,
                captain_id: teamData.captainId,
                vice_captain_id: teamData.viceCaptainId,
                created_at: new Date()
            })
            .select()
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error submitting Dream Team:', error);
        throw error;
    }
};

export const getUserDreamTeams = async (address) => {
    try {
        const { data, error } = await supabase
            .from('dream_team_submissions')
            .select('*')
            .eq('user_address', address)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error fetching user Dream Teams:', error);
        return [];
    }
};
