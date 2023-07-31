const Subject = require("../models/subject.model");
const { Response, Message } = require("../common/errors.const");

const fetchAllSubject = (req, res) => {
  const query = Subject.find({
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

const fetchSubjectById = (req, res) => {
  Subject.findById(req.params.id)
    .then((data) => {
      data
        ? res.status(200).send(data)
        : res.status(404).send(Response.error(Message.somethingWentWrong));
    })
    .catch((err) => res.status(400).send(err));
};

const fetchSubjectByDept = (req, res) => {
  Subject.find({ departmentId: req.params.id })
    .then((data) => {
      data
        ? res.status(200).send(data)
        : res.status(404).send(Response.error(Message.somethingWentWrong));
    })
    .catch((err) => res.status(400).send(err));
};

const fetchSubjectByDeptAndDesig = (req, res) => {
  Subject.find({
    departmentId: req.query.departmentId,
    designationId: req.query.designationId,
  })
    .then((data) => {
      data
        ? res.status(200).send(data)
        : res.status(404).send(Response.error(Message.somethingWentWrong));
    })
    .catch((err) => res.status(400).send(err));
};

const createSubject = (req, res) => {
  const { subjectList } = req.body;
  const payload = subjectList.map((item) => ({
    ...item,
    isDeleted: false,
  }));
  Subject.insertMany(payload)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => res.status(400).send(err));
};

const updateSubject = (req, res) => {
  if (req.body) {
    Subject.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    })
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

const deleteSubject = (req, res) => {
  Subject.findOneAndUpdate({ _id: req.params.id }, { isDeleted: true })
    .then((data) => {
      res
        .status(200)
        .send(Response.success(Message.SubjectDeletedSuccessfully));
    })
    .catch((err) =>
      res.status(400).send(Response.error(Message.somethingWentWrong)),
    );
};

module.exports = {
  fetchSubjectById,
  createSubject,
  updateSubject,
  deleteSubject,
  fetchAllSubject,
  fetchSubjectByDept,
  fetchSubjectByDeptAndDesig,
};
