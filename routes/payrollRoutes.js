import express from 'express';
import {
  createPayroll,
  getPayroll,
} from '../controllers/payrollController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getPayroll)
  .post(protect, authorize('Admin', 'HR'), createPayroll);

export default router;
