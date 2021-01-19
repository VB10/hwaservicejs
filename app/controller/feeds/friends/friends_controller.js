var express = require("express");
var router = express.Router();
const FriendModel = require("./model/friend_model");
const { StatusCodes } = require("http-status-codes");

const { queryParam, queryLimit } = require("../../../util/app_helper");

const friendsPath = "/friends";
const friendsIdQuery = "/friends/:id";

const searchPageValue = 3;
router.post(friendsPath, async (req, res) => {
  const friendModel = new FriendModel(req.body);

  const model = await friendModel.save({});
  if (model != null) {
    return res.json(model);
  } else {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ err: model.message });
  }
});

router.get(friendsPath, async (req, res) => {
  let text = queryParam(req.query.q);
  let limit = queryLimit(req.query.limit);
  console.log(limit);
  let friends = await FriendModel.find({
    name: { $regex: text, $options: "i" },
  })
    .skip(limit * searchPageValue)
    .limit(searchPageValue);

  return res.status(StatusCodes.OK).json(friends);
});

router.get(friendsIdQuery, async (req, res) => {
  let id = req.params.id;
  let friends = await FriendModel.findOne({ _id: id });

  return res.status(StatusCodes.OK).json(friends);
});

module.exports = {
  router,
};
