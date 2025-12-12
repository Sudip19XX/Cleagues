import express from 'express';
import { getPlayerCount } from './playerStore.js';
import { getVolume, addVolume } from './volumeStore.js';
import { getRewards, addReward } from './rewardsStore.js';

const app = express();

console.log('API Router Initialized');

app.get('/players', async (req, res) => {
    console.log('GET /players called');
    try {
        const count = await getPlayerCount();
        res.json({ count });
    } catch (e) {
        console.error('Error in /players:', e);
        res.status(500).json({ error: 'Failed to fetch player count' });
    }
});

app.get('/volume', async (req, res) => {
    try {
        const volume = await getVolume();
        res.json({ volume });
    } catch (e) {
        res.status(500).json({ error: 'Failed to fetch volume' });
    }
});

// Middleware to parse JSON bodies for POST requests
import bodyParser from 'body-parser';
app.use(bodyParser.json());

app.post('/volume', async (req, res) => {
    const { amount } = req.body;
    if (amount) {
        try {
            await addVolume(amount);
            const volume = await getVolume();
            res.json({ success: true, volume });
        } catch (e) {
            res.status(500).json({ error: 'Failed to add volume' });
        }
    } else {
        res.status(400).json({ error: 'Invalid amount' });
    }
});

app.get('/rewards', async (req, res) => {
    try {
        const rewards = await getRewards();
        res.json({ rewards });
    } catch (e) {
        res.status(500).json({ error: 'Failed to fetch rewards' });
    }
});

app.post('/rewards', async (req, res) => {
    const { amount } = req.body;
    if (amount) {
        try {
            await addReward(amount);
            const rewards = await getRewards();
            res.json({ success: true, rewards });
        } catch (e) {
            res.status(500).json({ error: 'Failed to add reward' });
        }
    } else {
        res.status(400).json({ error: 'Invalid amount' });
    }
});

import { submitDreamTeam, getUserDreamTeams } from './dreamTeamStore.js';

app.post('/dream-team', async (req, res) => {
    const { address, teamData } = req.body;
    if (address && teamData) {
        try {
            const result = await submitDreamTeam(address, teamData);
            res.json({ success: true, data: result });
        } catch (e) {
            res.status(500).json({ error: 'Failed to submit Dream Team' });
        }
    } else {
        res.status(400).json({ error: 'Invalid submission data' });
    }
});

app.get('/dream-team/:address', async (req, res) => {
    const { address } = req.params;
    if (address) {
        try {
            const teams = await getUserDreamTeams(address);
            res.json({ teams });
        } catch (e) {
            res.status(500).json({ error: 'Failed to fetch user teams' });
        }
    } else {
        res.status(400).json({ error: 'Invalid address' });
    }
});

import { createBet, getOpenBets, findMatch, acceptMatch } from './pvpStore.js';

app.get('/pvp/open', async (req, res) => {
    try {
        const bets = await getOpenBets();
        res.json({ bets });
    } catch (e) {
        res.status(500).json({ error: 'Failed to fetch open bets' });
    }
});

app.post('/pvp/bet', async (req, res) => {
    const { betData } = req.body;
    if (!betData) {
        return res.status(400).json({ error: 'Invalid bet data' });
    }

    try {
        // 1. Try to find a match first
        const match = await findMatch(betData);

        if (match) {
            // Match found! Close the existing bet and return match info
            // In a real app we'd need a transaction here
            // For now, assume taking the match works
            await acceptMatch(match.id, betData.user, betData.startPrice);

            // Return BOTH the matched bet and the new one (which is technically just a match execution)
            // But to keep it simple, we just say "matched"
            res.json({
                success: true,
                status: 'matched',
                match: match,
                message: 'Instant Match Found!'
            });
        } else {
            // No match, create new open bet
            const newBet = await createBet(betData);
            res.json({
                success: true,
                status: 'open',
                bet: newBet,
                message: 'Bet created! Waiting for opponent...'
            });
        }

    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Failed to create bet' });
    }
});

app.post('/pvp/match', async (req, res) => {
    const { betId, userAddress, startPrice } = req.body;

    if (!betId || !userAddress) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // Accept the match
        const match = await acceptMatch(betId, userAddress, startPrice);

        if (match) {
            res.json({
                success: true,
                status: 'matched',
                match: match
            });
        } else {
            res.status(400).json({ error: 'Bet not found or already matched' });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Failed to accept match' });
    }
});

export default app;


