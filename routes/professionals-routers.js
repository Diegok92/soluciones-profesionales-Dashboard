// const { application } = require("express");
const express = require("express");
const multer = require("multer");
const path = require("path");
const authLoggedtMiddleware = require("../middlewares/authLoggedMiddleware");
const authNotProftMiddleware = require("../middlewares/authNotProfMiddleware");
const authPrivateProfMiddleware = require("../middlewares/authPrivateProfMiddleware");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, path.join(__dirname, "../public/images/professionals"));
  },
  filename: function (req, file, cb) {
    //cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);
    file.filename = req.body.cuit;
    cb(
      null,
      file.filename + "-avatar" + path.extname(file.originalname) //lograr q diga "cuit-avatar"
    );
  },
});

const uploadFile = multer({ storage: storage });

const profRoute = express.Router();

const profController = require("../controllers/professionals-controller.js");

profRoute.get("/", profController.rubros);

profRoute.get(
  "/:rubro/:cuit",
  authLoggedtMiddleware,
  profController.professionalDetail
);

profRoute.get(
  "/registerProf",
  authNotProftMiddleware,
  profController.registerProf
);
profRoute.post(
  "/registerProf",
  uploadFile.single("avatar"),
  profController.createProf
);

profRoute.get(
  "/:rubro/:cuit/editProf",
  authPrivateProfMiddleware,
  profController.editProf
); //muestro form de edicion
profRoute.put("/:rubro/:cuit", profController.updateProf);

profRoute.get(
  "/:rubro/:cuit/deleteProf",
  authPrivateProfMiddleware,
  profController.showDeleteProf
); //muestro form de confirmación de eliminación
profRoute.delete("/:rubro/:cuit", profController.deleteProf);

profRoute.get("/:rubro", profController.profPerRubro);

module.exports = profRoute;
