const express = require("express"); //porq no se usa??
const { sequelize } = require("../database/models"); //porq no se usa??
const db = require("../database/models");
const Op = db.Sequelize.Op;
const profRoute = require("../routes/professionals-routers");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator"); //trae los datos guardados en "validator"

//enviamos de client: Cant Clientes, city_Id, role
//enviamos de profesional:  cant, emergency, price,

const apiUsers = {
  //listado clientes
  clientList: (req, res) => {
    db.Client.findAll({
      include: [{ association: "cities" }],
    }).then(function (clients) {
      clients.reduce(function () {});

      roles = clients.map(function (client) {
        return client.role;
      });

      //   cantidad = await db.Client.count()

      //   cantidad = await db.Role.findAll({
      //       atributes: ["name"],
      //       group: []
      //   })

      //FALTA filtrar cant por rol

      return res.status(200).json({
        //data: clients,
        roles: roles,
        totalUsers: clients.length,
        //profperzone:,
        //totalAdmin:
        //totalProfesional,
      });
    });
  },
  //listado profesionales

  //listado profesiones (analizar si hacer en otra api)
};

module.exports = apiUsers;
