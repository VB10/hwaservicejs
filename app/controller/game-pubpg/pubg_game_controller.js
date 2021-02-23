var express = require("express");
var router = express.Router();

const { StatusCodes } = require("http-status-codes");

const SliderModel = require("./model/slider_model");
const GameDetailModel = require("./model/game_detail_model");
const GameModel = require("./model/games");

const slider = "/slider";

const games = "/games";
const gamesQuery = "/games/:id";
const gamesDetail = "/games/detail";
const gamesDetailQuery = "/games/detail/:id";

const gameType = {
  NEW: 1,
  TOP: 2,
};

router.get(gamesQuery, async (req, res) => {
  let id = req.params.id;
  let gameModels = await GameModel.find({ category: id });
  return res.status(StatusCodes.OK).json(gameModels);
});

router.get(gamesDetailQuery, async (req, res) => {
  let id = req.params.id;
  let gamesDetail = await GameDetailModel.findOne({ _id: id });

  return res.status(StatusCodes.OK).json(gamesDetail);
});

router.get(slider, async (_req, res) => {
  let slider = await SliderModel.find();
  return res.status(StatusCodes.OK).json(slider);
});

router.post(slider, async (req, res) => {
  const sliderModel = new SliderModel(req.body);
  const model = await sliderModel.save({});
  if (model != null) {
    return res.json(model);
  } else {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ err: model.message });
  }
});

router.post(games, async (req, res) => {
  const gameModel = new GameModel(req.body);
  const model = await gameModel.save({});
  if (model != null) {
    return res.json(model);
  } else {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ err: model.message });
  }
});

router.post(gamesDetail, async (req, res) => {
  const gameDetailModel = new GameDetailModel(req.body);
  const model = await gameDetailModel.save({});
  if (model != null) {
    return res.json(model);
  } else {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ err: model.message });
  }
});

module.exports = {
  router,
};
