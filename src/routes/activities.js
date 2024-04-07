const express = require('express');
const activitiesController = require('../controllers/activities');
const router = express.Router()

router.get("/activities", activitiesController.findActivities);

module.exports = router;