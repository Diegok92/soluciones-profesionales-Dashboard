const { body } = require("express-validator");
const db = require("../database/models");
const { sequelize } = require("../database/models"); //porq no se usa??
const Op = db.Sequelize.Op;
const path = require("path");

const registerClientValidator = [
  body("firstName")
    .notEmpty()
    .withMessage("Completar Nombre")
    .isLength({ min: 2 })
    .withMessage("Completar Nombre (Min 2 caracteres)")
    .custom(function (name) {
      const reName = new RegExp(/[^a-zA-Z]/);
      if (name.match(reName) != null) {
        return false;
      }
      return true;
    })
    .withMessage("1er Nombre, sin espacios")
    .bail(),
  body("lastName")
    .notEmpty()
    .withMessage("Completar Apellido")
    .isLength({ min: 2 })
    .withMessage("Completar Apellido (Min 2 caracteres)")
    .custom(function (name) {
      const reName = new RegExp(/[^a-zA-Z]/);
      if (name.match(reName) != null) {
        return false;
      }
      return true;
    })
    .withMessage("1er Apellido, sin espacios")
    .bail(),
  body("email")
    .notEmpty()
    .withMessage("Completar Email")
    .isEmail()
    .withMessage("Debe ser un Email valido")
    .custom(async (emailGiven) => {
      const existingEmail = await db.Client.findOne({
        where: {
          email: emailGiven,
        },
      });

      if (existingEmail) {
        throw new Error("Ese Email ya fue registrado");
      }
    })
    .bail(),
  body("mobile")
    .notEmpty()
    .withMessage("Completar Telefono")
    .isNumeric()
    .withMessage("Completar Telefono Valido")
    .bail(),
  body("city_Id")
    .notEmpty()
    .withMessage("Elegir Ciudad")
    .isNumeric()
    .withMessage("Elegir Ciudad")
    .bail(), //poner como opcion predeterminada "Seleccione" y verficar contra esa
  body("address")
    .notEmpty()
    .withMessage("Completar direccion")
    .custom(function (name) {
      const reAddress = new RegExp(/[^A-Za-z0-9\s]/);
      if (name.match(reAddress) != null) {
        return false;
      }
      return true;
    })
    .withMessage("Completar direccion: alfanumerico y espacios")
    .bail(),
  body("dni")
    .notEmpty()
    .withMessage("Completar DNI")
    .isNumeric()
    .withMessage("Solo Numeros (ni puntos, guiones ni espacios")
    .isLength({ min: 8, max: 8 })
    .withMessage("DNI Invalido")
    .bail(),
  body("avatar")
    .custom((value, { req }) => {
      if (!req.file) throw new Error("Falta Imagen de Avatar");
      return true;
    })
    .custom(function (value, { req }) {
      var extension = path.extname(req.file.originalname).toLowerCase();
      switch (extension) {
        case ".jpg":
          return true;
        case ".jpeg":
          return true;
        case ".png":
          return true;
        case ".gif":
          return true;
        default:
          return false;
      }
    })
    .withMessage("La imagen debe ser: .jpg .jpeg .png o .gif")
    .custom(function (value, { req }) {
      var fileSize = req.file.size;
      var size = Math.round(fileSize / 1024);

      if (size > 1024) {
        return false;
      } else {
        return true;
      }
    })
    .withMessage("La imagen debe pesar menos de 1mb")
    .bail(),
  body("role")
    .notEmpty()
    .withMessage("Elegir un Perfil de usuario")
    .isAlpha()
    .withMessage("Debes especificar Cliente o Profesional"), //poner como opcion predeterminada "Seleccione" y verficar contra esa
  body("password")
    .notEmpty()
    .withMessage("Completar Contraseña")
    .isLength({ min: 8 })
    .withMessage("La contraseña de tener min 8 caracteres")
    .custom(function (name) {
      const rePassword = new RegExp(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/
      );
      if (name.match(rePassword) == null) {
        return false;
      }
      return true;
    })
    .withMessage(
      "Contraseña: min 8 caracteres, una mayus, un numero, y algun: ! @ # $ % ^ & * "
    )
    .bail(), //.matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
  // body("password2")
  //   .notEmpty()
  //   .withMessage("Campo Vacio")
  //   .isLength({ min: 8 })
  //   .withMessage("las contraseña de tener min 8 caracteres")
  //   .bail(), //.matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
];

module.exports = registerClientValidator;
