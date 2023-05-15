const path = require("path");
const Blog = require("../models/blog.model");
const multer = require("../utils/multer.util");
const imageController = require("./image.controller");
const { CONFIG } = require("../app.config");
const destination = "./uploads";
const imgAPI = "/api/blog/file";
const baseImgUrl = path.join(__dirname + `../../../${destination}`);

const createBlog = async (req, res) => {
  const fileName = req.file?.filename;
  const data = { ...req.body };
  if (fileName) {
    await imageController.uploadImage(req.file);
    data.image = {
      url: "",
      name: fileName,
      data: multer.readFile(fileName),
      contentType: req.file.mimetype,
    };
    data.imageURL = `/api/image/${fileName}`;
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
  const filters = {};
  if (req.query.fromDate && req.query.toDate) {
    filters.createdAt = {
      $gte: new Date(req.query.fromDate),
      $lte: new Date(req.query.toDate),
    };
  }
  if (req.query.category) {
    filters.category = {
      $eq: req.query.category,
    };
  }
  Blog.find(filters)
    .then((data) => {
      const result = data.map((item) => {
        if (item.image.data) {
          item.image.url =
            `data:${item.image.contentType};base64,` +
            item.image.data.toString("base64");
        }
        return item;
      });
      res.status(200).send(result);
    })
    .catch((err) => res.status(400).send(err));
};

const fetchBlobById = (req, res) => {
  Blog.findOne({ _id: req.params.id })
    .then((data) => {
      if (data) {
        if (data.image.data) {
          data.image.url =
            `data:${data.image.contentType};base64,` +
            data.image.data.toString("base64");
        }
        res.status(200).send(data);
      } else {
        res.status(400).send("Invalid blog");
      }
    })
    .catch((err) => res.status(400).send(err));
};

const updateBlogById = (req, res) => {
  const fileName = req.file?.filename;
  const data = { ...req.body };
  if (fileName) {
    data.image = {
      url: "",
      name: fileName,
      data: multer.readFile(fileName),
      contentType: req.file.mimetype,
    };
  }
  Blog.findOneAndUpdate({ _id: req.params.id }, data, { new: true })
    .then((data) => {
      data ? res.status(200).send(data) : res.status(404).send("Invalid blog");
    })
    .catch((err) => res.status(400).send(err));
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
