const express = require("express");

const profRoute = express.Router();

const profController = require("../controllers/professionals-controller.js");

profRoute.get("/", profController.professionals);

profRoute.get("/professionalDetail", profController.professionalDetail);

profRoute.get("/registerProf", profController.registerProf);

profRoute.get("/profManagement", profController.profManagement);

profRoute.get("/plumbers", profController.plumbers);

//profRoute.get("/:category", profController.plumbers);

// profRoute.get("/:category/:cuit", profController.plumbers); //por category viene el rubro del profesional

module.exports = profRoute;

//plomeros/cuit
