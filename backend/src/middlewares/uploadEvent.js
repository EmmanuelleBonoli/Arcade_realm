// Middleware for upload images
const multer = require("multer");
const { v4 } = require("uuid");

const options = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/Evenements");
  },
  filename: (req, file, cb) => {
    const extArray = file.mimetype.split("/");
    const extension = extArray[extArray.length - 1];
    const name = `${v4()}.${extension}`;
    req.body.url = name;
    cb(null, name);
  },
  limits: {
    fieldSize: 1024 * 50,
  },
});
const uploadEvent = multer({ storage: options });

module.exports = uploadEvent;
