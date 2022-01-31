const express = require("express");
const db = require("../database/models");

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

  profPerProfession: function (req, res) {},
  professionalDetail: function (req, res) {},

  //Delete
  showDeleteProf: function (req, res) {},
  deleteProf: function (req, res) {},
};

module.exports = professionalDBController;
