const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var friendSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  company: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

friendSchema.index({ "$**": "name" });

//Export the model
const FriendModel = mongoose.model("Friend", friendSchema);

module.exports = FriendModel;
