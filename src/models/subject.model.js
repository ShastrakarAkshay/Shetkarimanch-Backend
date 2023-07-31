const mongoose = require("mongoose");
const { COLLECTIONS } = require("../common/collections.const");
const subjectSchema = new mongoose.Schema(
  {
    subjectName: String,
    departmentId: String,
    designationId: String,
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

module.exports = mongoose.model("subject", subjectSchema, COLLECTIONS.Subject);
