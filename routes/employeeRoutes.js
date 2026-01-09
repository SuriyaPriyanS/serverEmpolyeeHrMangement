import express from 'express';
import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from '../controllers/employeeController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getEmployees)
  .post(protect, authorize('Admin', 'HR'), upload.single('avatar'), createEmployee);

router.route('/:id')
  .get(protect, getEmployeeById)
  .put(protect, authorize('Admin', 'HR'), upload.single('avatar'), updateEmployee)
  .delete(protect, authorize('Admin'), deleteEmployee);

export default router;
