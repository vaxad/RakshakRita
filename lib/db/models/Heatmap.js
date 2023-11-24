import mongoose from 'mongoose';

const hmSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  intensity: Number
});

export default mongoose.models.Heatmap || mongoose.model('Heatmap', hmSchema);