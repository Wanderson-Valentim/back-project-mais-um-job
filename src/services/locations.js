const localRepository = require("../repositories/locations");

const localService = {
  findLocations: async function () {
    const locations = await localRepository.findAll();
    return locations;
  },
};

module.exports = localService;