import CoachingSession from '../models/CoachingSession.js';
import VideoRequest from '../models/VideoRequest.js';
import SentimentReport from '../models/SentimentReport.js';
import WellnessLog from '../models/WellnessLog.js';
import CareerPath from '../models/CareerPath.js';
import SocialEvent from '../models/SocialEvent.js';

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
    const { prompt, videoUrl } = req.body;
    // In a real app, this would trigger the Video Gen Job or save the result
    const request = await VideoRequest.create({
      user: req.user._id,
      prompt,
      videoUrl,
      status: videoUrl ? 'Completed' : 'Processing'
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
    const { 
      overallScore, 
      departmentBreakdown, 
      reportContent, 
      dataPoints,
      report,
      dataUsed
    } = req.body;

    const sentimentReport = await SentimentReport.create({
      overallScore,
      departmentBreakdown,
      reportContent: reportContent || report,
      report: report || reportContent,
      dataPoints: dataPoints || (Array.isArray(dataUsed) ? dataUsed : []),
      dataUsed
    });
    res.status(201).json(sentimentReport);
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
    const { type, data, aiInsight, intent, feedback, original, reframed } = req.body;
    
    // Map component payload to model fields
    let mappedType = type.charAt(0).toUpperCase() + type.slice(1);
    let mappedData = data;
    let mappedAiInsight = aiInsight;

    if (type === 'meditation') {
      mappedData = { intent };
    } else if (type === 'posture') {
      mappedData = { feedback };
      mappedAiInsight = feedback;
    } else if (type === 'journal') {
      mappedData = { original, reframed };
      mappedAiInsight = reframed;
    }

    const log = await WellnessLog.create({
      user: req.user._id,
      type: mappedType,
      data: mappedData,
      aiInsight: mappedAiInsight
    });
    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- Career Path ---
// @route GET /api/wellness/career
const getCareerPaths = async (req, res) => {
  try {
    const paths = await CareerPath.find({ user: req.user._id });
    res.json(paths);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route POST /api/wellness/career
const createCareerPath = async (req, res) => {
  try {
    const { currentRole, targetRole, pathway, skillsToAcquire, estimatedTime, context } = req.body;
    const path = await CareerPath.create({
      user: req.user._id,
      currentRole,
      targetRole,
      pathway,
      context,
      skillsToAcquire,
      estimatedTime
    });
    res.status(201).json(path);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- Social Planner ---
// @route GET /api/wellness/social
const getSocialEvents = async (req, res) => {
  try {
    const events = await SocialEvent.find({}).populate('organizer', 'name');
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route POST /api/wellness/social
const createSocialEvent = async (req, res) => {
  try {
    const { title, description, date, location, aiSuggested, activity, recommendations } = req.body;
    const event = await SocialEvent.create({
      title: title || activity,
      activity,
      description: description || recommendations,
      recommendations,
      date,
      location,
      aiSuggested: aiSuggested || !!recommendations,
      organizer: req.user._id
    });
    res.status(201).json(event);
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
  createWellnessLog,
  getCareerPaths,
  createCareerPath,
  getSocialEvents,
  createSocialEvent
};
