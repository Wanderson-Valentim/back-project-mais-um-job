const activityRepository = require("../repositories/activities");

const activityService = {
  findActivities: async function () {
    const activities = await activityRepository.findAll();
    return activities;
  },
};

module.exports = activityService;