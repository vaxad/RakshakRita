import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  description: String,
  attatchment:String,
  ip: String,
  type: {type: String, default: "miscellaneous"},
  stationId: String,
  createdAt: { type: Date, default: Date.now }
  // Define other fields here
});

export default mongoose.models.Feedback || mongoose.model('Feedback', feedbackSchema);