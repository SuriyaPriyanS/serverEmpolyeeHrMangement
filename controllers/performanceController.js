import Performance from '../models/Performance.js';

// @desc    Get Performance Reviews
// @route   GET /api/performance
// @access  Private
const getReviews = async (req, res) => {
  try {
    if (req.user.role === 'Admin' || req.user.role === 'HR') {
      const reviews = await Performance.find({}).populate('user', 'name department');
      res.json(reviews);
    } else {
      const reviews = await Performance.find({ user: req.user._id });
      res.json(reviews);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create Performance Review
// @route   POST /api/performance
// @access  Private
const createReview = async (req, res) => {
  try {
    // In a real app, you might want AI to populate achievements/improvements here
    const { user, achievements, improvements, rating } = req.body;
    
    // Simple mock AI feedback generation
    const aiFeedback = `Based on the achievements, the recommended focus area is leadership.`;

    const review = await Performance.create({
      user: user || req.user._id,
      achievements,
      improvements,
      rating,
      aiFeedback,
      reviewer: req.user._id
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getReviews, createReview };
