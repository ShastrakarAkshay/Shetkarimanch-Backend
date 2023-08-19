const mongoose = require("mongoose");
const { COLLECTIONS } = require("../common/collections.const");
const designationSchema = new mongoose.Schema(
  {
    talukaId: String,
    departmentId: String,
    designationName: String,
    isDepartmentHead: Boolean,
    isDeleted: {
      type: Boolean,
      defaultValue: false,
    },
  },
  {
    timestamps: {
      created_at: "create_at",
      updated_at: "updated_at",
    },
  },
);

module.exports = mongoose.model(
  "designations",
  designationSchema,
  COLLECTIONS.Designations,
);
