import express from 'express';
import { getStandups, createStandup } from '../controllers/standupController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getStandups).post(protect, createStandup);

export default router;
