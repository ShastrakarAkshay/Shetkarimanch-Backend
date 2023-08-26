const mongoose = require("mongoose");
const { COLLECTIONS } = require("../common/collections.const");
const talukaSchema = new mongoose.Schema(
  {
    talukaName: String,
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

module.exports = mongoose.model("taluka", talukaSchema, COLLECTIONS.Taluka);
