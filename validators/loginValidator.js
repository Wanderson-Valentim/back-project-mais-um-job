const { body } = require('express-validator');

const loginValidationChain = [
  body('email').notEmpty().trim().isEmail(),
  body('password').notEmpty().isString(),
];

module.exports = loginValidationChain