import Leave from '../models/Leave.js';
import User from '../models/User.js';
import notificationService from '../utils/notificationService.js';

// @desc    Request Leave
// @route   POST /api/leaverequests
// @access  Private
const requestLeave = async (req, res) => {
  try {
    const { type, startDate, endDate, reason } = req.body;

    const leave = await Leave.create({
      user: req.user._id,
      leaveType: type, // Assuming 'type' from req.body maps to 'leaveType' in the model
      startDate,
      endDate,
      reason,
    });

    // Notify Manager (Just finding the first admin/manager for demo)
    try {
        const manager = await User.findOne({ role: { $in: ['Admin', 'HR'] } });
        if (manager) {
            await notificationService.notifyManagerLeaveRequest(manager, req.user, leave);
        }
    } catch (err) {
        console.error("Failed to send leave notification", err);
    }

    res.status(201).json(leave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get Leave Requests
// @route   GET /api/leaverequests
// @access  Private
const getLeaveRequests = async (req, res) => {
  try {
    if (req.user.role === 'Admin' || req.user.role === 'HR') {
      const leaves = await Leave.find({}).populate('user', 'name email');
      res.json(leaves);
    } else {
      const leaves = await Leave.find({ user: req.user._id });
      res.json(leaves);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update Leave Status
// @route   PUT /api/leaverequests/:id
// @access  Private (Admin/HR)
const updateLeaveStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const leave = await Leave.findById(req.params.id).populate('user');

    if (leave) {
      leave.status = req.body.status || leave.status;
      const updatedLeave = await leave.save();

      // Notify Employee
      try {
        await notificationService.notifyEmployeeLeaveStatus(leave.user, updatedLeave);
      } catch (err) {
         console.error("Failed to send leave status update", err);
      }

      res.json(updatedLeave);
    } else {
      res.status(404).json({ message: 'Leave request not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  requestLeave,
  getLeaveRequests,
  updateLeaveStatus,
};
