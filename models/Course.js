import mongoose from 'mongoose';

const courseSchema = mongoose.Schema({
  title: { type: String, required: true },
  instructor: { type: String },
  thumbnail: { type: String },
  duration: { type: String },
  rating: { type: Number, default: 0 },
  category: { type: String },
  enrolledUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);
export default Course;
