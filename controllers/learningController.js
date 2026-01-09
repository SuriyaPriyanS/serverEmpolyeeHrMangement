import Course from '../models/Course.js';

// @desc    Get Courses
// @route   GET /api/learning
// @access  Private
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create Course
// @route   POST /api/learning
// @access  Private (Admin/HR)
const createCourse = async (req, res) => {
  try {
    const { title, instructor, duration, category } = req.body;
    const course = await Course.create({
      title,
      instructor,
      duration,
      category
    });
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getCourses, createCourse };
