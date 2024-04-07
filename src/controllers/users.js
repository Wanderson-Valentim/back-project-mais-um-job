const userService = require('../services/users.js');
const { validationResult } = require('express-validator');

const userController = {
  findUser: async (req, res) => {
    try {
      const { id } = req.params;
  
      const user = await userService.findUser(id);
  
      if(!user) return res.status(404).json({ message: "Usuário não encontrado!" });
     
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Houve um erro no servidor!" });
    }
  },

  findUsers: async (req, res) => {
    try {
      const queryParams = req.query;

      const users = await userService.findUsers(queryParams);
  
      if(!users || users.length === 0) return res.status(404).json({ message: "Usuários não encontrado!" });
     
      res.json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Houve um erro no servidor!" });
    }
  },

  createUser: async (req, res) => {
    try {
      const result = validationResult(req);

      if(result.isEmpty()){
        const userData = req.body;
        const user = await userService.createUser(userData);

        if(!user) return res.status(500).json({ message: "Houve um erro no servidor! Não foi possível concluir cadastro!" });

        res.status(201).json({ id: user.id , message: "Usuário criado com sucesso!" });
      } else{
        res.status(400).json({ errors: result.array() });
      }
    } catch (error) {
      res.status(500).json({ message: "Houve um erro no servidor!" });
    }
    
  },

  updateUser: async (req, res) => {
    try {
      const result = validationResult(req);

      if(!result.isEmpty()) return res.status(400).json({ errors: result.array() });
      
      const { id } = req.params;
      const userData = req.body;
      const user = await userService.updateUser(id, userData);

      if(!user) return res.status(404).json({ message: "Usuário não encontrado!" });

      res.status(200).json({ message: "Usuário atualizado com sucesso!" });
    } catch (error) {
      res.status(500).json({ message: "Houve um erro no servidor!" });
    }
  },
};

module.exports = userController;