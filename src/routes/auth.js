const express = require('express')
const router = express.Router()
const loginValidationChain = require('../validators/loginValidator')
const authController = require('../controllers/auth');
const { validateToken } = require('../middlewares/auth');

router.post("/login", loginValidationChain, authController.login);

router.get("/auth", validateToken, authController.verifyToken);

module.exports = router