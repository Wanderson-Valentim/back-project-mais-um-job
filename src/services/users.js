const bcrypt = require('bcrypt');
const userRepository = require('../repositories/users');
const WorkImages = require('../models/WorkImages');
const sequelize = require('../db');
const imageRepository = require('../repositories/images');
const Local = require('../models/Local');
const AreaOfActivity = require('../models/AreaOfActivity');

const userService = {
  findUser: async function (id) {
    const user = await userRepository.findOne(
      { id: id },
      { exclude: ['password', 'cpf', 'createdAt', 'updatedAt'] },
      [
        {model: WorkImages, as: 'workImages', attributes: ['id', 'src']}, 
        {model: Local, attributes: ['id', 'name']}, 
        {model: AreaOfActivity, attributes: ['id', 'name']}
      ]
    );
    return user;
  },

  findUsers: async function ({ localId, activitieId }) {
    const whereClause = {};

    if (localId) {
        whereClause.localId = localId;
    }

    if (activitieId) {
        whereClause.areaOfActivityId = activitieId;
    }

    const users = await userRepository.findAll(
      where = Object.keys(whereClause).length > 0 ? whereClause : null,
      {  
        exclude: ['password', 'cpf', 'createdAt', 'updatedAt']
      },
      [{model: Local, attributes: ['id', 'name']}, {model: AreaOfActivity, attributes: ['id', 'name']}]
    );

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