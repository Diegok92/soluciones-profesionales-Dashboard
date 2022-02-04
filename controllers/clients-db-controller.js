const express = require("express"); //porq no se usa??
const { sequelize } = require("../database/models"); //porq no se usa??
const db = require("../database/models");
const Op = db.Sequelize.Op;
const profRoute = require("../routes/professionals-routers");
const bcrypt = require("bcryptjs");

const clientDbController = {
  //form de creacion cliente (GET)
  registerClient: (req, res) => {
    let userProf = req.session.profFound;
    let userClient = req.session.clientFound;
    res.render("users/registerClients", {
      userClient: userClient,
      userProf: userProf,
    });
  },

  //Boton del form de creacion cliente (POST)
  createClient: function (req, res) {
    res.locals.dniRegistered = req.body.dni;

    db.Client.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      address: req.body.address,
      dni: req.body.dni,
      mobile: req.body.mobile,
      avatar: req.file.filename,
      password: bcrypt.hashSync(req.body.password, 10),
      city_Id: req.body.city_Id, //viene num por form (futuro, API)
      role: req.body.role,
    });
    console.log("antes del if");

    if (req.body.role == "Client") {
      console.log("dentro del if para client");
      res.redirect("/login");
    } else if (req.body.role == "Professional") {
      console.log("dentro del if para prof");
      res.redirect("/rubros/registerProf");
    }
  },
};

module.exports = clientDbController;
