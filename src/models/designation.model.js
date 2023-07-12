const mongoose = require("mongoose");
const { COLLECTIONS } = require("../common/collections.const");
const designationSchema = new mongoose.Schema(
  {
    designationName: String,
    departmentId: String,
    isDepartmentHead: Boolean,
  },
  {
    timestamps: {
      created_at: "create_at",
      updated_at: "updated_at",
    },
  },
);

module.exports = mongoose.model(
  "designation",
  designationSchema,
  COLLECTIONS.Designation,
);
