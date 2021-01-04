var express = require("express");
var router = express.Router();
const House = require("./model/user_house_model");
const BuildUser = require("./model/user_model");
const { StatusCodes } = require("http-status-codes");

const housePath = "/house";
const houseUser = "/houseUser";

router.post(housePath, (req, res) => {
  const houseModel = new House(req.body);
  houseModel.save((err, data) => {
    if (err) {
      console.log(err);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ err: err.message });
    } else {
      return res.json(data);
    }
  });
});

router.post(houseUser, (req, res) => {
  const buildUserModel = new BuildUser(req.body);
  buildUserModel.save((err, data) => {
    if (err) {
      console.log(err);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ err: err.message });
    } else {
      return res.json(data);
    }
  });
});

module.exports = {
  router,
};
