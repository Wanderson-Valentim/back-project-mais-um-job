const express = require('express')
const router = express.Router()
const loginValidationChain = require('../validators/loginValidator')
const { validationResult } = require('express-validator');

const jwt = require('jsonwebtoken');
require('dotenv').config()

router.post("/login", loginValidationChain, (req, res) => {
  const result = validationResult(req);
  
  if(result.isEmpty()){
    const token = jwt.sign({ id: 123 }, process.env.SECRET_KEY, { expiresIn: '1h' });

    res.send({ auth: true, token });
  } else{
    res.send({ errors: result.array() });
  }
});

module.exports = router