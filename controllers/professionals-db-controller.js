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
    let userProf = req.session.profFound;
    let userClient = req.session.clientFound;
    let user = req.session.profFound
    db.Profession.findAll().then(function (professions) {
      res.render("rubros", { professions: professions,
        user: user,
        userClient: userClient,
        userProf: userProf, });
    });
  },

  profPerProfession: function (req, res) {
    let userProf = req.session.profFound;
    let userClient = req.session.clientFound;
    let user = req.session.profFound
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
      res.render("professionals/profPerProfession", { professionals: professionals, profRequested ,
        user: user,
        userClient: userClient,
        userProf: userProf, });
    });
  },
  professionalDetail: function (req, res) {
    let userProf = req.session.profFound;
    let userClient = req.session.clientFound;
    let user = req.session.profFound;

    profRequested = req.params.client_id;
    db.Professional.findOne({
     include: [{ association: "clients" }, { association: "professions" },{ association: "workZones" }, { association: "workDays" }, { association: "shifts" }],
      where: {client_id : profRequested}
            
          //magia de pablo...
         
          //`%${profRequested}%`
        
        
    }).then(function (professional) {
      //console.log(professional);
      res.render("professionals/professionalDetail", { professional: professional, 
        user: user,
        userClient: userClient,
        userProf: userProf, });
    }).catch(function(error){console.log(error)})
    ;
  },

  //Delete
  showDeleteProf: function (req, res) {},
  deleteProf: function (req, res) {},
};

module.exports = professionalDBController;
