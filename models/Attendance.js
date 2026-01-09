import mongoose from 'mongoose';

const attendanceSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  clockIn: { type: Date },
  clockOut: { type: Date },
  status: { type: String, enum: ['Present', 'Late', 'Absent', 'On Leave'], default: 'Absent' },
}, { timestamps: true });

const Attendance = mongoose.model('Attendance', attendanceSchema);
export default Attendance;
