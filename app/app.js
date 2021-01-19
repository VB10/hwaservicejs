const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

const LoginController = require("./controller/login/login_controller");
const HouseController = require("./controller/feeds/house/house_controller");
const FriendController = require("./controller/feeds/friends/friends_controller");

mongoose.connect("mongodb://localhost/ecommerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.use(LoginController.router);

app.use(HouseController.router);
app.use(FriendController.router);

app.listen(PORT, () => {
  console.log(`Server Started at Port ${PORT}
  => http://localhost:${PORT}`);

  console.log(Date());
});
