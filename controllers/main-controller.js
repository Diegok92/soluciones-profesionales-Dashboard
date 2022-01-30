// para todos los links del home, nosotros, about, etc
const db = require("../database/models");

const path = require("path");
const fs = require("fs");
const { validationResult } = require("express-validator"); //trae los datos guardados en "validator"
const bcrypt = require("bcryptjs");

const clientsFilePath = path.join(__dirname, "../database/clients.json"); //traigo la ruta a la base de datos
const clientsFileText = fs.readFileSync(clientsFilePath, "utf-8"); // me traigo los datos de JSON (formato txt)
const clientsList = JSON.parse(clientsFileText); //lo parseo para poder tener el ARRAY DE PRODUCTOS (array de obj)

const professionalsFilePath = path.join(
  __dirname,
  "../database/professionalsList.json"
); //traigo la ruta a la base de datos
const professionalsFileText = fs.readFileSync(professionalsFilePath, "utf-8"); // me traigo los datos de JSON (formato txt)
const professionalsList = JSON.parse(professionalsFileText); //lo parseo para poder tener el ARRAY DE PRODUCTOS (array de obj)

module.exports = {
  home: (req, res) => {
    if (
      req.session.profFound != undefined &&
      req.session.clientFound != undefined
    ) {
      let userProf = req.session.profFound;
      let userClient = req.session.clientFound;
      res.render("index", { userClient: userClient, userProf: userProf });
    }

    if (req.session.profFound != undefined) {
      let userProf = req.session.profFound;
      res.render("index", { userProf: userProf });
    } else if (req.session.clientFound != undefined) {
      let userClient = req.session.clientFound;
      res.render("index", { userClient: userClient });
    } else {
      res.render("index");
    }
  },
  productCart: (req, res) => {
    let userProf = req.session.profFound;
    let userClient = req.session.clientFound;

    res.render("productCart", { userClient: userClient, userProf: userProf });
  },
  login: (req, res) => {
    let userProf = req.session.profFound;
    let userClient = req.session.clientFound;
    res.render("login", { userClient: userClient, userProf: userProf });
  },
  verificator: (req, res) => {
    //verificamos si hay errores en el formulario LOGIN
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      //si hay errores
      console.log(errors);
      res.render("login", { errors: errors.errors, old: req.body });
    } else {
      //si no hay errores:
      const user = req.body.email;
      let clientFound;
      let profFound;
      let admin;
      let userFound;

      //Busqueda en Listado Clientes
      db.Clientes.findOne({
        where: {
          email: req.body.email,
        },
      }).then((result) => {
        userFound = result;
        console.log(userFound);

        if (userFound == undefined) {
          res.render("login", {
            errors: [{ msg: "email - Credenciales Invalidas" }],
            old: req.body,
          });
          return res.redirect("/");
        }

        if (bcrypt.compareSync(req.body.password, userFound.password) == true) {
          if (userFound.role == "Client") {
            req.session.clientFound = userFound;
            clientFound = userFound;
          } else if (userFound.role == "Professional") {
            req.session.profFound = userFound;
            profFound = userFound;
          } else if (userFound.role == "Admin") {
            req.session.admin = userFound;
            admin = userFound;
          }
        } else {
          res.render("login", {
            errors: [{ msg: "pass - Credenciales Invalidas" }],
            old: req.body,
          });
        }

        return res.redirect("/");
      });
    }
  },

  //Busqueda Vieja (en JSON)
  // for (let i = 0; i < clientsList.length; i++) {
  //   if (clientsList[i].email == user) {
  //     clientFound = clientsList[i];
  //     if (
  //       bcrypt.compareSync(req.body.password, clientFound.password) == true
  //     ) {
  //       req.session.clientFound = clientFound; //obj del cliente logueado
  //     } else {
  //       res.render("login", {
  //         errors: [{ msg: "Credenciales Invalidas" }],
  //         old: req.body,
  //       });
  //     }}
  // }
  // for (let i = 0; i < professionalsList.length; i++) {
  //   if (professionalsList[i].email == user) {
  //     profFound = professionalsList[i];
  //     if (
  //       bcrypt.compareSync(req.body.password, profFound.password) == true
  //     ) {
  //       req.session.profFound = profFound; //obj del prof logueado
  //     } else {
  //       res.render("login", {
  //         errors: [{ msg: "Credenciales Invalidas" }],
  //         old: req.body,
  //       });
  //     }
  //   }
};
