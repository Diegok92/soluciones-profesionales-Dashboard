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
    req.session.dniFound = req.body.dni;

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

    if (req.body.role == "Client") {
      console.log("dentro del if para client");
      res.redirect("/login");
    } else if (req.body.role == "Professional") {
      console.log("dentro del if para prof");
      res.redirect("/rubros/registerProf");
    }
  },

  //Actualizar para usar la DB
  //por (GET)
  clientDetail: (req, res) => {
    db.Client.findOne({
      where: {
        dni: req.params.dni,
      },
    }).then(function (result) {
      let userProf = req.session.profFound;
      let userClient = req.session.clientFound;
      let clientFound = result;
      //console.log("Dentro del result viene " + clientFound.email);

      res.render("users/clientDetail", {
        userClient: userClient,
        userProf: userProf,
        prueba: clientFound,
      }); //render usa ruta en carpeta (users)
    });
  },

  // //Actualizar para usar la DB
  // //por (GET)
  // editClient: (req, res) => {
  //   let userProf = req.session.profFound;
  //   let userClient = req.session.clientFound;

  //   const aEditar = clients.filter(function (clients) {
  //     return clients.dni == req.params.dni;
  //   });
  //   res.render("users/editClient", {
  //     aEditar: aEditar,
  //     userClient: userClient,
  //     userProf: userProf,
  //   }); //carpeta professionals
  // },
  // //Actualizar para usar la DB
  // //por (PUT)
  // updateClients: (req, res) => {
  //   let userProf = req.session.profFound;
  //   let userClient = req.session.clientFound;
  //   //por aca viaja el boton "confirmar" del form editClient
  //   const indexClientsBuscado = clients.findIndex(function (clients) {
  //     return clients.dni == userClient.dni;
  //   });
  //   //console.log(req);
  //   const updateClients = {
  //     ...req.body,
  //     password: userClient.password,
  //   };

  //   clients[indexClientsBuscado] = updateClients; //reemplazo el actualizado en el listado original
  //   //console.log(updateClients);
  //   saveClients();

  //   res.redirect("/");
  // },
};

module.exports = clientDbController;
