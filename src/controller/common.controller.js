const Department = require("../models/department.model");
const Designation = require("../models/designation.model");
const Taluka = require("../models/taluka.model");

const getDepartmentById = async (id) => {
  try {
    const data = await Department.findById(id);
    return data
      ? {
          id: data._id,
          name: data.departmentName,
        }
      : null;
  } catch (error) {}
};

const getDesignationById = async (id) => {
  try {
    const data = await Designation.findById(id);
    return data
      ? {
          id: data._id,
          name: data.designationName,
        }
      : null;
  } catch (error) {}
};

const getTalukaById = async (id) => {
  try {
    const data = await Taluka.findById(id);
    return data
      ? {
          id: data._id,
          name: data.talukaName,
        }
      : null;
  } catch (error) {}
};

module.exports = {
  getDepartmentById,
  getDesignationById,
  getTalukaById,
};
