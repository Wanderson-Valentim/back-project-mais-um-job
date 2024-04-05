const express = require('express')
const router = express.Router()
const { validateToken } = require('../middlewares/auth')
const imageController = require('../controllers/images');
const destroyWorkImagesValidator = require('../validators/destroyWorkImagesValidator');

router.get("/images/:name", imageController.findImage);

router.post("/images/work", validateToken, imageController.uploadWorkImages);

router.post("/images/avatar", validateToken, imageController.uploadAvatar);

router.delete("/images/avatar", validateToken, imageController.destroyAvatar);

router.delete("/images/work", validateToken, destroyWorkImagesValidator, imageController.destroyWorkImages);

module.exports = router