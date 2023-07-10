const mongoose = require("mongoose");
const { COLLECTIONS } = require("../common/collections.const");
const departmentSchema = new mongoose.Schema(
  {
    name: String,
  },
  {
    timestamps: {
      created_at: "create_at",
      updated_at: "updated_at",
    },
  },
);

module.exports = mongoose.model(
  "department",
  departmentSchema,
  COLLECTIONS.Department,
);
