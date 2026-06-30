const { check, body, param, query } = require('express-validator');

const validate = {
  register: [
    check('nombre')
      .trim()
      .not()
      .isEmpty()
      .withMessage('El nombre es obligatorio'),
    check('apellido')
      .trim()
      .not()
      .isEmpty()
      .withMessage('El apellido es obligatorio'),
    check('email')
      .trim()
      .not()
      .isEmpty()
      .withMessage('El email es obligatorio')
      .isEmail()
      .withMessage('El email no es válido'),
    check('password')
      .trim()
      .not()
      .isEmpty()
      .withMessage('La contraseña es obligatoria')
      .isLength({ min: 8 })
      .withMessage('La contraseña debe tener al menos 8 caracteres'),
  ],

  login: [
    check('email')
      .trim()
      .not()
      .isEmpty()
      .withMessage('El email es obligatorio')
      .isEmail()
      .withMessage('El email no es válido'),
    check('password')
      .trim()
      .not()
      .isEmpty()
      .withMessage('La contraseña es obligatoria'),
  ],

  producto: [
    check('nombre')
      .trim()
      .not()
      .isEmpty()
      .withMessage('El nombre es obligatorio'),
    check('descripcion')
      .trim()
      .not()
      .isEmpty()
      .withMessage('La descripción es obligatoria'),
    check('precio')
      .trim()
      .not()
      .isEmpty()
      .withMessage('El precio es obligatorio')
      .isNumeric()
      .withMessage('El precio debe ser numérico'),
  ],
};

module.exports = validate;