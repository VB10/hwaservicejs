//Creating a Auth Model in userModel.js
var mongoose = require("mongoose");
const { isEmail } = require("validator");

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Why no email?"],
    unique: true,
    validate: [isEmail, "invalid email"],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});

var User = mongoose.model("user", userSchema);
module.exports = User;
