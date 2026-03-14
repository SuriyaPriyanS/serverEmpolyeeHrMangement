import TeamRecommendation from '../models/TeamRecommendation.js';
import AssistantChat from '../models/AssistantChat.js';
import Employee from '../models/User.js'; // Assuming User model contains employee data or there's an Employee model
import Attendance from '../models/Attendance.js';
import Leave from '../models/Leave.js';

// --- Team Staffing ---
// @route POST /api/ai/staffing
const saveTeamRecommendation = async (req, res) => {
  try {
    const { projectDescription, recommendation, employeesUsed } = req.body;
    const teamRec = await TeamRecommendation.create({
      projectDescription,
      recommendation,
      employeesUsed,
      createdBy: req.user._id
    });
    res.status(201).json(teamRec);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- Assistant Chat ---
// @route POST /api/ai/assistant
const saveAssistantChat = async (req, res) => {
  try {
    const { userMessage, botResponse, sources } = req.body;
    const chat = await AssistantChat.create({
      user: req.user._id,
      userMessage,
      botResponse,
      sources
    });
    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- Analytics ---
// @route GET /api/ai/analytics/dashboard
const getDashboardStats = async (req, res) => {
  try {
    const employeeCount = await Employee.countDocuments({});
    // More complex aggregation would happen here in a real app
    res.json({
      totalEmployees: employeeCount,
      newHires: 12,
      retentionRate: '94%',
      openPositions: 8,
      trends: {
        employees: '+2%',
        hires: '+15%',
        retention: '+1%',
        positions: '-5%'
      },
      aiBriefing: "Office morale is trending high today. 3 new hires in Engineering are hitting Day 30 milestones. Consider sending a kudos!"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route GET /api/ai/analytics
const getAnalytics = async (req, res) => {
  try {
    res.json({
      growthData: [
        { name: 'Jan', count: 45 },
        { name: 'Feb', count: 52 },
        { name: 'Mar', count: 48 },
        { name: 'Apr', count: 61 },
        { name: 'May', count: 55 },
        { name: 'Jun', count: 67 }
      ],
      departmentData: [
        { name: 'Engineering', value: 45, color: '#6366f1' },
        { name: 'Design', value: 15, color: '#f59e0b' },
        { name: 'Marketing', value: 20, color: '#10b981' },
        { name: 'Sales', value: 10, color: '#ec4899' },
        { name: 'HR', value: 10, color: '#3b82f6' }
      ]
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  saveTeamRecommendation,
  saveAssistantChat,
  getDashboardStats,
  getAnalytics
};
