const express = require("express"); //porq no se usa??
const { sequelize } = require("../database/models"); //porq no se usa??
const db = require("../database/models");
const Op = db.Sequelize.Op;
const profRoute = require("../routes/professionals-routers");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator"); //trae los datos guardados en "validator"

const apiProfessional = {
  professionalList: async function (req, res) {
    // const client = await db.Client.findAll({
    //   include: [{ association: "cities" }],
    // });

    const profesionales = await db.Professional.findAll({
      include: [
        { association: "professions" },
        { association: "workZones" },
        { association: "ProfessionalWorkDayShift" },
      ],
    });

    const totalProfessionals = profesionales.length;

    const professions = await db.Profession.findAll();

    // {
    //  total: 500,
    //  Profesiones:[{id:1,Profesion:Mecanica,total:24},
    //  {id:2,Profesion:pintor,total:27}]
    // }
    let infoProfession = [];

    for (let i = 1; i <= professions.length; i++) {
      //21
      let cantPerProf = await db.professionals_profession.count({
        where: {
          profession_id: {
            [Op.like]: i,
          },
        },
      });
      //cantPerProf = [45,76,34,56]

      //   await db.Profession.findByPk(i);

      let professionTitle = professions[i];
      //   [mecanico,pintor,piletero]
      infoProfession.push({
        //id: [i],
        profession: professionTitle,
        total: cantPerProf,
      });
      // [35,piletero,35,mecanico,56,pintor]
    }

    const uniqProfessions = professions.filter(function (valor) {
      return valor.profession;
    });

    const professionsName = professions.map(function (x) {
      return x.profession;
    });

    return res.status(200).json({
      totalProfessionals: totalProfessionals, //102
      infoProfession: infoProfession,
      //totalAdmins: totalAdmins.length,
      //professions: professions,
      //totalProfessions: uniqProfessions.length,
      //totalPerProf: totalPerProf,
      //listado: listado,
    });

    const cliente = await db.Client.findAll({
      include: [{ association: "cities" }],
    });

    //{id:1,name:pedro,email:pedro.com, detail: "api/user/1"}

    const listado = await cliente.map(function (element) {
      return {
        id: element.id,
        firstName: element.firstName,
        lastName: element.lastName,
        email: element.email,
        url: `api/users/${element.id}`,
      };
    });
    console.log(listado);
    //cliente.reduce(function () {});

    // roles = cliente.map(function (cliente) {
    //   return cliente.role;
    // });

    // totalClients = cliente.filter(function (cliente) {
    //   return cliente.role == "Client";
    // });

    // totalAdmins = cliente.filter(function (admin) {
    //   return admin.role == "Admin";
    // });

    //   cantidad = await db.Client.count()

    //   cantidad = await db.Role.findAll({
    //       atributes: ["name"],
    //       group: []
    //   })

    //FALTA filtrar cant por rol
  },

  professionalDetail: async function (req, res) {
    const cliente = await db.Client.findAll({
      include: [{ association: "cities" }],
      where: {
        id: req.params.id,
      },
    });

    const listado = await cliente.map(function (element) {
      return {
        id: element.id,
        firstName: element.firstName,
        lastName: element.lastName,
        email: element.email,
        city_Id: element.cities.province,
        mobile: element.mobile,
        role: element.role,
        urlAvatar: `/images/clients/${element.avatar}`,
      };
    });

    return res.status(200).json({
      listado: listado,
    });
  },
};

module.exports = apiProfessional;
