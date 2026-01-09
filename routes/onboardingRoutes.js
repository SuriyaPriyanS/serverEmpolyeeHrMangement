import express from 'express';
import { getPlan, createPlan } from '../controllers/onboardingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getPlan).post(protect, createPlan);

export default router;
