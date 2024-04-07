const activityService = require("../services/activities");

const activitiesController = {
  findActivities: async (req, res) => {
    try {
      const activities = await activityService.findActivities();
  
      if(!activities) return res.status(404).json({ message: "Áreas de atuação não encontradas!" });
     
      res.json(activities);
    } catch (error) {
      res.status(500).json({ message: "Houve um erro no servidor!" });
    }
  },
};

module.exports = activitiesController;