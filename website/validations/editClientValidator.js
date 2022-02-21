const { body }  = require("express-validator");

console.log("Entro al validador")

const editClientValidator = [

/*
modificación de productos
○ Nombre
    ■ Obligatorio.
    ■ Deberá tener al menos 5 caracteres.
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
        .isLength({ min: 5 })
        .withMessage("Tu nombre debe tener al menos 5 caracteres")
        .bail(),
    body("lastName")
        .notEmpty()
        .withMessage("Tu apellido es obligatorio!")
        .bail(),
    body("email")
        .notEmpty()
        .withMessage("Debes completar tu email")
        .isEmail()
        .withMessage("Debes ingresar un email válido")
        .bail(),    
    body("mobile")
        .isNumeric()
        .withMessage("Debes ingresar tu numero de celular sin el 0 y sin el 15"),
    body("address")
        .notEmpty()
        .withMessage("Tu domicilio no puede quedar vacío"),
];

module.exports = editClientValidator;