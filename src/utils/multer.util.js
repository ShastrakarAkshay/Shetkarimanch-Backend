const multer = require("multer");
const fs = require("fs");
const path = require("path");

const single = (name) => {
  const destination = "./uploads";
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

const readFile = (fileName) => {
  return fs.readFileSync(path.join("uploads/" + fileName));
};

const deleteFile = (fileName) => {
  try {
    fs.unlinkSync(`uploads/${fileName}`);
  } catch (err) {}
};

module.exports = { single, readFile, deleteFile };
