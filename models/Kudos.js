import mongoose from 'mongoose';

const kudosSchema = mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  to: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  category: { type: String }, // optional e.g. "Teamwork"
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

const Kudos = mongoose.model('Kudos', kudosSchema);
export default Kudos;
