import express from 'express';
import { getVideos, getVideoById, createVideo } from '../controllers/videoController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getVideos);
router.post('/', protect, admin, createVideo);
router.get('/:id', getVideoById);

export default router;