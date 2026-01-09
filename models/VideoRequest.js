import mongoose from 'mongoose';

const videoRequestSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  prompt: { type: String, required: true },
  videoUrl: { type: String },
  status: { type: String, enum: ['Processing', 'Completed', 'Failed'], default: 'Processing' },
}, { timestamps: true });

const VideoRequest = mongoose.model('VideoRequest', videoRequestSchema);
export default VideoRequest;
