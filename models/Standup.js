import mongoose from 'mongoose';

const standupSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  transcription: { type: String },
  summary: { type: String }, // "Done: ..., Doing: ..., Blockers: ..."
  audioUrl: { type: String }, // Optional
}, { timestamps: true });

const Standup = mongoose.model('Standup', standupSchema);
export default Standup;
