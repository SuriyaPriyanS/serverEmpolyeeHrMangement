import mongoose from 'mongoose';

const assistantChatSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  userMessage: {
    type: String,
    required: true
  },
  botResponse: {
    type: String,
    required: true
  },
  sources: [mongoose.Schema.Types.Mixed],
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const AssistantChat = mongoose.model('AssistantChat', assistantChatSchema);

export default AssistantChat;
