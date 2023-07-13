const mongoose = require("mongoose");
const { COLLECTIONS } = require("../common/collections.const");
const categorySchema = new mongoose.Schema(
  {
    categoryName: String,
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
  "categories",
  categorySchema,
  COLLECTIONS.Categories,
);
