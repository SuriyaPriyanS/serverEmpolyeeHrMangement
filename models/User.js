import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: 'Employee', enum: ['Employee', 'HR', 'Admin', 'Manager'] },
  department: { type: String, enum: ['Engineering', 'Design', 'Marketing', 'Sales', 'Human Resources', 'Finance'] },
  status: { type: String, enum: ['Active', 'On Leave', 'Terminated', 'Onboarding'], default: 'Active' },
  joinDate: { type: Date, default: Date.now },
  avatar: { type: String },
  salary: { type: Number, default: 0 },
}, { timestamps: true });

userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);
export default User;
