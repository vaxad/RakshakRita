import  mongoose from 'mongoose';

const stnSchema = new mongoose.Schema({
  name: String,
  qr:String,
  state: String,
  district: String,
  taluka: String,
  village: String,
  latitude: String,
  longitude:String,
  population : Number
  // feedbacks: [String]
  // Define other fields here
});

export default mongoose.models.Station || mongoose.model('Station', stnSchema);