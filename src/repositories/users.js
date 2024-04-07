const User = require('../models/User');

const userRepository = {
  findOne: async (where, attributes = null, include = null, transaction = null) => {
    const user = await User.findOne({ where, attributes, include, transaction });
    return user;
  },

  findAll: async (where = null, attributes = null, include = null, transaction = null) => {
    const user = await User.findAll({ where, attributes, include, transaction });
    return user;
  },

  create: async (data, transaction = null) => {
    const user = await User.create(data, { transaction });
    return user;
  },

  update: async (id, data, transaction = null) => {
    const user = await User.update(data, { where: { id: id }, transaction });
    return user;
  },

  destroy: async (id, transaction = null) => {
    const result = await User.destroy({ where: { id: id }, transaction });
    return result;
  },
};

module.exports = userRepository;
