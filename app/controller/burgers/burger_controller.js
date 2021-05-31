var express = require("express");
var router = express.Router();

const { StatusCodes } = require("http-status-codes");

const BurgerModel = require("./model/burger_model");
const burgers = "/burgers";
const burgersPrice = "/burgers/price";
router.post(burgers, async (req, res) => {
  const burgerModel = new BurgerModel(req.body);
  const model = await burgerModel.save({});
  if (model != null) {
    return res.json(model);
  } else {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ err: model.message });
  }
});

router.get(burgers, async (req, res) => {
  const isFavorite = req.query.isFavorite;
  const sortKey = req.query.sort;

  if (isFavorite) {
    return fetchFavoriteBurgers(isFavorite, res);
  }

  if (sortKey) {
    const sortType = req.query.sortType;
    return fetchSortingData(sortKey, res, sortType);
  }

  BurgerModel.find({}, (err, docs) => {
    if (err || docs.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json(err);
    } else {
      return res.status(StatusCodes.OK).json(docs);
    }
  });
});

router.get(burgersPrice, async (req, res) => {
  var min = req.query.min;
  var max = req.query.max;
  if (min == null) min = 0;
  if (max == null) max = 50;

  const data = await BurgerModel.find({ price: { $gte: min, $lte: max } });
  if (data) {
    return res.status(StatusCodes.OK).json(data);
  } else {
    return res.status(StatusCodes.NOT_FOUND).json(docs);
  }
});

async function fetchFavoriteBurgers(isFavorite, res) {
  const data = await BurgerModel.find({
    isFavorite: isFavorite,
  });

  if (data) {
    return res.status(StatusCodes.OK).json(data);
  } else {
    return res.status(StatusCodes.NOT_FOUND).json(docs);
  }
}

async function fetchSortingData(sort, res, type) {
  var sortingIndex = -1;

  if (type) {
    sortingIndex = type;
  }

  const data = await BurgerModel.find({}).sort([[sort, sortingIndex]]);
  if (data) {
    return res.status(StatusCodes.OK).json(data);
  } else {
    return res.status(StatusCodes.NOT_FOUND).json(docs);
  }
}

module.exports = {
  router,
};
