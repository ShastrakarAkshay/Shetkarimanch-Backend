const path = require("path");
const Blog = require("../models/blog.model");
const multer = require("../utils/multer.util");
const { CONFIG } = require("../app.config");
const destination = "./uploads";
const imgAPI = "/api/blog/file";
const baseImgUrl = path.join(__dirname + `../../../${destination}`);

const createBlog = (req, res) => {
  const fileName = req.file?.filename;
  const data = { ...req.body };
  if (fileName) {
    data.image = {
      url: `${CONFIG.SERVER_URL}${imgAPI}/${fileName}`,
      name: fileName,
    };
  }
  const blog = new Blog(data);
  blog
    .save()
    .then((data) => res.status(200).send(data))
    .catch((err) => {
      multer.deleteFile(destination, fileName);
      res.status(400).send(err);
    });
};

const fetchAllBlogs = (req, res) => {
  Blog.find()
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(400).send(err));
};

const fetchBlobById = (req, res) => {
  Blog.findOne({ _id: req.params.id })
    .then((data) => {
      if (data) {
        res.status(200).send(data);
      } else {
        res.status(400).send("Invalid blog");
      }
    })
    .catch((err) => res.status(400).send(err));
};

const updateBlogById = (req, res) => {
  const hasData = Object.keys(req.body).length > 0;
  if (hasData) {
    const fileName = req.file?.filename;
    const data = { ...req.body };
    if (fileName) {
      data.image = {
        url: `${CONFIG.SERVER_URL}${imgAPI}/${fileName}`,
        name: fileName,
      };
    }
    Blog.findOneAndUpdate({ _id: req.params.id }, data, { new: true })
      .then((data) => {
        data
          ? res.status(200).send(data)
          : res.status(404).send("Invalid blog");
      })
      .catch((err) => res.status(400).send(err));
  } else {
    res.status(400).send("Bad request");
  }
};

const deleteBlogById = (req, res) => {
  Blog.findOneAndDelete({ _id: req.params.id })
    .then((data) => {
      multer.deleteFile(destination, data.image.name);
      res.status(200).send(data);
    })
    .catch((err) => res.status(400).send(err));
};

const getBlogImage = (req, res) => {
  res.sendFile(`${baseImgUrl}/${req.params.image}`);
};

module.exports = {
  createBlog,
  fetchAllBlogs,
  fetchBlobById,
  updateBlogById,
  deleteBlogById,
  getBlogImage,
};
