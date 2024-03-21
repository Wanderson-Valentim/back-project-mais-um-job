const express = require('express')
const router = express.Router()
const { validateToken } = require('../middlewares/auth');
const createUserValidator = require('../validators/createUserValidator');
const updateUserValidator = require('../validators/updateUserValidator.js');
const { validationResult } = require('express-validator');

router.use(validateToken);

router.get("/users", (req, res) => {
  res.send("Todos os usuários");
});

router.get("/users/:id", (req, res) => {
  res.send("Apenas um usuário");
});

router.post("/users", createUserValidator, (req, res) => {
  const result = validationResult(req);
  
  if(result.isEmpty()){
    res.send("Criado");
  } else{
    res.send({ errors: result.array() });
  }
});

router.put("/users/:id", updateUserValidator, (req, res) => {
  const result = validationResult(req);
  
  if(result.isEmpty()){
    res.send("Atualizado");
  } else{
    res.send({ errors: result.array() });
  }
});

router.delete("/users/:id", (req, res) => {
  res.send("Deletando usuário");
});

module.exports = router