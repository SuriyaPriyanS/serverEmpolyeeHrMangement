import mongoose from 'mongoose';

const socialEventSchema = mongoose.Schema({
  title: String,
  activity: String,
  description: String,
  recommendations: String,
  date: Date,
  location: mongoose.Schema.Types.Mixed,
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  attendees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  aiSuggested: {
    type: Boolean,
    default: false
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const SocialEvent = mongoose.model('SocialEvent', socialEventSchema);

export default SocialEvent;
