const authService = require('../services/auth');
const { validationResult } = require('express-validator');

const authController = {
  login: async (req, res) => {
    try {
      const result = validationResult(req);
      
      if(result.isEmpty()){
        const { email, password} = req.body;
        
        const token = await authService.login(email, password);
        
        if(!token) return res.status(401).json({ message: "Erro de autenticação" });
  
        res.json({ auth: true, token });
      } else{
        res.status(400).json({ errors: result.array() });
      }
    } catch (error) {
      res.status(500).json({ message: "Houve um erro no servidor!" });
    }
  },
};

module.exports = authController;