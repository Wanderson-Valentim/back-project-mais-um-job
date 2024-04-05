const path = require('path')
const fg = require('fast-glob')
const uploadDirectory = path.join(__dirname, '..', '..', 'uploads');
const fs = require('fs');

const imageRepository = {
  findOne: async function (name) {
    const files = await fg(path.join(uploadDirectory, '*'));

    if(files.length === 0) return null;

    const filePath = files.find(file => path.parse(file).name === name);

    return filePath
  },

  destroy: async (names) => {
    try {
      const files = await fg(path.join(uploadDirectory, '*'));
  
      if (files.length === 0) return false;
  
      names.forEach(name => {
        const filePath = files.find(file => path.parse(file).name === name);

        if (filePath) {
            fs.unlinkSync(filePath);
        }
      });
  
      return true;
    } catch (error) {
      console.error("Erro ao excluir arquivo:", error);
      return false;
    }
  },  
};

module.exports = imageRepository;
