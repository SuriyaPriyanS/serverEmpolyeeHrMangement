import Leave from '../models/Leave.js';
import User from '../models/User.js';
import notificationService from '../utils/notificationService.js';

// @desc    Request Leave
// @route   POST /api/leaverequests
// @access  Private
const requestLeave = async (req, res) => {
  try {
    const { type, startDate, endDate, reason } = req.body;

    // Normalize type if coming from component as 'Sick Leave'
    const normalizedType = type === 'Sick Leave' ? 'Sick' : type;

    const leave = await Leave.create({
      user: req.user._id,
      type: normalizedType,
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
    let leaves;
    if (req.user.role === 'Admin' || req.user.role === 'HR') {
      leaves = await Leave.find({}).populate('user', 'name email');
    } else {
      leaves = await Leave.find({ user: req.user._id });
    }

    const requests = leaves.map(l => {
      const start = new Date(l.startDate);
      const end = new Date(l.endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      
      return {
        ...l._doc,
        id: l._id,
        type: l.type === 'Sick' ? 'Sick Leave' : l.type,
        days: diffDays
      };
    });

    res.json({
      balances: [
        { type: 'Vacation', used: requests.filter(r => r.type === 'Vacation' && r.status === 'Approved').reduce((acc, r) => acc + r.days, 0), total: 15, color: 'indigo' },
        { type: 'Sick Leave', used: requests.filter(r => r.type === 'Sick Leave' && r.status === 'Approved').reduce((acc, r) => acc + r.days, 0), total: 10, color: 'rose' },
        { type: 'Personal', used: requests.filter(r => r.type === 'Personal' && r.status === 'Approved').reduce((acc, r) => acc + r.days, 0), total: 5, color: 'emerald' },
      ],
      requests
    });
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
