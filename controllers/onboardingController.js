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
    const { user, role, department, plan } = req.body;
    
    // Default tasks if not provided
    const tasks = [
      { title: 'Setup Company Email', dueDate: new Date() },
      { title: 'Complete Compliance Training', dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
      { title: 'Meet the Team', dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) },
    ];
    
    const onboardingPlan = await OnboardingPlan.create({
      user: user || req.user._id,
      role,
      department,
      generatedPlan: plan || `Onboarding plan for ${role} in ${department}`,
      tasks
    });
    res.status(201).json(onboardingPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getPlan, createPlan };
