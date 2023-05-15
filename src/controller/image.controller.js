const Image = require("../models/image.model");
const { readFile } = require("../utils/multer.util");

const uploadImage = async (file) => {
  const img = new Image({
    name: file.filename,
    data: readFile(file.filename),
    contentType: file.mimetype,
  });
  return await img.save();
};

const getImage = (req, res) => {
  Uploads.find({ name: req.params.name }).then((img) => {
    const imgURL =
      `data:${img.contentType};base64,` + img.data.toString("base64");
    res.status(200).send(imgURL);
  });
};

module.exports = { uploadImage, getImage };
