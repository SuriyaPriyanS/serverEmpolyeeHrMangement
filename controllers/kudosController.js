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
    
    const records = kudos.map(k => ({
      ...k._doc,
      id: k._id,
      from: k.from?.name || 'Unknown',
      to: k.to?.name || 'Unknown',
      senderAvatar: k.from?.avatar,
      recipientAvatar: k.to?.avatar,
      date: k.createdAt,
      likes: k.likes?.length || 0
    }));

    res.json({
      records,
      stats: {
        dailyCount: records.filter(r => new Date(r.date).toDateString() === new Date().toDateString()).length
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create Kudos
// @route   POST /api/kudos
// @access  Private
const createKudos = async (req, res) => {
  try {
    const { to, recipientId, message, category } = req.body;
    
    const kudos = await Kudos.create({
      from: req.user._id,
      to: to || recipientId, // Handle both formats
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
