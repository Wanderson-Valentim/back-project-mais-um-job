const localService = require("../services/locations");

const locationsController = {
  findLocations: async (req, res) => {
    try {
      const locations = await localService.findLocations();
  
      if(!locations) return res.status(404).json({ message: "Locais não encontrados!" });
     
      res.json(locations);
    } catch (error) {
      res.status(500).json({ message: "Houve um erro no servidor!" });
    }
  },
};

module.exports = locationsController;