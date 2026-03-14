import express from 'express';
import {
  saveTeamRecommendation,
  saveAssistantChat,
  getDashboardStats,
  getAnalytics
} from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/staffing', protect, saveTeamRecommendation);
router.post('/assistant', protect, saveAssistantChat);
router.get('/analytics/dashboard', protect, getDashboardStats);
router.get('/analytics', protect, getAnalytics);

export default router;
