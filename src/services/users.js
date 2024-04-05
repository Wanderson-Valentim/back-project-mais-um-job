const bcrypt = require('bcrypt');
const userRepository = require('../repositories/users');
const WorkImages = require('../models/WorkImages');
const sequelize = require('../db');
const imageRepository = require('../repositories/images');

const userService = {
  findUser: async function (id) {
    const user = await userRepository.findOne(
      { id: id },
      { exclude: ['password', 'cpf', 'createdAt', 'updatedAt'] },
      [{ model: WorkImages, as: 'workImages', attributes: ['id', 'src']}]
    );
    return user;
  },

  findUsers: async function () {
    const users = await userRepository.findAll({ 
      exclude: ['password', 'cpf', 'createdAt', 'updatedAt', 'description'],
    });
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

    return updatedUser;
  },

  updateAvatar: async function (id, src) {
    const transaction = await sequelize.transaction();

    try {
      const user = await userRepository.findOne(
        { id: id }, 
        { attributes: ['id', 'avatar'] },
      );

      if(!user) return null;

      const oldAvatar = user.avatar;

      const result = await userRepository.update(id, { avatar: src }, transaction);
      
      if(oldAvatar){
        const excluded = await imageRepository.destroy([oldAvatar]);

        if (!excluded) throw Error();
      }
      
      await transaction.commit();

      return result;
    } catch (error) {
      await transaction.rollback();
      return null;
    }
  },
};

module.exports = userService;