import mongoose from 'mongoose';

const onboardingPlanSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  role: { type: String, required: true },
  department: { type: String },
  generatedPlan: { type: String }, // AI Generated content
  tasks: [{
    title: String,
    completed: { type: Boolean, default: false },
    dueDate: Date
  }],
  status: { type: String, enum: ['In Progress', 'Completed'], default: 'In Progress' }
}, { timestamps: true });

const OnboardingPlan = mongoose.model('OnboardingPlan', onboardingPlanSchema);
export default OnboardingPlan;
