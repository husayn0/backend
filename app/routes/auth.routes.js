const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/User');
const router = express.Router();
const  verifySignUp  = require("../middlewares/verifySignUp");
const  authJwt = require("../middlewares/authJwt");
const controller = require("../controllers/auth.controller");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/auth/signup", [verifySignUp.checkDuplicateUsername], controller.signup);
  app.post("/api/auth/signin", controller.signin);
  app.post("/api/auth/checkAuth", [authJwt.verifyToken], controller.checkAuth);


};
