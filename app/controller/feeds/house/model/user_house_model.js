const mongoose = require("mongoose"); // Erase if already required

const BuildUser = require("./user_model").schema;

// Declare the Schema of the Mongo model
var houseModel = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  description: {
    type: String,
    required: true,
  },
  user: BuildUser,
});

//Export the model
module.exports = mongoose.model("HouseModel", houseModel);
