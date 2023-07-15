const mongoose = require("mongoose");
const { COLLECTIONS } = require("../common/collections.const");
const departmentSchema = new mongoose.Schema(
  {
    departmentName: String,
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
  "departments",
  departmentSchema,
  COLLECTIONS.Departments,
);
