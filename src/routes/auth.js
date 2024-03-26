const express = require('express')
const router = express.Router()
const loginValidationChain = require('../validators/loginValidator')
const authController = require('../controllers/auth')

router.post("/login", loginValidationChain, authController.login);

module.exports = router