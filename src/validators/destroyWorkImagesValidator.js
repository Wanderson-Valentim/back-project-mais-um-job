const { body } = require('express-validator');

const destroyWorkImagesValidator = [
  body('names').isArray({ min: 1 }),
];

module.exports = destroyWorkImagesValidator