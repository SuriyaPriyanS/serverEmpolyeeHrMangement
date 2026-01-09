import express from 'express';
import { getReviews, createReview } from '../controllers/performanceController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getReviews).post(protect, createReview);

export default router;
