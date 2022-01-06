// const { application } = require("express");
const express = require("express");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, path.join(__dirname, "../public/images/clients"));
  },
  filename: function (req, file, cb) {
    //cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);
    file.filename = req.body.dni;
    cb(null, file.filename + "-avatar" + path.extname(file.originalname));
  },
});

const uploadFile = multer({ storage: storage });

const clientsRoute = express.Router();

const clientsController = require("../controllers/clients-controller.js");

clientsRoute.get("/registerClients", clientsController.registerClients);
clientsRoute.post(
  "/registerClients",
  uploadFile.single("avatar"),
  clientsController.createClients
);

clientsRoute.get("/:dni", clientsController.clientsDetail);

clientsRoute.get("/:dni/editClients", clientsController.editClients); //muestro form de edicion
clientsRoute.put("/:dni", clientsController.updateClients);

clientsRoute.get("/:dni/deleteClients", clientsController.showDeleteClients); //muestro form de confirmación de eliminación
clientsRoute.delete("/:dni", clientsController.deleteClients);

module.exports = clientsRoute;
