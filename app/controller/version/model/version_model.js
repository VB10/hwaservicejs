const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
  version: {
    type: String,
    required: true,
  },
  platform: {
    type: Number,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
});

//Export the model
module.exports = mongoose.model("Version", userSchema);
