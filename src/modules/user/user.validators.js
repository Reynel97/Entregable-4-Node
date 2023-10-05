const { check, validationResult } = require("express-validator");
const { validateResult } = require("../../middlewares/validator.middleware");

const registerUserValidator = [
  check("firstname", "error con firstname")
    .exists()
    .withMessage("No se incluye la propiedad firstname")
    .notEmpty()
    .withMessage("El firstname no debe estar vacio")
    .isString()
    .withMessage("El valor del firstname debe ser string")
    .isLength({ min: 2, max: 50 })
    .withMessage("la longitud del nombre debe ser  entre 2 y 50 carcteres")
    .matches(/^[a-zA-Z\s]/)
    .withMessage("El firstname solo acepta letras"),
  check("lastname", "Error con lastname")
    .exists()
    .withMessage("No se incluye la propiedad lastname")
    .notEmpty()
    .withMessage("El lastname no debe estar vacio")
    .isString()
    .withMessage("El valor del lastname debe ser string")
    .isLength({ min: 2, max: 50 })
    .withMessage("La longitud del apellido de ser entre 2 y 50 caracteres")
    .matches(/^[a-zA-Z\s]/)
    .withMessage("El lastname solo acepta letras"),
  check("email", "Error con el campo email")
    .exists()
    .withMessage("La propiedad email no esta incluida")
    .notEmpty()
    .withMessage("La propiedad email no estar vacia")
    .isString()
    .withMessage("La propiedad email de ser un string")
    .isEmail()
    .withMessage("La propiedad emailno tiene el formato de correo")
    .isLength({ min: 7, max: 50 })
    .withMessage("La propiedad emaildebe ser minimo 7 y maximo 50 caracteres"),
  check("password", "error en el campo password")
    .exists()
    .withMessage("La propeidad password no esta incluida")
    .notEmpty()
    .withMessage("La propeidad password no debe estar vacia")
    .isString()
    .withMessage("La propiedad password de ser un string")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%-^&*]{8,}$/
    )
    .withMessage(
      "La propiedad password de ser minimo 8 caracteres, una mayuscula y una minuscula"
    ),
  validateResult,
];

const loginValidation = [
  check("email", "Error con el campo email")
    .exists()
    .withMessage("La propiedad email no esta incluida")
    .notEmpty()
    .withMessage("La propiedad email no puede estar vacia")
    .isString()
    .withMessage("La propiedad email debe ser un string"),
  check("password")
    .exists()
    .withMessage("La propiedad password no esta incluida")
    .notEmpty()
    .withMessage("La propiedad password no debe estar vacia")
    .isString()
    .withMessage("La propiedad password debe ser un string"),
  validateResult,
];

module.exports = {
  registerUserValidator,
  loginValidation
};
