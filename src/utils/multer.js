const multer  = require('multer')

const extensionMap = {
  'image/png': '.png',
  'image/jpeg': '.jpg',
};

const workImagesLimit = 4;

const storage = multer.diskStorage({
  destination:(req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const fileName = Date.now().toString(16) + Math.random().toString(16).slice(2);
    const fileExtension = extensionMap[file.mimetype];
    cb(null, `${fileName}${fileExtension}`);
  },
})

const fileFilter = (req, file, cb) => {
  if (extensionMap.hasOwnProperty(file.mimetype)) return cb(null, true);

  return cb(new Error());
}

const upload = multer({ storage: storage, fileFilter});

const uploadSingle = upload.single('avatar');

const uploadArray = upload.array('images', workImagesLimit);

module.exports = { uploadSingle, uploadArray, workImagesLimit } 