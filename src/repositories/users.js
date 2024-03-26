const User = require('../models/User');

const userRepository = {
  findOne: async (where, attributes = null) => {
    const user = await User.findOne({ where, attributes });
    return user;
  },

  findAll: async (attributes = null) => {
    const user = await User.findAll({ attributes });
    return user;
  },

  create: async (data) => {
    const user = await User.create(data);
    return user;
  },

  update: async (id, data) => {
    const user = await User.update(data, { where: { id: id } });
    return user;
  },
};

module.exports = userRepository;
