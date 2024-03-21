const { body } = require('express-validator');

const expectedKeys = [
  'name', 'phone', 'whatsapp', 'instagram',
  'areaOfActivityId', 'profession', 'description', 'localId'
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
  body('areaOfActivityId').optional().isNumeric(),
  body('profession').optional().isString(),
  body('description').optional().isString(),
  body('localId').optional().isNumeric(),
];

module.exports = updateUserValidator