import mongoose from 'mongoose';

const coachingSessionSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  scenario: { type: String, required: true }, // 'performance_review', 'promotion_denial', etc.
  transcript: { type: String }, // Or Array of objects
  aiFeedback: { type: String }, // Generated feedback
  score: { type: Number },
}, { timestamps: true });

const CoachingSession = mongoose.model('CoachingSession', coachingSessionSchema);
export default CoachingSession;
