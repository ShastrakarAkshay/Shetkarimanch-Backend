const Blog = require("../models/blog.model");
const multer = require("../utils/multer.util");
const imageController = require("./image.controller");

const createBlog = async (req, res) => {
  const data = { ...req.body };
  if (req.file) {
    data.image = await imageController.saveAndGetImgPayload(req.file);
  }
  const blog = new Blog(data);
  blog
    .save()
    .then((data) => res.status(200).send(data))
    .catch((err) => {
      multer.deleteFile(req.file?.filename);
      res.status(400).send(err);
    });
};

const fetchAllBlogs = (req, res) => {
  const { fromDate, toDate, categoryId, createdBy } = req.query;
  const filters = {};
  if (fromDate && toDate) {
    filters.createdAt = { $gte: new Date(fromDate), $lte: new Date(toDate) };
  }
  if (categoryId) {
    filters.categoryId = { $eq: categoryId };
  }
  if (createdBy) {
    filters.createdBy = { $eq: createdBy };
  }
  Blog.find(filters)
    .limit(req.query?.limit || 0)
    .then((data) => {
      res.status(200).send(data);
    })
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

const updateBlogById = async (req, res) => {
  const data = { ...req.body };
  if (req.file) {
    data.image = await imageController.saveAndGetImgPayload(req.file);
  } else {
    delete data.image;
  }
  Blog.findOneAndUpdate({ _id: req.params.id }, data, { new: true })
    .then((data) => {
      data ? res.status(200).send(data) : res.status(404).send("Invalid blog");
    })
    .catch((err) => res.status(400).send(err));
};

const deleteBlogById = (req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then((data) => {
      multer.deleteFile(data.image?.name);
      res.status(200).send(data);
    })
    .catch((err) => res.status(400).send(err));
};

module.exports = {
  createBlog,
  fetchAllBlogs,
  fetchBlobById,
  updateBlogById,
  deleteBlogById,
};
