var express = require("express");
var router = express.Router();
const Login = require("./model/login_model");
const httpStatusCode = require("http-status-codes");

const loginPath = "/login";
const registerPath = "/register";

const jwt = require("jsonwebtoken");

router.post(loginPath, (req, res) => {
  const query = {};
  query.email = req.body.email;
  query.password = req.body.password;

  // const
  Login.findOne(query, (err, user) => {
    if (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).send();
    }

    var _jwt = jwt.sign(
      {
        data: user.email,
      },
      "secret",
      { expiresIn: "1h" }
    );
    return res.json({ token: _jwt });
  });
});

router.post(registerPath, (req, res) => {
  const loginModel = new Login(req.body);
  loginModel.save((err, data) => {
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
