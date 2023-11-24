import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  createdAt: Date
  // Define other fields here
});

export default mongoose.models.Report || mongoose.model('Report', reportSchema);