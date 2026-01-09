import mongoose from 'mongoose';

const sentimentReportSchema = mongoose.Schema({
  weekStart: { type: Date, default: Date.now }, // Start of the week or report date
  overallScore: { type: Number },
  departmentBreakdown: { type: Map, of: Number }, // e.g. { 'Engineering': 80, 'Sales': 60 }
  reportContent: { type: String }, // AI summary
  dataPoints: [{ day: String, mood: Number, productivity: Number }], // For charts
}, { timestamps: true });

const SentimentReport = mongoose.model('SentimentReport', sentimentReportSchema);
export default SentimentReport;
