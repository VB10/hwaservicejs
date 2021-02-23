//replace modelSchema,ModelName with whatever you want
var mongoose = require("mongoose");

var modelSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  name: {
    type: String,
  },
  money: {
    type: Number,
  },
  category: {
    type: Number,
  },
  detailId: {
    type: String,
  },
});

var Games = mongoose.model("Games", modelSchema);
module.exports = Games;
