const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var burgerModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  rates: Number,
  isFavorite: Boolean,
  updated: { type: Date, default: Date.now },
});

//Export the model
const BurgerModel = mongoose.model("Burgers", burgerModel);

module.exports = BurgerModel;
