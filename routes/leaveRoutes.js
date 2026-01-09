import express from 'express';
import {
  requestLeave,
  getLeaveRequests,
  updateLeaveStatus,
} from '../controllers/leaveController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, requestLeave)
  .get(protect, getLeaveRequests);

router.route('/:id')
  .put(protect, authorize('Admin', 'HR'), updateLeaveStatus);

export default router;
