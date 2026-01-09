import mongoose from 'mongoose';

const payrollSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  month: { type: String, required: true },
  year: { type: Number, required: true },
  basic: { type: Number, required: true },
  hra: { type: Number, default: 0 },
  allowance: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
  net: { type: Number, required: true },
  status: { type: String, enum: ['Paid', 'Pending'], default: 'Pending' },
}, { timestamps: true });

const Payroll = mongoose.model('Payroll', payrollSchema);
export default Payroll;
