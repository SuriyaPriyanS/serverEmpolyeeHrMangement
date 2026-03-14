import mongoose from 'mongoose';

const sentimentReportSchema = mongoose.Schema({
  weekStart: { type: Date, default: Date.now },
  overallScore: { type: Number },
  departmentBreakdown: { type: Map, of: Number },
  reportContent: { type: String },
  report: { type: String },
  dataPoints: [{ day: String, mood: Number, productivity: Number }],
  dataUsed: mongoose.Schema.Types.Mixed,
}, { timestamps: true });

const SentimentReport = mongoose.model('SentimentReport', sentimentReportSchema);
export default SentimentReport;
