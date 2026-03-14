import mongoose from 'mongoose';

const teamRecommendationSchema = mongoose.Schema({
  projectDescription: {
    type: String,
    required: true
  },
  recommendation: {
    type: String,
    required: true
  },
  employeesUsed: [{
    type: String // Storing as string IDs if they are not standard Mongo IDs
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const TeamRecommendation = mongoose.model('TeamRecommendation', teamRecommendationSchema);

export default TeamRecommendation;
