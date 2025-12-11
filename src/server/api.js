import express from 'express';
import { getPlayerCount } from './playerStore.js';
import { getVolume, addVolume } from './volumeStore.js';
import { getRewards, addReward } from './rewardsStore.js';

const router = express.Router();

router.get('/players', (req, res) => {
    res.json({ count: getPlayerCount() });
});

router.get('/volume', (req, res) => {
    res.json({ volume: getVolume() });
});

// Middleware to parse JSON bodies for POST requests
import bodyParser from 'body-parser';
router.use(bodyParser.json());

router.post('/volume', (req, res) => {
    const { amount } = req.body;
    if (amount) {
        addVolume(amount);
        res.json({ success: true, volume: getVolume() });
    } else {
        res.status(400).json({ error: 'Invalid amount' });
    }
});

router.get('/rewards', (req, res) => {
    res.json({ rewards: getRewards() });
});

router.post('/rewards', (req, res) => {
    const { amount } = req.body;
    if (amount) {
        addReward(amount);
        res.json({ success: true, rewards: getRewards() });
    } else {
        res.status(400).json({ error: 'Invalid amount' });
    }
});

export default router;
