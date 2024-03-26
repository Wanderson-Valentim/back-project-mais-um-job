const userRepository = require('../repositories/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const authService = {
  login: async function (email, password) {
    const user = await userRepository.findOne({ email }, ['id', 'email', 'password']);

    if(!user) return null;

    const passwordIsCorrect = await bcrypt.compare(password, user.password);
  
    if(!passwordIsCorrect) return null;

    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });

    return token;
  },
};

module.exports = authService;