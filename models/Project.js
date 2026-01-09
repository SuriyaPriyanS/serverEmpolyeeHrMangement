import mongoose from 'mongoose';

const projectSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['In Progress', 'Completed', 'On Hold'], default: 'In Progress' },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  progress: { type: Number, default: 0 },
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
export default Project;
