const Department = require("../models/department.model");
const { Response, Message } = require("../common/errors.const");

const fetchAllDepartment = (req, res) => {
  const filter = { isDeleted: { $eq: false } };
  Department.find(filter)
    .sort({ updatedAt: -1 })
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

const fetchDepartmentByTalukaId = (req, res) => {
  Department.find({ talukaId: req.params.id })
    .sort({ updatedAt: -1 })
    .then((data) => {
      data
        ? res.status(200).send(data)
        : res.status(404).send(Response.error(Message.somethingWentWrong));
    })
    .catch((err) => res.status(400).send(err));
};

const createDepartment = (req, res) => {
  const { departmentList } = req.body;
  const payload = departmentList.map((dept) => ({
    departmentName: dept.departmentName,
    isDeleted: false,
  }));
  Department.insertMany(payload)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => res.status(400).send(err));
};

const updateDepartment = (req, res) => {
  const { departmentName } = req.body;
  if (departmentName) {
    Department.findOneAndUpdate(
      { _id: req.params.id },
      { departmentName },
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

const deleteDepartment = (req, res) => {
  Department.findOneAndUpdate({ _id: req.params.id }, { isDeleted: true })
    .then((data) => {
      res
        .status(200)
        .send(Response.success(Message.DepartmentDeletedSuccessfully));
    })
    .catch((err) =>
      res.status(400).send(Response.error(Message.somethingWentWrong)),
    );
};

module.exports = {
  fetchAllDepartment,
  fetchDepartmentById,
  fetchDepartmentByTalukaId,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
