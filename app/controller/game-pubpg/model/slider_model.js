//replace modelSchema,ModelName with whatever you want
var mongoose = require("mongoose");

var modelSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  text: {
    type: String,
  },
  detailId: {
    type: String,
  },
});

var SliderModel = mongoose.model("SliderModel", modelSchema);
module.exports = SliderModel;
