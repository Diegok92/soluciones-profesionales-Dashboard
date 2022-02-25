const { body } = require("express-validator");
const db = require("../database/models");
const { sequelize } = require("../database/models"); //porq no se usa??
const Op = db.Sequelize.Op;
const path = require("path");

const editClientValidator = [
  /*
modificación de productos
○ Nombre
    ■ Obligatorio.
    ■ Deberá tener al menos 2 caracteres.
○ Descripción
    ■ Deberá tener al menos 20 caracteres.
○ Imagen
    ■ Deberá ser un archivo válido (JPG, JPEG, PNG, GIF).
○ (Opcional) Tablas secundarias
    ■ Verificar que los valores existan en base. Es decir, que los valores
    de talles, colores, etc. que lleguen sean válidos en la base.
*/
  body("firstName")
    .notEmpty()
    .withMessage("Tu nombre no puede quedar vacío")
    .isLength({ min: 2 })
    .withMessage("Tu nombre debe tener al menos 2 caracteres")
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
    .withMessage("Tu apellido es obligatorio!")
    .isLength({ min: 2 })
    .withMessage("Tu Apellido debe tener al menos 2 caracteres")
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
    .withMessage("Debes completar tu email")
    .isEmail()
    .withMessage("Debes ingresar un email válido")
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
    .withMessage("Debes ingresar tu numero de celular sin el 0 y sin el 15")
    .bail(),
  body("city_Id")
    .notEmpty()
    .withMessage("Elegir Ciudad")
    .isNumeric()
    .withMessage("Elegir Ciudad")
    .bail(), //poner como opcion predeterminada "Seleccione" y verficar contra esa
  body("address")
    .notEmpty()
    .withMessage("Tu domicilio no puede quedar vacío")
    .custom(function (name) {
      const reAddress = new RegExp(/[^A-Za-z0-9\s]/);
      if (name.match(reAddress) != null) {
        return false;
      }
      return true;
    })
    .withMessage("Completar direccion: alfanumerico y espacios")
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
    .withMessage("la imagen debe ser: .jpg .jpeg .png o .gif")
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
];

module.exports = editClientValidator;
