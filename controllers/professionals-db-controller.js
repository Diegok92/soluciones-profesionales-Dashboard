const express = require("express"); //porq no se usa??
const { sequelize } = require("../database/models"); //porq no se usa??
const db = require("../database/models");
const Op = db.Sequelize.Op;
const profRoute = require("../routes/professionals-routers");
const bcrypt = require("bcryptjs");

const professionalDBController = {
  //cambiar nombre en enroutador, anterior 'rubros'

  //GET del registerProf, muestra el form
  registerProf: function (req, res) {
    db.Professional.findAll({
      include: [
        { association: "professions" },
        { association: "workZones" },
        { association: "ProfessionalWorkDayShift" }, //asociacion, no tabla
      ],
    }).then(function (profData) {
      let userProf = req.session.profFound;
      let userClient = req.session.clientFound;
      const uniqueProfession = [];
      const uniqueProfessionId = [];
      const uniqueWorkZones = [];
      const uniqueWorkZonesId = [];
      for (let i = 0; i < profData.length; i++) {
        if (!uniqueProfession.includes(profData[i].professions[0].profession)) {
          uniqueProfession.push(profData[i].professions[0].profession);
          uniqueProfessionId.push(profData[i].professions[0].id);
          //console.log("la profesion es "+ uniqueProfession);
          // console.log("y su id es "+ uniqueProfessionId);
        }
      }
      for (let i = 0; i < profData.length; i++) {
        if (!uniqueWorkZones.includes(profData[i].workZones.location)) {
          uniqueWorkZones.push(profData[i].workZones.location); //workZones es el nombre de la "Association" //
          uniqueWorkZonesId.push(profData[i].workZones.id);
          // console.log("la work zone es "+ uniqueWorkZones);
          // console.log("y su id es "+ uniqueWorkZonesId);
        } //location es el nombre de la columna de DB
      }
      //console.log(uniqueWorkZonesId);

      res.render("professionals/registerProf", {
        userClient: userClient,
        userProf: userProf,
        uniqueProfession: uniqueProfession,
        uniqueProfessionId: uniqueProfessionId,
        uniqueWorkZones: uniqueWorkZones,
        uniqueWorkZonesId: uniqueWorkZonesId,
      });
    });
  },

  //boton de crear en vista registerProf (POST)
  createProf: async function (req, res) {
    // console.log(
    //   "#########################################################################################"
    // );
    //console.log(req.body.dayShift[0]);
    //console.log(req.body.dayShift[1])

    const dniCreadoPrevio = await req.session.dniFound;

    const clientDataFound = await db.Client.findOne({
      where: {
        dni: dniCreadoPrevio,
      },
    });
    const clientFound = await clientDataFound.id;

    const createWorkimage = await db.WorkImage.create({
      imageTitle: req.file.filename,
    });

    const prof = await db.Professional.create({
      emergency: req.body.emergency,
      whyMe: req.body.whyMe,
      price: req.body.price,
      cbu: req.body.cbu,
      licence: req.body.licence,
      client_id: clientFound,
      workZone_id: req.body.workZone,

      workImage_id: createWorkimage.id,

      //shift:
      //workDays:
    });

    await prof.setProfessions(req.body.professionId);

    //pendiente de automatizar los dias/turnos (1=mañana )

    let dayShift = req.body.dayShift; //["1,1", "1,2", "3,1", "6,1"]
    let shifts = [];
    let days = [];

    if (typeof dayShift != "string") {
      //osea es un Array (cuando se registra con mas de un horario)
      //recorro una sola vez el array y guardo todos los shift y days

      dayShift.forEach((element) => {
        shifts.push(element[2]); //la coma es el 1
        days.push(element[0]);
      });

      for (let i = 0; i < dayShift.length; i++) {
        await prof.createProfessionalWorkDayShift({
          shift_id: shifts[i], //1=mañana // [1,2,1,1]
          workDay_id: days[i], //2 = martes // [1,1,3,6]
        });
      }
    } else {
      let days = dayShift[0];
      let shifts = dayShift[2];

      await prof.createProfessionalWorkDayShift({
        shift_id: shifts, //1=mañana // [1,2,1,1]
        workDay_id: days, //2 = martes // [1,1,3,6]
      });
      //days.push(dayShift.charAt(0));
      //shifts.push(dayShift.charAt(2));
    }

    res.redirect("/login");
  },

  // Edit
  editProf: function (req, res) {
    db.Professional.findAll({
      include: [
        { association: "clients" },
        { association: "professions" },
        { association: "workZones" },
        { association: "workDays" },
        { association: "shifts" },
      ],
    }).then(function (profData) {
      let userProf = req.session.profFound;
      let userClient = req.session.clientFound;
      const uniqueProfession = [];
      const uniqueProfessionId = [];
      const uniqueWorkZones = [];
      const uniqueWorkZonesId = [];
      let profFound = 0;

      for (let i = 0; i < profData.length; i++) {
        if (!uniqueProfession.includes(profData[i].professions[0].profession)) {
          uniqueProfession.push(profData[i].professions[0].profession);
          uniqueProfessionId.push(profData[i].professions[0].id);
        }
        if (!uniqueWorkZones.includes(profData[i].workZones.location)) {
          uniqueWorkZones.push(profData[i].workZones.location); //workZones es el nombre de la "Association" //
          uniqueWorkZonesId.push(profData[i].workZones.id);
        }
        if (profData[i].client_id == req.params.id) {
          profFound = profData[i];
          //console.log("dentro del if de prof data vale" + profData[i].id); //107
        }
      }

      console.log("dentro de shift viene " + profFound.shifts[0].shift); //sin el [0] FUNCION NATIVA???
      console.log("dentro del workDays viene " + profFound.workDays[0].day);
      res.render("professionals/editProfTest", {
        userClient: userClient,
        userProf: userProf,
        profFound: profFound,
        uniqueProfession: uniqueProfession,
        uniqueProfessionId: uniqueProfessionId,
        uniqueWorkZones: uniqueWorkZones,
        uniqueWorkZonesId: uniqueWorkZonesId,
      });
    });

    // console.log("Dentro del req.params.id viene " + req.params.id); //IdCLiente

    // const professions = db.Professional.findAll({
    //   include: [{ association: "professions" }, { association: "workZones" }],
    // });

    // const professional = db.Professional.findOne({
    //   include: [
    //     { association: "clients" },
    //     { association: "professions" },
    //     { association: "workZones" },
    //     { association: "workDays" },
    //     { association: "shifts" },
    //   ],
    //   where: {
    //     "$professional.client_id$": {
    //       //magia de pabloy de diego...
    //       [Op.eq]: req.params.id,
    //       // `%${profRequested}%`
    //     },
    //   },
    // })
    //   .then(function (result) {
    //     // Promise.all([professions, professional]).then(function (
    //     //   profession,
    //     //   Professional
    //     // ) {
    //     // console.log("Dentro del profFound viene " + req.session.profFound.id);

    //     // const uniqueProfession = [];
    //     // const uniqueProfessionId = [];
    //     let userProf = req.session.profFound;
    //     let userClient = req.session.clientFound;
    //     let profFound = result;

    //     // for (let i = 0; i < profession.length; i++) {
    //     //   if (!uniqueProfession.includes(profession[i].professions.profession)) {
    //     //     uniqueProfession.push(profession[i].professions.profession);
    //     //     uniqueProfessionId.push(profession[i].professions.id);
    //     //   }
    //     // }
    //     //console.log("Dentro del uniqprofession viene " + uniqueProfession);
    //     db.Professional.findAll({
    //       include: [
    //         { association: "professions" },
    //         { association: "workZones" },
    //       ],
    //     });
    //   })
    //   .then(function (profData) {
    //     const uniqueProfession = [];
    //     const uniqueProfessionId = [];
    //     //const uniqueWorkZones = [];
    //     //const uniqueWorkZonesId = [];
    //     for (let i = 0; i < profData.length; i++) {
    //       if (
    //         !uniqueProfession.includes(profData[i].professions[0].profession)
    //       ) {
    //         uniqueProfession.push(profData[i].professions[0].profession);
    //         uniqueProfessionId.push(profData[i].professions[0].id);
    //         //console.log("la profesion es "+ uniqueProfession);
    //         // console.log("y su id es "+ uniqueProfessionId);
    //       }
    //     }
    //   })
    //   .then(function (result3) {
    //     res.render("professionals/editProfTest", {
    //       userClient: userClient,
    //       userProf: userProf,
    //       profFound: profFound,
    //       uniqueProfession: uniqueProfession,
    //       uniqueProfessionId: uniqueProfessionId,
    //     }); //render usa ruta en carpeta (users)
    //   });
  },

  updateProf: async function (req, res) {
    // const idEditar = await req.session.profFound.id; //trae el client_id del prof
    // const clientDataFound = await db.Client.findOne({
    //   where: {
    //     dni: idEditar,
    //   },
    // });
    //const clientFound = await clientDataFound.id;

    const createWorkimage = await db.WorkImage.update({
      imageTitle: req.file.filename,
    });

    const prof = await db.Professional.update({
      emergency: req.body.emergency,
      whyMe: req.body.whyMe,
      price: req.body.price,
      cbu: req.body.cbu,
      licence: req.body.licence,
      client_id: req.session.profFound.id,
      workZone_id: req.body.workZone,
      workImage_id: createWorkimage.id,
    });

    await prof.setProfessions(req.body.professionId);
    await prof.setShifts(1);
    await prof.setWorkDays([]); //despues del Set va en mayuscula el alias de la asociacion
    //hacer for de todos los checkboxes (solo de los nuevos del editform)

    // await prof.createWorkDay({
    //   workDays_id: ,
    //   shift_id:
    // });

    res.redirect("/login");
  },

  //Listing professions, professionals, professional
  professionsList: function (req, res) {
    let userProf = req.session.profFound;
    let userClient = req.session.clientFound;
    let user = req.session.profFound;
    db.Profession.findAll().then(function (professions) {
      res.render("rubros", {
        professions: professions,
        user: user,
        userClient: userClient,
        userProf: userProf,
      });
    });
  },

  profPerProfession: function (req, res) {
    let userProf = req.session.profFound;
    let userClient = req.session.clientFound;
    let user = req.session.profFound;
    profRequested = req.params.profession;
    //
    //console.log(profRequested);
    //console.log(Professional);
    db.Professional.findAll({
      include: [
        { association: "clients" },
        { association: "professions" },
        { association: "workZones" },
        { association: "workDays" },
        { association: "shifts" },
      ],
      where: {
        "$professions.profession$": {
          //magia de pablo...
          [Op.like]: "%" + profRequested + "%",
          // `%${profRequested}%`
        },
      },
    }).then(function (professionals) {
      //console.log(professionals);
      res.render("professionals/profPerProfession", {
        professionals: professionals,
        profRequested,
        user: user,
        userClient: userClient,
        userProf: userProf,
      });
    });
  },

  //en la URL viaja el ID en lugar del DNI -- CAMBIAR (para dejarlo igual a client)
  professionalDetail: function (req, res) {
    let userProf = req.session.profFound;
    let userClient = req.session.clientFound;
    let user = req.session.profFound;

    profRequested = req.params.client_id;
    db.Professional.findOne({
      include: [
        { association: "clients" },
        { association: "professions" },
        { association: "workZones" },
        { association: "workDays" },
        { association: "shifts" },
      ],
      where: { client_id: profRequested },

      //magia de pablo...

      //`%${profRequested}%`
    })
      .then(function (professional) {
        //console.log(professional);
        res.render("professionals/professionalDetail", {
          professional: professional,
          user: user,
          userClient: userClient,
          userProf: userProf,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  //Delete
  showDeleteProf: function (req, res) {},
  deleteProf: function (req, res) {},
};

module.exports = professionalDBController;
