const mongoose = require("mongoose");
const { COLLECTIONS } = require("../common/collections.const");

const blogSchema = new mongoose.Schema(
  {
    image: Blog,
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    Content: {
      type: String,
      required: true,
    },
    state: {
      // Published | Draft
      type: Number,
      required: true,
    },
  },
  {
    // bufferTimeoutMS // needs to learn
    timestamps: {
      created_at: "created_at",
      updated_at: "updated_at",
    },
  }
);

module.exports = mongoose.model("blogs", blogSchema, COLLECTIONS.Blogs);
