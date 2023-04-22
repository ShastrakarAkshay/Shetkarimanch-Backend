const multer = require("multer");
const fs = require("fs");
const path = require("path");

const single = (name, destination) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      return cb(null, destination);
    },
    filename: (req, file, cb) => {
      return cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  return multer({ storage }).single(name);
};

const readFile = (fileName, destination) => {
  return fs.readFileSync(path.join(destination + "/" + fileName));
};

const deleteFile = (destination, fileName) => {
  try {
    fs.unlinkSync(`${destination}/${fileName}`);
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports = { single, readFile, deleteFile };
