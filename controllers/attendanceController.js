import Attendance from '../models/Attendance.js';

// @desc    Clock In
// @route   POST /api/attendance/clockin
// @access  Private
const clockIn = async (req, res) => {
  try {
    const existingAttendance = await Attendance.findOne({
      user: req.user._id,
      date: {
        $gte: new Date().setHours(0, 0, 0, 0),
        $lt: new Date().setHours(23, 59, 59, 999),
      },
    });

    if (existingAttendance) {
      return res.status(400).json({ message: 'Already clocked in today' });
    }

    const attendance = await Attendance.create({
      user: req.user._id,
      date: new Date(),
      clockIn: new Date(),
      status: 'Present',
    });

    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Clock Out
// @route   PUT /api/attendance/clockout
// @access  Private
const clockOut = async (req, res) => {
  try {
    const attendance = await Attendance.findOne({
      user: req.user._id,
      date: {
        $gte: new Date().setHours(0, 0, 0, 0),
        $lt: new Date().setHours(23, 59, 59, 999),
      },
    });

    if (!attendance) {
      return res.status(400).json({ message: 'You have not clocked in' });
    }

    attendance.clockOut = new Date();
    await attendance.save();

    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get attendance records
// @route   GET /api/attendance
// @access  Private (Admin/HR sees all, Employee sees own)
const getAttendance = async (req, res) => {
  try {
    if (req.user.role === 'Admin' || req.user.role === 'HR') {
      const attendance = await Attendance.find({}).populate('user', 'name email');
      res.json(attendance);
    } else {
      const attendance = await Attendance.find({ user: req.user._id });
      res.json(attendance);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  clockIn,
  clockOut,
  getAttendance,
};
