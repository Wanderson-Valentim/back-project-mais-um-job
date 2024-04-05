const WorkImages = require("../models/WorkImages");

const workImageRepository = {
  findOne: async (where, attributes = null, transaction = null) => {
    const image = await WorkImages.findOne({ where, attributes, transaction });
    return image;
  },

  findAll: async (attributes = null, transaction = null) => {
    const images = await WorkImages.findAll({ attributes, transaction });
    return images;
  },

  create: async (data, transaction = null) => {
    const image = await WorkImages.bulkCreate(data, { transaction });
    return image;
  },

  destroy: async (where, transaction = null) => {
    const result = await WorkImages.destroy({ where, transaction });
    return result;
  },

  count: async (where) => {
    const amount = await WorkImages.count({ where });
    return amount;
  },
};

module.exports = workImageRepository;
