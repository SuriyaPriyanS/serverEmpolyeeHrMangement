import mongoose from 'mongoose';

const wellnessLogSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['Posture', 'Meditation', 'Journal'], required: true },
  data: { type: mongoose.Schema.Types.Mixed }, // Store score, duration, or text
  aiInsight: { type: String },
}, { timestamps: true });

const WellnessLog = mongoose.model('WellnessLog', wellnessLogSchema);
export default WellnessLog;
