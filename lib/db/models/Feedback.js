import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  subject: String,
  description: String,
  issue: String,
  attatchment:String,
  ip: String,
  type: String,
  stationId: String,
  createdAt: { type: Date, default: Date.now }
  // Define other fields here
});

export default mongoose.models.Feedback || mongoose.model('Feedback', feedbackSchema);