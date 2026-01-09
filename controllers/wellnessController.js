import CoachingSession from '../models/CoachingSession.js';
import VideoRequest from '../models/VideoRequest.js';
import SentimentReport from '../models/SentimentReport.js';
import WellnessLog from '../models/WellnessLog.js';

// --- Coaching ---
// @route POST /api/wellness/coach
const createCoachingSession = async (req, res) => {
  try {
    const { scenario, transcript, aiFeedback, score } = req.body;
    const session = await CoachingSession.create({
      user: req.user._id,
      scenario,
      transcript,
      aiFeedback,
      score
    });
    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- Nexus Vision ---
// @route POST /api/wellness/vision
const createVideoRequest = async (req, res) => {
  try {
    const { prompt } = req.body;
    // In a real app, this would trigger the Video Gen Job
    const request = await VideoRequest.create({
      user: req.user._id,
      prompt,
      status: 'Processing'
    });
    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- Talent Pulse ---
// @route GET /api/wellness/pulse
const getSentimentReports = async (req, res) => {
  try {
    const reports = await SentimentReport.find({}).sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route POST /api/wellness/pulse (Admin/System)
const createSentimentReport = async (req, res) => {
  try {
    const { overallScore, departmentBreakdown, reportContent, dataPoints } = req.body;
    const report = await SentimentReport.create({
      overallScore,
      departmentBreakdown,
      reportContent,
      dataPoints
    });
    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- Wellness ---
// @route GET /api/wellness/logs
const getWellnessLogs = async (req, res) => {
  try {
    const logs = await WellnessLog.find({ user: req.user._id });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route POST /api/wellness/logs
const createWellnessLog = async (req, res) => {
  try {
    const { type, data, aiInsight } = req.body;
    const log = await WellnessLog.create({
      user: req.user._id,
      type,
      data,
      aiInsight
    });
    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createCoachingSession,
  createVideoRequest,
  getSentimentReports,
  createSentimentReport,
  getWellnessLogs,
  createWellnessLog
};
