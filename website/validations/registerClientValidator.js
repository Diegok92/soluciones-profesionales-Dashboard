const { body } = require("express-validator");

const registerClientValidator = [
  body("firstName")
    .notEmpty()
    .withMessage("Campo Vacio")
    .isLength({ min: 2 })
    .withMessage("Completar Nombre (Min 2 caracteres)")
    .bail(),
  body("lastName")
    .notEmpty()
    .withMessage("Campo Vacio")
    .isLength({ min: 2 })
    .withMessage("Completar Apellido (Min 2 caracteres)")
    .bail(),
  body("email")
    .notEmpty()
    .withMessage("Campo Vacio")
    .isEmail()
    .withMessage("Debe ser email Valido")
    .bail(),
  body("mobile")
    .notEmpty()
    .withMessage("Campo Vacio")
    .isNumeric()
    .withMessage("Completar Telefono")
    .bail(),
  body("city_Id")
    .notEmpty()
    .withMessage("Campo Vacio")
    .isNumeric()
    .withMessage("Completar Ciudad")
    .bail(), //poner como opcion predeterminada "Seleccione" y verficar contra esa
  body("address")
    .isAlphanumeric()
    .withMessage("Completar direccion acepta: alfanumerico y espacios")
    .bail(),
  body("dni")
    .notEmpty()
    .withMessage("Campo Vacio")
    .isNumeric()
    .withMessage("numeros solos")
    .isLength({ min: 8, max: 8 })
    .withMessage("Completar dni")
    .bail(),
  body("role")
    .notEmpty()
    .withMessage("Campo Vacio")
    .isAlpha()
    .withMessage("Debes especificar Cliente o Profesional"), //poner como opcion predeterminada "Seleccione" y verficar contra esa
  body("password")
    .notEmpty()
    .withMessage("Campo Vacio")
    .isLength({ min: 8 })
    .withMessage("las contraseña de tener min 8 caracteres")
    .bail(), //.matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
  body("passwordConfirm")
    .notEmpty()
    .withMessage("Campo Vacio")
    .isLength({ min: 8 })
    .withMessage("las contraseña de tener min 8 caracteres")
    .bail(), //.matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
];

module.exports = registerClientValidator;
