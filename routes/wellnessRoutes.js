import express from 'express';
import {
  createCoachingSession,
  createVideoRequest,
  getSentimentReports,
  createSentimentReport,
  getWellnessLogs,
  createWellnessLog
} from '../controllers/wellnessController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Coach
router.route('/coach').post(protect, createCoachingSession);

// Vision
router.route('/vision').post(protect, createVideoRequest);

// Pulse
router.route('/pulse')
  .get(protect, getSentimentReports)
  .post(protect, authorize('Admin', 'HR'), createSentimentReport);

// Wellness Logs
router.route('/logs')
  .get(protect, getWellnessLogs)
  .post(protect, createWellnessLog);

export default router;
