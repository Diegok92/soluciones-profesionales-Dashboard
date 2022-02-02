const express = require("express");
const { sequelize } = require("../database/models");
const db = require("../database/models");
const Op = db.Sequelize.Op;
const profRoute = require("../routes/professionals-routers");

const professionalDBController = {
  //cambiar nombre en enroutador anterior 'rubros'
  registerProf: function (req, res) {},
  createProf: function (req, res) {},

  //Edit
  editProf: function (req, res) {},
  updateProf: function (req, res) {},

  //Listing professions, professionals, professional
  professionsList: function (req, res) {
    db.Profession.findAll().then(function (professions) {
      res.render("rubros", { professions: professions });
    });
  },

  profPerProfession: function (req, res) {
    profRequested = req.params.profession;
    //
    //console.log(profRequested);
    //console.log(Professional);
    db.Professional.findAll({
      include: [{ association: "clients" }, { association: "professions" }, { association: "workZones" }, { association: "workDays" }, { association: "shifts" }],
      where: {
        "$professions.profession$": {
          //magia de pablo...
          [Op.like]: "%" + profRequested + "%",
          // `%${profRequested}%`
        },
      },
    }).then(function (professionals) {
      console.log(professionals);
      res.render("professionals/profPerProfession", { professionals: professionals, profRequested });
    });
  },
  professionalDetail: function (req, res) {
    profRequested = req.params.cuit;
    db.Professional.findOne({
      include: [{ association: "clients" }, { association: "professions" }],
      where: {
        cuit: 'FR52 8027 7475 87US VXDM EVK8%'
      }
        //     {
        // "$professions.profession$": {
        //   //magia de pablo...
        //   [Op.like]: "%" + profRequested + "%",
        //   // `%${profRequested}%`
        // },
        // },
    }).then(function (result) {
      console.log(result);
      res.render("prueba", { result: result });
    });
  },

  //Delete
  showDeleteProf: function (req, res) {},
  deleteProf: function (req, res) {},
};

module.exports = professionalDBController;
