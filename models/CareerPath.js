import mongoose from 'mongoose';

const careerPathSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  currentRole: String,
  targetRole: String,
  pathway: String,
  context: String,
  skillsToAcquire: [String],
  estimatedTime: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const CareerPath = mongoose.model('CareerPath', careerPathSchema);

export default CareerPath;
