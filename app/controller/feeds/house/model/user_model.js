const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var buildUser = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  image: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

//Export the model
module.exports = mongoose.model("BuildUser", buildUser);
