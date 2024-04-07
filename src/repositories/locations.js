const Local = require('../models/Local');

const localRepository = {
  findAll: async (attributes = null, transaction = null) => {
    const locations = await Local.findAll({ attributes, transaction });
    return locations;
  },
};

module.exports = localRepository;
