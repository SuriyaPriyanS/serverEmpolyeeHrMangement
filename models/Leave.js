import mongoose from 'mongoose';

const leaveSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['Vacation', 'Sick', 'Personal', 'Maternity/Paternity'], required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  reason: { type: String },
}, { timestamps: true });

const Leave = mongoose.model('Leave', leaveSchema);
export default Leave;
