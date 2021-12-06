const express = require("express");

const profRoute = express.Router();

const profController = require("../controllers/professionals-controller.js");

profRoute.get("/", profController.rubros);

profRoute.get("/:rubro/:cuit", profController.professionalDetail);

profRoute.get("/registerProf", profController.registerProf);
profRoute.post("/registerProf", profController.registerProf);

profRoute.get("/:rubro/:cuit/editProf", profController.editProf); //muestro form de edicion
profRoute.put("/:rubro/:cuit", profController.updateProf);

profRoute.get("/:rubro", profController.profPerRubro);

//profRoute.get("/:category", profController.plumbers);

// profRoute.get("/:category/:cuit", profController.plumbers); //por category viene el rubro del profesional

module.exports = profRoute;

//plomeros/cuit
