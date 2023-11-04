import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  createdAt: Date
});

export default mongoose.models.Citizen || mongoose.model('Citizen', userSchema);