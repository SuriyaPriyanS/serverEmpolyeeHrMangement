import Project from '../models/Project.js';

// @desc    Create Project
// @route   POST /api/projects
// @access  Private (Admin/Manager)
const createProject = async (req, res) => {
  try {
    const { name, description, status, members, progress } = req.body;

    const project = await Project.create({
      name,
      description,
      status,
      members,
      progress,
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all Projects
// @route   GET /api/projects
// @access  Private
const getProjects = async (req, res) => {
  try {
    // If not admin, maybe filter by membership? For now, let everyone see projects.
    const projects = await Project.find({}).populate('members', 'name avatar role');
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update Project
// @route   PUT /api/projects/:id
// @access  Private (Admin/Manager)
const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (project) {
      project.name = req.body.name || project.name;
      project.description = req.body.description || project.description;
      project.status = req.body.status || project.status;
      project.members = req.body.members || project.members;
      project.progress = req.body.progress || project.progress;

      const updatedProject = await project.save();
      res.json(updatedProject);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete Project
// @route   DELETE /api/projects/:id
// @access  Private (Admin)
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (project) {
      await project.deleteOne();
      res.json({ message: 'Project removed' });
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
};
