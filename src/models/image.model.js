const mongoose = require("mongoose");
const { COLLECTIONS } = require("../common/collections.const");
const imageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    data: Buffer,
    contentType: { type: String },
  },
  {
    timestamps: {
      created_at: "create_at",
      updated_at: "updated_at",
    },
  },
);

module.exports = mongoose.model("image", imageSchema, COLLECTIONS.images);
