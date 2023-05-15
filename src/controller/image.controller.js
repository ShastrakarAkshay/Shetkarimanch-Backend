const Image = require("../models/image.model");
const { readFile } = require("../utils/multer.util");

const uploadImage = async (file) => {
  const img = new Image({
    data: readFile(file.filename),
    contentType: file.mimetype,
  });
  return await img.save();
};

const getImage = (req, res) => {
  Image.findById(req.params.id).then((img) => {
    const imgURL =
      `data:${img.contentType};base64,` + img.data.toString("base64");
    res.status(200).send(imgURL);
  });
};

const deleteImage = (id) => {
  Image.findByIdAndDelete(id);
};

const saveAndGetImgPayload = async (file) => {
  const img = await uploadImage(file);
  return {
    api: `/api/image/${img._id.toString()}`,
    id: img._id.toString(),
    name: file.filename,
  };
};

module.exports = { saveAndGetImgPayload, uploadImage, getImage, deleteImage };
