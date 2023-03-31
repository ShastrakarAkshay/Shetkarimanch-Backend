const mongoose = require("mongoose");
const { COLLECTIONS } = require("../common/collections.const");

const blogSchema = new mongoose.Schema(
  {
    image: Blog,
    title: String,
    category: String,
    Content: String,
    state: String, // Published | Draft
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
