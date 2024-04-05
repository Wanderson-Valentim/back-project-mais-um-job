const path = require('path');
const { uploadArray, uploadSingle } = require('../utils/multer');
const imageService = require('../services/images');
const workImageService = require('../services/workImages');
const userService = require('../services/users');
const imageRepository = require('../repositories/images');
const { validationResult } = require('express-validator');

const imageController = {
  findImage: async (req, res) => {  
    try {
      const fileName = req.params.name;
      const filePath = await imageService.findImage(fileName);

      if(!filePath) return res.status(404).json({ message: "Recurso não encontrado"});
  
      res.sendFile(filePath);
    } catch (error) {
      res.status(500).json({ message: "Houve um erro no servidor!"});
    }
  },

  uploadAvatar: (req, res) => {
    uploadSingle(req, res, async function (err) {
      try {
        if (err) throw new Error();

        const userId = req.userId;

        if(!userId || !req.file) throw new Error();

        const fileName = path.parse(req.file.filename).name;

        const result = await userService.updateAvatar(userId, fileName);

        if(!result) throw new Error();

        res.json({ src: fileName });
      } catch (error) {
        res.status(500).json({ message: "Houve um erro no servidor!"});
      }
    })
  },

  uploadWorkImages: async (req, res) => {
    uploadArray(req, res, async function (err) {
      try {
        if (err) throw new Error();

        const userId = req.userId;

        if(!userId) throw new Error();
        
        const files = req.files;

        if(files.length === 0) throw new Error();

        const imagesNames = req.files.map(file => path.parse(file.filename).name);

        const result = await workImageService.createImages(userId, imagesNames);

        if(!result) {
          await imageRepository.destroy(imagesNames);
          throw new Error();
        };

        res.json(result);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Houve um erro no servidor!"});
      }
    })
  },

  destroyAvatar: async (req, res) => {
    try {
      const userId = req.userId;

      if(!userId) throw new Error();

      const result = await userService.updateAvatar(userId, null);

      if(!result) throw new Error();

      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Houve um erro no servidor!"});
    }
  },

  destroyWorkImages: async (req, res) => {
    try {
      const validatorResult = validationResult(req);

      if(!validatorResult.isEmpty()) return res.status(400).json({ errors: validatorResult.array() });

      const userId = req.userId;

      if(!userId) throw new Error();

      const imagesNames = req.body.names;

      const result = await workImageService.deleteImages(userId, imagesNames);

      if(!result) throw new Error();

      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Houve um erro no servidor!"});
    }
  },
};

module.exports = imageController;