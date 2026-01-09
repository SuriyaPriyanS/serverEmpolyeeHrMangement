import express from 'express';
import { getPostings, createPosting, applyForJob } from '../controllers/recruitmentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getPostings).post(protect, createPosting);
router.route('/:id/apply').post(applyForJob);

export default router;
