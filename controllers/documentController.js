import Document from '../models/Document.js';

// @desc    Get Documents
// @route   GET /api/documents
// @access  Private
const getDocuments = async (req, res) => {
  try {
    const documents = await Document.find({}).populate('uploadedBy', 'name');
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Upload Document (Metadata only for now, assuming file handled by multer middleware)
// @route   POST /api/documents
// @access  Private (Admin/HR)
const uploadDocument = async (req, res) => {
  try {
    const { name, category } = req.body;
    let url = '';
    
    if (req.file) {
      url = req.file.path;
    }

    const document = await Document.create({
      name,
      category,
      url,
      uploadedBy: req.user._id
    });
    res.status(201).json(document);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getDocuments, uploadDocument };
