const router = require("express").Router();
const Blog = require("../models/blog.model");

const createBlog = (req, res) => {
  const blog = new Blog(req.body);
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

const getBlobById = (req, res) => {
  Blog.findOne({ _id: req.params.id })
    .then((data) =>
      data ? res.status(200).send(data) : res.status(400).send("Invalid blog")
    )
    .catch((err) => res.status(400).send(err));
};

const updateBlogById = (req, res) => {
  // dont send request if req.body is invalid
  Blog.findOneAndUpdate({ _id: req.params.id }, { $set: req.body })
    .then((data) => {
      data ? res.status(200).send(data) : res.status(404).send("Invalid blog");
    })
    .catch((err) => res.status(400).send(err));
};

const deleteBlogById = (req, res) => {
  Blog.deleteOne({ _id: req.params.id })
    .then((data) => {
      data && data.deletedCount
        ? res.status(200).send(data)
        : res.status(404).send("Invalid blog");
    })
    .catch((err) => res.status(400).send(err));
};

router.post("/", createBlog);
router.get("/list", fetchAllBlogs);
router.get("/:id", getBlobById);
router.put("/:id", updateBlogById);
router.delete("/:id", deleteBlogById);

module.exports = router;
