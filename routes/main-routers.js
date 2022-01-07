const express = require("express");

const route = express.Router();

const mainController = require("../controllers/main-controller.js");
const loginValidator = require("../validations/loginValidator.js");

route.get("/", mainController.home);
route.get("/productCart", mainController.productCart);
route.get("/login", mainController.login);
route.post("/login", loginValidator, mainController.verificator);

module.exports = route;
