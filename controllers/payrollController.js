import Payroll from '../models/Payroll.js';
import User from '../models/User.js';
import notificationService from '../utils/notificationService.js';

// @desc    Create Payroll Record
// @route   POST /api/payroll
// @access  Private (Admin/HR)
const createPayroll = async (req, res) => {
  try {
    const { user, month, year, salary, deductions, netSalary } = req.body;

    const payroll = await Payroll.create({
      user: user._id,
      month,
      year,
      salary,
      deductions,
      netSalary
    });

    // Notify Employee
    try {
      await notificationService.notifyPayrollProcessed(user, payroll);
    } catch (err) {
      console.error("Failed to send payroll notification", err);
    }

    res.status(201).json(payroll);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get Payroll Records
// @route   GET /api/payroll
// @access  Private
const getPayroll = async (req, res) => {
  try {
    if (req.user.role === 'Admin' || req.user.role === 'HR') {
      const payrolls = await Payroll.find({}).populate('user', 'name empid department');
      res.json(payrolls);
    } else {
      const payrolls = await Payroll.find({ user: req.user._id });
      res.json(payrolls);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createPayroll,
  getPayroll,
};
