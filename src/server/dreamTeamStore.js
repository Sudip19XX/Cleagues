// In-memory Dream Team store
// Replaces database implementation

let submissions = [];

export const submitDreamTeam = async (address, teamData) => {
    if (!address || !teamData || !teamData.tokens) {
        throw new Error('Invalid submission data');
    }

    try {
        const newSubmission = {
            id: crypto.randomUUID(),
            user_address: address,
            tokens: teamData.tokens,
            captain_id: teamData.captainId,
            vice_captain_id: teamData.viceCaptainId,
            created_at: new Date()
        };

        submissions.push(newSubmission);
        console.log('Dream Team submitted to memory:', newSubmission.id);
        return newSubmission;
    } catch (error) {
        console.error('Error submitting Dream Team:', error);
        throw error;
    }
};

export const getUserDreamTeams = async (address) => {
    try {
        // Find existing submissions for this user?
        // In the DB version, it fetches all.
        // We'll mimic that.
        const userTeams = submissions
            .filter(sub => sub.user_address.toLowerCase() === address.toLowerCase())
            .sort((a, b) => b.created_at - a.created_at);

        return userTeams;
    } catch (error) {
        console.error('Error fetching user Dream Teams:', error);
        return [];
    }
};
