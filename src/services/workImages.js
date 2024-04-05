const sequelize = require('../db');
const imageRepository = require('../repositories/images');
const userRepository = require('../repositories/users');
const workImageRepository = require('../repositories/workImages');
const { workImagesLimit } = require('../utils/multer');

const workImageService = {
  createImages: async function (userId, imagesNames) {
    const user = await userRepository.findOne(
      { id: userId }, 
      { attributes: ['id'] },
    );

    if(!user) return null;

    const amountImages = await workImageRepository.count({ userId: userId });

    if(workImagesLimit - amountImages <= 0) return null;

    const formattedData = imagesNames.map(image => ({
      src: image,
      userId
    }))

    const result = await workImageRepository.create(formattedData);

    return result;
  },

  deleteImages: async function (userId, imagesNames) {
    const transaction = await sequelize.transaction();

    try {
      const user = await userRepository.findOne(
        { id: userId }, 
        { attributes: ['id'] },
      );

      if(!user) return null;

      const deletionPromises = imagesNames.map(async name => {
        return await workImageRepository.destroy({ userId: userId, src: name }, transaction);
      });

      const deletionResults = await Promise.all(deletionPromises);

      const allDeletionsSuccessful = deletionResults.every(result => result);

      if (!allDeletionsSuccessful) throw new Error("Algumas imagens não puderam ser excluídas");

      const excluded = await imageRepository.destroy(imagesNames);

      if (!excluded) throw new Error("Falha ao excluir imagens do repositório");
      
      await transaction.commit();

      return true;
    } catch (error) {
      await transaction.rollback();
      return null;
    }
  },
};

module.exports = workImageService;