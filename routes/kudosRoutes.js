import express from 'express';
import { getKudos, createKudos } from '../controllers/kudosController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getKudos).post(protect, createKudos);

export default router;
