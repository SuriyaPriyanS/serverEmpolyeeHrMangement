import express from 'express';
import {
  clockIn,
  clockOut,
  getAttendance,
} from '../controllers/attendanceController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getAttendance);
router.post('/clockin', protect, clockIn);
router.put('/clockout', protect, clockOut);

export default router;
