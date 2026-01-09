import express from 'express';
import { getCourses, createCourse } from '../controllers/learningController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getCourses).post(protect, createCourse);

export default router;
