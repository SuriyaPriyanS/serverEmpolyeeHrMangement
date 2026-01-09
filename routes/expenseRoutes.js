import express from 'express';
import { getExpenses, createExpense } from '../controllers/expenseController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getExpenses)
  .post(protect, upload.single('receipt'), createExpense);

export default router;
