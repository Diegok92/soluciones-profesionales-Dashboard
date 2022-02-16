const { body } = require("express-validator");

const loginValidator = [
  body("email").isEmail().withMessage("Completar email").bail(),
  body("password").notEmpty().withMessage("Completar contraseña"),
];

module.exports = loginValidator;
