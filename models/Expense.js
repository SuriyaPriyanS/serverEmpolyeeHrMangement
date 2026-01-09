import mongoose from 'mongoose';

const expenseSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  merchant: { type: String, required: true },
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true }, // Travel, Meals, Software
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected', 'Draft'], default: 'Pending' },
  receiptUrl: { type: String },
  aiAnalysis: { type: Object }, // To store raw AI data if needed
}, { timestamps: true });

const Expense = mongoose.model('Expense', expenseSchema);
export default Expense;
