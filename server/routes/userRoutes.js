import express from 'express';
import { getUserProfile, toggleWatchlistItem } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/profile', protect, getUserProfile);
router.post('/watchlist/:videoId', protect, toggleWatchlistItem);

export default router;