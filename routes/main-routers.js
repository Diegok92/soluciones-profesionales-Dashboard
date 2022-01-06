const express = require("express");

const route = express.Router();

const mainController = require("../controllers/main-controller.js");

route.get("/", mainController.home);
route.get("/productCart", mainController.productCart);
route.get("/login", mainController.login);

module.exports = route;
