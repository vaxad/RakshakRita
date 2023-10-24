import mongoose from 'mongoose';

const stnSchema = new mongoose.Schema({
  name: String,
  qr:String,
  state: String,
  district: String,
  taluka: String,
  village: String,
  latitudes: String,
  longitudes:String
  // feedbacks: [String]
  // Define other fields here
});

export default mongoose.models.Station || mongoose.model('Station', stnSchema);