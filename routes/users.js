const express = require('express')
const router = express.Router()
const { validateToken } = require('../middlewares/auth')

router.use(validateToken);

router.get("/users", (req, res) => {
  res.send("Todos os usuários");
});

router.get("/users/:id", (req, res) => {
  res.send("Apenas um usuário");
});

router.post("/users", (req, res) => {
  res.send("Criando usuário");
});

router.put("/users/:id", (req, res) => {
  res.send("Atualizando usuário");
});

router.delete("/users/:id", (req, res) => {
  res.send("Deletando usuário");
});

module.exports = router