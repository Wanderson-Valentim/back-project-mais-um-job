const AreaOfActivity = require("../models/AreaOfActivity");

const activityRepository = {
  findAll: async (attributes = null, transaction = null) => {
    const activities = await AreaOfActivity.findAll({ attributes, transaction });
    return activities;
  },
};

module.exports = activityRepository;
