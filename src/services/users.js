const userRepository = require('../repositories/users');
const bcrypt = require('bcrypt');

const userService = {
  findUser: async function (id) {
    const user = await userRepository.findOne(
      { id: id }, 
      { exclude: ['password', 'cpf', 'createdAt', 'updatedAt'] },
    );
    return user;
  },

  findUsers: async function () {
    const users = await userRepository.findAll({ exclude: ['password', 'cpf', 'createdAt', 'updatedAt'] });
    return users;
  },

  createUser: async function (data) {
    const formattedUserData = {
      ...data,
      password: await bcrypt.hash(data.password, 10),
      cpf: data.cpf.replace(/[.-]/g, ''),
    }

    const user = await userRepository.create(formattedUserData);

    return { id: user.id };
  },

  updateUser: async function (id, data) {
    const user = await userRepository.findOne(
      { id: id }, 
      { exclude: ['password', 'cpf', 'createdAt', 'updatedAt'] },
    );
    if(!user) return null;
    
    const updatedUser = await userRepository.update(id, data);
    console.log(userRepository);

    return updatedUser;
  },
};

module.exports = userService;