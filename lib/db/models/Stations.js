const mongoose = require('mongoose');

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

module.exports = mongoose.models.Station || mongoose.model('Station', stnSchema);