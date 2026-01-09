import OnboardingPlan from '../models/OnboardingPlan.js';

// @desc    Get Onboarding Plan
// @route   GET /api/onboarding
// @access  Private
const getPlan = async (req, res) => {
  try {
    // Assuming 1 active plan per user for simplicity
    const plan = await OnboardingPlan.findOne({ user: req.user._id });
    if (!plan && (req.user.role === 'Admin' || req.user.role === 'HR')) {
       // Allow admins to see all/filter by user? For now return empty for simplicity or all
       const allPlans = await OnboardingPlan.find({}).populate('user', 'name');
       return res.json(allPlans);
    }
    res.json(plan || { message: "No plan assigned" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create Onboarding Plan
// @route   POST /api/onboarding
// @access  Private (Admin/HR)
const createPlan = async (req, res) => {
  try {
    const { user, role, department } = req.body;
    
    // Mock AI Generation of tasks
    const tasks = [
      { title: 'Setup Company Email', dueDate: new Date() },
      { title: 'Complete Compliance Training', dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
      { title: 'Meet the Team', dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) },
    ];
    
    const plan = await OnboardingPlan.create({
      user,
      role,
      department,
      generatedPlan: `Onboarding plan for ${role} in ${department}`,
      tasks
    });
    res.status(201).json(plan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getPlan, createPlan };
