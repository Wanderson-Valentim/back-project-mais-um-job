const imageRepository = require('../repositories/images');

const imageService = {
  findImage: async function (name) {
    const filePath = imageRepository.findOne(name);

    return filePath;
  },

  destroy: async function (names) {
    const excluded = await imageRepository.destroy(names);

    return excluded;
  },
};

module.exports = imageService;