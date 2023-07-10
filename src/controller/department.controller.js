const Department = require("../models/department.model");
const { Response, Message } = require("../common/errors.const");

const fetchAllDepartment = (req, res) => {
  const query = Department.find();
  query
    .exec()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send(Response.error(Message.somethingWentWrong));
    });
};

const fetchDepartmentById = (req, res) => {
  Department.findById(req.params.id)
    .then((data) => {
      data
        ? res.status(200).send(data)
        : res.status(404).send(Response.error(Message.somethingWentWrong));
    })
    .catch((err) => res.status(400).send(err));
};

const createDepartment = (req, res) => {
  const department = new Department(req.body);
  department
    .save()
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => res.status(400).send(err));
};

const updateDepartment = (req, res) => {
  const hasData = Object.keys(req.body).length > 0;
  if (hasData) {
    Department.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
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

const deleteDepartment = (req, res) => {
  //   Department.findOneAndDelete({ _id: req.params.id })
  //     .then((data) => {
  //       res
  //         .status(200)
  //         .send(Response.success(Message.DepartmentDeletedSuccessfully));
  //     })
  //     .catch((err) =>
  //       res.status(400).send(Response.error(Message.somethingWentWrong)),
  //     );
};

module.exports = {
  fetchAllDepartment,
  fetchDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
