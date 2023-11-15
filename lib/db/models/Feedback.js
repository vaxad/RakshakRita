import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  description: String,
  issue: String,
  attachment:String,
  id: String,
  type: String,
  stationId: String,
  createdAt: { type: Date, default: Date.now }
  // Define other fields here
});

export default mongoose.models.Feedback || mongoose.model('Feedback', feedbackSchema);