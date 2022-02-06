// const { application } = require("express");
const express = require("express");
const multer = require("multer");
const path = require("path");
const authNotClientstMiddleware = require("../middlewares/authNotClientsMiddleware");
const authClientsMiddleware = require("../middlewares/authClientsMiddleware");
const authPrivateClientMiddleware = require("../middlewares/authPrivateClientMiddleware");
const clientDbController = require("../controllers/clients-db-controller");

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

clientsRoute.get(
  "/registerClients",
  authNotClientstMiddleware,
  clientDbController.registerClient
);
clientsRoute.post(
  "/registerClients",
  uploadFile.single("avatar"),
  clientDbController.createClient
);

clientsRoute.get(
  "/:dni",
  authPrivateClientMiddleware,
  clientDbController.clientDetail
); //usar PrivateClient

// clientsRoute.get(
//   "/:dni/editClients",
//   authPrivateClientMiddleware,
//   clientsController.editClients
// ); //muestro form de edicion
// clientsRoute.put("/:dni", clientsController.updateClients);

// clientsRoute.get(
//   "/:dni/deleteClients",
//   authPrivateClientMiddleware,

//   clientsController.showDeleteClients
// ); //muestro form de confirmación de eliminación
// clientsRoute.delete("/:dni", clientsController.deleteClients);

module.exports = clientsRoute;
