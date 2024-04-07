const express = require('express')
const router = express.Router()
const { validateToken } = require('../middlewares/auth');
const createUserValidator = require('../validators/createUserValidator');
const updateUserValidator = require('../validators/updateUserValidator.js');
const userController = require('../controllers/users.js');

router.get("/users", userController.findUsers);

router.get("/users/:id", userController.findUser);

router.post("/users", createUserValidator, userController.createUser);

router.put("/users", validateToken, updateUserValidator, userController.updateUser);

module.exports = router