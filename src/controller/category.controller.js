const Category = require("../models/category.model");
const { Response, Message } = require("../common/errors.const");

const fetchAllCategory = (req, res) => {
  const query = Category.find({
    isDeleted: {
      $eq: false,
    },
  });
  query
    .exec()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send(Response.error(Message.somethingWentWrong));
    });
};

const fetchCategoryById = (req, res) => {
  Category.findById(req.params.id)
    .then((data) => {
      data
        ? res.status(200).send(data)
        : res.status(404).send(Response.error(Message.somethingWentWrong));
    })
    .catch((err) => res.status(400).send(err));
};

const createCategory = (req, res) => {
  const { categoryList } = req.body;
  const payload = categoryList.map((dept) => ({
    categoryName: dept,
    isDeleted: false,
  }));
  Category.insertMany(payload)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => res.status(400).send(err));
};

const updateCategory = (req, res) => {
  if (req.body.categoryName) {
    Category.findOneAndUpdate(
      { _id: req.params.id },
      { categoryName: req.body.categoryName },
      { new: true },
    )
      .then((data) => {
        data
          ? res.status(200).send(data)
          : res.status(404).send(Response.error(Message.somethingWentWrong));
      })
      .catch((err) => res.status(400).send(err));
  } else {
    res.status(400).send(Response.error(Message.badRequest));
  }
};

const deleteCategory = (req, res) => {
  Category.findOneAndUpdate({ _id: req.params.id }, { isDeleted: true })
    .then((data) => {
      res
        .status(200)
        .send(Response.success(Message.CategoryDeletedSuccessfully));
    })
    .catch((err) =>
      res.status(400).send(Response.error(Message.somethingWentWrong)),
    );
};

module.exports = {
  fetchAllCategory,
  fetchCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
