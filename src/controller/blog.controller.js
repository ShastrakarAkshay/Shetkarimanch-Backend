const Blog = require("../models/blog.model");
const multer = require("../utils/multer.util");

const createBlog = (req, res) => {
  const blog = new Blog({
    ...req.body,
    image: multer.readFile(req.file.filename),
  });
  blog
    .save()
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(400).send(err));
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
    Blog.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then((data) => {
        data ? res.status(200).send(data) : res.status(404).send("Invalid blog");
      })
      .catch((err) => res.status(400).send(err));
  } else {
    res.status(400).send("Bad request");
  }
};

const deleteBlogById = (req, res) => {
  Blog.deleteOne({ _id: req.params.id })
    .then((data) => {
      data && data.deletedCount ? res.status(200).send(data) : res.status(404).send("Invalid blog");
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
