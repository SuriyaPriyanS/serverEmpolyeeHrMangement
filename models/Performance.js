import mongoose from 'mongoose';

const performanceSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  goals: [{ text: String, achieved: Boolean }],
  achievements: { type: String },
  improvements: { type: String },
  aiFeedback: { type: String },
  rating: { type: Number, min: 1, max: 5 },
  reviewDate: { type: Date, default: Date.now },
  reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Manager
}, { timestamps: true });

const Performance = mongoose.model('Performance', performanceSchema);
export default Performance;
