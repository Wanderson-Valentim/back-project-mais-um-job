const authService = require('../services/auth');
const { validationResult } = require('express-validator');

const authController = {
  login: async (req, res) => {
    try {
      const result = validationResult(req);
      
      if(result.isEmpty()){
        const { email, password} = req.body;
        
        const authData = await authService.login(email, password);
        
        if(!authData.token) return res.status(401).json({ message: "Erro de autenticação" });
  
        res.json({ auth: true, id: authData.id, token: authData.token });
      } else{
        res.status(400).json({ errors: result.array() });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Houve um erro no servidor!" });
    }
  },

  verifyToken: async (req, res) => {
    try {
      const userId = req.userId;

      if(!userId) return res.status(401).json({ auth: false });

      res.json({ id: userId, auth: true });
    } catch (error) {
      res.status(500).json({ message: "Houve um erro no servidor!" });
    }
  },
};

module.exports = authController;