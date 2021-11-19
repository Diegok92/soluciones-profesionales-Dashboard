const express = require("express");

const route = express.Router();

const mainController = require("../controllers/main-controller.js");

route.get("/", mainController.home);
route.get("/login", mainController.login);
route.get("/productCart", mainController.productCart);
route.get("/productDetail", mainController.productDetail);
route.get("/registerClient", mainController.registerClient);
route.get("/registerProf", mainController.registerProf);

module.exports = route;
