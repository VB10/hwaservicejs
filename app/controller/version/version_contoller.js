var express = require("express");
const { StatusCodes } = require("http-status-codes");
var router = express.Router();
const Version = require("./model/version_model");
require("http-status-codes");
const semver = require("semver");

let iosIndexPath = 0;
let androdIndexPath = 1;

const versionPath = "/version";

router.post(versionPath, async (req, res) => {
  const versionModel = new Version(req.body);

  const headerValue = req.headers.authorization;

  if (headerValue == null) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Header Key Not Found" });
  }

  if (
    versionModel.platform == iosIndexPath ||
    versionModel.platform == androdIndexPath
  ) {
    const model = await versionModel.save({});
    if (model != null) {
      return res.json(model);
    } else {
      return res.status(StatusCodes.NOT_FOUND).send({ err: model.message });
    }
  } else {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "Platform is not valid value" });
  }
});

router.get(versionPath, async (req, res) => {
  const version = req.query.version;
  const platform = req.query.platform;

  if (version == null || platform == null) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "Platform is not valid value" });
  }
  if (semver.valid(platform)) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "Semantic Value Doesn not valid" });
  }

  const databaseVersion = await Version.findOne({ platform: platform });

  const diff = semver.diff(databaseVersion.version, version);
  const isForce = semver.gt(databaseVersion.version, version);

  return res.json({
    isForceUpdate: isForce,
    type: diff,
    currentVersion: databaseVersion.version,
  });
});

router.delete(versionPath, async (_, res) => {
  await Version.remove();
  return res.json();
});

module.exports = {
  router,
};
