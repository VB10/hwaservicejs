//replace modelSchema,ModelName with whatever you want
var mongoose = require("mongoose");

var modelSchema = new mongoose.Schema({
  size: {
    type: Number,
  },
  version: {
    type: String,
  },
  langues: {
    type: String,
  },
  description: {
    type: String,
  },
  images: {
    type: [String],
  },
  screenShoots: {
    type: [String],
  },
});

var GameDetail = mongoose.model("GameDetail", modelSchema);
module.exports = GameDetail;
