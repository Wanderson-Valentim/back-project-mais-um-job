const { body } = require('express-validator');
const { cpf } = require('cpf-cnpj-validator')

const expectedKeys = [
  'name', 'phone', 'whatsapp', 'instagram',
  'areaOfActivity', 'profession', 'description', 'local'
];

const updateUserValidator = [
  body().custom((value, { req }) => {
    const receivedKeys = Object.keys(req.body);

    if (receivedKeys.length === 0){
      throw new Error('Objeto vazio');
    }

    const extraKeys = receivedKeys.filter(key => !expectedKeys.includes(key));

    if (extraKeys.length > 0) {
      throw new Error(`Propriedades extras não permitidas: ${extraKeys.join(', ')}`);
    }

    return true;
  }),
  body('name').optional().isString(),
  body('phone').optional().matches(/^\d{11}$/).isString(),
  body('whatsapp').optional(),
  body('instagram').optional(),
  body('areaOfActivity').optional().isDecimal(),
  body('profession').optional().isString(),
  body('description').optional().isString(),
  body('local').optional().isDecimal(),
];

module.exports = updateUserValidator