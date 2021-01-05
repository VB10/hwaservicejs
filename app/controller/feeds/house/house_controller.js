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

router.get(housePath, (req, res) => {
  House.find({}, (err, docs) => {
    if (err || docs.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json(err);
    } else {
      return res.status(StatusCodes.OK).json(docs);
    }
  });
});

router.delete(housePath, (_, res) => {
  House.deleteMany({}, (err) => {
    if (!err) {
      return res.status(StatusCodes.NOT_FOUND).json(err);
    } else {
      return res.status(StatusCodes.OK);
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
