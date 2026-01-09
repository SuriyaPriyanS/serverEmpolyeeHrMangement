import mongoose from 'mongoose';

const documentSchema = mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, default: 'General' }, // Policy, Benefit, Handbook
  size: { type: String },
  url: { type: String, required: true }, // Cloudinary URL
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const Document = mongoose.model('Document', documentSchema);
export default Document;
