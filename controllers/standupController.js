import Standup from '../models/Standup.js';

// @desc    Get Standups
// @route   GET /api/standup
// @access  Private
const getStandups = async (req, res) => {
  try {
    if (req.user.role === 'Admin' || req.user.role === 'Manager') {
      const standups = await Standup.find({}).populate('user', 'name avatar');
      res.json(standups);
    } else {
      const standups = await Standup.find({ user: req.user._id });
      res.json(standups);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create Standup
// @route   POST /api/standup
// @access  Private
const createStandup = async (req, res) => {
  try {
    const { transcription, summary } = req.body;
    
    const standup = await Standup.create({
      user: req.user._id,
      transcription,
      summary
    });
    res.status(201).json(standup);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getStandups, createStandup };
