const { body } = require("express-validator");

const loginValidator = [
  body("email").isEmail().withMessage("Completar email").bail(),
  body("password").notEmpty().withMessage("completar contraseña"),
];

module.exports = loginValidator;
