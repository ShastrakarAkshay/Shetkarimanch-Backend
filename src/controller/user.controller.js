const User = require("../models/user.model");
const { Response, Message } = require("../common/errors.const");
const { USER_STATUS } = require("../common/common.const");
const { DATA_ROLES, DATA_USER_STATUS } = require("../common/data.const");

const getField = (field, nameKey) => {
  return field && field.length
    ? { id: field[0]._id, name: field[0][nameKey] }
    : null;
};

const getUserPayload = (user) => {
  return {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    mobile: user.mobile,
    address: user.address,
    village: user.village,
    district: user.district,
    pinCode: user.pinCode,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    taluka: getField(user._taluka, "talukaName"),
    department: getField(user._department, "departmentName"),
    designaTIon: getField(user._designation, "designationName"),
    role: { id: user.roleId, name: DATA_ROLES[user.roleId] },
    status: { id: user.status, name: DATA_USER_STATUS[user.status] },
  };
};

// const combinedData = await User.aggregate([
//   {
//     $lookup: {
//       from: "taluka",
//       localField: "talukaId",
//       foreignField: "_id",
//       as: "_taluka",
//     },
//   },
//   {
//     $lookup: {
//       from: "designations",
//       localField: "designationId",
//       foreignField: "_id",
//       as: "_designation",
//     },
//   },
//   {
//     $lookup: {
//       from: "departments",
//       localField: "departmentId",
//       foreignField: "_id",
//       as: "_department",
//     },
//   },
// ]);

// console.log(combinedData);

// res.send(combinedData.map((user) => getUserPayload(user)));

const fetchAllUser = (req, res) => {
  const { roleId, roleIds, status, talukaId } = req.query;
  let filters = {};
  if (roleIds) {
    filters.roleId = { $in: roleIds };
  }
  if (roleId) {
    filters.roleId = { $eq: roleId };
  }
  if (status) {
    filters.status = { $eq: status };
  }
  if (talukaId) {
    filters.talukaId = { $eq: talukaId };
  }
  User.find(filters)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send(Response.error(Message.somethingWentWrong));
    });
};

const fetchUserById = (req, res) => {
  User.findById(req.params.id)
    .then((data) => {
      data
        ? res.status(200).send(data)
        : res.status(404).send(Response.error(Message.userDoesNotExists));
    })
    .catch((err) => res.status(400).send(err));
};

const updateUser = (req, res) => {
  const hasData = Object.keys(req.body).length > 0;
  if (hasData) {
    User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
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

const updateStatus = (req, res, status) => {
  User.findOneAndUpdate({ _id: req.params.id }, { status }, { new: true })
    .then((data) => {
      data
        ? res.status(200).send(data)
        : res.status(404).send(Response.error(Message.somethingWentWrong));
    })
    .catch((err) => res.status(400).send(err));
};

const deleteUser = (req, res) => {
  // updateStatus(req, res, USER_STATUS.Deleted);
  User.findOneAndDelete({ _id: req.params.id })
    .then((data) => {
      data
        ? res.status(200).send(data)
        : res.status(404).send(Response.error(Message.somethingWentWrong));
    })
    .catch((err) => res.status(400).send(err));
};

const approveUser = (req, res) => {
  updateStatus(req, res, USER_STATUS.Approved);
};

const rejectUser = (req, res) => {
  updateStatus(req, res, USER_STATUS.Rejected);
};

module.exports = {
  fetchAllUser,
  fetchUserById,
  updateUser,
  deleteUser,
  approveUser,
  rejectUser,
};
