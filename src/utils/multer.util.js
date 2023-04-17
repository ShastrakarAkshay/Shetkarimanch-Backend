const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const single = (name) => {
  return multer({ storage }).single(name);
};

const readFile = (fileName) => {
  return fs.readFileSync(path.join("./uploads/" + fileName));
};

module.exports = { single, readFile };
