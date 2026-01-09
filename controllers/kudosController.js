import Kudos from '../models/Kudos.js';

// @desc    Get Kudos
// @route   GET /api/kudos
// @access  Private
const getKudos = async (req, res) => {
  try {
    const kudos = await Kudos.find({})
      .populate('from', 'name avatar')
      .populate('to', 'name avatar')
      .sort({ createdAt: -1 });
    res.json(kudos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create Kudos
// @route   POST /api/kudos
// @access  Private
const createKudos = async (req, res) => {
  try {
    const { to, message, category } = req.body;
    
    const kudos = await Kudos.create({
      from: req.user._id,
      to, // User ID of recipient
      message,
      category
    });
    
    const populatedKudos = await Kudos.findById(kudos._id)
      .populate('from', 'name avatar')
      .populate('to', 'name avatar');

    res.status(201).json(populatedKudos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getKudos, createKudos };
