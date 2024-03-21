const { body } = require('express-validator');
const { cpf } = require('cpf-cnpj-validator')

const expectedKeys = [
  'name', 'email', 'password', 'cpf', 'phone', 'whatsapp', 'instagram',
  'areaOfActivityId', 'profession', 'description', 'localId'
];

const createUserValidator = [
  body().custom((value, { req }) => {
    const receivedKeys = Object.keys(req.body);
    const extraKeys = receivedKeys.filter(key => !expectedKeys.includes(key));

    if (extraKeys.length > 0) {
      throw new Error(`Propriedades extras não permitidas: ${extraKeys.join(', ')}`);
    }

    return true;
  }),
  body('name').notEmpty().isString(),
  body('email').notEmpty().trim().isEmail(),
  body('password').notEmpty().isString(),
  body('cpf').notEmpty().matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/).custom(value => {
    const isValid = cpf.isValid(value)

    if(!isValid) throw new Error('CPF inválido');

    return isValid
  }),
  body('phone').notEmpty().matches(/^\d{11}$/).isString(),
  body('whatsapp').optional(),
  body('instagram').optional(),
  body('areaOfActivityId').notEmpty().isNumeric(),
  body('profession').notEmpty().isString(),
  body('description').notEmpty().isString(),
  body('localId').notEmpty().isNumeric(),
];

module.exports = createUserValidator