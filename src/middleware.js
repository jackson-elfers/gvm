const express = require("express");
const path = require("path");
const cors = require("cors");
const secure = require("express-force-https");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

module.exports = function(app) {
  //app.use(cors());
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(secure);
  app.use(express.static(path.join(process.cwd(), "./client/build")));
  app.use(express.static(path.join(process.cwd(), "./public")));
};
