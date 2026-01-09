import JobPosting from '../models/JobPosting.js';
import notificationService from '../utils/notificationService.js';

// @desc    Get Job Postings
// @route   GET /api/recruitment
// @access  Public
const getPostings = async (req, res) => {
  try {
    const postings = await JobPosting.find({});
    res.json(postings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create Job Posting
// @route   POST /api/recruitment
// @access  Private (Admin/HR)
const createPosting = async (req, res) => {
  try {
    const { title, department, description, requirements } = req.body;
    const posting = await JobPosting.create({
      title,
      department,
      description,
      requirements
    });
    res.status(201).json(posting);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Apply for a Job
// @route   POST /api/recruitment/:id/apply
// @access  Public
const applyForJob = async (req, res) => {
  try {
    const { name, email, resumeUrl } = req.body;
    const posting = await JobPosting.findById(req.params.id);

    if (posting) {
      posting.applicants.push({ name, email, resumeUrl });
      await posting.save();

      // Notify Applicant
      try {
        await notificationService.notifyApplicant({ name, email }, posting.title); 
      } catch (err) {
        console.error("Failed to send application notification", err);
      }

      res.status(200).json({ message: 'Application submitted successfully' });
    } else {
      res.status(404).json({ message: 'Job posting not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getPostings, createPosting, applyForJob };
